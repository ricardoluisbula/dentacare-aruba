import { expect, test } from "@playwright/test";
import { ALL_LOCALIZED_ROUTES, baseRoute, FORBIDDEN_TEXT, isForbiddenHref, POLICY_ROUTES, PRIVACY_EMAIL, screenshot, scrollThrough, stripAllowed, WHATSAPP_URL } from "./helpers";

/**
 * Guards the Aruba draft's promises: it stays out of search engines, it shows
 * only confirmed details, and its only contact actions are the confirmed
 * WhatsApp (messages), Instagram and map links -- never a tel: or mailto:.
 */

for (const { path: route } of ALL_LOCALIZED_ROUTES) {
  test(`draft guard: ${route}`, async ({ page, request }) => {
    const response = await page.goto(route);
    expect(response?.status(), "status").toBe(200);
    expect(response?.headers()["x-robots-tag"], "X-Robots-Tag header").toContain("noindex");

    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots, "<meta name=robots>").toContain("noindex");

    // The raw HTML includes the serialized client payload, not just visible text.
    const html = stripAllowed(await (await request.get(route)).text(), route);
    for (const text of FORBIDDEN_TEXT) {
      expect(html, `"${text}" in ${route}`).not.toContain(text);
    }

    const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""));
    expect(hrefs.filter((href) => isForbiddenHref(href, route)), "forbidden contact links").toEqual([]);
  });
}

test("robots.txt disallows everything and the sitemap is empty", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//);
  expect(robots).not.toMatch(/Sitemap:/i);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("<url>");
});

test("the WhatsApp enquiry is a message link with the enquiry-only note", async ({ page }) => {
  await page.goto("/contact");
  const link = page.getByRole("link", { name: /ask about an appointment on whatsapp/i });
  await expect(link).toHaveAttribute("href", new RegExp(`^${WHATSAPP_URL.replace(/\./g, "\\.")}\\?text=`));
  await expect(page.getByText(/is an enquiry, not a booking/i).first()).toBeVisible();
});

test("the page-level treatment links resolve", async ({ page }) => {
  await page.goto("/treatments");
  const hrefs = await page.locator('a[href^="/treatments/"]').evaluateAll((els) => [...new Set(els.map((el) => el.getAttribute("href")!.split("#")[0]))]);
  for (const href of hrefs) {
    const res = await page.request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test.describe("review screenshots", () => {
  test("desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const [route, name] of [
      ["/", "desktop-home"],
      ["/team", "desktop-team"],
      ["/treatments", "desktop-treatments"],
      ["/treatments/porcelain-veneers", "desktop-treatment-detail"],
    ]) {
      await page.goto(route);
      await page.waitForTimeout(1200);
      await scrollThrough(page);
      await screenshot(page, `${name}-full`, true);
    }
  });

  test("mobile", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.waitForTimeout(800);
    await screenshot(page, "mobile-menu-open");
    for (const [route, name] of [
      ["/team", "mobile-team"],
      ["/treatments/porcelain-veneers", "mobile-treatment-detail"],
    ]) {
      await page.goto(route);
      await page.waitForTimeout(1200);
      await scrollThrough(page);
      await screenshot(page, `${name}-full`, true);
    }
    await context.close();
  });
});

test("an unknown treatment URL is the site's own 404", async ({ page }) => {
  const res = await page.goto("/treatments/not-a-treatment");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "This page doesn't exist" })).toBeVisible();
});

test("Composite Veneers keeps its existing URL and shows the new name", async ({ page }) => {
  const res = await page.goto("/treatments/composite-restorations");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Composite Veneers/);
  await expect(page).toHaveTitle(/^Composite Veneers \|/);

  await page.goto("/treatments");
  await expect(page.getByText("Composite Veneers").first()).toBeVisible();
  await expect(page.getByText(/Composite Restorations/)).toHaveCount(0);
  await expect(page.getByRole("link", { name: /About composite veneers/ })).toHaveAttribute("href", "/treatments/composite-restorations");
});

/** Pages that exist but are still being prepared (unlinked). */
const UNFINISHED_ROUTES = ["/about", "/reviews", "/new-patients", "/pricing-info"];

for (const { path: route } of ALL_LOCALIZED_ROUTES) {
  test(`launch prep: ${route} shows no draft labels and no links to unfinished pages`, async ({ page }) => {
    await page.goto(route);
    await expect(page).not.toHaveTitle(/draft/i);
    // "Hours to be confirmed" is a legitimate state of a published date.
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/draft preview|\(draft\)|(?<!hours )to be confirmed|being confirmed|to be supplied|awaiting details|in preparation/i);

    const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""));
    for (const unfinished of UNFINISHED_ROUTES) {
      const internal = hrefs.filter((h) => h.startsWith("/")).map((h) => baseRoute(h.split("#")[0]));
      expect(internal.filter((h) => h === unfinished), `link to ${unfinished}`).toEqual([]);
    }
  });
}

test("the footer still links Privacy and Cookies", async ({ page }) => {
  await page.goto("/");
  const legal = page.getByRole("navigation", { name: "Legal information" });
  await expect(legal.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
  await expect(legal.getByRole("link", { name: "Cookie Policy" })).toHaveAttribute("href", "/cookies");
  await expect(legal.getByRole("link")).toHaveCount(2);
});

test("the privacy email appears only on the policy pages, never as a booking contact", async ({ page }) => {
  test.setTimeout(240_000);
  for (const { locale, path: route } of ALL_LOCALIZED_ROUTES) {
    await page.goto(route);
    const text = await page.locator("body").innerText();
    if (POLICY_ROUTES.includes(baseRoute(route))) {
      await expect(page.getByRole("link", { name: PRIVACY_EMAIL }).first()).toHaveAttribute("href", `mailto:${PRIVACY_EMAIL}`);
      if (locale === "en") expect(text).toMatch(/privacy questions only|For questions, email/);
    } else {
      expect(text, route).not.toContain(PRIVACY_EMAIL);
    }
  }
});

test("the policies match the site: no analytics, no embedded third-party content", async ({ page }) => {
  for (const route of POLICY_ROUTES) {
    await page.goto(route);
    await expect(page.getByText(/does not use analytics, advertising or tracking/).first()).toBeVisible();
  }
  // Nothing analytics-related loads while analytics is disabled.
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.goto("/");
  await page.waitForTimeout(1500);
  expect(requests.filter((u) => /googletagmanager|google-analytics|facebook|instagram\.com\/embed|maps\.googleapis/.test(u))).toEqual([]);
  expect(await page.locator("iframe").count()).toBe(0);
  const stored = await page.evaluate(() => ({ cookies: document.cookie, storage: Object.keys(localStorage) }));
  expect(stored.cookies).toBe("");
  expect(stored.storage.filter((k) => k !== "theme")).toEqual([]);
});

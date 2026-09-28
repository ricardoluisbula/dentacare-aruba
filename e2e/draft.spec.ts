import { expect, test } from "@playwright/test";
import { DRAFT_ROUTES, FORBIDDEN_TEXT, isForbiddenHref, screenshot, scrollThrough, stripAllowed, WHATSAPP_URL } from "./helpers";

/**
 * Guards the Aruba draft's promises: it stays out of search engines, it shows
 * only confirmed details, and its only contact actions are the confirmed
 * WhatsApp (messages), Instagram and map links -- never a tel: or mailto:.
 */

for (const route of DRAFT_ROUTES) {
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
    expect(hrefs.filter(isForbiddenHref), "forbidden contact links").toEqual([]);
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

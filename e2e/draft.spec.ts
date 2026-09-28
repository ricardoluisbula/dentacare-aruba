import { expect, test } from "@playwright/test";
import { DRAFT_ROUTES, FORBIDDEN_HREF, FORBIDDEN_TEXT, screenshot } from "./helpers";

/**
 * Guards the Aruba draft's two promises: it stays out of search engines, and
 * it never presents -- or links to -- the Amsterdam practice.
 */

for (const route of DRAFT_ROUTES) {
  test(`draft guard: ${route}`, async ({ page, request }) => {
    const response = await page.goto(route);
    expect(response?.status(), "status").toBe(200);
    expect(response?.headers()["x-robots-tag"], "X-Robots-Tag header").toContain("noindex");

    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(robots, "<meta name=robots>").toContain("noindex");

    // The raw HTML includes the serialized client payload, not just visible text.
    const html = (await (await request.get(route)).text()).toLowerCase();
    for (const text of FORBIDDEN_TEXT) {
      expect(html, `"${text}" in ${route}`).not.toContain(text);
    }

    const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""));
    const contactLinks = hrefs.filter((href) => FORBIDDEN_HREF.test(href));
    expect(contactLinks, "contact links").toEqual([]);
  });
}

test("robots.txt disallows everything and the sitemap is empty", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//);
  expect(robots).not.toMatch(/Sitemap:/i);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("<url>");
});

test.describe("review screenshots", () => {
  test("desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(1500);
    await screenshot(page, "desktop-home-viewport");
    await scrollThrough(page);
    await screenshot(page, "desktop-home-full", true);

    await page.goto("/contact");
    await page.waitForTimeout(1200);
    await screenshot(page, "desktop-contact-full", true);
  });

  test("desktop dark", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: /switch to dark theme/i }).first().click();
    await page.waitForTimeout(1500);
    await screenshot(page, "desktop-home-dark-viewport");
  });

  test("mobile", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForTimeout(1500);
    await screenshot(page, "mobile-home-viewport");
    await scrollThrough(page);
    await screenshot(page, "mobile-home-full", true);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.waitForTimeout(800);
    await screenshot(page, "mobile-menu-open");

    await page.goto("/team");
    await page.waitForTimeout(1200);
    await scrollThrough(page);
    await screenshot(page, "mobile-team-full", true);
    await context.close();
  });
});

/** Scrolls to the bottom in steps so every scroll-triggered reveal has played before a full-page capture. */
async function scrollThrough(page: import("@playwright/test").Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

import { expect, test, type Page } from "@playwright/test";
import { screenshot, scrollThrough } from "./helpers";

/**
 * The pages that show photos reused from the reference site: every <img> has
 * a real alt text, none comes from an excluded reference photo, every one
 * actually loads, and full-page review screenshots are written for desktop
 * (1440) and mobile (390) after scrolling through so every reveal has played.
 */

const PHOTO_ROUTES: [route: string, name: string][] = [
  ["/", "home"],
  ["/smile-gallery", "smile-gallery"],
  ["/team", "team"],
  ["/treatments", "treatments"],
  ["/treatments/emergency-aesthetic-dentistry", "treatment-emergency"],
  ["/prevention-hygiene", "prevention-hygiene"],
];

/** Reference photos that must never be shown (premises/signage, watermark, retired). */
const EXCLUDED_IMAGE = [
  /clinic\/lobby/,
  /homepage-smile-final/,
  /about\/instruments/,
  /about\/dentist/,
  /about\/smile-transformation/,
  /case-(03|07|11|13|14)-/,
  /case-05-(before|after)\.webp/,
];

/**
 * A slower first pass than `scrollThrough`: under parallel load a 400px step
 * can skip past a short section between two animation frames, so its
 * whileInView reveal never fires and it is captured blank.
 */
async function revealSlowly(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 200) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(150);
  }
  await scrollThrough(page);
}

async function checkImages(page: Page, route: string) {
  const images = await page.locator("img").evaluateAll((els) =>
    els.map((el) => {
      const img = el as HTMLImageElement;
      return {
        alt: img.getAttribute("alt"),
        src: img.getAttribute("src") ?? "",
        srcset: img.getAttribute("srcset") ?? "",
        loaded: img.complete && img.naturalWidth > 0,
      };
    })
  );
  expect(images.length, `images on ${route}`).toBeGreaterThan(0);
  for (const image of images) {
    expect(image.alt?.trim(), `alt for ${image.src} on ${route}`).toBeTruthy();
    for (const pattern of EXCLUDED_IMAGE) {
      expect(`${image.src} ${image.srcset}`, `excluded photo on ${route}`).not.toMatch(pattern);
    }
    expect(image.loaded, `${image.src} loaded on ${route}`).toBe(true);
  }
}

test.describe("photo pages", () => {
  test("desktop 1440: alt text, no excluded photos, screenshots", async ({ page }) => {
    test.setTimeout(300_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const [route, name] of PHOTO_ROUTES) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await page.waitForTimeout(1200);
      await revealSlowly(page);
      await checkImages(page, route);
      await screenshot(page, `photos-desktop-${name}-full`, true);
    }
  });

  test("mobile 390: alt text, no excluded photos, screenshots", async ({ browser }) => {
    test.setTimeout(300_000);
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    for (const [route, name] of PHOTO_ROUTES) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await page.waitForTimeout(1200);
      await revealSlowly(page);
      await checkImages(page, route);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(0);
      await screenshot(page, `photos-mobile-${name}-full`, true);
    }
    await context.close();
  });

  test("a treatment page's results link opens the gallery on that category", async ({ page }) => {
    await page.goto("/treatments/dental-crowns-bridges");
    const link = page.getByRole("link", { name: "View before-and-after results" });
    await expect(link).toHaveAttribute("href", /\/smile-gallery#results-crowns$/);
    await link.click();
    await expect(page).toHaveURL(/\/smile-gallery#results-crowns$/);
    await expect(page.getByRole("button", { name: /^Crowns$/ })).toHaveAttribute("aria-pressed", "true");
  });
});

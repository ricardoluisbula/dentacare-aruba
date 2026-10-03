import { expect, test, type Page } from "@playwright/test";
import { locales, screenshot, scrollThrough, type Locale } from "./helpers";
import { HTML_LANG, LOCALE_LABEL, OG_LOCALE, localizePath } from "../src/lib/i18n/routing";

/**
 * The four languages (English default, Dutch, Spanish, Aruba Papiamento):
 * language tags and metadata, the language selector on desktop, tablet and
 * mobile, no English left on translated pages, working links that stay in
 * the visitor's language, and no horizontal scrolling on phones.
 */

const LABELS = locales.map((l) => LOCALE_LABEL[l]);

/** Pages checked in every language for leftovers, links and layout. */
const KEY_ROUTES = ["/", "/treatments", "/treatments/porcelain-veneers", "/treatments/emergency-aesthetic-dentistry", "/prevention-hygiene", "/smile-gallery", "/team", "/contact", "/privacy", "/cookies"];

/** Lines of visible text with at least four words, from a rendered page. */
async function sentences(page: Page): Promise<string[]> {
  const text = await page.locator("main").innerText();
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 4);
}

/** Common English words; a line containing several is English prose. */
const ENGLISH = /\b(the|and|your|you|with|for|this|that|are|is|of|to|our|can|may|not)\b/gi;

for (const locale of locales) {
  test(`${locale}: language tag, alternates and Open Graph locale`, async ({ page }) => {
    await page.goto(localizePath("/treatments", locale));
    await expect(page.locator("html")).toHaveAttribute("lang", HTML_LANG[locale]);
    for (const l of locales) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${HTML_LANG[l]}"]`)).toHaveAttribute("href", new RegExp(`${localizePath("/treatments", l).replace(/\//g, "\\/")}$`));
    }
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", /\/treatments$/);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", OG_LOCALE[locale]);
    // Still out of search engines in every language.
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
}

for (const locale of locales.filter((l) => l !== "en")) {
  test(`${locale}: no English left on translated pages, and links stay in ${locale}`, async ({ page }) => {
    test.setTimeout(180_000);
    for (const route of KEY_ROUTES) {
      await page.goto(route);
      const english = new Set(await sentences(page));
      await page.goto(localizePath(route, locale));
      const translated = await sentences(page);
      const leftovers = translated.filter((s) => english.has(s) && (s.match(ENGLISH) ?? []).length >= 2);
      expect(leftovers, `${locale} ${route}`).toEqual([]);

      // Every internal link on a translated page stays in that language.
      const hrefs = await page.locator("a[href^='/']").evaluateAll((els) => els.map((el) => el.getAttribute("href")!));
      const wrongLanguage = hrefs.filter((h) => !h.startsWith(`/${locale}`) && h !== localizePath("/", locale));
      expect(wrongLanguage, `${locale} ${route} links`).toEqual([]);
    }
  });
}

test("every internal link in every language resolves", async ({ page, request }) => {
  test.setTimeout(240_000);
  const seen = new Set<string>();
  for (const locale of locales) {
    for (const route of KEY_ROUTES) {
      await page.goto(localizePath(route, locale));
      const hrefs = await page.locator("a[href^='/']").evaluateAll((els) => els.map((el) => el.getAttribute("href")!.split("#")[0]));
      for (const href of hrefs) seen.add(href || "/");
    }
  }
  const broken: string[] = [];
  for (const href of seen) {
    const res = await request.get(href);
    if (res.status() !== 200) broken.push(`${href} -> ${res.status()}`);
  }
  expect(broken).toEqual([]);
  expect(seen.size).toBeGreaterThan(40);
});

test("desktop selector: globe button with the current language, keyboard use, same page", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/treatments/porcelain-veneers");
  const trigger = page.getByTestId("language-trigger").first();
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveText("English");

  // Keyboard: open with ArrowDown, move with arrows, choose with Enter.
  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  const menu = page.getByTestId("language-menu");
  await expect(menu.getByRole("link")).toHaveText(LABELS);
  await expect(menu.getByRole("link", { name: "English" })).toBeFocused();
  await screenshot(page, "i18n-desktop-selector-open");
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown"); // Nederlands
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/nl\/treatments\/porcelain-veneers$/);
  await expect(page.getByTestId("language-trigger").first()).toHaveText("Nederlands");

  // Mouse, from Dutch to Papiamento: still the same page.
  await page.getByTestId("language-trigger").first().click();
  await page.getByTestId("language-menu").getByRole("link", { name: "Papiamento" }).click();
  await expect(page).toHaveURL(/\/pap\/treatments\/porcelain-veneers$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pap");

  // And back to English: the unprefixed English URL.
  await page.getByTestId("language-trigger").first().click();
  await page.getByTestId("language-menu").getByRole("link", { name: "English" }).click();
  await expect(page).toHaveURL(/\/treatments\/porcelain-veneers$/);
  expect(new URL(page.url()).pathname).toBe("/treatments/porcelain-veneers");
});

test("tablet: the selector stays visible in the header", async ({ page }) => {
  await page.setViewportSize({ width: 820, height: 1100 });
  await page.goto("/es/contact");
  const trigger = page.locator('[data-testid="language-trigger"]:visible');
  await expect(trigger).toHaveCount(1);
  await expect(trigger).toHaveText("Español");
  await screenshot(page, "i18n-tablet-es-contact");
});

test("mobile: the language list is near the top of the menu and switches on the same page", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/team");
  await page.locator('button[aria-controls="mobile-menu"]').click();
  const list = page.getByTestId("language-list");
  await expect(list).toBeInViewport();
  await expect(list.getByRole("link")).toHaveText(LABELS);
  await screenshot(page, "i18n-mobile-menu-en");
  await list.getByRole("link", { name: "Papiamento" }).click();
  await expect(page).toHaveURL(/\/pap\/team$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pap");
  await context.close();
});

test("mobile layout: no horizontal scrolling in any language", async ({ browser }) => {
  test.setTimeout(240_000);
  const context = await browser.newContext({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const overflowing: string[] = [];
  for (const locale of locales) {
    for (const route of KEY_ROUTES) {
      const path = localizePath(route, locale);
      await page.goto(path);
      const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      if (scroll > client + 1) overflowing.push(`${path} (${scroll}px > ${client}px)`);
    }
  }
  expect(overflowing).toEqual([]);
  await context.close();
});

test.describe("language screenshots", () => {
  for (const locale of locales) {
    test(`${locale}: home on desktop and mobile`, async ({ page, browser }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(localizePath("/", locale));
      await page.waitForTimeout(1200);
      await screenshot(page, `i18n-${locale}-home-desktop`);

      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
      const mobile = await context.newPage();
      await mobile.goto(localizePath("/treatments/porcelain-veneers", locale as Locale));
      await scrollThrough(mobile);
      await screenshot(mobile, `i18n-${locale}-treatment-mobile`, true);
      await mobile.locator('button[aria-controls="mobile-menu"]').click();
      await mobile.waitForTimeout(600);
      await screenshot(mobile, `i18n-${locale}-mobile-menu`);
      await context.close();
    });
  }
});


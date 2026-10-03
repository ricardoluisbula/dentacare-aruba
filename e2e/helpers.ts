import fs from "node:fs";
import path from "node:path";
import type { Page } from "@playwright/test";
import { TREATMENT_PAGE_SLUGS } from "../src/lib/treatmentSlugs";
import { locales, localizePath, stripLocale, type Locale } from "../src/lib/i18n/routing";

export { locales, type Locale };

/** Every public route the draft publishes, in its unprefixed form. */
export const DRAFT_ROUTES = [
  "/",
  "/about",
  "/smile-gallery",
  "/treatments",
  ...TREATMENT_PAGE_SLUGS.map((slug) => `/treatments/${slug}`),
  "/prevention-hygiene",
  "/team",
  "/reviews",
  "/contact",
  "/new-patients",
  "/pricing-info",
  "/privacy",
  "/cookies",
];

/** The confirmed Aruba contact links -- the only outbound contact links allowed. */
export const WHATSAPP_URL = "https://wa.me/31645094057";
export const INSTAGRAM_URL = "https://www.instagram.com/Dentacareosdorp/";

/**
 * Text that belongs to the Amsterdam (Osdorp) practice and must never appear
 * in the Aruba draft. Matched case-insensitively against the served HTML,
 * after removing the confirmed exceptions below.
 */
export const FORBIDDEN_TEXT = [
  "osdorp",
  "amsterdam",
  "calandlaan",
  "1068",
  "619 9397",
  "6199397",
  "45495419",
  "dentacareosdorp@hotmail",
  "since 2009",
  "sinds 2009",
  "mondcheck",
  "€",
];

/** Every published route in every language: [unprefixed route, localized URL path]. */
export const ALL_LOCALIZED_ROUTES: { locale: Locale; route: string; path: string }[] = locales.flatMap((locale) =>
  DRAFT_ROUTES.map((route) => ({ locale, route, path: localizePath(route, locale) }))
);

/** The language-independent route of a URL path ("/nl/team" -> "/team"). */
export const baseRoute = (path: string) => stripLocale(path).path;

/**
 * Confirmed exceptions: the shared Instagram profile (its handle contains
 * "osdorp"), and the dentist's own verified experience in Amsterdam since
 * 2009 -- in any language ("in Amsterdam since 2009", "sinds 2009 in
 * Amsterdam", "desde 2009 en Amsterdam", ...). Only that pairing of
 * Amsterdam with 2009 is removed; any other mention still fails. The exact
 * phrases are pinned per language in src/lib/draft.test.ts.
 *
 * The phrase is checked on every page, not just /team: each page's HTML
 * carries the active language's dictionary (including the team biography)
 * as data for the client, even where the biography is not shown.
 */
export function stripAllowed(html: string, path: string): string {
  void path;
  return html
    .toLowerCase()
    .split("instagram.com/dentacareosdorp")
    .join("")
    .split("@dentacareosdorp")
    .join("")
    .replace(/amsterdam.{0,40}?2009|2009.{0,40}?amsterdam/g, "");
}

/** The privacy contact: allowed only on the policy pages, never as a booking contact. */
export const PRIVACY_EMAIL = "Dentacare@hotmail.com";
export const POLICY_ROUTES = ["/privacy", "/cookies"];

/** True for any link that could contact a clinic other than through the confirmed channels. */
export function isForbiddenHref(href: string, route = ""): boolean {
  if (href === `mailto:${PRIVACY_EMAIL}` && POLICY_ROUTES.includes(baseRoute(route || "/"))) return false;
  if (/^(tel:|mailto:|sms:)/i.test(href)) return true;
  if (/wa\.me|whatsapp\.com/i.test(href)) return !href.startsWith(`${WHATSAPP_URL}?`) && href !== WHATSAPP_URL;
  if (/instagram\.com/i.test(href)) return href !== INSTAGRAM_URL;
  if (/google\.[a-z.]+\/maps/i.test(href)) return !href.includes("Morgenster%2035C%2C%20Aruba");
  return false;
}

const SCREENSHOT_DIR = path.join(process.cwd(), "playwright-screenshots");

export async function screenshot(page: Page, name: string, fullPage = false) {
  const file = path.join(SCREENSHOT_DIR, `${name}.png`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file, fullPage });
}

/** Scrolls to the bottom in steps so every scroll-triggered reveal has played before a capture. */
export async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

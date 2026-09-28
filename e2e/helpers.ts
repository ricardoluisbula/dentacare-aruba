import fs from "node:fs";
import path from "node:path";
import type { Page } from "@playwright/test";
import { TREATMENT_PAGE_SLUGS } from "../src/lib/treatmentSlugs";

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
  "hotmail",
  "since 2009",
  "sinds 2009",
  "mondcheck",
  "€",
];

/**
 * Confirmed exceptions: the shared Instagram profile (its handle contains
 * "osdorp"), and -- on the team page only -- the dentist's own verified
 * experience in Amsterdam.
 */
export function stripAllowed(html: string, route: string): string {
  let out = html.toLowerCase().split("instagram.com/dentacareosdorp").join("").split("@dentacareosdorp").join("");
  if (route === "/team") {
    out = out.split("practised dentistry in amsterdam since 2009").join("").split("practising dentistry in amsterdam since 2009").join("");
  }
  return out;
}

/** True for any link that could contact a clinic other than through the confirmed channels. */
export function isForbiddenHref(href: string): boolean {
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

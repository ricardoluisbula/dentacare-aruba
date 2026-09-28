import fs from "node:fs";
import path from "node:path";
import type { Page } from "@playwright/test";

/** Every route the draft publishes, in its unprefixed form. */
export const DRAFT_ROUTES = [
  "/",
  "/about",
  "/smile-gallery",
  "/treatments",
  "/prevention-hygiene",
  "/team",
  "/reviews",
  "/contact",
  "/new-patients",
  "/pricing-info",
  "/privacy",
  "/cookies",
];

/**
 * Text that belongs to the Amsterdam (Osdorp) practice and must never appear
 * in the Aruba draft -- its identity, address, numbers, email, social handle
 * and "since 2009" claim. Matched case-insensitively against the served HTML.
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
];

/** Link schemes/hosts that would contact a clinic -- none may exist in the draft. */
export const FORBIDDEN_HREF = /^(tel:|mailto:|sms:)|wa\.me|whatsapp\.com|google\.[a-z.]+\/maps|instagram\.com/i;

const SCREENSHOT_DIR = path.join(process.cwd(), "playwright-screenshots");

export async function screenshot(page: Page, name: string, fullPage = false) {
  const file = path.join(SCREENSHOT_DIR, `${name}.png`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file, fullPage });
}

import { expect, test, type Page } from "@playwright/test";
import { dayNumber, formatDateRange, todayInAruba } from "../src/lib/availability/dates";
import { screenshot, scrollThrough } from "./helpers";

/**
 * The private dates editor, end to end: it is protected, entries can be
 * added, edited and removed, and the public pages show them (and show the
 * "will be announced" message when there are none).
 *
 * Runs serially against a throwaway data file with credentials generated for
 * this run only (see playwright.config.ts).
 */
test.describe.configure({ mode: "serial" });

const PASSWORD = process.env.E2E_ADMIN_PASSWORD!;

/** "YYYY-MM-DD", `days` after today in Aruba. */
function arubaDate(days: number): string {
  const n = dayNumber(todayInAruba())! + days;
  return new Date(n * 86_400_000).toISOString().slice(0, 10);
}

const A = { start: arubaDate(7), end: arubaDate(11) };
const B = arubaDate(20);
const C = arubaDate(40);
const C2 = arubaDate(41);

async function signIn(page: Page) {
  await page.goto("/admin/login");
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Dates in Aruba" })).toBeVisible();
}

/**
 * Starts every run from an empty calendar by removing leftover entries
 * THROUGH THE EDITOR, which (like any real change) refreshes the cached
 * public pages. Deleting the data file directly would leave those pages
 * showing the previous run's dates until their hourly refresh.
 */
async function removeAllDates(page: Page) {
  await signIn(page);
  page.on("dialog", (dialog) => dialog.accept());
  const remove = page.getByRole("button", { name: /^Remove/ });
  while ((await remove.count()) > 0) {
    const before = await remove.count();
    await remove.first().click();
    await expect(remove).toHaveCount(before - 1);
  }
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/admin\/login$/);
}

/** Submits the add form and waits for the new entry to be listed -- not just for a status message, which may still be showing from the previous add. */
async function addDates(page: Page, start: string, end = start) {
  const add = page.locator("section", { has: page.getByRole("heading", { name: "Add dates" }) });
  await add.getByRole("button", { name: "Add dates" }).click();
  await expect(page.locator("li", { hasText: formatDateRange(start, end) })).toBeVisible();
  await expect(add.getByRole("status")).toHaveText("Dates added.");
}

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  await removeAllDates(page);
  await page.close();
});

test("the editor is protected and never indexed", async ({ page }) => {
  const res = await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login$/);
  expect(res?.headers()["x-robots-tag"]).toContain("noindex");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

  await page.getByLabel("Password").fill("not-the-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.locator("form").getByRole("alert")).toHaveText(/not correct/);
  await expect(page).toHaveURL(/\/admin\/login$/);

  await page.setViewportSize({ width: 1280, height: 800 });
  await screenshot(page, "admin-login");
});

test("with no dates, the public pages say dates will be announced", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/contact");
  await expect(page.getByText("Upcoming dates will be announced")).toBeVisible();
  await page.goto("/");
  const section = page.locator("#aruba-dates");
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByText("Upcoming dates will be announced")).toBeVisible();
  await page.waitForTimeout(900);
  await section.screenshot({ path: "playwright-screenshots/home-dates-empty.png" });
});

test("dates can be added, edited and removed", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await signIn(page);
  await screenshot(page, "admin-empty", true);

  const add = page.locator("section", { has: page.getByRole("heading", { name: "Add dates" }) });

  // A: a range with daily hours.
  await add.getByLabel("First date").fill(A.start);
  await add.getByLabel(/Last date/).fill(A.end);
  await add.getByLabel(/From/).fill("09:00");
  await add.getByLabel(/Until/).fill("17:00");
  await addDates(page, A.start, A.end);

  // B: one day, hours not fixed yet.
  await add.getByLabel("First date").fill(B);
  await addDates(page, B);

  // Overlapping dates are refused.
  await add.getByLabel("First date").fill(A.end);
  await add.getByRole("button", { name: "Add dates" }).click();
  await expect(add.getByRole("alert")).toHaveText(/overlap/);

  // C: added, then edited, then removed.
  await add.getByLabel("First date").fill(C);
  await addDates(page, C);

  const rowC = page.locator("li", { hasText: formatDateRange(C, C) });
  await rowC.getByRole("button", { name: /^Edit/ }).click();
  await rowC.getByLabel(/Last date/).fill(C2);
  await rowC.getByRole("button", { name: "Save changes" }).click();
  const rowC2 = page.locator("li", { hasText: formatDateRange(C, C2) });
  await expect(rowC2).toBeVisible();

  await screenshot(page, "admin-with-dates", true);

  page.once("dialog", (dialog) => dialog.accept());
  await rowC2.getByRole("button", { name: /^Remove/ }).click();
  await expect(rowC2).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Upcoming \(2\)/ })).toBeVisible();

  // Editing form on mobile.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator("li", { hasText: formatDateRange(B, B) }).getByRole("button", { name: /^Edit/ }).click();
  await page.waitForTimeout(300);
  await screenshot(page, "admin-mobile-editing", true);
});

test("the public pages show the confirmed dates in Aruba time", async ({ page, browser }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/contact");
  const dates = page.getByRole("list", { name: "Upcoming dates in Aruba" });
  await expect(dates.getByText(formatDateRange(A.start, A.end))).toBeVisible();
  await expect(dates.getByText("09:00 – 17:00")).toBeVisible();
  await expect(dates.getByText(formatDateRange(B, B))).toBeVisible();
  await expect(dates.getByText("Hours to be confirmed")).toBeVisible();
  await expect(page.getByText(formatDateRange(C, C2))).toHaveCount(0);
  await scrollThrough(page);
  await screenshot(page, "desktop-contact-full", true);

  // The same Aruba dates, with day and month names in each language; times
  // stay in Aruba time.
  for (const locale of ["nl", "es", "pap"] as const) {
    await page.goto(`/${locale}/contact`);
    const list = page.locator("#aruba-dates ul").first();
    await expect(list.getByText(formatDateRange(A.start, A.end, locale))).toBeVisible();
    await expect(list.getByText("09:00 – 17:00")).toBeVisible();
    await expect(list.getByText(formatDateRange(B, B, locale))).toBeVisible();
    await expect(page.locator("#aruba-dates").getByText(/UTC−4/)).toBeVisible();
    await page.locator("#aruba-dates").scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await page.locator("#aruba-dates").screenshot({ path: `playwright-screenshots/i18n-${locale}-contact-dates.png` });
  }

  await page.goto("/");
  const section = page.locator("#aruba-dates");
  await section.scrollIntoViewIfNeeded();
  await expect(section.getByText(formatDateRange(A.start, A.end))).toBeVisible();
  await page.waitForTimeout(900);
  await section.screenshot({ path: "playwright-screenshots/home-dates-desktop.png" });

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const m = await mobile.newPage();
  await m.goto("/");
  await scrollThrough(m);
  await screenshot(m, "mobile-home-full", true);
  await m.goto("/contact");
  await scrollThrough(m);
  await screenshot(m, "mobile-contact-full", true);
  await mobile.close();
});

test("signing out ends the session", async ({ page }) => {
  await signIn(page);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/admin\/login$/);
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login$/);
});

import { randomBytes } from "node:crypto";
import path from "node:path";
import { defineConfig } from "@playwright/test";

/**
 * End-to-end draft guards (noindex, no Amsterdam details, no contact links)
 * and the desktop/mobile review screenshots -- see e2e/draft.spec.ts.
 *
 * Runs against the production build (`npm run build` first), served on its
 * own port so it never collides with a dev server on 3000. Uses the Chrome
 * already installed on the machine (`channel: "chrome"`), so no separate
 * browser download is needed; run `npx playwright install chromium` and drop
 * the channel if Chrome is not installed.
 *
 * Screenshots the tests capture on purpose
 * are written to
 * `playwright-screenshots/`, which is git-ignored.
 */
const PORT = 3100;

/**
 * Throwaway credentials and data file for the dates-editor tests, generated
 * fresh on every run -- never stored anywhere. Set on process.env so the test
 * workers (which inherit it) can sign in, and passed to the server below.
 */
process.env.E2E_ADMIN_PASSWORD ??= randomBytes(18).toString("base64url");
process.env.E2E_SESSION_SECRET ??= randomBytes(36).toString("base64url");
process.env.E2E_AVAILABILITY_FILE ??= path.join(process.cwd(), ".data", "e2e-availability.json");

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  workers: 4,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: "chrome",
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    // A fresh server every run, so it always has this run's credentials.
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      ADMIN_PASSWORD: process.env.E2E_ADMIN_PASSWORD,
      ADMIN_SESSION_SECRET: process.env.E2E_SESSION_SECRET,
      AVAILABILITY_FILE: process.env.E2E_AVAILABILITY_FILE,
    },
  },
});

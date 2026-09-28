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
    reuseExistingServer: true,
    timeout: 120_000,
  },
});

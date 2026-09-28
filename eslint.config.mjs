import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Message shown when a file imports `next/link` directly.
 *
 * Internal hrefs are written in their locale-independent form ("/contact")
 * throughout the codebase. `LocaleLink` resolves them against the language
 * currently being read, so the same href renders as "/contact" in Dutch and
 * "/es/contact" in Spanish. A raw `next/link` skips that resolution and
 * silently drops a Spanish or Italian visitor back onto the Dutch site --
 * a bug that type-checks, builds, renders, and only shows up if someone
 * happens to click that link while browsing in another language.
 */
const NEXT_LINK_MESSAGE =
  "Import { LocaleLink as Link } from '@/components/ui/LocaleLink' instead. " +
  "A raw next/link ignores the active locale and sends non-Dutch visitors back to the Dutch site. " +
  "Only src/components/ui/LocaleLink.tsx may import next/link directly.";

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // public/** holds vendored, third-party assets served as-is (the MondCheck
    // tool's own script); linting someone else's build output only adds noise.
    // Playwright's generated report, traces and screenshots are build output too.
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "assets-source/**",
      "public/**",
      "playwright-report/**",
      "test-results/**",
      "playwright-screenshots/**",
    ],
  },
  {
    // Everything under src/ ...
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "next/link", message: NEXT_LINK_MESSAGE },
            // The type-only entry point is the same module; ban it too so the
            // rule cannot be sidestepped with `import type`.
            { name: "next/dist/client/link", message: NEXT_LINK_MESSAGE },
          ],
        },
      ],
    },
  },
  {
    // ... except LocaleLink itself, which is the one place that is supposed to
    // wrap next/link. Listed last so it overrides the block above.
    files: ["src/components/ui/LocaleLink.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
];

export default eslintConfig;

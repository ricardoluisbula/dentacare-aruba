/**
 * Every treatment page URL segment ("/treatments/<slug>"), as a plain list
 * that edge code (the middleware) can use without pulling in the long-form
 * page content. treatmentSlugs.test.ts keeps it identical to the pages that
 * exist: the generic `[slug]` pages plus the hand-built emergency page.
 */
export const TREATMENT_PAGE_SLUGS = [
  "porcelain-veneers",
  "composite-restorations",
  "dental-crowns-bridges",
  "dental-implants",
  "clear-aligners",
  "root-canal-therapy",
  "night-guards",
  "emergency-aesthetic-dentistry",
] as const;

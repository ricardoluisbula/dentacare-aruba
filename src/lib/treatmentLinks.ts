import { treatments } from "@/data/treatments";
import { beforeAfterCases, type TreatmentCategory } from "@/data/beforeAfterCases";
import { PREVENTION_PATH } from "@/lib/redirects";

/**
 * How the treatments hub distributes the catalogue across its two sections.
 *
 * Both arrays live here rather than inside the hub component so the routing
 * they imply is testable without rendering React, and so a treatment can never
 * be added to `treatments.ts` and silently left off the hub.
 * `hubCoversEveryTreatment` and treatmentLinks.test.ts fail the build if that
 * regresses.
 */
// One slug from each broad category (cosmetic, restorative, emergency,
// preventive).
export const FEATURED_SLUGS = [
  "composite-restorations",
  "dental-implants",
  "emergency-aesthetic-dentistry",
  "preventive-care",
] as const;

// night-guards sits directly after crowns & bridges: it is the protective
// counterpart to restorative work. The hub also gives it a highlighted
// spotlight card (NightGuardSpotlight).
export const REMAINING_SLUGS = [
  "porcelain-veneers",
  "clear-aligners",
  "root-canal-therapy",
  "dental-crowns-bridges",
  "night-guards",
] as const;

/** Every slug the hub presents, in the order a visitor meets them. */
export const HUB_SLUGS = [...FEATURED_SLUGS, ...REMAINING_SLUGS];

/**
 * The slug literals, as a union. Lets per-treatment lookups -- the link
 * labels especially -- be checked at compile time: adding a treatment without
 * giving it link text is a build error, not a blank anchor in production.
 */
export type TreatmentSlug = (typeof HUB_SLUGS)[number];

/**
 * The information page for a treatment -- always the treatment's own page,
 * never `/contact`. Preventive care's information page is `/prevention-hygiene`.
 *
 * Returned locale-independent; `LocaleLink` resolves it against the language
 * being read.
 */
export function treatmentDetailPath(slug: string): string {
  if (slug === "preventive-care") return PREVENTION_PATH;
  return `/treatments/${slug}`;
}

/** True when the hub presents every treatment in the catalogue exactly once. */
export function hubCoversEveryTreatment(): boolean {
  const catalogue = treatments.map((t) => t.slug).sort();
  const hub = [...HUB_SLUGS].sort();
  return catalogue.length === hub.length && catalogue.every((slug, i) => slug === hub[i]);
}

/**
 * The treatment page a Smile Gallery case links to, by the case's category.
 * Ported from the reference site.
 *
 * Smile rehabilitation has no entry on purpose: those cases combine several
 * treatments, and pointing them at any single one of them would misdescribe
 * what was done.
 */
export const GALLERY_CATEGORY_TREATMENT: Partial<Record<TreatmentCategory, TreatmentSlug>> = {
  veneers: "porcelain-veneers",
  crowns: "dental-crowns-bridges",
  "composite-bonding": "composite-restorations",
  emergency: "emergency-aesthetic-dentistry",
};

/** Hash prefix the Smile Gallery grid reads to open with one category selected. */
export const GALLERY_FILTER_HASH_PREFIX = "results-";

/** The Smile Gallery, opened on one treatment category's cases. */
export function galleryResultsPath(category: TreatmentCategory): string {
  return `/smile-gallery#${GALLERY_FILTER_HASH_PREFIX}${category}`;
}

/**
 * The gallery category whose cases a treatment page may link to as "see
 * results" -- only when the gallery grid actually shows at least one case in
 * that category (the featured case sits outside the grid), so the link never
 * leads to an empty filter.
 */
export function galleryCategoryForTreatment(slug: string): TreatmentCategory | undefined {
  const entry = (Object.entries(GALLERY_CATEGORY_TREATMENT) as [TreatmentCategory, TreatmentSlug][]).find(
    ([, treatmentSlug]) => treatmentSlug === slug
  );
  if (!entry) return undefined;
  const [category] = entry;
  const hasCase = beforeAfterCases.some((item) => !item.featured && item.treatmentCategories.includes(category));
  return hasCase ? category : undefined;
}

/**
 * The stable anchor of the "What is teeth grinding?" definition on the night
 * guard page. Kept here (not in the page content) so linking to it never pulls
 * the page's long-form copy into another page's bundle.
 */
export const TEETH_GRINDING_ANCHOR = "what-is-teeth-grinding";

/** The night guard page, scrolled to its teeth-grinding definition. */
export const TEETH_GRINDING_PATH = `${treatmentDetailPath("night-guards")}#${TEETH_GRINDING_ANCHOR}`;

/**
 * Other treatment pages a detail page links to under "See also".
 *
 * Deliberately sparse: an entry exists only where the connection is clinical,
 * not promotional, and the page's own copy already names it. Restorations that
 * grinding can damage point to the night guard, and the night guard points back
 * to the restorative work it protects. Crowns & bridges links to implants (its
 * FAQ weighs an implant against a bridge) and to root canal treatment (a crown
 * often protects a tooth afterwards), and both link back.
 * Clear aligners intentionally have no entry -- the orthodontic retainer after
 * aligners is not a night guard, and linking the two would suggest otherwise.
 */
export const RELATED_TREATMENT_SLUGS: Partial<Record<TreatmentSlug, readonly TreatmentSlug[]>> = {
  "porcelain-veneers": ["night-guards"],
  "dental-crowns-bridges": ["dental-implants", "root-canal-therapy", "night-guards"],
  "dental-implants": ["dental-crowns-bridges"],
  "root-canal-therapy": ["dental-crowns-bridges"],
  "composite-restorations": ["night-guards"],
  "night-guards": ["dental-crowns-bridges", "composite-restorations"],
};

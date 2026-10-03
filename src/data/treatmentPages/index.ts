import type { TreatmentPageContent } from "./types";
import { porcelainVeneers } from "./porcelainVeneers";
import { compositeRestorations } from "./compositeRestorations";
import { crownsBridges } from "./crownsBridges";
import { dentalImplants } from "./dentalImplants";
import { clearAligners } from "./clearAligners";
import { rootCanal } from "./rootCanal";
import { nightGuards } from "./nightGuards";

export type { TreatmentPageContent, TreatmentPageSection } from "./types";

/**
 * Long-form detail-page content, keyed by the same slug used in
 * `src/data/treatments.ts` and in the URL.
 *
 * `emergency-aesthetic-dentistry` is deliberately absent: it has its own
 * hand-built page at `src/app/[locale]/treatments/emergency-aesthetic-dentistry`.
 * A static route wins over the dynamic `[slug]` one in Next.js, and
 * `generateStaticParams` only lists the slugs below, so the two never both
 * claim the same URL.
 *
 * `preventive-care` is absent too: prevention has one page,
 * `/prevention-hygiene`, which renders the unique parts of that content
 * (src/data/treatmentPages/preventiveCare.ts) itself.
 */
export const treatmentPages: Record<string, TreatmentPageContent> = {
  "porcelain-veneers": porcelainVeneers,
  "composite-restorations": compositeRestorations,
  "dental-crowns-bridges": crownsBridges,
  "dental-implants": dentalImplants,
  "clear-aligners": clearAligners,
  "root-canal-therapy": rootCanal,
  "night-guards": nightGuards,
};

/** The slugs served by the generic `[slug]` treatment route. */
export const genericTreatmentSlugs = Object.keys(treatmentPages);

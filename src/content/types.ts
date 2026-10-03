import type { Treatment } from "@/data/treatments";
import type { BeforeAfterCase } from "@/data/beforeAfterCases";
import type { TreatmentPageContent } from "@/data/treatmentPages/types";
import type { Policy } from "@/data/policies";

/**
 * Translatable content that lives outside the UI dictionaries.
 *
 * The English source is the existing data in src/data/ (src/content/en/*
 * derives from it, so there is one source of truth). Each other language
 * supplies the same shapes in src/content/<locale>/. Only TEXT is translated
 * here -- slugs, icons, images, categories and layout data always come from
 * the English data, so a translation can never point at a different photo or
 * page. src/content/content.test.ts checks every language has exactly the
 * same keys and list lengths as English.
 */

/** The translatable text of one treatment (keyed by slug). */
export type TreatmentText = Pick<Treatment, "name" | "summary" | "description" | "whoFor"> & {
  expandedDescription?: string;
};

/** The translatable text of one before-and-after case (keyed by case id). */
export type CaseText = Pick<BeforeAfterCase, "title" | "description" | "beforeAlt" | "afterAlt">;

/**
 * Short text used across many pages and client components. Bundled for all
 * languages (it is small); see src/content/shared.ts.
 */
export type SharedContent = {
  treatments: Record<string, TreatmentText>;
  cases: Record<string, CaseText>;
};

/**
 * Long, page-specific text. Read on the server for the requested language
 * only and passed to the page, so visitors never download other languages'
 * long text; see src/content/pages.ts.
 */
export type PageContent = {
  /** Detail-page content keyed by treatment slug (the generic /treatments/[slug] pages). */
  treatmentPages: Record<string, TreatmentPageContent>;
  /** The Prevention & Hygiene page's reused treatment content. */
  preventiveCare: TreatmentPageContent;
  policies: { privacy: Policy; cookies: Policy };
};

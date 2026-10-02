import { treatments, type Treatment } from "@/data/treatments";
import { beforeAfterCases, type BeforeAfterCase } from "@/data/beforeAfterCases";
import type { Locale } from "@/lib/i18n/routing";
import type { SharedContent } from "./types";
import en from "./en/shared";
import nl from "./nl/shared";
import es from "./es/shared";
import pap from "./pap/shared";

/**
 * Shared, short translated text (treatment names/summaries, case captions).
 * Safe to use from client components; small enough to bundle every language.
 * Text missing in a translation falls back to English (and fails
 * src/content/content.test.ts). Non-text fields always come from src/data/.
 */
const SHARED: Record<Locale, SharedContent> = { en, nl, es, pap };

export function localizeTreatment(treatment: Treatment, locale: Locale): Treatment {
  return { ...treatment, ...SHARED[locale].treatments[treatment.slug] };
}

export function localizedTreatments(locale: Locale): Treatment[] {
  return treatments.map((t) => localizeTreatment(t, locale));
}

export function localizedTreatment(slug: string, locale: Locale): Treatment {
  const treatment = treatments.find((t) => t.slug === slug);
  if (!treatment) throw new Error(`Unknown treatment slug "${slug}"`);
  return localizeTreatment(treatment, locale);
}

export function localizedCases(locale: Locale): BeforeAfterCase[] {
  return beforeAfterCases.map((c) => ({ ...c, ...SHARED[locale].cases[c.id] }));
}

export function sharedContent(locale: Locale): SharedContent {
  return SHARED[locale];
}

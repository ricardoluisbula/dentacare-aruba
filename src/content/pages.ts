import type { Locale } from "@/lib/i18n/routing";
import type { PageContent } from "./types";
import en from "./en/pages";
import nl from "./nl/pages";
import es from "./es/pages";
import pap from "./pap/pages";

/**
 * Long, page-specific translated text. SERVER-SIDE ONLY: import this from
 * page.tsx files (server components) and pass the result to the page's
 * client component as a prop, so a visitor only ever downloads the language
 * they are reading. Never import it from a "use client" module.
 */
const PAGES: Record<Locale, PageContent> = { en, nl, es, pap };

export function getTreatmentPageContent(slug: string, locale: Locale) {
  return PAGES[locale].treatmentPages[slug] ?? en.treatmentPages[slug];
}

export function getPreventiveCare(locale: Locale) {
  return PAGES[locale].preventiveCare;
}

export function getPolicy(kind: "privacy" | "cookies", locale: Locale) {
  return PAGES[locale].policies[kind];
}

export function pageContent(locale: Locale): PageContent {
  return PAGES[locale];
}

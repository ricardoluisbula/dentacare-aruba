import { siteConfig } from "@/lib/site";
import { getDictionary } from "./getDictionary";
import type { Dictionary } from "./dictionaries/en";
import type { Locale } from "./routing";

/**
 * Every public page's `<title>` and meta description.
 *
 * ARUBA DRAFT: derived from each placeholder page's own dictionary copy, so a
 * title can never promise more than the page says. Every title carries
 * "(Draft)". When real content lands, give each route hand-written,
 * search-ready copy here again (the reference site's Amsterdam titles and
 * "since 2009" descriptions were deliberately not carried over).
 */
export type PageMetaEntry = { title: string; description: string };

/** Route -> the placeholder page whose copy describes it. */
export const PAGE_KEY_BY_ROUTE: Record<string, keyof Dictionary["pages"]> = {
  "/about": "about",
  "/smile-gallery": "smileGallery",
  "/treatments": "treatments",
  "/prevention-hygiene": "preventionHygiene",
  "/team": "team",
  "/reviews": "reviews",
  "/contact": "contact",
  "/new-patients": "newPatients",
  "/pricing-info": "pricingInfo",
  "/privacy": "privacy",
  "/cookies": "cookies",
};

export function getPageMeta(path: string, locale: Locale): PageMetaEntry {
  const t = getDictionary(locale);

  if (path === "/") {
    return { title: `${siteConfig.name} (Draft)`, description: siteConfig.description };
  }

  const key = PAGE_KEY_BY_ROUTE[path];
  if (!key) {
    throw new Error(`No metadata registered for route "${path}" (src/lib/i18n/pageMeta.ts)`);
  }
  const page = t.pages[key];
  return { title: `${page.title} | ${siteConfig.name} (Draft)`, description: page.description };
}

import { siteConfig } from "@/lib/site";
import { getDictionary } from "./getDictionary";
import type { Dictionary } from "./dictionaries/en";
import type { Locale } from "./routing";

/**
 * Every public page's `<title>` and meta description.
 *
 * Derived from each page's own dictionary copy, so a title can never promise
 * more than the page says. Titles no longer carry "(Draft)"; the site stays
 * out of search engines through SITE_IS_DRAFT (src/lib/site.ts) instead. Give
 * routes hand-written, search-ready copy here before indexing is switched on
 * (the reference site's Amsterdam titles were deliberately not carried over).
 */
export type PageMetaEntry = { title: string; description: string };

/**
 * Route -> the dictionary page entry whose copy describes it. Treatment and
 * prevention routes build their own metadata from en.treatments.ts; the Smile
 * Gallery has hand-written metadata in en.gallery.ts.
 */
export const PAGE_KEY_BY_ROUTE: Record<string, keyof Dictionary["pages"]> = {
  "/about": "about",
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
    return { title: siteConfig.name, description: siteConfig.description };
  }

  if (path === "/smile-gallery") {
    return { title: t.smileGalleryMeta.title, description: t.smileGalleryMeta.description };
  }

  const key = PAGE_KEY_BY_ROUTE[path];
  if (!key) {
    throw new Error(`No metadata registered for route "${path}" (src/lib/i18n/pageMeta.ts)`);
  }
  const page = t.pages[key];
  return { title: `${page.title} | ${siteConfig.name}`, description: page.description };
}

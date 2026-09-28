import type { Metadata } from "next";
import { SITE_IS_DRAFT, siteConfig } from "@/lib/site";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALIZED_ROUTE_LOCALES,
  OG_LOCALE,
  localizePath,
  locales,
  type Locale,
} from "@/lib/i18n/routing";

/** The languages a route is actually published in -- all of them unless it says otherwise. */
export function publishedLocales(path: string): readonly Locale[] {
  return LOCALIZED_ROUTE_LOCALES[path] ?? locales;
}

/** Absolute URL for a locale-independent route in a specific language. */
export function absoluteUrl(path: string, locale: Locale): string {
  return `${siteConfig.url}${localizePath(path, locale)}`;
}

/**
 * The `alternates` block for one page: a self-referencing canonical plus a
 * complete `hreflang` cluster.
 *
 * Every language's version of a page declares the same set of alternates,
 * including itself -- which is what Google requires before it will treat the
 * URLs as one page in several languages rather than competing pages.
 * `x-default` points at the default language, served from the unprefixed
 * root. A route published in only some languages (LOCALIZED_ROUTE_LOCALES)
 * lists just those.
 */
export function buildAlternates(path: string, locale: Locale): Metadata["alternates"] {
  const published = publishedLocales(path);
  const languages: Record<string, string> = {};
  for (const l of published) {
    languages[HTML_LANG[l]] = absoluteUrl(path, l);
  }
  languages["x-default"] = absoluteUrl(path, published.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : published[0]);

  return { canonical: absoluteUrl(path, locale), languages };
}

/**
 * Assembles a page's full metadata from one localized title/description pair.
 *
 * `title` is always absolute: every page states its own complete title rather
 * than inheriting the root template, so the Open Graph and Twitter blocks can
 * reuse the identical string instead of drifting from the `<title>`.
 */
export function buildPageMetadata({
  path,
  locale,
  title,
  description,
  image = "/og-image.jpg",
  index = true,
}: {
  path: string;
  locale: Locale;
  title: string;
  description: string;
  image?: string;
  /** Set false for pages that must stay out of the index (and out of sitemap.ts). */
  index?: boolean;
}): Metadata {
  const url = absoluteUrl(path, locale);

  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates(path, locale),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: publishedLocales(path)
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    // ARUBA DRAFT: every page is noindex while SITE_IS_DRAFT is on.
    ...(index && !SITE_IS_DRAFT ? {} : { robots: { index: false, follow: false } }),
  };
}

import type { MetadataRoute } from "next";
import { SITE_IS_DRAFT } from "@/lib/site";
import { HTML_LANG, DEFAULT_LOCALE } from "@/lib/i18n/routing";
import { absoluteUrl, publishedLocales } from "@/lib/seo";

/**
 * Every indexable route, in its locale-independent form.
 *
 * A route belongs here if and only if its page is indexable. While
 * SITE_IS_DRAFT is on, no page is, so the sitemap is empty. Add routes here as
 * their real (non-placeholder) content is published.
 */
const INDEXABLE_ROUTES: string[] = [];

/**
 * `lastModified` is deliberately omitted: an absent value is better than a
 * fabricated one. Add real per-route dates only if they are ever derived from
 * actual content changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (SITE_IS_DRAFT) return [];

  return INDEXABLE_ROUTES.flatMap((route) => {
    const published = publishedLocales(route);
    const languages = Object.fromEntries(
      published.map((locale) => [HTML_LANG[locale], absoluteUrl(route, locale)])
    );
    const fallback = published.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : published[0];

    return published.map((locale) => ({
      url: absoluteUrl(route, locale),
      changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "" ? 1 : 0.7,
      alternates: {
        languages: { ...languages, "x-default": absoluteUrl(route, fallback) },
      },
    }));
  });
}

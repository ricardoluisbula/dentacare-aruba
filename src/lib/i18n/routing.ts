/**
 * Locale routing primitives.
 *
 * Deliberately free of React and of any `siteConfig` import that would drag in
 * browser-only code: this module is imported by `src/middleware.ts`, which runs
 * on the edge runtime, as well as by server components and client components.
 *
 * URL strategy -- the default language owns the unprefixed routes (`/about`,
 * `/contact`, ...); every further language lives under a path prefix
 * (`/es/about`). Each of those routes is a real server-rendered page with its
 * own metadata, so the correct language is in the initial HTML.
 *
 * ARUBA DRAFT: English only for now. Which languages the Aruba site should
 * offer (Papiamento, Dutch, Spanish, ...) has not been decided -- see
 * docs/ARUBA-LAUNCH-CHECKLIST.md. Adding one means a new entry in `locales`,
 * HTML_LANG, OG_LOCALE and LOCALE_LABEL, a dictionary, and a pageMeta column.
 * The language switcher hides itself while only one language exists.
 */

export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

/** The language served from the unprefixed root routes. */
export const DEFAULT_LOCALE: Locale = "en";

/**
 * The languages that carry a URL prefix. This is exactly `locales` minus the
 * default.
 */
export const PREFIXED_LOCALES = locales.filter((l) => l !== DEFAULT_LOCALE) as Exclude<
  Locale,
  typeof DEFAULT_LOCALE
>[];

/**
 * A retired "remembered language" cookie name inherited from the reference
 * site. Nothing sets or reads it; the middleware only deletes it if present.
 */
export const LOCALE_COOKIE = "dentacare-locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The value for `<html lang>`. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
};

/** The value for Open Graph's `og:locale`, which uses underscores. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
};

/** Language names, each written in its own language, for the switcher. */
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
};

/**
 * Routes whose URL segment itself is translated, keyed by the canonical
 * route. Empty in the draft; kept so a translated segment can be added later
 * without touching the routing code.
 */
export const LOCALIZED_ROUTES: Record<string, Partial<Record<Locale, string>>> = {};

/** Languages a translated route is actually published in. Absent = all. */
export const LOCALIZED_ROUTE_LOCALES: Record<string, readonly Locale[]> = {};

/** The localized segment of a canonical route, per language. */
export function localizedSegment(path: string, locale: Locale): string {
  return LOCALIZED_ROUTES[path]?.[locale] ?? path;
}

/** Canonical route for a localized segment, or the segment itself. */
function canonicalRoute(path: string, locale: Locale): string {
  for (const canonical of Object.keys(LOCALIZED_ROUTES)) {
    if (LOCALIZED_ROUTES[canonical][locale] === path) return canonical;
  }
  return path;
}

/**
 * Maps a locale-independent route (always written in its unprefixed form,
 * e.g. "/about") to the actual URL path for `locale`.
 */
export function localizePath(path: string, locale: Locale): string {
  const route = path === "" ? "/" : path;

  // A route published in only some languages links to the language it does
  // exist in, rather than to a URL in the reader's language that only
  // redirects there.
  const published = LOCALIZED_ROUTE_LOCALES[route];
  const target = published && !published.includes(locale) ? published[published.length - 1] : locale;

  const normalized = localizedSegment(route, target);
  if (target === DEFAULT_LOCALE) return normalized;
  return normalized === "/" ? `/${target}` : `/${target}${normalized}`;
}

/**
 * The inverse of {@link localizePath}: splits a pathname into the locale it
 * addresses and the locale-independent route.
 *
 * The default-locale prefix is stripped too, even though it is not a public
 * URL: the middleware rewrites `/about` onto `app/[locale]/about`, so during
 * static prerendering `usePathname()` reports `/<default>/about`. Without
 * stripping it here, the navigation's `aria-current` and active styling would
 * match nothing on default-language pages.
 */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocale(first)) {
    const rest = segments.slice(1).join("/");
    return { locale: first, path: canonicalRoute(rest ? `/${rest}` : "/", first) };
  }

  return { locale: DEFAULT_LOCALE, path: canonicalRoute(pathname || "/", DEFAULT_LOCALE) };
}

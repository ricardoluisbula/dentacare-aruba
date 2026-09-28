/**
 * Request header carrying the language of the URL being served, set by the
 * middleware on every page request. Read by `global-not-found.tsx`, which
 * renders outside the `[locale]` segment and so has no `locale` param of its
 * own. Free of imports so the middleware can use it at the edge.
 */
export const LOCALE_HEADER = "x-dentacare-locale";

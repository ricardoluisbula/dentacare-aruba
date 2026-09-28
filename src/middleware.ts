import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALIZED_ROUTES, isLocale } from "@/lib/i18n/routing";
import { LOCALE_HEADER } from "@/lib/i18n/localeHeader";
import { TREATMENT_PAGE_SLUGS } from "@/lib/treatmentSlugs";

/** Permanent redirect. 308 preserves the request method and body (unlike 301/302). */
const PERMANENT = 308;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // --- 1. Canonical host ---------------------------------------------------
  // ARUBA DRAFT: no canonical-host redirect yet -- the Aruba production
  // domain has not been chosen (see PRODUCTION_URL in src/lib/site.ts). Add
  // the apex -> www redirect here once it is.
  //
  // HTTP -> HTTPS is deliberately NOT done here: Vercel upgrades plain HTTP at
  // its edge before middleware runs, and a redirect on `x-forwarded-proto`
  // loops under `next dev` / `next start`. The Strict-Transport-Security
  // header in next.config.ts covers repeat visits.

  // --- 2. Translated URL segments ------------------------------------------
  // A route may have a translated segment of its own (LOCALIZED_ROUTES; none
  // in the draft). The translated URL is rewritten onto the canonical route
  // folder -- the visitor's URL never changes.
  const firstSegment = pathname.split("/")[1] ?? "";
  const translated = translatedRewrite(pathname);
  if (translated) {
    return withStaleCookieCleared(
      request,
      NextResponse.rewrite(new URL(`${translated}${search}`, request.url), withLocale(request, firstSegment))
    );
  }

  // --- 3. The default-language prefix is not a real URL --------------------
  // Every page lives under the `[locale]` segment internally, but the default
  // language is served from the unprefixed paths. "/en/about" would otherwise
  // render the same page as "/about" on a second URL, so it is permanently
  // redirected to the canonical unprefixed form instead.
  if (firstSegment === DEFAULT_LOCALE) {
    const rest = pathname.slice(`/${DEFAULT_LOCALE}`.length) || "/";
    return withStaleCookieCleared(request, NextResponse.redirect(new URL(`${rest}${search}`, request.url), PERMANENT));
  }

  // --- 3b. Unknown treatment pages ------------------------------------------
  // "/treatments/<anything>" matches the dynamic treatment route; for a
  // rewritten URL Next.js would render the framework's bare error page for an
  // unknown slug. Send it to a path no page claims instead, which Next answers
  // with the site's own 404 (src/app/global-not-found.tsx).
  const locale = isLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
  const route = isLocale(firstSegment) ? pathname.slice(firstSegment.length + 1) || "/" : pathname;
  if (isUnknownTreatment(route)) {
    return withStaleCookieCleared(
      request,
      NextResponse.rewrite(new URL(`/${locale}/__not-found`, request.url), withLocale(request, locale))
    );
  }

  // --- 4. Map unprefixed paths onto the default-language route tree -------
  // A rewrite, not a redirect: the visitor's URL stays "/about" while Next
  // renders `app/[locale]/about` with the default locale. Anything that
  // matches no page lands on the site's own 404 (global-not-found.tsx).
  if (!isLocale(firstSegment)) {
    // `pathname` is "/" for the homepage, which would build "/en/" -- a
    // trailing slash Next does not route.
    const target = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
    return withStaleCookieCleared(
      request,
      NextResponse.rewrite(new URL(`${target}${search}`, request.url), withLocale(request, DEFAULT_LOCALE))
    );
  }

  return withStaleCookieCleared(request, NextResponse.next(withLocale(request, firstSegment)));
}

const TREATMENT_ROUTE = /^\/treatments\/([^/]+)\/?$/;
const KNOWN_TREATMENTS = new Set<string>(TREATMENT_PAGE_SLUGS);

/** "/treatments/<slug>" for a slug that has no page. */
function isUnknownTreatment(route: string): boolean {
  const match = route.match(TREATMENT_ROUTE);
  return Boolean(match && !KNOWN_TREATMENTS.has(match[1]));
}

/**
 * Passes the URL's language on to the page as a request header. Pages under
 * `[locale]` read it from their params; `global-not-found.tsx` -- the 404 for
 * URLs that match no page -- has no params, so this is how it knows the
 * language.
 */
function withLocale(request: NextRequest, locale: string) {
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  return { request: { headers } };
}

/** Deletes a retired "remembered language" cookie if a browser still sends one. */
function withStaleCookieCleared(request: NextRequest, response: NextResponse): NextResponse {
  if (request.cookies.has(LOCALE_COOKIE)) response.cookies.delete(LOCALE_COOKIE);
  return response;
}

/**
 * Maps "/<locale>/<translated segment>" back onto the canonical route folder,
 * or returns null when the path is not a translated one.
 */
function translatedRewrite(pathname: string): string | null {
  const [, first, ...rest] = pathname.split("/");
  if (!isLocale(first) || rest.length !== 1) return null;
  for (const canonical of Object.keys(LOCALIZED_ROUTES)) {
    if (LOCALIZED_ROUTES[canonical][first] === `/${rest[0]}`) return `/${first}${canonical}`;
  }
  return null;
}

export const config = {
  /**
   * Everything except Next.js internals, API routes, the private /admin
   * editor (its own root layout, no language routing), the generated SEO
   * files and static assets served from /public.
   */
  matcher: ["/((?!_next/static|_next/image|api/|admin(?:/|$)|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|txt|xml|webmanifest|js|mjs|css|map|woff|woff2)$).*)"],
};

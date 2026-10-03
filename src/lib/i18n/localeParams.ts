import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./routing";

/** The `params` shape every page and layout under `app/[locale]` receives. */
export type LocaleParams = { params: Promise<{ locale: string }> };

/**
 * Resolves the `[locale]` route param, rejecting anything that is not one of
 * the four supported languages.
 *
 * The dynamic segment matches any single path segment, so "/de/about" and
 * "/typo" both arrive as a "locale". Every page funnels through here so an
 * unknown value produces an honest 404 rather than a page rendered with an
 * undefined dictionary.
 */
export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

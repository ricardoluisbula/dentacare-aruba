"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { localizePath } from "@/lib/i18n/routing";

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
  /**
   * Resolve the href for this language instead of the one being read. Only
   * the language switcher needs it: its links lead to the same page in
   * another language.
   */
  targetLocale?: Parameters<typeof localizePath>[1];
};

/**
 * A drop-in replacement for `next/link` that keeps the visitor in the language
 * they are reading.
 *
 * Internal hrefs are written throughout the codebase in their canonical,
 * locale-independent form ("/treatments", "/contact#form"). This resolves them
 * against the active locale, so the same `href="/contact"` renders as
 * "/contact" on the Dutch site and "/es/contact" on the Spanish one -- without
 * every call site having to know about locales. A visitor who follows a link
 * from a Spanish page lands on a Spanish page.
 *
 * Anything that is not a site-relative path -- an absolute URL, `mailto:`,
 * `tel:`, `wa.me`, or a bare `#anchor` -- is passed through untouched.
 */
export function LocaleLink({ href, targetLocale, ...props }: Props) {
  const { locale } = useTranslation();
  const resolved = href.startsWith("/") ? localizeHref(href, targetLocale ?? locale) : href;

  return <NextLink href={resolved} {...props} />;
}

/**
 * Applies the locale prefix to the path portion only, so a hash or query
 * string survives intact: "/treatments#dental-implants" in Italian becomes
 * "/it/treatments#dental-implants", not "/it/treatments%23dental-implants".
 */
function localizeHref(href: string, locale: Parameters<typeof localizePath>[1]): string {
  const separatorIndex = href.search(/[?#]/);
  if (separatorIndex === -1) return localizePath(href, locale);

  const path = href.slice(0, separatorIndex);
  const suffix = href.slice(separatorIndex);
  // "#section" alone has an empty path -- there is nothing to localize, and
  // localizePath("") would produce a link to the home page instead.
  return path === "" ? href : `${localizePath(path, locale)}${suffix}`;
}

export default LocaleLink;

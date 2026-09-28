import "./globals.css";
import "lenis/dist/lenis.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { siteConfig } from "@/lib/site";
import { fontVariables, siteViewport } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { DEFAULT_LOCALE, HTML_LANG, isLocale, type Locale } from "@/lib/i18n/routing";
import { LOCALE_HEADER } from "@/lib/i18n/localeHeader";
import { NoScriptRevealFallback, SiteBody } from "@/components/layout/SiteBody";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

/**
 * The 404 page for every URL that does not resolve ("/does-not-exist",
 * "/en/typo", "/treatments/unknown").
 *
 * This app's root layout is `[locale]/layout.tsx` -- the document language
 * comes from the URL -- and Next.js cannot server-render a root layout's own
 * not-found boundary. Without this file every 404 was the framework's bare,
 * unstyled "This page could not be found", in English, with no `<html lang>`,
 * navigation or way back. `global-not-found` renders a whole document of its
 * own (enabled by `experimental.globalNotFound` in next.config.ts), so it
 * wears the site's own header, footer and language selector.
 *
 * The language is the one in the URL, passed on by the middleware as a
 * request header; anything unrecognised falls back to the default language, the language of
 * the unprefixed URLs.
 */
async function requestLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER) ?? "";
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await requestLocale());
  return {
    title: `${t.notFound.title} | ${siteConfig.name}`,
    description: t.notFound.description,
    // No robots entry: Next.js already marks every 404 response "noindex",
    // and a second tag would only repeat it.
  };
}

export const viewport: Viewport = siteViewport;

export default async function GlobalNotFound() {
  const locale = await requestLocale();
  return (
    <html lang={HTML_LANG[locale]} suppressHydrationWarning className={fontVariables}>
      <head>
        <NoScriptRevealFallback />
      </head>
      <SiteBody locale={locale} notFound>
        <NotFoundContent />
      </SiteBody>
    </html>
  );
}

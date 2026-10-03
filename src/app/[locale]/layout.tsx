import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import "lenis/dist/lenis.css";
import { SITE_IS_DRAFT, siteConfig } from "@/lib/site";
import { HTML_LANG, OG_LOCALE, isLocale, locales } from "@/lib/i18n/routing";
import { getPageMeta } from "@/lib/i18n/pageMeta";
import { absoluteUrl, buildAlternates } from "@/lib/seo";
import { NoScriptRevealFallback, SiteBody } from "@/components/layout/SiteBody";
import { fontVariables, siteViewport } from "@/lib/fonts";

/**
 * Pre-renders every language tree at build time. Because every page in
 * the app now lives under this segment, this is what keeps the whole site
 * statically generated rather than rendered per request -- the middleware
 * only rewrites "/about" onto "/en/about", it never forces dynamic rendering.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const home = getPageMeta("/", locale);

  return {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: home.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: home.description,
  alternates: buildAlternates("/", locale),
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: {
    // favicon.ico itself is auto-detected and linked by Next.js from
    // src/app/favicon.ico -- no need to declare it again here.
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: OG_LOCALE[locale],
    alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    url: absoluteUrl("/", locale),
    siteName: siteConfig.name,
    title: home.title,
    description: home.description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
    images: ["/og-image.jpg"],
  },
  // ARUBA DRAFT: nothing is indexed while SITE_IS_DRAFT is on (src/lib/site.ts),
  // on any deployment. Once launched, Vercel preview deployments stay
  // excluded so they never compete with the production domain.
  robots:
    SITE_IS_DRAFT || process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: false }
      : { index: true, follow: true },
  // Google Search Console "HTML tag" verification. Leave
  // GOOGLE_SITE_VERIFICATION unset until the clinic's real domain is
  // connected and verified in Search Console -- see .env.example.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  };
}

export const viewport: Viewport = siteViewport;


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  // The `[locale]` segment matches any single path segment, so an unknown
  // first segment ("/de/about", "/typo") arrives here. Rejecting it produces
  // a real 404 instead of rendering the site with a broken dictionary.
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={HTML_LANG[locale]}
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        {/* ARUBA DRAFT: no Dentist/LocalBusiness JSON-LD until the practice's
            name, address, phone and hours are confirmed -- structured data
            must describe the real clinic or not exist at all. */}
        {/* If JavaScript never loads, the scroll-reveal components can't run their
            viewport-triggered fade-in -- force full visibility so content is never stuck hidden. */}
        <NoScriptRevealFallback />
      </head>
      <SiteBody locale={locale}>{children}</SiteBody>
    </html>
  );
}

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopButton } from "@/components/layout/ScrollToTopButton";
import { SkipLink } from "@/components/layout/SkipLink";
import { Analytics } from "@/components/layout/Analytics";
import type { Locale } from "@/lib/i18n/routing";

/**
 * The document body every page shares: providers, skip link, header, main,
 * footer and the floating buttons. Used by `[locale]/layout.tsx` and by
 * `global-not-found.tsx`, so a 404 looks and behaves like the rest of the
 * site -- same navigation, same language selector, same footer.
 */
export function SiteBody({
  locale,
  notFound = false,
  children,
}: {
  locale: Locale;
  /** Rendering the 404 page (see LanguageProvider's `notFound`). */
  notFound?: boolean;
  children: ReactNode;
}) {
  return (
    <body className="flex min-h-dvh flex-col font-sans antialiased">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <MotionProvider>
          <LanguageProvider locale={locale} notFound={notFound}>
            <SkipLink />
            <LenisProvider>
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <ScrollToTopButton />
            </LenisProvider>
            <Analytics />
          </LanguageProvider>
        </MotionProvider>
      </ThemeProvider>
    </body>
  );
}

/** Keeps scroll-reveal content visible when JavaScript never loads. */
export function NoScriptRevealFallback() {
  return (
    <noscript>
      <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
    </noscript>
  );
}

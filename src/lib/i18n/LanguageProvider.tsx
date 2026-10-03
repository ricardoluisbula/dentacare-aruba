"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary } from "./dictionaries/en";
import {
  DEFAULT_LOCALE,
  localizePath,
  locales,
  stripLocale,
  type Locale,
} from "./routing";

export { locales, DEFAULT_LOCALE, type Locale };

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  /**
   * Always true. Kept so callers that used it to defer rendering until the
   * client had read a stored preference keep compiling -- there is nothing
   * left to wait for. The locale now comes from the URL and is already
   * correct in the server-rendered HTML, so there is no first paint in the
   * wrong language to guard against.
   */
  mounted: boolean;
  /**
   * True on the 404 page. The language switcher then links to each
   * language's home page: the missing URL has no translation, and linking
   * "/en/typo" from "/typo" would only lead to another 404.
   */
  notFound: boolean;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

/**
 * Supplies the active language to every client component below it.
 *
 * The locale is a prop, passed down from the `[locale]` route segment, not
 * state discovered on the client: the server already rendered this tree in
 * the right language, so there is no post-hydration swap and no
 * flash of another language. Switching language is a navigation to the equivalent URL in the
 * target language, which is what makes each language a real, indexable page
 * rather than a client-side toggle.
 */
export function LanguageProvider({
  locale,
  dictionary,
  notFound = false,
  children,
}: {
  locale: Locale;
  /**
   * The active language's dictionary, supplied by the server (SiteBody), so
   * the browser only ever downloads the language being read.
   */
  dictionary: Dictionary;
  notFound?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const value = useMemo<LanguageContextValue>(() => {
    const setLocale = (next: Locale) => {
      // No cookie: the URL is the only language signal (see
      // src/middleware.ts). Stay on the page the visitor is reading -- "/nl/treatments" becomes
      // "/es/treatments", not "/es". `stripLocale` reduces the current URL
      // to its locale-independent route first, so this works from any
      // language to any other.
      const { path } = stripLocale(pathname ?? "/");
      router.push(localizePath(path, next));
    };

    return { locale, setLocale, t: dictionary, mounted: true, notFound };
  }, [locale, dictionary, notFound, pathname, router]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}

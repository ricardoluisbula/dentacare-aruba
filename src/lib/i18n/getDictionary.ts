import type { Dictionary } from "./dictionaries/en";
import en from "./dictionaries/en";
import nl from "./dictionaries/nl";
import es from "./dictionaries/es";
import pap from "./dictionaries/pap";
import type { Locale } from "./routing";

/**
 * All UI dictionaries, for server components (metadata, the 404 page) and
 * for SiteBody, which hands only the ACTIVE language's dictionary to the
 * client-side LanguageProvider -- visitors never download the others.
 */
const dictionaries: Record<Locale, Dictionary> = { en, nl, es, pap };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

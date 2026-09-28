import en, { type Dictionary } from "./dictionaries/en";
import type { Locale } from "./routing";

/**
 * The same dictionaries `LanguageProvider` hands to client components,
 * reachable from server components too (for `<title>`, meta descriptions and
 * JSON-LD). Kept in its own module so pulling a dictionary into a server
 * component does not drag the provider's client runtime along with it.
 */
const dictionaries: Record<Locale, Dictionary> = { en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

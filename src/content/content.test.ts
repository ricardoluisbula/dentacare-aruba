import { describe, expect, it } from "vitest";
import { locales, type Locale } from "@/lib/i18n/routing";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { sharedContent } from "./shared";
import { pageContent } from "./pages";

/**
 * Every language must be complete and faithful to the English source:
 * - the same keys and list lengths as English (nothing missing or extra);
 * - no empty strings;
 * - no sentence left in English (identical multi-word strings);
 * - numbers, times, names, contact details and the {email} token preserved.
 * Translation QUALITY is not something a test can judge -- see
 * docs/translations/ for the items flagged for a fluent reviewer.
 */

type Json = string | number | boolean | null | undefined | Json[] | { [key: string]: Json };

/** Walks two values in parallel, reporting structural differences and string pairs. */
function walk(en: Json, other: Json, path: string, problems: string[], pairs: [string, string, string][]) {
  if (typeof en === "string") {
    if (typeof other !== "string") problems.push(`${path}: expected text`);
    else if (!other.trim()) problems.push(`${path}: empty`);
    else pairs.push([path, en, other]);
    return;
  }
  if (Array.isArray(en)) {
    if (!Array.isArray(other)) return void problems.push(`${path}: expected a list`);
    if (other.length !== en.length) problems.push(`${path}: ${other.length} items, English has ${en.length}`);
    en.forEach((item, i) => walk(item, other[i], `${path}[${i}]`, problems, pairs));
    return;
  }
  if (en && typeof en === "object") {
    if (!other || typeof other !== "object" || Array.isArray(other)) return void problems.push(`${path}: expected an object`);
    const enKeys = Object.keys(en).sort();
    const otherKeys = Object.keys(other).sort();
    for (const key of enKeys) if (!(key in other)) problems.push(`${path}.${key}: missing`);
    for (const key of otherKeys) if (!(key in en)) problems.push(`${path}.${key}: not in English`);
    for (const key of enKeys) if (key in other) walk(en[key], (other as Record<string, Json>)[key], `${path}.${key}`, problems, pairs);
    return;
  }
  if (en !== other) problems.push(`${path}: ${String(other)} differs from English ${String(en)}`);
}

/** Text that must survive translation unchanged wherever English has it. */
const PRESERVED = [
  "Dentacare Aruba",
  "Sam Abdin",
  "Morgenster 35C",
  "+31 6 45094057",
  "WhatsApp",
  "Instagram",
  "Google Maps",
  "Vercel",
  "Upstash",
  "Rijksuniversiteit Groningen",
  "{email}",
  "dentacare_admin",
  "UTC−4",
];

/** Short labels or names that may legitimately read the same in another language. */
const MAY_MATCH_ENGLISH = /^(\S+( \S+)?|.*\| Dentacare Aruba|Dentacare Aruba.*|[^a-z]*)$/i;

function check(locale: Locale, label: string, en: Json, other: Json) {
  const problems: string[] = [];
  const pairs: [string, string, string][] = [];
  walk(en, other, label, problems, pairs);
  for (const [path, enText, text] of pairs) {
    if (enText === text && !MAY_MATCH_ENGLISH.test(enText)) problems.push(`${path}: not translated ("${enText.slice(0, 60)}")`);
    for (const keep of PRESERVED) {
      if (enText.includes(keep) && !text.includes(keep)) problems.push(`${path}: lost "${keep}"`);
    }
    const digits = (s: string) => (s.match(/\d+/g) ?? []).sort().join(",");
    if (digits(enText) !== digits(text)) problems.push(`${path}: numbers differ (${digits(enText)} vs ${digits(text)})`);
  }
  return problems;
}

describe.each(locales.filter((l) => l !== "en"))("%s translation", (locale) => {
  it("UI dictionary is complete and faithful", () => {
    expect(check(locale, "dictionary", getDictionary("en") as Json, getDictionary(locale) as Json)).toEqual([]);
  });

  it("shared content (treatments, cases) is complete and faithful", () => {
    expect(check(locale, "shared", sharedContent("en") as Json, sharedContent(locale) as Json)).toEqual([]);
  });

  it("page content (treatment pages, prevention, policies) is complete and faithful", () => {
    expect(check(locale, "pages", pageContent("en") as Json, pageContent(locale) as Json)).toEqual([]);
  });
});

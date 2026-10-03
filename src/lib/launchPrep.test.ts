import { describe, expect, it } from "vitest";
import en from "@/lib/i18n/dictionaries/en";
import { getPageMeta, PAGE_KEY_BY_ROUTE } from "@/lib/i18n/pageMeta";
import { SITE_IS_DRAFT, siteConfig } from "@/lib/site";

/**
 * Launch preparation: no visible draft labels or placeholder text, and no
 * navigation to pages that are still being prepared -- while the site itself
 * stays out of search engines (SITE_IS_DRAFT) until the domain and launch
 * content are ready.
 */

/** Pages that exist but are still being prepared, and must not be linked. */
const UNFINISHED = ["/about", "/reviews", "/new-patients", "/pricing-info"];

/**
 * Phrases that would show patients the site is unfinished. "Hours to be
 * confirmed" is deliberately not matched: it is how a published date without
 * hours is displayed (see ArubaDates).
 */
const DRAFT_TEXT = [/draft/i, /(?<!hours )to be confirmed/i, /being confirmed/i, /to be supplied/i, /awaiting details/i, /placeholder/i, /in preparation/i];

describe("launch preparation", () => {
  it("keeps the site out of search engines until launch", () => {
    expect(SITE_IS_DRAFT).toBe(true);
  });

  it("shows no draft labels or placeholder text", () => {
    const text = JSON.stringify(en);
    for (const pattern of DRAFT_TEXT) {
      expect(text, String(pattern)).not.toMatch(pattern);
    }
  });

  it("has no '(Draft)' page titles", () => {
    for (const route of ["/", ...Object.keys(PAGE_KEY_BY_ROUTE)]) {
      expect(getPageMeta(route, "en").title, route).not.toMatch(/draft/i);
    }
    const titles = JSON.stringify([en.treatmentsMeta, en.smileGalleryMeta]);
    expect(titles).not.toMatch(/draft/i);
  });

  it("does not link to pages that are still being prepared", () => {
    const hrefs = siteConfig.nav.map((item) => item.href);
    for (const route of UNFINISHED) expect(hrefs, route).not.toContain(route);
  });

  it("keeps the verified contact links", () => {
    expect(siteConfig.whatsappUrl).toBe("https://wa.me/31645094057");
    expect(siteConfig.address.mapsHref).toContain("Morgenster%2035C%2C%20Aruba");
    expect(siteConfig.instagramUrl).toBe("https://www.instagram.com/Dentacareosdorp/");
  });
});

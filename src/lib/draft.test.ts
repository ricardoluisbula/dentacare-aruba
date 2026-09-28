import { describe, expect, it } from "vitest";
import { SITE_IS_DRAFT, siteConfig } from "@/lib/site";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import en from "@/lib/i18n/dictionaries/en";
import { buildPageMetadata } from "@/lib/seo";

/**
 * The Aruba site is a draft: it must stay out of search engines, and it must
 * never present the Amsterdam (Osdorp) practice's details as its own. These
 * fail the moment either promise is broken; e2e/draft.spec.ts checks the same
 * against the served pages.
 */

const FORBIDDEN = [/osdorp/i, /amsterdam/i, /calandlaan/i, /619\s?9397/, /45495419/, /hotmail/i, /since 2009/i, /mondcheck/i, /€/];

describe("Aruba draft", () => {
  it("is still flagged as a draft", () => {
    expect(SITE_IS_DRAFT).toBe(true);
  });

  it("keeps every page noindex, even one that asks to be indexed", () => {
    const meta = buildPageMetadata({ path: "/about", locale: "en", title: "t", description: "d", index: true });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("disallows all crawling and publishes no sitemap entries", () => {
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    expect(sitemap()).toEqual([]);
  });

  it("carries no contact details in the site config", () => {
    for (const key of ["address", "email", "hours", "socials", "whatsappUrl", "clinicLandlineTel"]) {
      expect(siteConfig, key).not.toHaveProperty(key);
    }
  });

  it("has no Amsterdam details anywhere in the dictionary or site config", () => {
    const text = JSON.stringify({ en, siteConfig });
    for (const pattern of FORBIDDEN) {
      expect(text, String(pattern)).not.toMatch(pattern);
    }
  });
});

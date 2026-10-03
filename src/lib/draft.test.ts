import { describe, expect, it } from "vitest";
import { SITE_IS_DRAFT, siteConfig } from "@/lib/site";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import en from "@/lib/i18n/dictionaries/en";
import { buildPageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { locales } from "@/lib/i18n/routing";
import { sharedContent } from "@/content/shared";
import { pageContent } from "@/content/pages";

/**
 * The Aruba site is a draft: it must stay out of search engines, show only
 * details the practice has confirmed, and never present the Amsterdam
 * (Osdorp) practice's details as its own. e2e/draft.spec.ts checks the same
 * against the served pages.
 */

/**
 * Confirmed exceptions that legitimately contain otherwise-forbidden words:
 * the shared Instagram profile (its handle contains "osdorp") and the
 * dentist's own verified experience in Amsterdam.
 */
const ALLOWED = [siteConfig.instagramUrl, "@dentacareosdorp", ...en.teamPage.bio, en.teamPage.experienceValue, siteConfig.privacyEmail];

const FORBIDDEN = [
  /osdorp/i,
  /amsterdam/i,
  /calandlaan/i,
  /619\s?9397/,
  /45495419/, // the Amsterdam practice's WhatsApp number
  /hotmail/i, // the Amsterdam practice's address; the Aruba privacy address is allowed above
  /since 2009/i,
  /mondcheck/i,
  /€/,
  /tel:/i,
  /mailto:/i,
];

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

  it("uses exactly the confirmed contact details", () => {
    expect(siteConfig.address.full).toBe("Morgenster 35C, Aruba");
    expect(siteConfig.whatsappUrl).toBe("https://wa.me/31645094057");
    expect(siteConfig.instagramUrl).toBe("https://www.instagram.com/Dentacareosdorp/");
  });

  it("has no unconfirmed phone, email or opening hours", () => {
    for (const key of ["phone", "email", "hours", "clinicLandlineTel", "socials"]) {
      expect(siteConfig, key).not.toHaveProperty(key);
    }
  });

  it.each(locales)("has no Amsterdam practice details or contact links outside the confirmed exceptions (%s)", (locale) => {
    const t = getDictionary(locale);
    // The same confirmed exceptions, in this language: the dentist's own
    // verified experience in Amsterdam is allowed in his biography only.
    const allowed = [...ALLOWED, ...t.teamPage.bio, t.teamPage.experienceValue];
    let text = JSON.stringify({ t, siteConfig, shared: sharedContent(locale), pages: pageContent(locale) });
    for (const ok of allowed) text = text.split(JSON.stringify(ok).slice(1, -1)).join("");
    for (const pattern of FORBIDDEN) {
      expect(text, String(pattern)).not.toMatch(pattern);
    }
  });

  it("never states that a WhatsApp message confirms an appointment", () => {
    expect(en.whatsapp.enquiryNote).toMatch(/not a booking/);
    expect(JSON.stringify(en)).not.toMatch(/book (now|online)|appointment (is )?confirmed by/i);
  });
});

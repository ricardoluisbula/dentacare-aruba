import { describe, expect, it } from "vitest";
import { treatments } from "@/data/treatments";
import { treatmentPages } from "@/data/treatmentPages";
import { preventiveCare } from "@/data/treatmentPages/preventiveCare";
import treatmentsCopy from "./i18n/dictionaries/en.treatments";
import galleryCopy from "./i18n/dictionaries/en.gallery";
import { beforeAfterCases } from "@/data/beforeAfterCases";

/**
 * ARUBA DRAFT guard for the treatment content ported from the reference
 * (Amsterdam) practice: no Netherlands-specific wording, no prices, no
 * direct-contact actions, no reviews, no availability promises the Aruba
 * schedule cannot keep, and no "Dr." title. The before-and-after cases and
 * their copy (en.gallery.ts) are held to the same rules, except that they may
 * of course mention the gallery and before-and-after results.
 */

const FORBIDDEN: RegExp[] = [
  /amsterdam/i,
  /osdorp/i,
  /nieuw-west/i,
  /netherlands/i,
  /dutch/i,
  /€/,
  /\beuros?\b/i,
  /knmt/i,
  /\bBIG\b/,
  /wkkgz/i,
  /verzeker/i,
  /insurance/i,
  /zorgverzekeraar/i,
  /\bNZa\b/,
  /2009/,
  /mondcheck/i,
  // The reference site's online tool; "dental check-up" is fine.
  /dental check(?![-s])/i,
  /tel:/i,
  /mailto:/i,
  /wa\.me/i,
  /whatsapp/i,
  /before-and-after/i,
  /gallery/i,
  /review(s)? from/i,
  /\bDr\./,
  /1[- ]hour|one hour|same[- ]day/i,
  /\b112\b/,
  /020 ?619/,
];

const everything = JSON.stringify({ treatments, treatmentPages, preventiveCare, treatmentsCopy });

/** Patterns the gallery content may legitimately match: it IS the before-and-after gallery. */
const GALLERY_ALLOWED = new Set([String(/before-and-after/i), String(/gallery/i)]);
const GALLERY_FORBIDDEN = [
  ...FORBIDDEN.filter((pattern) => !GALLERY_ALLOWED.has(String(pattern))),
  /prices?/i,
  /aruba patients?/i,
  /treated in aruba/i,
  /immediate/i,
];
const galleryContent = JSON.stringify({ galleryCopy, beforeAfterCases });

describe("ported gallery content", () => {
  it.each(GALLERY_FORBIDDEN.map((pattern) => [String(pattern), pattern] as const))("contains nothing matching %s", (_, pattern) => {
    expect(galleryContent).not.toMatch(pattern);
  });

  it("has no price fields on any case", () => {
    for (const item of beforeAfterCases) {
      expect(Object.keys(item).some((key) => key.toLowerCase().startsWith("price")), item.id).toBe(false);
    }
  });

  it("says who treated the cases without claiming they were treated in Aruba", () => {
    expect(galleryCopy.smileGallery.treatedByNote).toBe(
      "All cases shown were treated by Sam Abdin. Results differ from person to person."
    );
  });

  it("gives every case a non-empty before and after alt text", () => {
    for (const item of beforeAfterCases) {
      expect(item.beforeAlt.trim(), item.id).not.toBe("");
      expect(item.afterAlt.trim(), item.id).not.toBe("");
    }
  });

  it("has exactly one featured case", () => {
    expect(beforeAfterCases.filter((item) => item.featured).map((item) => item.id)).toEqual(["case-09"]);
  });
});

describe("ported treatment content", () => {
  it.each(FORBIDDEN.map((pattern) => [String(pattern), pattern] as const))("contains nothing matching %s", (_, pattern) => {
    expect(everything).not.toMatch(pattern);
  });

  it("has no price fields left on any treatment", () => {
    for (const treatment of treatments) {
      expect(Object.keys(treatment).some((key) => key.toLowerCase().startsWith("price")), treatment.slug).toBe(false);
    }
  });

  it("keeps a limitations section on every treatment page", () => {
    for (const [slug, page] of Object.entries({ ...treatmentPages, "preventive-care": preventiveCare })) {
      expect(page.limitations.length, slug).toBeGreaterThan(0);
    }
  });

  it("tells patients on the emergency page that treatment depends on the dentist's Aruba dates", () => {
    const { safetyTitle, safetyBody } = treatmentsCopy.emergencyTreatmentPage;
    expect(`${safetyTitle} ${safetyBody}`).toMatch(/dates the dentist is in Aruba/);
    expect(safetyBody).toMatch(/severe pain, swelling, bleeding or an injury/);
    expect(safetyBody).toMatch(/another dental or medical service/);
  });
});

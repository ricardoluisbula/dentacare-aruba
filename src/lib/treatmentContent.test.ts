import { describe, expect, it } from "vitest";
import { treatments } from "@/data/treatments";
import { treatmentPages } from "@/data/treatmentPages";
import { preventiveCare } from "@/data/treatmentPages/preventiveCare";
import treatmentsCopy from "./i18n/dictionaries/en.treatments";

/**
 * ARUBA DRAFT guard for the treatment content ported from the reference
 * (Amsterdam) practice: no Netherlands-specific wording, no prices, no
 * direct-contact actions, no patient photos or reviews, no availability
 * promises the Aruba schedule cannot keep, and no "Dr." title.
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

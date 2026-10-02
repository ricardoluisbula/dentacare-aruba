import { describe, expect, it } from "vitest";
import { treatments } from "@/data/treatments";
import { treatmentPages } from "@/data/treatmentPages";
import { TREATMENT_PAGE_SLUGS } from "@/lib/treatmentSlugs";
import en from "@/lib/i18n/dictionaries/en";

/**
 * "Composite Restorations" was renamed "Composite Veneers" (matching Dentacare
 * Osdorp, master 8190c70). The URL slug is unchanged so existing links keep
 * working.
 */
const SLUG = "composite-restorations";
const APPROVED_DESCRIPTION =
  "Composite veneers use tooth-coloured resin to improve the shape, colour, and appearance of teeth. Treatment is tailored to your smile following a personal assessment.";

describe("Composite Veneers rename", () => {
  const treatment = treatments.find((t) => t.slug === SLUG);

  it("keeps the existing URL slug", () => {
    expect(treatment).toBeDefined();
    expect(TREATMENT_PAGE_SLUGS).toContain(SLUG);
    expect(treatmentPages[SLUG]).toBeDefined();
  });

  it("uses the new name and the approved description", () => {
    expect(treatment?.name).toBe("Composite Veneers");
    expect(treatment?.description).toBe(APPROVED_DESCRIPTION);
  });

  it("uses the new name in the page's metadata", () => {
    const meta = en.treatmentsMeta.details[SLUG as keyof typeof en.treatmentsMeta.details];
    expect(meta.title).toMatch(/^Composite Veneers \|/);
    expect(meta.description).toMatch(/^Composite veneers/);
  });

  it("no longer names the treatment 'Composite Restorations' anywhere", () => {
    const text = JSON.stringify({ treatments, page: treatmentPages[SLUG], en });
    // Title-case is only ever the treatment's name; lower-case "composite
    // restorations" remains as general dental vocabulary on other pages
    // (e.g. "protect crowns, bridges, veneers or composite restorations").
    expect(text).not.toMatch(/Composite Restoration/);
    expect(JSON.stringify(treatmentPages[SLUG])).not.toMatch(/composite restoration/i);
  });
});

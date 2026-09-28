import { describe, expect, it } from "vitest";
import { treatments } from "@/data/treatments";
import { treatmentPages } from "@/data/treatmentPages";
import { PREVENTION_RELATED_SLUGS } from "@/data/preventionContent";
import {
  HUB_SLUGS,
  RELATED_TREATMENT_SLUGS,
  TEETH_GRINDING_ANCHOR,
  TEETH_GRINDING_PATH,
  treatmentDetailPath,
} from "./treatmentLinks";
import en from "./i18n/dictionaries/en";

/**
 * Content guards for the night guard (bruxism) treatment: it must never be
 * confused with the orthodontic retainer worn after clear aligners -- in
 * either direction -- and it must publish no price and make no guarantee.
 */

const SLUG = "night-guards";
const PATH = `/treatments/${SLUG}`;
const treatment = treatments.find((t) => t.slug === SLUG)!;
const page = treatmentPages[SLUG];

describe("night guard treatment", () => {
  it("is in the catalogue with its own generated page", () => {
    expect(treatment).toBeDefined();
    expect(treatment.name).toBe("Custom Night Guards");
    expect(page).toBeDefined();
    expect(treatmentDetailPath(SLUG)).toBe(PATH);
    expect(HUB_SLUGS).toContain(SLUG);
  });

  it("has the extra sections, and its benefits say what it does not do", () => {
    expect(page.background?.length).toBeGreaterThan(0);
    expect(page.benefits?.note).toBeTruthy();
    expect(page.process).toHaveLength(4);
    expect(page.faq).toHaveLength(8);
  });

  it("publishes no price and makes no guarantee", () => {
    const text = JSON.stringify([page, treatment]);
    expect(text).not.toMatch(/€|\$|\beur\b|\d+\s?euro/i);
    expect(text).not.toMatch(/guarantee/i);
  });

  it("has the site copy it needs", () => {
    expect(en.treatmentsPage.treatmentLinks[SLUG]).toBeTruthy();
    expect(en.nightGuardSpotlight.eyebrow).toBeTruthy();
    expect(en.nightGuardSpotlight.note).toMatch(/retainer/i);
    expect(en.treatmentsMeta.details[SLUG].title).toMatch(/night guard/i);
  });
});

describe("the teeth-grinding definition link", () => {
  const DEFINITION =
    "Teeth grinding, also known as bruxism, is the unconscious grinding or forceful clenching of the teeth. It can happen during the day or while sleeping.";

  it("points at one stable anchor", () => {
    expect(TEETH_GRINDING_ANCHOR).toBe("what-is-teeth-grinding");
    expect(TEETH_GRINDING_PATH).toBe("/treatments/night-guards#what-is-teeth-grinding");
  });

  it("carries that anchor, the agreed definition and a matching heading", () => {
    const anchored = (page.background ?? []).filter((section) => section.id === TEETH_GRINDING_ANCHOR);
    expect(anchored).toHaveLength(1);
    expect(anchored[0].definition).toBe(DEFINITION);
    // The link reads exactly like the heading it lands on.
    expect(en.nightGuardSpotlight.definitionLink).toBe(anchored[0].title);
  });

  it("does not repeat the definition in the overview right above it", () => {
    expect(page.overview.join(" ")).not.toContain(DEFINITION);
  });
});

describe("night guard vs orthodontic retainer", () => {
  it("answers the difference on the night guard page", () => {
    const entry = page.faq.find((item) => /retainer/i.test(item.question));
    expect(entry).toBeDefined();
    expect(entry!.answer).toMatch(/retainer/i);
  });

  it("states on the Clear Aligners page that the retainer is not a night guard", () => {
    const retention = treatmentPages["clear-aligners"].process.at(-1)!.description;
    expect(retention).toMatch(/retainer/i);
    expect(retention).toMatch(/night guard/i);
  });

  it("never links the aligner page to the night guard as if related", () => {
    expect(RELATED_TREATMENT_SLUGS["clear-aligners"]).toBeUndefined();
  });
});

describe("where the night guard is linked from", () => {
  it("is linked from the restorative pages it protects, and links back to real pages", () => {
    for (const slug of ["porcelain-veneers", "dental-crowns-bridges", "composite-restorations"] as const) {
      expect(RELATED_TREATMENT_SLUGS[slug]).toContain(SLUG);
    }
    for (const [from, targets] of Object.entries(RELATED_TREATMENT_SLUGS)) {
      for (const target of targets!) {
        expect(treatmentPages[target], `${from} -> ${target} has no page`).toBeDefined();
        expect(target).not.toBe(from);
      }
    }
  });

  it("is linked from the prevention page", () => {
    expect(PREVENTION_RELATED_SLUGS).toContain(SLUG);
  });
});

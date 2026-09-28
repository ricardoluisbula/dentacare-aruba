import { describe, expect, it } from "vitest";
import { TREATMENT_PAGE_SLUGS } from "./treatmentSlugs";
import { genericTreatmentSlugs } from "@/data/treatmentPages";

describe("the list of treatment pages", () => {
  it("is exactly the treatment pages that exist", () => {
    // The generic [slug] pages plus the hand-built emergency page.
    const pages = [...genericTreatmentSlugs, "emergency-aesthetic-dentistry"].sort();
    expect([...TREATMENT_PAGE_SLUGS].sort()).toEqual(pages);
  });
});

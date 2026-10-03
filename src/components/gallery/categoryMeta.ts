import { LayoutGrid } from "lucide-react";
import type { TreatmentCategory } from "@/data/beforeAfterCases";
import { treatmentIcons } from "@/components/treatments/TreatmentIcons";

/** Same icon language already used for `Treatment.icon` (TreatmentIcons.tsx), reused here so a category reads the same everywhere it appears on the site. */
export const CATEGORY_ICON: Record<TreatmentCategory, (typeof treatmentIcons)[keyof typeof treatmentIcons]> = {
  "smile-rehabilitation": treatmentIcons.smile,
  "composite-bonding": treatmentIcons.hygiene,
  crowns: treatmentIcons.crown,
  veneers: treatmentIcons.veneers,
  emergency: treatmentIcons.repairedtooth,
};

/** Neutral "browse everything" icon for the "All Results" filter pill, which has no single treatment category of its own. */
export const ALL_RESULTS_ICON = LayoutGrid;

/** Lucide icons and the project's hand-drawn dental icons (TreatmentIcons.tsx) don't share an exact component type -- this covers both so a single prop can hold either. */
export type CategoryIconComponent = (typeof CATEGORY_ICON)[keyof typeof CATEGORY_ICON] | typeof ALL_RESULTS_ICON;

export const CATEGORY_FILTER_KEY: Record<
  TreatmentCategory,
  "smileRehabilitation" | "compositeBonding" | "crowns" | "veneers" | "emergency"
> = {
  "smile-rehabilitation": "smileRehabilitation",
  "composite-bonding": "compositeBonding",
  crowns: "crowns",
  veneers: "veneers",
  emergency: "emergency",
};

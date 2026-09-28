import { preventiveCare } from "./treatmentPages/preventiveCare";

type FaqItem = { question: string; answer: string };

/**
 * The parts of the preventive-care treatment content that `/prevention-hygiene`
 * does not already say in its own copy: the honest limits of prevention,
 * concrete home care, and the questions patients ask. Its first FAQ ("how
 * often should I come?") is left out: the prevention page already answers it.
 */
export function preventionExtras() {
  return {
    limitations: preventiveCare.limitations,
    aftercare: preventiveCare.aftercare,
    faq: preventiveCare.faq.slice(1),
  };
}

/** The single FAQ list the prevention page shows: its own questions, then the extras. */
export function preventionFaq(pageFaq: readonly FaqItem[]): FaqItem[] {
  return [...pageFaq, ...preventionExtras().faq];
}

/** Treatments a prevention visitor is most likely to need next, linked from the page. */
export const PREVENTION_RELATED_SLUGS = [
  "composite-restorations",
  "root-canal-therapy",
  "dental-crowns-bridges",
  // Protection rather than repair: the heading and intro above these links
  // say "repairing or protecting" for this reason.
  "night-guards",
] as const;

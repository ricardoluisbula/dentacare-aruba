/**
 * The per-treatment content that only the detail page needs.
 *
 * Deliberately separate from `src/data/treatments.ts`: that file holds the
 * short card copy shared by the treatments hub and the detail-page heroes.
 * This holds the long-form detail-page copy, which nothing else reads.
 *
 * Writing rules for everything in here -- these are patient-facing pages for a
 * healthcare provider, and the constraints are not stylistic:
 *
 * - No guarantees. "Often", "usually", "may" -- never "will", "always",
 *   "permanent" or "lifetime".
 * - No invented specifics: no recovery times, success rates, material brands,
 *   manufacturer names, laboratory names, or numbers of appointments stated as
 *   fact. Where a count genuinely varies, say that it varies.
 * - No prices or fee figures of any kind. A cost question is answered only as
 *   "it depends; you receive a personal estimate before treatment starts".
 * - `limitations` is not optional and must not be softened into a benefits
 *   list. A page that only lists upsides is the failure mode this section
 *   exists to prevent.
 *
 * ARUBA DRAFT: ported (English only) from the reference practice's pages; the
 * treatments offered are the same. Reviewed by the practice before launch.
 */
export type TreatmentPageContent = {
  /**
   * Two to three paragraphs explaining what the treatment actually is, in
   * plain language. Rendered as separate <p> elements.
   */
  overview: string[];
  /**
   * Optional background on the condition the treatment addresses (for
   * example, what teeth grinding is and how it shows), rendered directly after
   * the overview. Most treatments explain themselves in the overview and leave
   * this out.
   */
  background?: TreatmentPageSection[];
  /** Situations in which a patient might reasonably ask about this treatment. */
  suitableFor: string[];
  /** The realistic sequence of appointments, from first examination onward. */
  process: { title: string; description: string }[];
  /**
   * Optional list of what the treatment may help with, rendered after the
   * process and always before `limitations`. Every item is a "may", and the
   * `note` states what it does not do -- a benefits list without that note is
   * not acceptable here.
   */
  benefits?: TreatmentPageSection;
  /** What this treatment cannot do, and what varies between patients. */
  limitations: string[];
  /** What the patient is responsible for afterwards, and what maintenance it needs. */
  aftercare: string[];
  faq: { question: string; answer: string }[];
};

/**
 * A titled block of one or more bulleted lists, each with an optional lead-in
 * line, and an optional closing note (used for "this can have other causes"
 * or "this does not cure ..." caveats).
 */
export type TreatmentPageSection = {
  title: string;
  /** Optional stable anchor on the section heading, for deep links from other pages. */
  id?: string;
  /** Optional one- or two-sentence definition, shown directly under the heading. */
  definition?: string;
  lists: { intro?: string; items: string[] }[];
  note?: string;
};

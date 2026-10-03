/**
 * Real patient before/after photo pairs for the BeforeAfterSlider component.
 * Every entry here must point at genuine, unretouched patient photography —
 * never an AI-generated or stock "after" image. `featured: true` marks the
 * single case shown as the large featured transformation at the top of the
 * Smile Gallery page; the rest render in the gallery grid.
 *
 * ARUBA DRAFT: ported (English only) from the reference practice's site. These
 * cases were treated by Sam Abdin; nothing here says or implies they were
 * treated in Aruba. Case titles, descriptions and categories are the ones the
 * clinic supplied for the reference site, with every location, price and
 * "1 hour / same-day" wording removed. Cases whose photos were not carried
 * over to this site (they show the reference practice's premises or carry its
 * watermark) were dropped entirely. The practice must confirm that each
 * patient's consent covers publication on this second website before launch
 * (docs/ARUBA-LAUNCH-CHECKLIST.md).
 *
 * `treatmentCategories` drives the gallery's filter chips. Treatment names and
 * descriptions were supplied directly by the clinic (not inferred from the
 * photos), since only the clinic can verify which procedure each case was.
 *
 * `aspectRatio` is a CSS aspect-ratio fraction (e.g. "16/9"), chosen per case
 * from the photos' own native dimensions so no tooth, lip, or chin is cut
 * off. A source photo whose native framing is already tighter than its card
 * uses `imageFit: "contain"` so the full photo letterboxes inside that card
 * instead of being cropped.
 *
 * To add another case: append a new entry with its own unique `id`, then
 * render it with <BeforeAfterSlider beforeImage={...} afterImage={...} ... />
 * wherever it should appear.
 */
import type { CaseAlignment } from "@/components/gallery/BeforeAfterSlider";
import { EMERGENCY_ALIGNMENT, EMERGENCY_2_ALIGNMENT } from "@/data/photoAlignments";

export type TreatmentCategory = "smile-rehabilitation" | "composite-bonding" | "crowns" | "veneers" | "emergency";

export type BeforeAfterCase = {
  id: string;
  title: string;
  description: string;
  /**
   * Every case's real, clinic-verified category (or categories, for a case
   * that genuinely spans more than one treatment type). Drives the gallery
   * filter pills and each card's badge -- the badge always shows the first
   * entry. Kept as an array so a case CAN belong to multiple filters, but no
   * entry lists more than one unless the clinic has actually confirmed it;
   * see the file-level note above about not inferring categorization.
   */
  treatmentCategories: TreatmentCategory[];
  aspectRatio: string;
  /**
   * Defaults to "cover" (crops to fill the card). Set to "contain" only for
   * a source photo whose native framing is already tighter than the shared
   * grid ratio with no safe margin to crop further -- this lets the card
   * still match every other card's size without cropping into teeth/lips.
   */
  imageFit?: "cover" | "contain";
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  featured: boolean;
  /**
   * This case's before/after alignment. See `CaseAlignment` in
   * BeforeAfterSlider.tsx for the full type -- it's a union of two systems:
   *
   * - Anchor: `anchor` is a normalized (0-1) source-image coordinate marking
   *   the SAME dental landmark (dental midline / contact point between the
   *   upper central incisors, by default) in both photos; the component
   *   calculates the pixel translation that places both anchors at the same
   *   screen position from the real rendered container and natural image
   *   dimensions, not from guessed percentages.
   * - Legacy: a flat `{ before, after }` pair of static
   *   `{ scale, translateX, translateY }` percentage transforms.
   *
   * Omit entirely when a pair already lines up natively at scale 1.
   */
  alignment?: CaseAlignment;
};

export const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: "case-02",
    title: "Porcelain Veneers",
    description: "Custom-made porcelain veneers designed to enhance the shape, colour, and harmony of the smile.",
    treatmentCategories: ["veneers"],
    // Clinical retractor shots, no lips -- before is 1399x585 (~2.39/1
    // native), after is 1399x522 (~2.68/1 native). Using "before"'s own
    // (narrower) native ratio means neither photo ever needs vertical crop
    // (only horizontal, safe for a teeth-only clinical shot with generous
    // left/right margin).
    aspectRatio: "1399/585",
    beforeImage: "/images/smile-gallery/case-04-before.webp",
    afterImage: "/images/smile-gallery/case-04-after.webp",
    beforeAlt: "Patient's smile before dental treatment.",
    afterAlt: "Patient's smile after dental treatment.",
    featured: false,
  },
  {
    // Was "case-03" on the reference site; renamed so it is never confused
    // with that site's retired case-03 photo files, which are not used here.
    id: "case-hero",
    title: "Porcelain Veneers",
    description: "Custom-made porcelain veneers designed to enhance the shape, colour, and harmony of the smile.",
    treatmentCategories: ["veneers"],
    // The photos are 1416x797 (before, ~1.777/1) and 1094x615 (after,
    // ~1.779/1) -- both close to native 16/9. Using "before"'s own (very
    // slightly narrower) native ratio as the container gives "before" zero
    // crop and "after" a negligible ~0.1% horizontal crop; no custom
    // alignment needed.
    aspectRatio: "1416/797",
    beforeImage: "/images/home/hero-before.webp",
    afterImage: "/images/home/hero-after.webp",
    beforeAlt: "Patient's teeth before treatment.",
    afterAlt: "Patient's teeth after treatment.",
    // No alignment: in the lightbox modal (fixed 16/10), these photos crop
    // ~5% off each side -- the smile stays centered and no lip/tooth is cut
    // off. Default centering is correct for both the grid card and the modal.
    featured: false,
  },
  {
    id: "case-04",
    title: "Porcelain Veneers",
    description: "Custom-made porcelain veneers designed to enhance the shape, colour, and harmony of the smile.",
    treatmentCategories: ["veneers"],
    // Real full-smile photography with both lips visible, native ~2.34/1
    // for both photos (before 1920x819, after 1919x820 -- essentially
    // identical). Using the native ratio directly removes any baseline crop,
    // which removes the need for any shift.
    aspectRatio: "1919/820",
    beforeImage: "/images/smile-gallery/case-02-before.webp",
    afterImage: "/images/smile-gallery/case-02-after.webp",
    beforeAlt: "Patient's teeth before treatment.",
    afterAlt: "Patient's teeth after treatment.",
    featured: false,
  },
  {
    id: "case-05",
    title: "Porcelain Veneers",
    description: "6 porcelain veneers.",
    treatmentCategories: ["veneers"],
    aspectRatio: "16/9",
    imageFit: "contain",
    // The clinic-supplied "v2" photo pair (converted to .webp only, same
    // pixel dimensions, no crop/resize/enhancement).
    beforeImage: "/images/smile-gallery/case-05-before-v2.webp",
    afterImage: "/images/smile-gallery/case-05-after-v2.webp",
    beforeAlt: "Patient's teeth before treatment.",
    afterAlt: "Patient's teeth after treatment.",
    // No alignment: the photos measure 810x251 (before, ~3.227/1) and
    // 803x271 (after, ~2.963/1) -- both share very similar native framing.
    // The dental-midline contact point sits at x=0.464 (before) vs x=0.494
    // (after), a ~3% native offset -- close enough that a plain centered
    // crop keeps both within a few percent of center. The grid's "803/271"
    // override (see GRID_COVER_OVERRIDES in GalleryGrid.tsx) uses "after"'s
    // own (narrower) native ratio as the container: "after" needs zero crop
    // at all, and "before" only ever crops horizontally (~4% off each side,
    // never top/bottom).
    featured: false,
  },
  {
    id: "case-06",
    title: "Porcelain Veneers",
    description: "Natural ceramic veneers for a balanced, confident smile.",
    treatmentCategories: ["veneers"],
    aspectRatio: "16/9",
    beforeImage: "/images/smile-gallery/case-06-before.webp",
    afterImage: "/images/smile-gallery/case-06-after.webp",
    beforeAlt: "Patient's smile before treatment.",
    afterAlt: "Patient's smile after treatment.",
    // Both source photos are native 1200x675 -- exactly 16/9, so object-cover
    // needs zero baseline crop for either photo. The dental midline sits at
    // x=0.445 in "before" and x=0.486 in "after" natively (crosshair-verified
    // on both source files). `target: { x: 0.461, y: 0.339 }` is the
    // numerically-solved point closest to both anchors' natural position --
    // deliberately not dead-center (0.5, 0.5), which would require
    // ~1.35-1.55x zoom. This target keeps both photos at an identical,
    // minimal ~1.05x scale.
    featured: false,
    alignment: {
      desktop: {
        before: { scale: 1, anchor: { x: 0.445, y: 0.323 } },
        after: { scale: 1, anchor: { x: 0.486, y: 0.37 } },
        target: { x: 0.461, y: 0.339 },
      },
      mobile: {
        before: { scale: 1, anchor: { x: 0.445, y: 0.323 } },
        after: { scale: 1, anchor: { x: 0.486, y: 0.37 } },
        target: { x: 0.461, y: 0.339 },
      },
    },
  },
  {
    id: "case-08",
    title: "Dental Crown Restoration",
    description: "A damaged front tooth rebuilt with a natural-looking ceramic crown.",
    treatmentCategories: ["crowns"],
    aspectRatio: "16/9",
    beforeImage: "/images/smile-gallery/case-08-before.webp",
    afterImage: "/images/smile-gallery/case-08-after.webp",
    beforeAlt: "Patient's damaged front tooth before crown treatment.",
    afterAlt: "Patient's smile after crown treatment.",
    // No alignment: both photos are native ~1.777/1 (1356x763), an almost
    // exact match to this card's "16/9" container, so cover mode needs no
    // baseline crop for either.
    featured: false,
  },
  {
    id: "case-09",
    title: "Smile Rehabilitation",
    description: "Comprehensive aesthetic restoration designed to improve function and create a natural-looking smile.",
    treatmentCategories: ["smile-rehabilitation"],
    aspectRatio: "16/9",
    beforeImage: "/images/smile-gallery/case-09-before.webp",
    afterImage: "/images/smile-gallery/case-09-after.webp",
    beforeAlt: "Patient's smile before treatment.",
    afterAlt: "Patient's smile after treatment.",
    // The featured case (as on the reference site): real lips, consistent
    // lighting between before/after, highest native resolution of the
    // candidates (1408x792 / 1088x612).
    //
    // Anchor = the dental midline / contact point between the upper central
    // incisors, identified by eye directly on the source files. Both anchors
    // sit close to frame-center natively (before 0.508, 0.36 / after 0.497,
    // 0.38).
    //
    // `target.y: 0.37` (instead of the default dead-center 0.5) keeps the
    // shared landing point close to where the dental midline already sits in
    // both native photos. Forcing center would need the coverage-safety
    // clamp to zoom in a lot, cropping the lower lip out. With the target
    // close to native and the Featured container's aspect ratio matching
    // this case's own native "16/9" (see `aspectClassName` in
    // smile-gallery/_components.tsx), both photos render close to their true
    // native framing, full upper and lower lip included.
    featured: true,
    alignment: {
      desktop: {
        before: { scale: 1, anchor: { x: 0.508, y: 0.36 } },
        after: { scale: 1, anchor: { x: 0.497, y: 0.38 } },
        target: { x: 0.5, y: 0.37 },
      },
      // Anchor math is resolution-independent (it's recalculated from the
      // container's actual live pixel size on every render), so mobile
      // reuses the exact same anchor/scale/target.
      mobile: {
        before: { scale: 1, anchor: { x: 0.508, y: 0.36 } },
        after: { scale: 1, anchor: { x: 0.497, y: 0.38 } },
        target: { x: 0.5, y: 0.37 },
      },
    },
  },
  {
    id: "case-10",
    title: "Porcelain Veneers",
    description: "Custom-made porcelain veneers designed to enhance the shape, colour, and harmony of the smile.",
    treatmentCategories: ["veneers"],
    aspectRatio: "16/9",
    beforeImage: "/images/smile-gallery/case-10-before.webp",
    afterImage: "/images/smile-gallery/case-10-after.webp",
    beforeAlt: "Patient's smile before treatment.",
    afterAlt: "Patient's smile after treatment.",
    featured: false,
    // Both photos are native ~16/9 (exact match to this card's aspect
    // ratio), so cover mode shows each edge-to-edge with zero native crop;
    // both render at their native scale, which already matches in
    // magnification.
  },
  {
    id: "case-12",
    title: "Porcelain Veneers",
    description: "Custom-made porcelain veneers designed to enhance the shape, colour, and harmony of the smile.",
    treatmentCategories: ["veneers"],
    aspectRatio: "16/9",
    // Frontal close-up smile photography (same patient, same angle, real
    // matched before/after -- not a clinical/retracted shot). Before is
    // 1084x460 (~2.36/1), after is 1084x484 (~2.24/1). "contain" is the
    // safe default here (used by the lightbox modal); GalleryGrid.tsx
    // overrides to a near-native "cover" crop for this card's edge-to-edge
    // grid display -- see the comment there for the exact reasoning.
    imageFit: "contain",
    beforeImage: "/images/smile-gallery/case-12-before.webp",
    afterImage: "/images/smile-gallery/case-12-after.webp",
    beforeAlt: "Patient's smile before treatment.",
    afterAlt: "Patient's smile after treatment.",
    // Anchor = dental midline / contact point between the upper central
    // incisors, visually confirmed with a cropped crosshair on both source
    // files. The two photos were cropped to different heights, so the anchor
    // sits much higher in "after" (y 0.368) than in "before" (y 0.528) -- a
    // real ~16% native vertical offset, not a measurement error. "Before"
    // only ever needs to crop its top 14% (well above the visible upper lip)
    // and "after" only its bottom ~18% (well below the visible lower lip).
    // `2.76/1` (see GalleryGrid.tsx) is just past the numerically-solved
    // minimum (~2.7477) where both photos reach scale 1.0 on that safe
    // window; `target.y: 0.45` is the paired solve for that container.
    featured: false,
    alignment: {
      desktop: {
        before: { scale: 1, anchor: { x: 0.5185, y: 0.5283 } },
        after: { scale: 1, anchor: { x: 0.5028, y: 0.3678 } },
        target: { x: 0.51, y: 0.45 },
      },
      mobile: {
        before: { scale: 1, anchor: { x: 0.5185, y: 0.5283 } },
        after: { scale: 1, anchor: { x: 0.5028, y: 0.3678 } },
        target: { x: 0.51, y: 0.45 },
      },
    },
  },
  {
    // The same emergency-repair photography used on the home page's
    // emergency section and on the emergency treatment page, reused here so
    // the "Emergency & Aesthetic Dentistry" filter has real cases behind it.
    id: "case-15",
    title: "Emergency & Aesthetic Dentistry",
    description: "Fast, discreet aesthetic repair for broken, damaged or missing front teeth.",
    treatmentCategories: ["emergency"],
    aspectRatio: "4/3",
    beforeImage: "/images/home/emergency-care-2-before.webp",
    afterImage: "/images/home/emergency-care-2-after.webp",
    beforeAlt: "Patient's smile before an aesthetic repair of the front teeth.",
    afterAlt: "Patient's smile after an aesthetic repair of the front teeth.",
    featured: false,
    alignment: EMERGENCY_2_ALIGNMENT,
  },
  {
    id: "case-16",
    title: "Emergency & Aesthetic Dentistry",
    description: "Fast, discreet aesthetic repair for broken, damaged or missing front teeth.",
    treatmentCategories: ["emergency"],
    aspectRatio: "4/3",
    beforeImage: "/images/home/emergency-care-before.webp",
    afterImage: "/images/home/emergency-care-after.webp",
    beforeAlt: "Patient's smile before an aesthetic repair of the front teeth.",
    afterAlt: "Patient's smile after an aesthetic repair of the front teeth.",
    featured: false,
    alignment: EMERGENCY_ALIGNMENT,
  },
  {
    // Close-up clinical photo of a single posterior (back) tooth, not a
    // full-smile shot -- both source photos are near-identical, extremely
    // tight crops of the same three teeth (before 417x206, ~2.024/1; after
    // 416x206, ~2.019/1), so no alignment is needed. "contain" is used
    // because the lightbox modal renders at a fixed 16/10 box, meaningfully
    // narrower than this pair's ~2.02/1 native ratio -- "cover" there would
    // crop into the already-tight-margin flanking teeth. It has no visible
    // effect in the grid, which already uses this pair's own native ratio.
    id: "case-18",
    title: "Dental Crown",
    description: "A damaged back tooth restored with a natural-looking dental crown.",
    treatmentCategories: ["crowns"],
    aspectRatio: "416/206",
    imageFit: "contain",
    beforeImage: "/images/smile-gallery/case-18-before.webp",
    afterImage: "/images/smile-gallery/case-18-after.webp",
    beforeAlt: "Patient's damaged back tooth before crown treatment.",
    afterAlt: "Patient's back tooth after crown treatment.",
    featured: false,
  },
];

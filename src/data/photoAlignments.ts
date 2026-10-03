import type { CaseAlignment } from "@/components/gallery/BeforeAfterSlider";

/**
 * Alignment for the two emergency-repair photo pairs, shared by the home
 * page's emergency section, the emergency treatment page and the Smile
 * Gallery's case-15/case-16 entries, so every page reuses one calibration.
 * See `CaseAlignment` in BeforeAfterSlider.tsx for the anchor/scale
 * semantics. Ported unchanged from the reference site.
 */

// No transform: at the shared "4/3" container, native
// emergency-care-before.webp (1600x1312, ~1.22/1) and emergency-care-after
// (1599x1103, ~1.45/1) already crop safely at scale 1 with zero translate --
// before crops ~4.3% off top/bottom (into plain forehead/chin skin, well
// clear of the eyebrows and lips), after crops ~4% off each side (into
// cheek skin, well clear of the mouth).
export const EMERGENCY_ALIGNMENT: CaseAlignment = {};

// No transform: at the shared "4/3" container, native
// emergency-care-2-before.webp (915x401, ~2.28/1) already crops safely to
// ~58% of its own width at scale 1 with zero translate -- the missing-tooth
// gap and both lips stay centered and fully visible.
export const EMERGENCY_2_ALIGNMENT: CaseAlignment = {};

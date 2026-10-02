// Smile Gallery and photo-related UI copy (Smile Gallery page, the home page's
// before/after sections, photo captions and image alt text). Kept in its own
// module and spread into the English dictionary (en.ts), like en.treatments.ts.
//
// ARUBA DRAFT: ported (English only) from the reference practice's site. The
// before-and-after cases were treated by Sam Abdin; nothing here says they
// were treated in Aruba or that they are Aruba patients. Removed on the way:
// every Amsterdam/Osdorp reference, prices, "1 hour" / same-day promises and
// call buttons. Lines written new for Aruba are marked "ARUBA DRAFT: new copy".
// Everything here needs practice review before launch.

const TITLE_SUFFIX = " | Dentacare Aruba";

const galleryCopy = {
  /** `<title>` and meta description for /smile-gallery (see pageMeta.ts). */
  smileGalleryMeta: {
    title: `Smile Gallery${TITLE_SUFFIX}`,
    // ARUBA DRAFT: new copy, needs practice review.
    description: "Before-and-after photos of veneers, crowns and aesthetic repairs by Sam Abdin. Results differ from person to person.",
  },

  smileGallery: {
    heroEyebrow: "Real Smiles. Real Patients. Real Results.",
    heroTitle: "Results",
    heroDescription:
      "Every smile is individually designed — real transformations, planned and delivered with precision and care.",
    // ARUBA DRAFT: new copy, needs practice review.
    treatedByNote: "All cases shown were treated by Sam Abdin. Results differ from person to person.",
    featuredBadge: "Featured Transformation",
    featuredCaption: "Drag to compare before and after",
    patientResultsEyebrow: "Patient Results",
    seeTheDifference: "See the Difference",
    seeTheDifferenceDescription: "Drag the slider to explore this patient's smile before and after treatment.",
    disclaimer: "Every smile is unique. Treatment outcomes may vary between patients.",
    caseCaption: "Real patient transformation. Individual results may vary.",
    browseEyebrow: "Patient Gallery",
    browseTitle: "More Real Patient Results",
    browseDescription: "Drag each slider to compare a patient's smile before and after their treatment.",
    before: "Before",
    after: "After",
    relatedTreatment: "Related treatment",
    sliderLabel: "Compare before and after dental treatment",
    filters: {
      all: "All Results",
      smileRehabilitation: "Smile Rehabilitation",
      compositeBonding: "Composite Veneers",
      crowns: "Crowns",
      veneers: "Porcelain Veneers",
      // ARUBA DRAFT: new copy, needs practice review (was "1 Hour Emergency
      // Aesthetic Dentistry"; now the treatment's name on this site).
      emergency: "Emergency & Aesthetic Dentistry",
    },
    viewCase: "View full case",
    modalClose: "Close",
    modalPrevious: "Previous case",
    modalNext: "Next case",
  },

  smileGalleryPreview: {
    eyebrow: "Smile Gallery",
    title: "Real Results, Real Stories",
    // ARUBA DRAFT: new copy, needs practice review (was "A glimpse of the
    // transformations our patients trust us with").
    description: "A glimpse of smile transformations by Sam Abdin.",
    cta: "View Full Smile Gallery",
  },

  /** Home page section showing the two emergency-repair photo pairs. */
  emergencyService: {
    // ARUBA DRAFT: new copy, needs practice review (was "Signature Emergency
    // Service").
    eyebrow: "Aesthetic Repair",
    // The treatment's name on this site (was "1 Hour Emergency Aesthetic Dentistry").
    title: "Emergency & Aesthetic Dentistry",
    // ARUBA DRAFT: new copy, needs practice review (the reference promised
    // "fast and precise aesthetic solutions", a price range and a call button).
    description:
      "Aesthetic repair of broken, damaged or missing front teeth, on the dates the dentist is in Aruba.",
    beforeAlt: "Patient's smile before an aesthetic repair of the front teeth.",
    afterAlt: "Patient's smile after an aesthetic repair of the front teeth.",
  },

  /** Treatments hub: before/after hero badge and the patient-case row. */
  treatmentsHeroBadge: {
    title: "Personalized Care",
    text: "A tailored approach for every patient.",
  },
  treatmentsGallery: {
    eyebrow: "Real Results, Real Patients",
    title: "Transformations We're Proud Of",
    cta: "View All Results",
  },

  /** Detail pages: link to the Smile Gallery filtered to the page's treatment. */
  galleryLinks: {
    resultsLink: "View before-and-after results",
  },

  imageAlts: {
    // ARUBA DRAFT: new copy, needs practice review (was "Professional portrait
    // of Dr. Sam Abdin, dentist at Dentacare Osdorp").
    samPortrait: "Portrait of Sam Abdin, dentist",
    preventionCleaning: "Professional dental cleaning using an ultrasonic scaler and dental mirror.",
  },
};

export default galleryCopy;

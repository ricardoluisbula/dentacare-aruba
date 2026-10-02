// Treatment-related UI copy (treatments hub, treatment detail pages,
// prevention & hygiene, emergency page). Kept in its own module and spread
// into the English dictionary (en.ts) so treatment content can be maintained
// separately from the site chrome.
//
// ARUBA DRAFT: ported (English only) from the reference practice's site, which
// offers the same treatments. Removed on the way: every price, every
// Amsterdam/Netherlands reference, phone numbers, the online "Dental Check"
// tool, before-and-after and patient-photo copy, and any promise of same-day
// or one-hour availability (the dentist is only in Aruba on specific published
// dates). Lines written new for Aruba are marked "ARUBA DRAFT: new copy".
// Everything here needs practice review before launch.

const DRAFT_SUFFIX = " | Dentacare Aruba (Draft)";

const treatmentsCopy = {
  /** `<title>` and meta description for every route in this module. */
  treatmentsMeta: {
    hub: {
      title: `Dental Treatments${DRAFT_SUFFIX}`,
      description:
        "Our dental treatments: from check-ups and aesthetic repair to crowns and bridges, implants, veneers, clear aligners and night guards for teeth grinding.",
    },
    prevention: {
      title: `Prevention & Hygiene${DRAFT_SUFFIX}`,
      description:
        "Dental hygiene and prevention: check-ups, professional cleaning, what prevention can and cannot do, and what you can do at home.",
    },
    emergency: {
      title: `Emergency & Aesthetic Dentistry${DRAFT_SUFFIX}`,
      description:
        "Aesthetic repair of broken or damaged front teeth: who it may help, what happens during the visit, realistic expectations and what to do after an injury.",
    },
    details: {
      "porcelain-veneers": {
        title: `Porcelain Veneers${DRAFT_SUFFIX}`,
        description: "Porcelain veneers: what the treatment involves, who it may suit, the process, its limitations and aftercare.",
      },
      "composite-restorations": {
        title: `Composite Veneers${DRAFT_SUFFIX}`,
        description:
          "Composite veneers: improving the shape, colour and appearance of teeth with tooth-coloured resin — the process, realistic expectations and aftercare.",
      },
      "dental-crowns-bridges": {
        title: `Crowns and Bridges${DRAFT_SUFFIX}`,
        description: "Crowns and bridges: when they may be needed, the treatment process, their limitations and aftercare.",
      },
      "dental-implants": {
        title: `Dental Implants${DRAFT_SUFFIX}`,
        description: "Dental implants: what an implant is, who it may suit, the examination, the treatment process and aftercare.",
      },
      "clear-aligners": {
        title: `Clear Aligners${DRAFT_SUFFIX}`,
        description: "Clear aligners: how the treatment works, who it may suit, the process, its limitations and retention afterwards.",
      },
      "root-canal-therapy": {
        title: `Root Canal Treatment${DRAFT_SUFFIX}`,
        description: "Root canal treatment: when it may be needed, what happens during treatment, its limitations and aftercare.",
      },
      "night-guards": {
        title: `Custom Night Guard for Teeth Grinding${DRAFT_SUFFIX}`,
        description:
          "A custom night guard to help protect your teeth and restorations from wear caused by grinding or clenching (bruxism).",
      },
    } as Record<string, { title: string; description: string }>,
  },

  treatmentsPage: {
    heroEyebrow: "Your Smile. Our Expertise.",
    heroTitle: "Dental Treatments",
    // ARUBA DRAFT: new copy, needs practice review (was "in Amsterdam Osdorp").
    heroAccent: "in Aruba",
    heroDescription:
      "Every smile is unique. That's why we offer a complete range of aesthetic and functional treatments, with attention to detail and natural-looking results.",
    heroCta: "Explore our treatments",
    trustStrip: {
      invasiveTitle: "Minimally Invasive",
      invasiveText: "Treatment that protects your natural tooth structure.",
      personalTitle: "Personalized Care",
      personalText: "Every treatment plan is built around you.",
      communicationTitle: "Transparent Communication",
      communicationText: "Clear guidance, at every step of your journey.",
      // ARUBA DRAFT: new copy, needs practice review (the reference promised
      // "fast attention when dental damage needs urgent care").
      repairTitle: "Aesthetic Repair",
      repairText: "Repair of damaged front teeth, on the dates the dentist is in Aruba.",
    },
    featuredEyebrow: "Our Treatments",
    featuredTitle: "The Right Treatment for Every Smile",
    remainingEyebrow: "More Treatments",
    remainingTitle: "Explore Our Full Range",
    quickFacts: {
      personalizedAssessment: "Personalized assessment",
      naturalAppearance: "Natural appearance",
      treatmentPlanRequired: "Treatment plan required",
      suitableCasesVary: "Suitable cases vary",
      gentleApproach: "Gentle, preventive care",
    },
    comparison: {
      eyebrow: "Which Treatment Suits You?",
      title: "Compare and Find the Right Option",
      description:
        "Not sure which treatment fits your situation? Compare common concerns to see which options are typically considered.",
      cta: "View Comparison",
      goalColumn: "Concern",
      rows: {
        discoloration: "Discoloration",
        chipped: "Chipped or fractured tooth",
        missing: "Missing tooth",
        rapid: "Rapid aesthetic concern",
        strengthen: "Strengthening a damaged tooth",
      },
      suitableLabel: "May be suitable",
      notTypicalLabel: "Not typically used for this",
      disclaimer: "During a personal consultation, we're happy to advise you on what best suits your situation.",
    },
    finalCta: {
      title: "Plan a personal consultation and discover the possibilities.",
      description:
        "Our team is ready to listen, answer your questions, and help you find the right next step for your smile.",
    },
    /** Descriptive link text per treatment -- never just the treatment's name. */
    treatmentLinks: {
      "porcelain-veneers": "Read more about veneers",
      "composite-restorations": "About composite veneers",
      "dental-crowns-bridges": "Crown or bridge: the process",
      "dental-implants": "How implants work",
      "emergency-aesthetic-dentistry": "See the emergency treatment",
      "clear-aligners": "How clear aligners work",
      "root-canal-therapy": "About root canal treatment",
      "preventive-care": "What preventive care involves",
      "night-guards": "More about night guards",
    },
    categories: {
      cosmetic: "Cosmetic",
      restorative: "Restorative",
      orthodontic: "Orthodontic",
      preventive: "Preventive & Protective",
      emergency: "Emergency & Aesthetic",
    },
  },

  treatmentDetail: {
    backToTreatments: "All treatments",
    overviewTitle: "About this treatment",
    suitableTitle: "Who this may suit",
    suitableIntro:
      "This is not a diagnosis. Whether a treatment is appropriate in your situation can only be established during an in-person examination. A conversation may be worthwhile if you recognize the following:",
    processTitle: "Examination and treatment process",
    processIntro: "The process differs from patient to patient. In broad terms it looks like this:",
    limitationsTitle: "Limitations and realistic expectations",
    aftercareTitle: "Aftercare and maintenance",
    faqTitle: "Frequently asked questions",
    relatedTitle: "See also",
    // Last sentence of the reference ("call the practice directly rather than
    // using the contact form") removed: no direct contact actions on these pages.
    disclaimer:
      "This page is general information, not medical advice or a treatment plan. Whether a treatment is suitable and feasible depends on your oral health, the clinical situation and an examination at the practice. Outcomes, duration and cost differ from patient to patient.",
    ctaTitle: "Questions about this treatment?",
    ctaDescription:
      "Get in touch for a personal consultation. We will discuss your situation, the options, and what you can realistically expect.",
  },

  emergencyTreatmentPage: {
    heroEyebrow: "Aesthetic Repair",
    // ARUBA DRAFT: new safety copy, needs practice review.
    safetyTitle: "Only on the dates the dentist is in Aruba",
    // ARUBA DRAFT: new safety copy, needs practice review.
    safetyBody:
      "This treatment is only available on the dates the dentist is in Aruba. If you have severe pain, swelling, bleeding or an injury and no dates are available, do not wait: seek care from another dental or medical service in Aruba.",
    helpEyebrow: "Who This May Help",
    helpTitle: "Who This Treatment May Help",
    helpIntro:
      "This is not a diagnosis — suitability can only be confirmed during an in-person examination. It may be worth a conversation if you have:",
    helpItems: [
      "Chipped or fractured front teeth",
      "A suddenly damaged visible tooth",
      "A missing or broken aesthetic restoration",
      "An urgent cosmetic concern that needs professional assessment",
    ],
    helpClosing: "If any of these sound familiar, the next step is simply a conversation with our team.",
    processEyebrow: "What to Expect",
    processTitle: "What Happens During the Visit",
    processSteps: [
      {
        title: "Initial Assessment",
        description: "We examine the damage and the surrounding tooth structure to understand what happened and what's involved.",
      },
      {
        title: "Discussion of Suitable Options",
        description: "We talk through the realistic options for your situation, so you understand what's possible before anything is decided.",
      },
      {
        title: "Aesthetic Repair or Provisional Solution",
        description: "Where clinically appropriate, we carry out an aesthetic repair or place a provisional solution during the same visit.",
      },
      {
        title: "Aftercare and Follow-Up Guidance",
        description: "You'll leave with clear guidance on caring for the repair and, if needed, a plan for any follow-up appointments.",
      },
    ],
    expectationsEyebrow: "Honest Expectations",
    expectationsTitle: "Expectations and Limitations",
    expectationsItems: [
      "The dentist must first assess the damage before any treatment is recommended.",
      "The right treatment option depends on the condition of the tooth and the surrounding tissue.",
      "A temporary or a definitive solution may be recommended, depending on your situation.",
      "Additional treatment is sometimes necessary to complete the repair.",
      "Individual outcomes vary from patient to patient.",
    ],
    faqEyebrow: "Good to Know",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        question: "Toothache: when should I see a dentist?",
        // ARUBA DRAFT: new copy, needs practice review (the reference said
        // "call the same day", gave the Amsterdam phone and emergency numbers,
        // and pointed to its online Dental Check).
        answer:
          "Have it assessed promptly if the pain keeps you awake, does not respond to ordinary painkillers, comes with a swollen cheek or a fever, or if something broke or came loose after an accident. Brief sensitivity to cold or sweet things is less urgent, but have it assessed if it lasts more than a few days or gets worse. Trouble breathing or swallowing because of swelling needs emergency medical care straight away.",
      },
      {
        question: "Broken tooth: what should I do?",
        // ARUBA DRAFT: new copy, needs practice review (first-aid steps ported;
        // "call us straight away" and the phone number replaced).
        answer:
          "Keep the broken piece in milk or saliva and bring it with you. Rinse your mouth with lukewarm water and press a clean gauze on any bleeding. If a whole tooth has been knocked out, hold it by the crown (not the root), do not clean it, and seek dental care immediately: with a knocked-out adult tooth every minute counts. If the dentist is not in Aruba at that moment, go to another dental or medical service without waiting.",
      },
      {
        question: "Can every damaged tooth be repaired in one appointment?",
        answer:
          "Not always. We review each case individually — many aesthetic repairs can often be completed in a single visit, but the right approach depends on the extent of the damage and the health of the surrounding tooth structure, which can only be confirmed during an examination.",
      },
      {
        question: "What should I do immediately after damaging a front tooth?",
        // ARUBA DRAFT: new copy, needs practice review (the reference said
        // "contact the clinic as soon as possible").
        answer:
          "Arrange a dental examination as soon as possible so the situation can be assessed — here on the dates the dentist is in Aruba, or with another dental service if the dentist is not. If you still have the broken piece, it's helpful to bring it with you.",
      },
      {
        question: "Will the result look natural?",
        // "digital planning" removed from the reference answer.
        answer:
          "Aesthetic repairs are planned to blend with your natural teeth in shape and colour, using materials matched to your smile. As with any dental treatment, the exact outcome depends on the individual case.",
      },
      {
        question: "Is an examination necessary first?",
        answer:
          "Yes. Every treatment option depends on a clinical assessment of the tooth and surrounding tissue, so an examination is always the first step before any repair is recommended.",
      },
      {
        question: "How is the final cost determined?",
        answer:
          "The final price depends on the number of teeth involved, the clinical situation, the materials used, and the agreed treatment plan. You'll receive a clear estimate after your examination.",
      },
    ],
    finalCtaTitle: "Ready to Discuss Your Situation?",
    finalCtaDescription: "Get in touch and we will help you understand the right next step for your smile.",
  },

  preventionHygienePage: {
    heroEyebrow: "Preventive Care",
    heroTitle: "Prevention & Hygiene",
    heroSubtitle: "Healthy teeth start with prevention.",
    heroDescription:
      "Regular preventive care and professional hygiene help keep your teeth and gums healthy, and allow us to identify potential dental problems earlier — before they become bigger concerns.",
    whyEyebrow: "Why It Matters",
    whyTitle: "Why Prevention Matters",
    benefits: [
      { title: "Maintains Healthy Teeth & Gums", description: "Helps support strong teeth and healthy gums." },
      { title: "Removes Plaque & Tartar", description: "Helps prevent the buildup of plaque and hardened tartar." },
      { title: "Supports Gum Health", description: "Helps reduce the risk of gum issues and inflammation." },
      { title: "Identifies Problems Earlier", description: "Potential issues can be detected and treated sooner." },
      { title: "Improves Daily Oral Hygiene", description: "Personal guidance for better habits at home." },
      { title: "Protects Your Dental Work", description: "Helps maintain restorations like crowns, veneers, bridges and more." },
    ],
    servicesEyebrow: "What We Offer",
    servicesTitle: "Prevention & Hygiene Services",
    services: [
      {
        title: "Periodic Dental Check-ups",
        // ARUBA DRAFT: new copy, needs practice review (the reference
        // recommended visits "approximately twice a year"; the Aruba interval
        // has not been confirmed).
        description:
          "Routine dental examinations allow us to assess the condition of your teeth, gums, and existing restorations, and to identify potential problems early. How often you should come depends on your individual needs; the dentist will recommend an interval for you.",
      },
      {
        title: "Professional Dental Cleaning",
        description: "Professional removal of plaque, tartar and surface deposits that are difficult to remove with regular brushing.",
      },
      {
        title: "Plaque & Tartar Removal",
        description: "We remove soft plaque and hardened tartar to help maintain a healthy mouth.",
      },
      {
        title: "Gum Health Assessment",
        description: "We evaluate your gums for any signs that may require additional attention or care.",
      },
      {
        title: "Personal Oral Hygiene Guidance",
        description: "Receive practical advice on brushing, interdental cleaning and maintaining good oral hygiene at home.",
      },
      {
        title: "Maintenance of Dental Restorations",
        description: "Routine hygiene and check-ups help protect restorations such as veneers, crowns, bridges and composite fillings.",
      },
    ],
    processEyebrow: "Your Visit",
    processTitle: "What Happens During Your Visit?",
    processSteps: [
      { title: "Assessment", description: "Your teeth, gums and existing restorations are carefully assessed." },
      { title: "Professional Cleaning", description: "Plaque, tartar and surface deposits are professionally removed as needed." },
      { title: "Personal Guidance", description: "You receive practical advice to help maintain good oral hygiene at home." },
      { title: "Follow-up", description: "When appropriate, we recommend follow-up care or further assessment." },
    ],
    protectTitle: "Protect the Smile You've Invested In",
    protectDescription:
      "If you have veneers, crowns, bridges, composite restorations or other dental work, regular professional care and good daily hygiene are essential to help maintain their appearance and longevity. We're here to help you keep your smile healthy and beautiful.",
    relatedTitle: "When something needs repairing or protecting",
    relatedIntro:
      "Prevention lowers the chance of problems but cannot rule them out. More about the treatments that may then come up — from repair to protection against teeth grinding:",
    faqEyebrow: "Good to Know",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        question: "Bleeding gums: what now?",
        // Closing pointer to the reference site's online Dental Check removed.
        answer:
          "Bleeding gums usually signal inflammation from plaque along the gumline, not brushing too hard. Keep brushing the area carefully and clean between your teeth every day; with early inflammation the bleeding often settles within one to two weeks. If it lasts longer, if your gums recede, if a tooth feels loose or your breath smells unpleasant, have it assessed: that can point to periodontitis, which can only be established at the practice.",
      },
      {
        question: "Why is professional dental cleaning important?",
        answer:
          "Professional cleaning removes plaque and tartar that regular brushing at home cannot fully reach, helping support healthy teeth and gums.",
      },
      {
        question: "What's the difference between plaque and tartar?",
        answer:
          "Plaque is a soft, sticky film of bacteria that forms on teeth every day. If it isn't removed, it can harden into tartar, which can only be removed with professional cleaning.",
      },
      {
        question: "Do crowns and veneers still need professional cleaning?",
        answer:
          "Yes. Restorations such as crowns and veneers still sit alongside your natural teeth and gums, so regular hygiene visits help protect both the restoration and the surrounding tissue.",
      },
      {
        question: "Can professional cleaning remove surface staining?",
        answer: "Professional cleaning can help reduce some surface staining, though results vary depending on its cause and extent.",
      },
      {
        question: "How can I maintain healthy gums at home?",
        answer:
          "Consistent brushing, interdental cleaning and following the personal guidance given during your visit all help support healthy gums between appointments.",
      },
      {
        question: "How often should I have a dental check-up or cleaning?",
        answer:
          "This depends on your individual oral health needs. During your assessment, we'll recommend an interval that's appropriate for you rather than one fixed schedule for everyone.",
      },
    ],
    contactTitle: "Have Questions or Want to Schedule an Appointment?",
    contactDescription:
      "We're here to help you maintain a healthy, confident smile. Get in touch with our team — we'd be happy to assist you.",
  },

  nightGuardSpotlight: {
    // Same text as the heading it links to on the night guard page.
    definitionLink: "What is teeth grinding?",
    eyebrow: "Do you grind or clench?",
    note: "A protective guard for grinding and clenching — not an orthodontic retainer.",
  },
};

export default treatmentsCopy;

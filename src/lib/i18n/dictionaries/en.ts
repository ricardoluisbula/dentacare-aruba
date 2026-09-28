// English dictionary -- ARUBA DRAFT.
//
// Every string here is deliberately free of clinic facts. The reference
// (Amsterdam) site's copy -- address, phone, hours, prices, reviews, patient
// cases, staff, "since 2009", treatment claims, legal text -- has NOT been
// carried over. Placeholders say plainly that details are still to come.
// Replace them with the practice's confirmed copy before launch
// (docs/ARUBA-LAUNCH-CHECKLIST.md).
const en = {
  common: {
    scrollToTop: "Scroll to top",
    cookieConsentAriaLabel: "Cookie consent",
    cookieConsentMessage: "We use privacy-friendly analytics to understand how our website is used. No personal or medical information is ever tracked.",
    cookieConsentAccept: "Accept",
    cookieConsentDecline: "Decline",
    cookieConsentCurrentGranted: "You have allowed analytics cookies. You can change or withdraw that choice here.",
    cookieConsentCurrentDenied: "You have declined analytics cookies.",
    cookieSettings: "Cookie settings",
    cookieSettingsClose: "Close",
  },
  nav: {
    home: "Home",
    about: "About",
    treatments: "Treatments",
    preventionHygiene: "Prevention & Hygiene",
    smileGallery: "Smile Gallery",
    team: "Our Team",
    reviews: "Reviews",
    contact: "Contact",
  },
  header: {
    languageLabel: "Select website language",
    // Small heading above the mobile menu's language list.
    languageHeading: "Language",
    // Beside a language that has no version of the current page.
    languageFallback: "in English",
    menuLabel: "Main menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    // Desktop "Treatments" nav dropdown (see TreatmentsDropdown.tsx).
    treatmentsMenu: {
      label: "Treatments menu",
    },
  },
  draft: {
    // Short marker shown wherever a real clinic detail would otherwise go.
    pending: "To be confirmed",
    badge: "Draft preview",
    notice: "Draft preview — not a live clinic website. Clinic details are still being confirmed.",
  },
  hero: {
    badge: "Draft preview",
    headlinePrefix: "Dentacare Aruba",
    headlineAccent: "Artistry in every smile",
    paragraph:
      "This is an early draft of the new Dentacare Aruba website. Treatments, team, opening hours and contact details will appear here once the practice has confirmed them.",
    ctaPending: "Appointments — details to follow",
    ctaOverview: "See what's planned",
    reassurance: "Draft preview · not yet a live clinic website",
    imagePlaceholderTitle: "Hero photograph",
    imagePlaceholderNote: "Aruba clinic photo to be supplied",
  },
  overview: {
    eyebrow: "The new website",
    title: "Every page is in place, ready for Aruba's own details",
    description:
      "The layout, navigation and styling are ready. Each section below is waiting on information only the practice can confirm.",
    status: "Awaiting details",
    open: "Open page",
    items: {
      treatments: {
        title: "Treatments",
        body: "The treatments offered in Aruba, described in the practice's own words.",
      },
      team: {
        title: "Our Team",
        body: "The dentists and staff who will see patients, with their confirmed credentials.",
      },
      smileGallery: {
        title: "Smile Gallery",
        body: "Before-and-after cases from Aruba patients, published only with their consent.",
      },
      reviews: {
        title: "Reviews",
        body: "Genuine reviews from Aruba patients, linked to their original source.",
      },
      visit: {
        title: "Visit & Opening Hours",
        body: "The clinic's address, directions and opening hours.",
      },
      contact: {
        title: "Contact",
        body: "Phone, WhatsApp and email for the Aruba practice, and how appointments are made.",
      },
    },
  },
  cta: {
    eyebrow: "Before launch",
    title: "Clinic details will appear here once confirmed",
    description:
      "Contact options are switched off in this draft so that no message or call can reach the wrong clinic.",
    button: "Contact page (preview)",
  },
  draftPage: {
    panelEyebrow: "Content in preparation",
    panelTitle: "This page is waiting for the practice's details",
    needsHeading: "To publish this page we need",
    backHome: "Back to home",
  },
  // One entry per placeholder page: its hero copy and the exact information
  // still needed to publish it.
  pages: {
    about: {
      title: "About Dentacare Aruba",
      description: "The story of the Aruba practice will be told here.",
      needs: [
        "A short description of the Aruba practice in your own words",
        "When and where the practice opened or will open",
        "Photos of the Aruba clinic interior and exterior",
      ],
    },
    smileGallery: {
      title: "Smile Gallery",
      description: "Before-and-after results from Aruba patients will be shown here.",
      needs: [
        "Before-and-after photo pairs from Aruba patients",
        "Written consent from each patient for publication",
        "The treatment performed for each case",
      ],
    },
    treatments: {
      title: "Treatments",
      description: "The treatments offered in Aruba will be listed here.",
      needs: [
        "The confirmed list of treatments offered in Aruba",
        "A short description of each treatment you want published",
        "Whether emergency appointments are offered, and how",
      ],
    },
    preventionHygiene: {
      title: "Prevention & Hygiene",
      description: "Information about check-ups and preventive care will appear here.",
      needs: [
        "Which check-up and hygiene services the Aruba practice offers",
        "Recommended check-up intervals you want to communicate",
      ],
    },
    team: {
      title: "Our Team",
      description: "The Aruba team will be introduced here.",
      needs: [
        "Name, role and short biography for each team member",
        "Qualifications and registrations you want shown, as they appear officially",
        "A professional portrait of each team member",
      ],
    },
    reviews: {
      title: "Reviews",
      description: "Reviews from Aruba patients will be shown here.",
      needs: [
        "Genuine reviews from Aruba patients, with permission to publish",
        "The link to the practice's Google Business Profile (if any)",
      ],
    },
    contact: {
      title: "Contact",
      description: "Contact details for the Aruba practice will appear here.",
      needs: [
        "Clinic phone number (and whether it accepts calls, WhatsApp or both)",
        "Clinic email address",
        "Street address and a Google Maps link",
        "Opening hours, including holidays",
        "The inbox that should receive website contact-form messages",
      ],
    },
    newPatients: {
      title: "New Patients",
      description: "What new patients should know before their first visit will appear here.",
      needs: [
        "Whether the practice is accepting new patients",
        "How to register and what to bring to a first visit",
        "Accepted insurance providers, if you want these published",
      ],
    },
    pricingInfo: {
      title: "Fees & Insurance",
      description: "Information about fees and insurance will appear here.",
      needs: [
        "Whether fees should be published at all",
        "Accepted insurance and payment methods",
      ],
    },
    privacy: {
      title: "Privacy Policy",
      description: "The practice's privacy policy will be published here.",
      needs: [
        "The legal name of the practice entity",
        "A privacy policy reviewed for Aruba law",
        "Contact details for privacy questions",
      ],
    },
    cookies: {
      title: "Cookie Policy",
      description: "The website's cookie policy will be published here.",
      needs: [
        "Whether website analytics will be used",
        "A cookie policy reviewed for Aruba law",
      ],
    },
  },
  footer: {
    description: "Draft website for Dentacare Aruba. Clinic details will be added once confirmed.",
    exploreHeading: "Explore",
    visitHeading: "Visit",
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "Email",
    hoursLabel: "Opening hours",
    rightsReserved: "All rights reserved.",
    legalNavLabel: "Legal information",
    privacyPolicyLink: "Privacy Policy",
    cookiePolicyLink: "Cookie Policy",
    pricingInfoLink: "Fees & Insurance",
    newPatientsLink: "New Patients",
  },
  notFound: {
    title: "This page doesn't exist",
    description: "The page you're looking for doesn't exist or has moved. Here's the way back.",
    backHome: "Back to home",
    contactUs: "Contact",
  },
  a11y: {
    opensInNewTab: "(opens in a new tab)",
    skipToContent: "Skip to content",
  },
};

export default en;
export type Dictionary = typeof en;

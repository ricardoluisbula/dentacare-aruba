// English dictionary -- ARUBA DRAFT.
//
// Only details the practice has confirmed appear here: the address
// (Morgenster 35C, Aruba), WhatsApp for messages, Instagram, the dentist (Sam
// Abdin, with his two verified credentials) and the treatments (see
// en.treatments.ts). Still NOT carried over from the reference (Amsterdam)
// site: its address, phone numbers, hours, prices, reviews, patient cases,
// legal text and any claim about how long the Aruba practice has operated.
// Placeholders say plainly what is still to come
// (docs/ARUBA-LAUNCH-CHECKLIST.md).
import treatmentsCopy from "./en.treatments";

const en = {
  ...treatmentsCopy,
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
    instagramLabel: "Dentacare on Instagram (opens in a new tab)",
    // Desktop "Treatments" nav dropdown (see TreatmentsDropdown.tsx).
    treatmentsMenu: {
      label: "Treatments menu",
    },
  },
  draft: {
    // Short marker shown wherever a real clinic detail would otherwise go.
    pending: "To be confirmed",
    badge: "Draft preview",
    notice: "Draft preview — not yet a live clinic website. Some details are still being confirmed.",
  },
  // Appointment enquiries go by WhatsApp message. The wording must never
  // suggest that sending a message books or confirms an appointment.
  whatsapp: {
    cta: "Ask about an appointment on WhatsApp",
    short: "WhatsApp us",
    // Pre-filled text the patient can edit before sending.
    prefill: "Hello Dentacare Aruba, I would like to ask about an appointment in Aruba.",
    enquiryNote:
      "A WhatsApp message is an enquiry, not a booking. Your appointment is only confirmed once the practice replies to confirm a date and time.",
    messagesOnly: "Messages only — this number does not take calls.",
  },
  availability: {
    eyebrow: "Dates in Aruba",
    title: "When the dentist is in Aruba",
    description:
      "The practice has no fixed weekly hours. Sam Abdin works in Aruba on the dates below.",
    timeZoneNote: "All dates and times are Aruba time (AST, UTC−4).",
    hoursPending: "Hours to be confirmed",
    emptyTitle: "Upcoming dates will be announced",
    emptyBody: "There are no confirmed dates in Aruba at the moment. You can send a WhatsApp message to ask about upcoming dates.",
    moreDates: "See all upcoming dates",
    listLabel: "Upcoming dates in Aruba",
  },
  hero: {
    badge: "Draft preview",
    headlinePrefix: "Dentacare Aruba",
    headlineAccent: "Artistry in every smile",
    paragraph:
      "Dental care with Sam Abdin at Morgenster 35C, Aruba, on scheduled dates. See when the dentist is in Aruba and send a WhatsApp message to ask about an appointment.",
    ctaDates: "See upcoming dates",
    imagePlaceholderTitle: "Hero photograph",
    imagePlaceholderNote: "Aruba clinic photo to be supplied",
  },
  homeDentist: {
    eyebrow: "Your dentist",
    title: "Sam Abdin",
    body: "Sam Abdin trained at the University of Groningen and sees patients at Dentacare Aruba on the dates listed on this website.",
    cta: "About Sam Abdin",
    treatmentsCta: "Explore treatments",
  },
  overview: {
    eyebrow: "Still to come",
    title: "A few details are still being confirmed",
    description: "These parts of the website will be completed once the practice has supplied and reviewed them.",
    status: "Awaiting details",
    open: "Open page",
    items: {
      about: {
        title: "About the practice",
        body: "The Aruba practice's story and photos of the clinic.",
      },
      smileGallery: {
        title: "Smile Gallery",
        body: "Before-and-after cases from Aruba patients, published only with their consent.",
      },
      reviews: {
        title: "Reviews",
        body: "Genuine reviews from Aruba patients, linked to their original source.",
      },
      contact: {
        title: "Phone & email",
        body: "A phone number for calls and an email address for the Aruba practice.",
      },
    },
  },
  cta: {
    eyebrow: "Appointments",
    title: "Ask about an appointment in Aruba",
    description:
      "Send a WhatsApp message with your question. The practice replies to arrange a time on one of the dates the dentist is in Aruba, when one is available.",
    datesLink: "See upcoming dates",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Contact Dentacare Aruba",
    description: "Find the practice at Morgenster 35C, Aruba, and ask about appointments by WhatsApp.",
    detailsHeading: "Contact details",
    addressLabel: "Address",
    mapsLink: "Open in Google Maps",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    phoneLabel: "Phone",
    emailLabel: "Email",
    hoursLabel: "Opening hours",
    hoursValue: "No fixed weekly hours — see the dates in Aruba.",
  },
  teamPage: {
    eyebrow: "Our Team",
    title: "Meet your dentist",
    description: "Sam Abdin sees patients at Dentacare Aruba on the dates listed on this website.",
    name: "Sam Abdin",
    role: "Dentist",
    // Only verified details. "Since 2009" describes his own practice in
    // Amsterdam -- it is not a claim about the Aruba practice.
    bio: [
      "Sam Abdin is a dentist who trained at the University of Groningen (Rijksuniversiteit Groningen) in the Netherlands.",
      "He has practised dentistry in Amsterdam since 2009, and sees patients at Dentacare Aruba on the dates listed on this website.",
    ],
    credentialsHeading: "Professional information",
    educationLabel: "Education",
    educationValue: "University of Groningen (Rijksuniversiteit Groningen), Netherlands",
    experienceLabel: "Experience",
    experienceValue: "Practising dentistry in Amsterdam since 2009",
    portraitPlaceholder: "Portrait to be supplied",
    teamNote: "Other members of the Aruba team will be introduced once confirmed.",
  },
  draftPage: {
    panelEyebrow: "Content in preparation",
    panelTitle: "This page is waiting for the practice's details",
    needsHeading: "To publish this page we need",
    backHome: "Back to home",
  },
  // Hero copy and outstanding needs for pages that are still placeholders,
  // plus the <title>/description source for every page (see pageMeta.ts).
  pages: {
    about: {
      title: "About Dentacare Aruba",
      description: "The story of the Aruba practice will be told here.",
      needs: [
        "A short description of the Aruba practice in your own words",
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
    team: {
      title: "Sam Abdin, dentist",
      description: "Meet Sam Abdin, the dentist at Dentacare Aruba, Morgenster 35C, Aruba.",
      needs: [],
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
      title: "Contact & dates in Aruba",
      description: "Dentacare Aruba, Morgenster 35C, Aruba. Upcoming dates in Aruba and WhatsApp appointment enquiries.",
      needs: [],
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
        "Whether fees should be published at all, and the Aruba fees if so",
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
    description: "Dental care with Sam Abdin at Morgenster 35C, Aruba, on scheduled dates.",
    exploreHeading: "Explore",
    visitHeading: "Visit",
    addressLabel: "Address",
    whatsappLabel: "WhatsApp",
    phoneLabel: "Phone",
    emailLabel: "Email",
    datesLabel: "Dates in Aruba",
    datesLink: "See upcoming dates",
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

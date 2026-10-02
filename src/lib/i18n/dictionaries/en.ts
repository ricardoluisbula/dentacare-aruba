// English dictionary.
//
// Only details the practice has confirmed appear here: the address
// (Morgenster 35C, Aruba), WhatsApp for messages, Instagram, the dentist (Sam
// Abdin, with his two verified credentials) and the treatments (see
// en.treatments.ts). Not carried over from the reference (Amsterdam) site:
// its address, phone numbers, hours, prices, reviews, legal text and any
// claim about how long the Aruba practice has operated. Unconfirmed details
// are left out rather than shown as placeholders
// (docs/ARUBA-LAUNCH-CHECKLIST.md).
import treatmentsCopy from "./en.treatments";
import galleryCopy from "./en.gallery";

const en = {
  ...treatmentsCopy,
  ...galleryCopy,
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
    badge: "Dental care in Aruba",
    headlinePrefix: "Dentacare Aruba",
    headlineAccent: "Artistry in every smile",
    paragraph:
      "Dental care with Sam Abdin at Morgenster 35C, Aruba, on scheduled dates. See when the dentist is in Aruba and send a WhatsApp message to ask about an appointment.",
    ctaDates: "See upcoming dates",
  },
  homeDentist: {
    eyebrow: "Your dentist",
    title: "Sam Abdin",
    body: "Sam Abdin trained at the University of Groningen and sees patients at Dentacare Aruba on the dates listed on this website.",
    cta: "About Sam Abdin",
    treatmentsCta: "Explore treatments",
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
  },
  // Pages whose content is still being prepared (About, Reviews, New
  // Patients, Fees & Insurance -- unlinked -- and Privacy and Cookies, linked
  // from the footer). Patients see a short, honest note; the information
  // still needed is listed in docs/ARUBA-LAUNCH-CHECKLIST.md.
  preparingPage: {
    notice: "In the meantime, the Contact page has our address, WhatsApp and the dates the dentist is in Aruba.",
    contactLink: "Contact & dates in Aruba",
    backHome: "Back to home",
  },
  // <title>/description source for every page (see pageMeta.ts), and the
  // hero copy of the pages still being prepared.
  pages: {
    about: {
      title: "About Dentacare Aruba",
      description: "More about the practice will be published here soon.",
    },
    team: {
      title: "Sam Abdin, dentist",
      description: "Meet Sam Abdin, the dentist at Dentacare Aruba, Morgenster 35C, Aruba.",
    },
    reviews: {
      title: "Reviews",
      description: "Patient reviews will be published here soon.",
    },
    contact: {
      title: "Contact & dates in Aruba",
      description: "Dentacare Aruba, Morgenster 35C, Aruba. Upcoming dates in Aruba and WhatsApp appointment enquiries.",
    },
    newPatients: {
      title: "New Patients",
      description: "Information for new patients will be published here soon.",
    },
    pricingInfo: {
      title: "Fees & Insurance",
      description: "Information about fees and insurance will be published here soon.",
    },
    privacy: {
      title: "Privacy Policy",
      description: "How the Dentacare Aruba website handles personal information, and who to contact with questions.",
    },
    cookies: {
      title: "Cookie Policy",
      description: "What the Dentacare Aruba website stores in your browser.",
    },
  },
  footer: {
    description: "Dental care with Sam Abdin at Morgenster 35C, Aruba, on scheduled dates.",
    exploreHeading: "Explore",
    visitHeading: "Visit",
    addressLabel: "Address",
    whatsappLabel: "WhatsApp",
    datesLabel: "Dates in Aruba",
    datesLink: "See upcoming dates",
    rightsReserved: "All rights reserved.",
    legalNavLabel: "Legal information",
    privacyPolicyLink: "Privacy Policy",
    cookiePolicyLink: "Cookie Policy",
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

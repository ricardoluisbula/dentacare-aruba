// Dutch translation -- machine-assisted, not professionally verified; review items in docs/translations/REVIEW-nl.md
import treatmentsCopy from "./nl.treatments";
import galleryCopy from "./nl.gallery";
import type { Dictionary } from "./en";

const nl: Dictionary = {
  ...treatmentsCopy,
  ...galleryCopy,
  common: {
    scrollToTop: "Terug naar boven",
    cookieConsentAriaLabel: "Toestemming voor cookies",
    cookieConsentMessage:
      "We gebruiken privacyvriendelijke analyse om te begrijpen hoe onze website wordt gebruikt. Er worden nooit persoonlijke of medische gegevens bijgehouden.",
    cookieConsentAccept: "Accepteren",
    cookieConsentDecline: "Weigeren",
    cookieConsentCurrentGranted: "U heeft analytische cookies toegestaan. U kunt die keuze hier wijzigen of intrekken.",
    cookieConsentCurrentDenied: "U heeft analytische cookies geweigerd.",
    cookieSettings: "Cookie-instellingen",
    cookieSettingsClose: "Sluiten",
  },
  nav: {
    home: "Home",
    about: "Over ons",
    treatments: "Behandelingen",
    preventionHygiene: "Preventie & mondhygiëne",
    smileGallery: "Glimlachgalerij",
    team: "Ons team",
    reviews: "Beoordelingen",
    contact: "Contact",
  },
  header: {
    languageLabel: "Kies de taal van de website",
    languageHeading: "Taal",
    languageFallback: "in het Engels",
    menuLabel: "Hoofdmenu",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    switchToLight: "Overschakelen naar licht thema",
    switchToDark: "Overschakelen naar donker thema",
    instagramLabel: "Dentacare op Instagram (opent in een nieuw tabblad)",
    treatmentsMenu: {
      label: "Menu behandelingen",
    },
  },
  whatsapp: {
    cta: "Vraag via WhatsApp naar een afspraak",
    short: "WhatsApp ons",
    prefill: "Hallo Dentacare Aruba, ik wil graag informeren naar een afspraak op Aruba.",
    enquiryNote:
      "Een WhatsApp-bericht is een aanvraag, geen boeking. Uw afspraak is pas bevestigd wanneer de praktijk antwoordt en een datum en tijd bevestigt.",
    messagesOnly: "Alleen berichten — dit nummer neemt geen oproepen aan.",
  },
  availability: {
    eyebrow: "Datums op Aruba",
    title: "Wanneer de tandarts op Aruba is",
    description: "De praktijk heeft geen vaste wekelijkse openingstijden. Sam Abdin werkt op Aruba op de onderstaande datums.",
    timeZoneNote: "Alle datums en tijden zijn in Aruba-tijd (AST, UTC−4).",
    hoursPending: "Tijden nog te bevestigen",
    emptyTitle: "Nieuwe datums worden bekendgemaakt",
    emptyBody:
      "Er zijn op dit moment geen bevestigde datums op Aruba. U kunt een WhatsApp-bericht sturen om naar komende datums te vragen.",
    moreDates: "Bekijk alle komende datums",
    listLabel: "Komende datums op Aruba",
  },
  hero: {
    badge: "Tandheelkundige zorg op Aruba",
    headlinePrefix: "Dentacare Aruba",
    headlineAccent: "Vakmanschap in elke glimlach",
    paragraph:
      "Tandheelkundige zorg door Sam Abdin aan Morgenster 35C, Aruba, op vastgestelde datums. Bekijk wanneer de tandarts op Aruba is en stuur een WhatsApp-bericht om naar een afspraak te vragen.",
    ctaDates: "Bekijk komende datums",
  },
  homeDentist: {
    eyebrow: "Uw tandarts",
    title: "Sam Abdin",
    body: "Sam Abdin is opgeleid aan de Rijksuniversiteit Groningen en ontvangt patiënten bij Dentacare Aruba op de datums die op deze website staan.",
    cta: "Over Sam Abdin",
    treatmentsCta: "Bekijk de behandelingen",
  },
  cta: {
    eyebrow: "Afspraken",
    title: "Vraag naar een afspraak op Aruba",
    description:
      "Stuur een WhatsApp-bericht met uw vraag. De praktijk antwoordt om een tijd af te spreken op een van de datums waarop de tandarts op Aruba is, als er een beschikbaar is.",
    datesLink: "Bekijk komende datums",
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Contact met Dentacare Aruba",
    description: "U vindt de praktijk aan Morgenster 35C, Aruba. Vraag via WhatsApp naar afspraken.",
    detailsHeading: "Contactgegevens",
    addressLabel: "Adres",
    mapsLink: "Openen in Google Maps",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    hoursLabel: "Openingstijden",
    hoursValue: "Geen vaste wekelijkse openingstijden — zie de datums op Aruba.",
  },
  teamPage: {
    eyebrow: "Ons team",
    title: "Maak kennis met uw tandarts",
    description: "Sam Abdin ontvangt patiënten bij Dentacare Aruba op de datums die op deze website staan.",
    name: "Sam Abdin",
    role: "Tandarts",
    bio: [
      "Sam Abdin is tandarts en werd opgeleid aan de Rijksuniversiteit Groningen in Nederland.",
      "Hij is sinds 2009 werkzaam als tandarts in Amsterdam en ontvangt patiënten bij Dentacare Aruba op de datums die op deze website staan.",
    ],
    credentialsHeading: "Professionele informatie",
    educationLabel: "Opleiding",
    educationValue: "Rijksuniversiteit Groningen, Nederland",
    experienceLabel: "Ervaring",
    experienceValue: "Sinds 2009 werkzaam als tandarts in Amsterdam",
  },
  preparingPage: {
    notice: "Op de contactpagina vindt u intussen ons adres, WhatsApp en de datums waarop de tandarts op Aruba is.",
    contactLink: "Contact & datums op Aruba",
    backHome: "Terug naar home",
  },
  pages: {
    about: {
      title: "Over Dentacare Aruba",
      description: "Binnenkort vindt u hier meer informatie over de praktijk.",
    },
    team: {
      title: "Sam Abdin, tandarts",
      description: "Maak kennis met Sam Abdin, de tandarts van Dentacare Aruba, Morgenster 35C, Aruba.",
    },
    reviews: {
      title: "Beoordelingen",
      description: "Binnenkort worden hier beoordelingen van patiënten gepubliceerd.",
    },
    contact: {
      title: "Contact & datums op Aruba",
      description: "Dentacare Aruba, Morgenster 35C, Aruba. Komende datums op Aruba en afspraakaanvragen via WhatsApp.",
    },
    newPatients: {
      title: "Nieuwe patiënten",
      description: "Binnenkort vindt u hier informatie voor nieuwe patiënten.",
    },
    pricingInfo: {
      title: "Tarieven & verzekering",
      description: "Binnenkort vindt u hier informatie over tarieven en verzekering.",
    },
    privacy: {
      title: "Privacybeleid",
      description: "Hoe de website van Dentacare Aruba met persoonsgegevens omgaat, en bij wie u met vragen terechtkunt.",
    },
    cookies: {
      title: "Cookiebeleid",
      description: "Wat de website van Dentacare Aruba in uw browser opslaat.",
    },
  },
  footer: {
    description: "Tandheelkundige zorg door Sam Abdin aan Morgenster 35C, Aruba, op vastgestelde datums.",
    exploreHeading: "Ontdek",
    visitHeading: "Bezoek",
    addressLabel: "Adres",
    whatsappLabel: "WhatsApp",
    datesLabel: "Datums op Aruba",
    datesLink: "Bekijk komende datums",
    rightsReserved: "Alle rechten voorbehouden.",
    legalNavLabel: "Juridische informatie",
    privacyPolicyLink: "Privacybeleid",
    cookiePolicyLink: "Cookiebeleid",
  },
  notFound: {
    title: "Deze pagina bestaat niet",
    description: "De pagina die u zoekt bestaat niet of is verplaatst. Hier vindt u de weg terug.",
    backHome: "Terug naar home",
    contactUs: "Contact",
  },
  a11y: {
    opensInNewTab: "(opent in een nieuw tabblad)",
    skipToContent: "Naar de inhoud",
  },
};

export default nl;

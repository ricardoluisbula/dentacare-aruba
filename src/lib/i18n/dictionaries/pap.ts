// Aruba Papiamento translation -- machine-assisted, not professionally verified; needs review by a fluent Aruba speaker (docs/translations/REVIEW-pap.md)
import treatmentsCopy from "./pap.treatments";
import galleryCopy from "./pap.gallery";
import type { Dictionary } from "./en";

const pap: Dictionary = {
  ...treatmentsCopy,
  ...galleryCopy,
  common: {
    scrollToTop: "Bai bek ariba",
    cookieConsentAriaLabel: "Permiso pa cookie",
    cookieConsentMessage:
      "Nos ta usa analisis di uso cu ta respeta privacidad pa compronde con nos website ta wordo usa. Nunca nos ta rastrea informacion personal of medico.",
    cookieConsentAccept: "Acepta",
    cookieConsentDecline: "Rechasa",
    cookieConsentCurrentGranted:
      "Bo a permiti cookie di analisis. Bo por cambia of retira e escogencia ey aki.",
    cookieConsentCurrentDenied: "Bo a rechasa cookie di analisis.",
    cookieSettings: "Configuracion di cookie",
    cookieSettingsClose: "Cera",
  },
  nav: {
    home: "Inicio",
    about: "Tocante Nos",
    treatments: "Tratamento",
    preventionHygiene: "Prevencion y Higiena",
    smileGallery: "Galeria di Sonrisa",
    team: "Nos Equipo",
    reviews: "Opinion",
    contact: "Contacto",
  },
  header: {
    languageLabel: "Scoge e idioma di e website",
    languageHeading: "Idioma",
    languageFallback: "na Ingles",
    menuLabel: "Menu principal",
    openMenu: "Habri menu",
    closeMenu: "Cera menu",
    switchToLight: "Cambia pa tema cla",
    switchToDark: "Cambia pa tema scur",
    instagramLabel: "Dentacare riba Instagram (ta habri den un tab nobo)",
    treatmentsMenu: {
      label: "Menu di tratamento",
    },
  },
  whatsapp: {
    cta: "Puntra tocante un cita via WhatsApp",
    short: "Manda nos un WhatsApp",
    prefill: "Hola Dentacare Aruba, mi kier puntra tocante un cita na Aruba.",
    enquiryNote:
      "Un mensahe via WhatsApp ta un pregunta, no un reservacion. Bo cita ta confirma solamente ora e consultorio contesta pa confirma un fecha y ora.",
    messagesOnly: "Solamente mensahe — e numero aki no ta atende yamada.",
  },
  availability: {
    eyebrow: "Fecha na Aruba",
    title: "Ora e dentista ta na Aruba",
    description:
      "E consultorio no tin orario fiho pa siman. Sam Abdin ta traha na Aruba riba e fechanan aki bao.",
    timeZoneNote: "Tur fecha y ora ta na ora di Aruba (AST, UTC−4).",
    hoursPending: "Orario ainda mester wordo confirma",
    emptyTitle: "Proximo fechanan lo wordo anuncia",
    emptyBody:
      "Na e momento aki no tin fecha confirma na Aruba. Bo por manda un mensahe via WhatsApp pa puntra tocante proximo fechanan.",
    moreDates: "Mira tur proximo fecha",
    listLabel: "Proximo fechanan na Aruba",
  },
  hero: {
    badge: "Cuido dental na Aruba",
    headlinePrefix: "Dentacare Aruba",
    headlineAccent: "Arte den cada sonrisa",
    paragraph:
      "Cuido dental cu Sam Abdin na Morgenster 35C, Aruba, riba fechanan programa. Mira ora e dentista ta na Aruba y manda un mensahe via WhatsApp pa puntra tocante un cita.",
    ctaDates: "Mira proximo fechanan",
  },
  homeDentist: {
    eyebrow: "Bo dentista",
    title: "Sam Abdin",
    body: "Sam Abdin a studia na Universidad di Groningen y ta atende pacientenan na Dentacare Aruba riba e fechanan cu ta aparece riba e website aki.",
    cta: "Tocante Sam Abdin",
    treatmentsCta: "Descubri e tratamentonan",
  },
  cta: {
    eyebrow: "Cita",
    title: "Puntra tocante un cita na Aruba",
    description:
      "Manda un mensahe via WhatsApp cu bo pregunta. E consultorio ta contesta pa fiha un ora riba un di e fechanan cu e dentista ta na Aruba, ora tin un disponibel.",
    datesLink: "Mira proximo fechanan",
  },
  contactPage: {
    eyebrow: "Contacto",
    title: "Contacta Dentacare Aruba",
    description: "Haya e consultorio na Morgenster 35C, Aruba, y puntra tocante cita via WhatsApp.",
    detailsHeading: "Detayenan di contacto",
    addressLabel: "Adres",
    mapsLink: "Habri den Google Maps",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    hoursLabel: "Orario di habri",
    hoursValue: "No tin orario fiho pa siman — mira e fechanan na Aruba.",
  },
  teamPage: {
    eyebrow: "Nos Equipo",
    title: "Conoce bo dentista",
    description: "Sam Abdin ta atende pacientenan na Dentacare Aruba riba e fechanan cu ta aparece riba e website aki.",
    name: "Sam Abdin",
    role: "Dentista",
    bio: [
      "Sam Abdin ta un dentista cu a studia na Universidad di Groningen (Rijksuniversiteit Groningen) na Hulanda.",
      "E ta practica odontologia na Amsterdam desde 2009, y ta atende pacientenan na Dentacare Aruba riba e fechanan cu ta aparece riba e website aki.",
    ],
    credentialsHeading: "Informacion profesional",
    educationLabel: "Educacion",
    educationValue: "Universidad di Groningen (Rijksuniversiteit Groningen), Hulanda",
    experienceLabel: "Experiencia",
    experienceValue: "Ta practica odontologia na Amsterdam desde 2009",
  },
  preparingPage: {
    notice:
      "Mientras tanto, e pagina di Contacto tin nos adres, WhatsApp y e fechanan cu e dentista ta na Aruba.",
    contactLink: "Contacto y fechanan na Aruba",
    backHome: "Bek na inicio",
  },
  pages: {
    about: {
      title: "Tocante Dentacare Aruba",
      description: "Mas informacion tocante e consultorio lo wordo publica aki pronto.",
    },
    team: {
      title: "Sam Abdin, dentista",
      description: "Conoce Sam Abdin, e dentista di Dentacare Aruba, Morgenster 35C, Aruba.",
    },
    reviews: {
      title: "Opinion",
      description: "Opinion di pacientenan lo wordo publica aki pronto.",
    },
    contact: {
      title: "Contacto y fechanan na Aruba",
      description:
        "Dentacare Aruba, Morgenster 35C, Aruba. Proximo fechanan na Aruba y pregunta tocante cita via WhatsApp.",
    },
    newPatients: {
      title: "Paciente Nobo",
      description: "Informacion pa paciente nobo lo wordo publica aki pronto.",
    },
    pricingInfo: {
      title: "Tarifa y Seguro",
      description: "Informacion tocante tarifa y seguro lo wordo publica aki pronto.",
    },
    privacy: {
      title: "Politica di Privacidad",
      description:
        "Con e website di Dentacare Aruba ta trata informacion personal, y cu ken pa tuma contacto si bo tin pregunta.",
    },
    cookies: {
      title: "Politica di Cookie",
      description: "Kico e website di Dentacare Aruba ta warda den bo browser.",
    },
  },
  footer: {
    description: "Cuido dental cu Sam Abdin na Morgenster 35C, Aruba, riba fechanan programa.",
    exploreHeading: "Explora",
    visitHeading: "Bishita",
    addressLabel: "Adres",
    whatsappLabel: "WhatsApp",
    datesLabel: "Fecha na Aruba",
    datesLink: "Mira proximo fechanan",
    rightsReserved: "Tur derecho reserva.",
    legalNavLabel: "Informacion legal",
    privacyPolicyLink: "Politica di Privacidad",
    cookiePolicyLink: "Politica di Cookie",
  },
  notFound: {
    title: "E pagina aki no ta existi",
    description: "E pagina cu bo ta buscando no ta existi of a cambia di lugar. Aki ta e caminda bek.",
    backHome: "Bek na inicio",
    contactUs: "Contacto",
  },
  a11y: {
    opensInNewTab: "(ta habri den un tab nobo)",
    skipToContent: "Bai directo na e contenido",
  },
};

export default pap;

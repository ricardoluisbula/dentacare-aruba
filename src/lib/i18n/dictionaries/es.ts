// Spanish translation -- machine-assisted, not professionally verified; review items in docs/translations/REVIEW-es.md
import treatmentsCopy from "./es.treatments";
import galleryCopy from "./es.gallery";
import type { Dictionary } from "./en";

const es: Dictionary = {
  ...treatmentsCopy,
  ...galleryCopy,
  common: {
    scrollToTop: "Volver arriba",
    cookieConsentAriaLabel: "Consentimiento de cookies",
    cookieConsentMessage:
      "Usamos analítica respetuosa con la privacidad para entender cómo se utiliza nuestro sitio web. Nunca se rastrea información personal ni médica.",
    cookieConsentAccept: "Aceptar",
    cookieConsentDecline: "Rechazar",
    cookieConsentCurrentGranted:
      "Usted ha permitido las cookies de analítica. Puede cambiar o retirar esa elección aquí.",
    cookieConsentCurrentDenied: "Usted ha rechazado las cookies de analítica.",
    cookieSettings: "Configuración de cookies",
    cookieSettingsClose: "Cerrar",
  },
  nav: {
    home: "Inicio",
    about: "Nosotros",
    treatments: "Tratamientos",
    preventionHygiene: "Prevención e higiene",
    smileGallery: "Galería de sonrisas",
    team: "Nuestro equipo",
    reviews: "Opiniones",
    contact: "Contacto",
  },
  header: {
    languageLabel: "Seleccionar el idioma del sitio web",
    languageHeading: "Idioma",
    languageFallback: "en inglés",
    menuLabel: "Menú principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    switchToLight: "Cambiar al tema claro",
    switchToDark: "Cambiar al tema oscuro",
    instagramLabel: "Dentacare en Instagram (se abre en una pestaña nueva)",
    treatmentsMenu: {
      label: "Menú de tratamientos",
    },
  },
  whatsapp: {
    cta: "Consulte por una cita en WhatsApp",
    short: "Escríbanos por WhatsApp",
    prefill: "Hola, Dentacare Aruba. Quisiera hacer una consulta sobre una cita en Aruba.",
    enquiryNote:
      "Un mensaje de WhatsApp es una consulta, no una reserva. Su cita solo queda confirmada cuando la clínica le responde para confirmar una fecha y una hora.",
    messagesOnly: "Solo mensajes: este número no recibe llamadas.",
  },
  availability: {
    eyebrow: "Fechas en Aruba",
    title: "Cuándo está el dentista en Aruba",
    description: "La clínica no tiene un horario semanal fijo. Sam Abdin trabaja en Aruba en las fechas indicadas a continuación.",
    timeZoneNote: "Todas las fechas y horas están en hora de Aruba (AST, UTC−4).",
    hoursPending: "Horario por confirmar",
    emptyTitle: "Las próximas fechas se anunciarán",
    emptyBody:
      "En este momento no hay fechas confirmadas en Aruba. Puede enviar un mensaje de WhatsApp para consultar por las próximas fechas.",
    moreDates: "Ver todas las próximas fechas",
    listLabel: "Próximas fechas en Aruba",
  },
  hero: {
    badge: "Atención dental en Aruba",
    headlinePrefix: "Dentacare Aruba",
    headlineAccent: "Arte en cada sonrisa",
    paragraph:
      "Atención dental con Sam Abdin en Morgenster 35C, Aruba, en fechas programadas. Vea cuándo está el dentista en Aruba y envíe un mensaje de WhatsApp para consultar por una cita.",
    ctaDates: "Ver las próximas fechas",
  },
  homeDentist: {
    eyebrow: "Su dentista",
    title: "Sam Abdin",
    body: "Sam Abdin se formó en la Universidad de Groningen y atiende pacientes en Dentacare Aruba en las fechas indicadas en este sitio web.",
    cta: "Sobre Sam Abdin",
    treatmentsCta: "Conozca los tratamientos",
  },
  cta: {
    eyebrow: "Citas",
    title: "Consulte por una cita en Aruba",
    description:
      "Envíe un mensaje de WhatsApp con su pregunta. La clínica le responde para acordar una hora en una de las fechas en que el dentista está en Aruba, cuando haya disponibilidad.",
    datesLink: "Ver las próximas fechas",
  },
  contactPage: {
    eyebrow: "Contacto",
    title: "Contacte a Dentacare Aruba",
    description: "Encuentre la clínica en Morgenster 35C, Aruba, y consulte por citas a través de WhatsApp.",
    detailsHeading: "Datos de contacto",
    addressLabel: "Dirección",
    mapsLink: "Abrir en Google Maps",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    hoursLabel: "Horario de atención",
    hoursValue: "Sin horario semanal fijo: consulte las fechas en Aruba.",
  },
  teamPage: {
    eyebrow: "Nuestro equipo",
    title: "Conozca a su dentista",
    description: "Sam Abdin atiende pacientes en Dentacare Aruba en las fechas indicadas en este sitio web.",
    name: "Sam Abdin",
    role: "Dentista",
    bio: [
      "Sam Abdin es un dentista que se formó en la Universidad de Groningen (Rijksuniversiteit Groningen), en los Países Bajos.",
      "Ejerce la odontología en Amsterdam desde 2009 y atiende pacientes en Dentacare Aruba en las fechas indicadas en este sitio web.",
    ],
    credentialsHeading: "Información profesional",
    educationLabel: "Formación",
    educationValue: "Universidad de Groningen (Rijksuniversiteit Groningen), Países Bajos",
    experienceLabel: "Experiencia",
    experienceValue: "Ejerce la odontología en Amsterdam desde 2009",
  },
  preparingPage: {
    notice:
      "Mientras tanto, en la página de Contacto encontrará nuestra dirección, WhatsApp y las fechas en que el dentista está en Aruba.",
    contactLink: "Contacto y fechas en Aruba",
    backHome: "Volver al inicio",
  },
  pages: {
    about: {
      title: "Sobre Dentacare Aruba",
      description: "Pronto publicaremos aquí más información sobre la clínica.",
    },
    team: {
      title: "Sam Abdin, dentista",
      description: "Conozca a Sam Abdin, el dentista de Dentacare Aruba, Morgenster 35C, Aruba.",
    },
    reviews: {
      title: "Opiniones",
      description: "Pronto publicaremos aquí opiniones de pacientes.",
    },
    contact: {
      title: "Contacto y fechas en Aruba",
      description:
        "Dentacare Aruba, Morgenster 35C, Aruba. Próximas fechas en Aruba y consultas de citas por WhatsApp.",
    },
    newPatients: {
      title: "Pacientes nuevos",
      description: "Pronto publicaremos aquí información para pacientes nuevos.",
    },
    pricingInfo: {
      title: "Tarifas y seguros",
      description: "Pronto publicaremos aquí información sobre tarifas y seguros.",
    },
    privacy: {
      title: "Política de privacidad",
      description:
        "Cómo trata el sitio web de Dentacare Aruba la información personal, y a quién contactar si tiene preguntas.",
    },
    cookies: {
      title: "Política de cookies",
      description: "Qué guarda el sitio web de Dentacare Aruba en su navegador.",
    },
  },
  footer: {
    description: "Atención dental con Sam Abdin en Morgenster 35C, Aruba, en fechas programadas.",
    exploreHeading: "Explorar",
    visitHeading: "Visítenos",
    addressLabel: "Dirección",
    whatsappLabel: "WhatsApp",
    datesLabel: "Fechas en Aruba",
    datesLink: "Ver las próximas fechas",
    rightsReserved: "Todos los derechos reservados.",
    legalNavLabel: "Información legal",
    privacyPolicyLink: "Política de privacidad",
    cookiePolicyLink: "Política de cookies",
  },
  notFound: {
    title: "Esta página no existe",
    description: "La página que busca no existe o se ha movido. Aquí tiene el camino de regreso.",
    backHome: "Volver al inicio",
    contactUs: "Contacto",
  },
  a11y: {
    opensInNewTab: "(se abre en una pestaña nueva)",
    skipToContent: "Saltar al contenido",
  },
};

export default es;

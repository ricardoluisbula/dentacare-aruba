// Aruba Papiamento translation -- machine-assisted, not professionally verified; needs review by a fluent Aruba speaker (docs/translations/REVIEW-pap.md)
import type { PageContent } from "../types";
import treatmentPages from "./pages.treatments";

const pap: PageContent = {
  treatmentPages,
  preventiveCare: {
    overview: [
      "Cuido preventivo ta e parti di odontologia cu tin como meta pa preveni problema, of haya nan trempan, prome cu tratamento mas grandi bira necesario. E ta consisti di control periodico, limpiesa profesional y consejo adapta na bo situacion.",
      "Durante un control, e djentenan, encia y tehido suave ta wordo evalua. Radiografia ta wordo tuma unda ta necesario, pa evalua area cu no ta visibel.",
      "Durante un cita di higiena, sarro y placa ta wordo kita — incluyendo bao di e rand di encia, unda cepiamento no ta yega. Ey ta unda inflamacion di encia ta cuminsa.",
    ],
    suitableFor: [
      "Cualkier persona cu kier tene su djente saludabel a largo plazo",
      "Encia cu ta sangra ora di cepia of usa hilo dental",
      "Placa of sarro visibel",
      "Pacientenan cu coronanan, brugnan, implantenan of facetanan, cu ta rekeri mantenimento extra",
    ],
    process: [
      {
        title: "Control",
        description:
          "E djentenan, encia, restauracionnan existente y tehido suave ta wordo evalua. Radiografia ta wordo tuma unda ta necesario.",
      },
      {
        title: "Evaluacion di encia",
        description: "E condicion di e encia ta wordo registra, pa cambionan entre bishitanan por wordo sigui.",
      },
      {
        title: "Limpiesa profesional",
        description:
          "Sarro y placa ta wordo kita y e djentenan ta wordo pulia. Cuanto tempo esaki ta tuma ta varia di paciente pa paciente.",
      },
      {
        title: "Consejo y siguiente cita",
        description:
          "Bo ta ricibi consejo specifico tocante cepia, limpia entre e djentenan, y costumber cu ta afecta bo salud oral, y nos ta acorda ora bo ta bin bek.",
      },
    ],
    limitations: [
      "Cuido preventivo ta reduci e posibilidad di problema pero no ta exclui nan. Caries y malesa di encia por presenta hasta cu bon cuido.",
      "Limpiesa na e consultorio no ta reemplasa cuido diario na cas; mayoria di e resultado ta wordo logra na cas.",
      "Daño existente — caries, perdida di wesu, encia cu a baha — no ta wordo reverti pa medio di limpiesa.",
      "Cuanto biaha control y limpiesa ta necesario ta varia di persona pa persona; no tin un solo intervalo cu ta corecto pa tur hende.",
    ],
    aftercare: [
      "Cepia dos biaha pa dia pa dos minuut cu pasta di djente cu fluor.",
      "Limpia entre e djentenan tur dia, cu hilo dental of cepio interdental.",
      "Bin segun e intervalo acorda pa bo, tambe ora bo no tin sintoma.",
      "Reporta encia cu ta sangra, sensibilidad of un cambio den mordida en bez di warda pa e pasa.",
      "Bo ta rechiña of primi djente, of bo ta nota desgaste riba bo djente? Menciona esaki na bo control; un protector di noche hecho na midi por yuda proteha bo djente y restauracionnan.",
    ],
    faq: [
      {
        question: "Cuanto biaha mi mester bin pa control?",
        answer:
          "Esey ta varia pa persona y ta depende di bo salud oral y factornan di riesgo. Despues di e control nos ta acorda huntu un intervalo adecua.",
      },
      {
        question: "Un limpiesa ta haci dolor?",
        answer:
          "Normalmente no. Cu encia inflama of cuello di djente sensibel e por ta incomodo; bisa nos y nos ta ahusta e manera di traha.",
      },
      {
        question: "Mi encia ta sangra ora mi cepia. Mi mester cepia menos?",
        answer:
          "Encia cu ta sangra normalmente ta un señal di inflamacion, no di cepia muy hopi. Laga evalua esaki en bez di evita e area.",
      },
      {
        question: "Cuanto un control of limpiesa ta costa?",
        answer:
          "Nos no ta publica un prijs fiho pa esaki, pasobra e tempo necesario ta varia di paciente pa paciente. Bo ta ricibi un indicacion di e costo di antemano.",
      },
    ],
  },
  policies: {
    privacy: {
      intro: [
        "E politica aki ta splica ki informacion personal e website di Dentacare Aruba ta trata, dicon, y cu ken pa tuma contacto si bo tin pregunta. E ta cubri solamente e website aki.",
      ],
      sections: [
        {
          heading: "Ken nos ta",
          paragraphs: [
            "Dentacare Aruba, Morgenster 35C, Aruba.",
            "Pa pregunta tocante bo informacion personal, manda un email na {email}. E adres aki ta solamente pa pregunta tocante privacidad; pa puntra tocante un cita, por fabor usa WhatsApp (mira e pagina di Contacto).",
          ],
        },
        {
          heading: "Kico e website aki ta recoge",
          lead: [
            "E website no tin formulario di contacto, no tin cuenta pa paciente y no tin newsletter. Bo no mester entrega un formulario ni crea un cuenta pa navega riba e website aki.",
          ],
          items: [
            "Hosting: e website ta wordo hospeda pa Vercel. Manera cu cualkier website, e proveedor di hosting ta ricibi informacion tecnico ora bo bishita un pagina, manera bo adres IP, tipo di browser y e pagina cu bo a pidi, pa por entrega e website.",
            "Analisis: e website no ta usa instrumento di analisis, di reclame ni di rastreo.",
            "Fechanan na Aruba: e fechanan cu e dentista ta traha na Aruba ta wordo warda cu Upstash. Esaki no ta contene informacion tocante bishitante ni paciente.",
            "Login pa personal: e website tin un pagina priva di login pa personal di e consultorio. Pa limita intento di adivina password, cada intento di login ta wordo conta pa te 15 minuut, usando un balor codifica di un solo direccion (one-way) deriva di e adres IP di e bishitante, warda cu Upstash. E contador di login aki no ta contene e adres IP mes.",
          ],
        },
        {
          heading: "Pregunta tocante cita via WhatsApp",
          paragraphs: [
            "Pregunta tocante cita ta bai via WhatsApp. Ora bo primi un link di WhatsApp riba e website aki, WhatsApp ta habri cu un mensahe sugeri cu bo por cambia prome cu bo manda'le; nada no ta wordo manda te ora bo mes manda'le.",
            "Bo mensahe, huntu cu e nomber y numero di telefon cu ta aparece riba bo cuenta di WhatsApp, despues ta wordo trata pa WhatsApp (un servicio di Meta) bao di e politica di privacidad propio di WhatsApp, y pa e consultorio pa contesta bo pregunta.",
          ],
        },
        {
          heading: "Link pa otro servicio",
          paragraphs: [
            "Link pa WhatsApp, Google Maps y Instagram ta habri e servicionan ey, cu ta trata bo informacion bao di nan mes politica di privacidad. E website aki no ta incorpora contenido di nan.",
          ],
        },
        {
          heading: "Foto di prome y despues",
          paragraphs: [
            "E fotonan di prome y despues riba e website aki ta mustra resultado di tratamento haci pa Sam Abdin y ta wordo publica cu permiso di e pacientenan concerni. Pa puntra tocante un foto, of pa retira bo permiso, manda un email na {email}.",
          ],
        },
        {
          heading: "Unda informacion ta wordo procesa",
          paragraphs: ["Vercel y Upstash por procesa informacion riba servidor pafo di Aruba."],
        },
        {
          heading: "Pregunta y peticion",
          paragraphs: [
            "Bo por manda un email na {email} pa puntra ki informacion personal e consultorio tin di bo, of pa pidi pa e informacion ey wordo corigi of borra.",
          ],
        },
        {
          heading: "Cambio na e politica aki",
          paragraphs: [
            "E politica aki ta wordo actualisa ora e website cambia. E version actual ta semper riba e pagina aki.",
          ],
        },
      ],
    },
    cookies: {
      intro: [
        "E pagina aki ta splica kico e website di Dentacare Aruba ta warda den bo browser. E website no ta usa cookie di analisis, di reclame ni di rastreo.",
      ],
      sections: [
        {
          heading: "Kico e website ta warda",
          items: [
            "theme (warda den e almacenamento local di bo browser): solamente si bo cambia entre modo cla y modo scur, pa corda bo escogencia. E ta keda te ora bo borra e datonan di bo browser pa e website aki.",
            "dentacare_admin (cookie): solamente pa personal di e consultorio cu ta drenta e editor priva. E ta mantene nan sesion habri, ta wordo manda solamente na e paginanan di e editor, y ta caduca despues di 8 ora of ora nan sali for di e editor. Nunca e ta wordo pone pa paciente ni otro bishitante.",
          ],
          paragraphs: ["E codigo propio di e website no ta warda nada mas den bo browser."],
        },
        {
          heading: "Otro servicio",
          paragraphs: [
            "Ora bo sigui un link pa WhatsApp, Google Maps of Instagram, e servicionan ey por pone nan mes cookie bao di nan mes politica. E website aki no ta incorpora contenido di nan.",
          ],
        },
        {
          heading: "Maneha informacion warda",
          paragraphs: [
            "Bo por borra loke e website a warda na cualkier momento den e configuracion di bo browser, pa medio di borra cookie y datonan di sitio pa e website aki.",
          ],
        },
        {
          heading: "Cambio y pregunta",
          paragraphs: [
            "Si e website cuminsa warda cualkier otro cos, e pagina aki lo wordo actualisa prome. Pa pregunta, manda un email na {email}.",
          ],
        },
      ],
    },
  },
};

export default pap;

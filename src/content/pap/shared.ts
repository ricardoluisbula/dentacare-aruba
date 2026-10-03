// Aruba Papiamento translation -- machine-assisted, not professionally verified; needs review by a fluent Aruba speaker (docs/translations/REVIEW-pap.md)
import type { SharedContent } from "../types";

const veneersCaseDescription =
  "Facetanan di porcelana hecho na midi, diseña pa mehora e forma, color y armonia di e sonrisa.";
const emergencyCase = {
  title: "Odontologia di Emergencia y Estetica",
  description: "Reparacion estetico rapido y discreto pa djente di dilanti kibra, daña of cu ta falta.",
  beforeAlt: "Sonrisa di un paciente prome cu un reparacion estetico di e djentenan di dilanti.",
  afterAlt: "Sonrisa di un paciente despues di un reparacion estetico di e djentenan di dilanti.",
};
const teethAlts = {
  beforeAlt: "Djente di un paciente prome cu tratamento.",
  afterAlt: "Djente di un paciente despues di tratamento.",
};
const smileAlts = {
  beforeAlt: "Sonrisa di un paciente prome cu tratamento.",
  afterAlt: "Sonrisa di un paciente despues di tratamento.",
};

const pap: SharedContent = {
  treatments: {
    "porcelain-veneers": {
      name: "Facetanan di Porcelana",
      summary: "Capa fini hecho na midi cu por transforma e aparencia di bo sonrisa.",
      description:
        "Un manera rapido pa corigi pida kibra, spacio entre djente of descoloracion y mustra e sonrisa cu confiansa cu bo tabata desea. Cada faceta ta wordo diseña rond di bo cara y bo djente natural, cu e meta di un resultado cu ta parce natural.",
      whoFor:
        "Ideal si bo kier un sonrisa mas cla y mas uniforme sin cambia e structura natural di bo djente mas cu ta necesario.",
      expandedDescription:
        "Facetanan di porcelana ta capa fini di ceramica, hecho na midi, cu ta wordo pone riba e superficie di dilanti di e djentenan. Nan por mehora e aparencia di descoloracion, pida kibra, forma desigual, spacio chikito entre djente y otro preocupacion estetico. Cada faceta ta wordo diseña pa complementa bo sonrisa, mientras e ta mantene un aparencia natural.",
    },
    "emergency-aesthetic-dentistry": {
      name: "Odontologia di Emergencia y Estetica",
      summary: "Reparacion estetico rapido y discreto pa djente di dilanti kibra, daña of cu ta falta.",
      description:
        "Pa pacientenan cu djente di dilanti kibra, daña of cu ta falta cu kier un reparacion estetico rapido. Usando tecnica restaurativo scogi cu cuidao, e sonrisa hopi biaha por wordo reconstrui den un solo bishita, segun e situacion clinico.",
      whoFor:
        "Pa pacientenan cu kier un reparacion cosmetico rapido despues di daño na djente of perdida di djente, den asina tiki bishita cu e situacion clinico ta permiti.",
    },
    "dental-implants": {
      name: "Implantenan Dental",
      summary: "Un reemplazo fiho cu ta sinti natural pa djente cu ta falta.",
      description:
        "Implantenan ta reemplasa tanto e raiz como e corona di un djente cu ta falta, pa bo por come, papia y sonri cu confiansa atrobe. Cada implante ta wordo planea cu cuidao di antemano, cu e meta di un resultado cu ta parce y ta sinti manera bo mes djente.",
      whoFor:
        "Adecua pa cualkier persona cu ta falta un of mas djente y cu kier un solucion a largo plazo en bez di un solucion cu bo por kita.",
    },
    "composite-restorations": {
      name: "Facetanan di Composite",
      summary: "Un manera suave pa drecha pida kibra, spacio y descoloracion den un solo bishita.",
      description:
        "Facetanan di composite ta usa resina di color di djente pa mehora e forma, color y aparencia di djente. E tratamento ta wordo adapta na bo sonrisa despues di un evaluacion personal.",
      whoFor: "Un bon opcion si bo kier un mehoramento rapido y conservativo na un cantidad limita di djente.",
    },
    "clear-aligners": {
      name: "Alineadornan Transparente",
      summary: "Pone bo djente reta di un manera discreto, sin brackets tradicional.",
      description:
        "Alineadornan transparente cu bo por kita ta guia bo djente poco poco na nan lugar y ta mas discreto cu brackets fiho. Bo tratamento ta wordo planea di antemano, pa bo por mira ki resultado ta e meta prome cu bo cuminsa.",
      whoFor:
        "Bon adecua pa adulto y hoben cu kier djente mas reta sin e aparencia of e restriccionnan di brackets di metal.",
      expandedDescription:
        "Alineadornan transparente ta usa un serie di bandeha transparente hecho na midi pa move bo djente poco poco pa un posicion mas adecua. Nan por wordo kita y ta ofrece un alternativa discreto pa brackets tradicional pa hopi paciente cu kier mehora e alineacion y e spacio entre nan djente.",
    },
    "dental-crowns-bridges": {
      name: "Coronanan y Brugnan",
      summary: "Restauracion fuerte cu ta parce natural pa djente daña of cu ta falta.",
      description:
        "Coronanan y brugnan ta restaura e forsa y e forma di un djente daña, of ta reemplasa un djente cu ta falta completamente. Cada restauracion ta wordo adapta cu cuidao na bo djente natural den color y forma, pa e mezcla sin ta nota.",
      whoFor:
        "Ta wordo recomenda si un djente ta considerablemente gasta, raha of ta falta y mester mas soporte cu un empaste por duna.",
    },
    "root-canal-therapy": {
      name: "Tratamento di Canal di Raiz",
      summary: "Cuido suave di canal di raiz cu e meta di salba bo djente natural.",
      description:
        "Ora un djente ta infecta of seriamente afecta pa caries, e tratamento aki tin como meta pa resolve e problema mientras e ta preserva lo mas posibel di bo djente natural. E ta wordo haci bao di anestesia local, y hopi paciente ta sinti alivio una vez cu e causa di e dolor ta wordo kita.",
      whoFor:
        "Pa cualkier persona cu dolor di djente of infeccion cu kier salba e djente natural en bez di perde'le.",
      expandedDescription:
        "Tratamento di canal di raiz ta wordo usa ora e tehido paden di un djente ta inflama of infecta. E tehido afecta ta wordo kita cu cuidao, e parti paden di e djente ta wordo limpia y desinfecta, y e djente ta wordo sella. E meta ta pa alivia e sintomanan y preserva e djente natural ora cu ta posibel.",
    },
    "preventive-care": {
      name: "Prevencion y Higiena",
      summary: "Limpiesa y cuido profesional cu ta yuda tene bo sonrisa saludabel.",
      description:
        "Bishitanan regular di higiena ta yuda proteha e resultado di cualkier tratamento y tene bo djente natural saludabel. Cada bishita, incluyendo un limpiesa profesional completo, ta wordo adapta na bo necesidadnan specifico.",
      whoFor:
        "Ta wordo recomenda pa tur paciente — sea cu bo a haya tratamento recientemente of cu bo simplemente kier mantene un sonrisa saludabel y cu confiansa.",
      expandedDescription:
        "Cuido dental preventivo ta enfoca riba mantene djente y encia saludabel y identifica posibel problema trempan. Citanan por inclui limpiesa profesional, eliminacion di placa y sarro, evaluacion di encia, guia pa salud oral y control dental rutinario basa riba e necesidadnan individual di e paciente.",
    },
    "night-guards": {
      name: "Protector di Noche Hecho na Midi",
      summary:
        "Un protector di noche hecho na midi ta yuda proteha bo djente y restauracionnan contra daño causa pa rechiña y primi djente.",
      description:
        "Un protector di noche hecho na midi ta yuda proteha bo djente y restauracionnan contra desgaste y daño causa pa rechiña of primi djente. E ta wordo traha individualmente pa bo djente despues di un examen.",
      whoFor:
        "Vale la pena discuti si bo ta rechiña of primi bo djente, si bo ta nota desgaste riba bo djente, of si bo kier proteha coronanan, brugnan of facetanan. Si un protector di noche ta adecua pa bo por wordo determina solamente despues di un examen.",
      expandedDescription:
        "Un protector di noche ta un capa protectivo transparente cu bo por kita, traha pa pas bo djente y cu bo ta bisti anochi. E ta yuda limita desgaste y daño na djente y restauracionnan causa pa rechiña of primi djente. E ta diseña pa proteha, no pa move djente ni pa tene nan na posicion — esey ta loke ta distingui'e di un retenedor ortodontico.",
    },
  },
  cases: {
    "case-02": {
      title: "Facetanan di Porcelana",
      description: veneersCaseDescription,
      beforeAlt: "Sonrisa di un paciente prome cu tratamento dental.",
      afterAlt: "Sonrisa di un paciente despues di tratamento dental.",
    },
    "case-hero": { title: "Facetanan di Porcelana", description: veneersCaseDescription, ...teethAlts },
    "case-04": { title: "Facetanan di Porcelana", description: veneersCaseDescription, ...teethAlts },
    "case-05": { title: "Facetanan di Porcelana", description: "6 faceta di porcelana.", ...teethAlts },
    "case-06": {
      title: "Facetanan di Porcelana",
      description: "Facetanan di ceramica natural pa un sonrisa balansa y cu confiansa.",
      ...smileAlts,
    },
    "case-08": {
      title: "Restauracion cu Corona Dental",
      description: "Un djente di dilanti daña reconstrui cu un corona di ceramica cu ta parce natural.",
      beforeAlt: "Djente di dilanti daña di un paciente prome cu tratamento cu corona.",
      afterAlt: "Sonrisa di un paciente despues di tratamento cu corona.",
    },
    "case-09": {
      title: "Rehabilitacion di Sonrisa",
      description:
        "Restauracion estetico completo diseña pa mehora funcion y crea un sonrisa cu ta parce natural.",
      ...smileAlts,
    },
    "case-10": { title: "Facetanan di Porcelana", description: veneersCaseDescription, ...smileAlts },
    "case-12": { title: "Facetanan di Porcelana", description: veneersCaseDescription, ...smileAlts },
    "case-15": { ...emergencyCase },
    "case-16": { ...emergencyCase },
    "case-18": {
      title: "Corona Dental",
      description: "Un djente di patras daña restaura cu un corona dental cu ta parce natural.",
      beforeAlt: "Djente di patras daña di un paciente prome cu tratamento cu corona.",
      afterAlt: "Djente di patras di un paciente despues di tratamento cu corona.",
    },
  },
};

export default pap;

// Spanish translation -- machine-assisted, not professionally verified; review items in docs/translations/REVIEW-es.md
import type { SharedContent } from "../types";

const veneersCase = {
  title: "Carillas de porcelana",
  description: "Carillas de porcelana hechas a medida, diseñadas para realzar la forma, el color y la armonía de la sonrisa.",
};

const aestheticRepairCase = {
  title: "Odontología estética y de urgencia",
  description: "Reparación estética rápida y discreta de dientes frontales rotos, dañados o ausentes.",
  beforeAlt: "Sonrisa del paciente antes de una reparación estética de los dientes frontales.",
  afterAlt: "Sonrisa del paciente después de una reparación estética de los dientes frontales.",
};

const es: SharedContent = {
  treatments: {
    "porcelain-veneers": {
      name: "Carillas de porcelana",
      summary: "Láminas delgadas hechas a medida que pueden transformar el aspecto de su sonrisa.",
      description:
        "Una forma rápida de corregir astillas, espacios o decoloración y mostrar la sonrisa segura que ha estado deseando. Cada carilla se diseña en función de su rostro y de sus dientes naturales, buscando un resultado de aspecto natural.",
      whoFor:
        "Ideal si desea una sonrisa más luminosa y uniforme sin modificar la estructura natural de sus dientes más de lo necesario.",
      expandedDescription:
        "Las carillas de porcelana son láminas cerámicas delgadas hechas a medida que se colocan sobre la superficie frontal de los dientes. Pueden mejorar el aspecto de la decoloración, las astillas, las formas irregulares, los espacios pequeños y otras inquietudes estéticas. Cada carilla se diseña para complementar su sonrisa manteniendo un aspecto natural.",
    },
    "emergency-aesthetic-dentistry": {
      name: "Odontología estética y de urgencia",
      summary: "Reparación estética rápida y discreta de dientes frontales rotos, dañados o ausentes.",
      description:
        "Para pacientes con dientes frontales rotos, dañados o ausentes que desean una reparación estética rápida. Con técnicas restauradoras cuidadosamente seleccionadas, a menudo la sonrisa puede reconstruirse en una sola visita, según la situación clínica.",
      whoFor:
        "Para pacientes que desean una reparación estética rápida después de un daño o la pérdida de un diente, en tan pocas visitas como lo permita la situación clínica.",
    },
    "dental-implants": {
      name: "Implantes dentales",
      summary: "Un reemplazo fijo y de sensación natural para los dientes ausentes.",
      description:
        "Los implantes reemplazan tanto la raíz como la corona de un diente ausente, para que pueda volver a comer, hablar y sonreír con confianza. Cada implante se planifica cuidadosamente con anticipación, buscando un resultado que se vea y se sienta como sus propios dientes.",
      whoFor:
        "Adecuado para cualquier persona a la que le falten uno o más dientes y que desee una solución a largo plazo en lugar de una removible.",
    },
    "composite-restorations": {
      name: "Carillas de resina",
      summary: "Una forma suave de corregir astillas, espacios y decoloración en una sola visita.",
      description:
        "Las carillas de resina utilizan resina del color del diente para mejorar la forma, el color y la apariencia de los dientes. El tratamiento se adapta a su sonrisa después de una evaluación personal.",
      whoFor: "Una buena opción si desea una mejora rápida y conservadora en un número limitado de dientes.",
    },
    "clear-aligners": {
      name: "Alineadores transparentes",
      summary: "Enderece su sonrisa de forma discreta, sin brackets tradicionales.",
      description:
        "Los alineadores transparentes y removibles guían gradualmente sus dientes a su lugar y son más discretos que los brackets fijos. Su tratamiento se planifica con anticipación, para que pueda ver qué resultado se busca antes de comenzar.",
      whoFor:
        "Muy adecuado para adultos y adolescentes que desean dientes más alineados sin el aspecto ni las restricciones de los brackets metálicos.",
      expandedDescription:
        "Los alineadores transparentes utilizan una serie de férulas transparentes hechas a medida para mover gradualmente sus dientes hacia una posición más adecuada. Son removibles y ofrecen una alternativa discreta a los brackets tradicionales para muchos pacientes que desean mejorar la alineación y el espaciado de los dientes.",
    },
    "dental-crowns-bridges": {
      name: "Coronas y puentes",
      summary: "Restauraciones resistentes y de aspecto natural para dientes dañados o ausentes.",
      description:
        "Las coronas y los puentes devuelven la resistencia y la forma a un diente dañado, o reemplazan uno que falta por completo. Cada restauración se adapta cuidadosamente a sus dientes naturales en color y forma, para que se integre de manera armoniosa.",
      whoFor:
        "Recomendado si un diente está muy desgastado, agrietado o ausente y necesita más soporte del que puede ofrecer un empaste.",
    },
    "root-canal-therapy": {
      name: "Tratamiento de conducto",
      summary: "Un tratamiento de conducto cuidadoso que busca salvar su diente natural.",
      description:
        "Cuando un diente está infectado o muy cariado, este tratamiento busca resolver el problema conservando la mayor parte posible de su diente natural. Se realiza con anestesia local, y muchos pacientes sienten alivio una vez que se elimina la causa del dolor.",
      whoFor: "Para cualquier persona con dolor o infección dental que desee salvar el diente natural en lugar de perderlo.",
      expandedDescription:
        "El tratamiento de conducto se utiliza cuando el tejido del interior de un diente se inflama o se infecta. El tejido afectado se retira con cuidado, el interior del diente se limpia y se desinfecta, y el diente se sella. El objetivo es aliviar los síntomas y conservar el diente natural siempre que sea posible.",
    },
    "preventive-care": {
      name: "Prevención e higiene",
      summary: "Limpieza y cuidados profesionales que ayudan a mantener su sonrisa sana.",
      description:
        "Las visitas regulares de higiene ayudan a proteger los resultados de cualquier tratamiento y a mantener sanos sus dientes naturales. Cada visita, incluida una limpieza profesional minuciosa, se adapta a sus necesidades específicas.",
      whoFor:
        "Recomendado para todos los pacientes, tanto si ha recibido un tratamiento recientemente como si simplemente desea mantener una sonrisa sana y segura.",
      expandedDescription:
        "La atención dental preventiva se centra en mantener sanos los dientes y las encías e identificar a tiempo posibles problemas. Las citas pueden incluir limpieza profesional, eliminación de placa y sarro, evaluación de las encías, orientación sobre salud bucal y controles dentales de rutina según las necesidades individuales del paciente.",
    },
    "night-guards": {
      name: "Férulas de descarga nocturnas a medida",
      summary:
        "Una férula de descarga nocturna hecha a medida ayuda a proteger sus dientes y restauraciones del daño causado por rechinar y apretar los dientes.",
      description:
        "Una férula de descarga nocturna hecha a medida ayuda a proteger sus dientes y restauraciones del desgaste y el daño causados por rechinar o apretar los dientes. Se fabrica de forma individual para sus dientes después de un examen.",
      whoFor:
        "Vale la pena conversarlo si rechina o aprieta los dientes, nota desgaste en sus dientes o desea proteger coronas, puentes o carillas. Si una férula de descarga nocturna le conviene solo puede determinarse después de un examen.",
      expandedDescription:
        "Una férula de descarga nocturna es una capa protectora transparente y removible, hecha para ajustarse a sus dientes y que se usa por la noche. Ayuda a limitar el desgaste y el daño en los dientes y las restauraciones causados por rechinar o apretar los dientes. Está diseñada para proteger, no para mover los dientes ni mantenerlos en posición; eso es lo que la distingue de un retenedor de ortodoncia.",
    },
  },
  cases: {
    "case-02": {
      ...veneersCase,
      beforeAlt: "Sonrisa del paciente antes del tratamiento dental.",
      afterAlt: "Sonrisa del paciente después del tratamiento dental.",
    },
    "case-hero": {
      ...veneersCase,
      beforeAlt: "Dientes del paciente antes del tratamiento.",
      afterAlt: "Dientes del paciente después del tratamiento.",
    },
    "case-04": {
      ...veneersCase,
      beforeAlt: "Dientes del paciente antes del tratamiento.",
      afterAlt: "Dientes del paciente después del tratamiento.",
    },
    "case-05": {
      title: "Carillas de porcelana",
      description: "6 carillas de porcelana.",
      beforeAlt: "Dientes del paciente antes del tratamiento.",
      afterAlt: "Dientes del paciente después del tratamiento.",
    },
    "case-06": {
      title: "Carillas de porcelana",
      description: "Carillas cerámicas naturales para una sonrisa equilibrada y segura.",
      beforeAlt: "Sonrisa del paciente antes del tratamiento.",
      afterAlt: "Sonrisa del paciente después del tratamiento.",
    },
    "case-08": {
      title: "Restauración con corona dental",
      description: "Un diente frontal dañado reconstruido con una corona cerámica de aspecto natural.",
      beforeAlt: "Diente frontal dañado del paciente antes del tratamiento con corona.",
      afterAlt: "Sonrisa del paciente después del tratamiento con corona.",
    },
    "case-09": {
      title: "Rehabilitación de la sonrisa",
      description:
        "Restauración estética integral diseñada para mejorar la función y crear una sonrisa de aspecto natural.",
      beforeAlt: "Sonrisa del paciente antes del tratamiento.",
      afterAlt: "Sonrisa del paciente después del tratamiento.",
    },
    "case-10": {
      ...veneersCase,
      beforeAlt: "Sonrisa del paciente antes del tratamiento.",
      afterAlt: "Sonrisa del paciente después del tratamiento.",
    },
    "case-12": {
      ...veneersCase,
      beforeAlt: "Sonrisa del paciente antes del tratamiento.",
      afterAlt: "Sonrisa del paciente después del tratamiento.",
    },
    "case-15": { ...aestheticRepairCase },
    "case-16": { ...aestheticRepairCase },
    "case-18": {
      title: "Corona dental",
      description: "Un diente posterior dañado restaurado con una corona dental de aspecto natural.",
      beforeAlt: "Diente posterior dañado del paciente antes del tratamiento con corona.",
      afterAlt: "Diente posterior del paciente después del tratamiento con corona.",
    },
  },
};

export default es;

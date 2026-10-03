// Spanish translation -- machine-assisted, not professionally verified; review items in docs/translations/REVIEW-es.md
import type { PageContent } from "../types";
import treatmentPages from "./treatmentPages";

const es: PageContent = {
  treatmentPages,
  preventiveCare: {
    overview: [
      "La atención preventiva es la parte de la odontología que busca prevenir problemas, o detectarlos a tiempo, antes de que se necesite un tratamiento mayor. Consiste en controles periódicos, limpieza profesional y consejos adaptados a su situación.",
      "En un control se evalúan los dientes, las encías y los tejidos blandos. Cuando es necesario se toman radiografías para evaluar zonas que no son visibles.",
      "En una cita de higiene se eliminan el sarro y la placa, incluso por debajo del borde de la encía, donde el cepillado no llega. Ahí es donde comienza la inflamación de las encías.",
    ],
    suitableFor: [
      "Cualquier persona que desee mantener sus dientes sanos a largo plazo",
      "Encías que sangran al cepillarse o al usar hilo dental",
      "Placa o sarro visibles",
      "Pacientes con coronas, puentes, implantes o carillas, que necesitan un mantenimiento adicional",
    ],
    process: [
      {
        title: "Control",
        description:
          "Se evalúan los dientes, las encías, las restauraciones existentes y los tejidos blandos. Cuando es necesario se toman radiografías.",
      },
      {
        title: "Evaluación de las encías",
        description: "Se registra el estado de las encías, para poder seguir los cambios entre una visita y otra.",
      },
      {
        title: "Limpieza profesional",
        description:
          "Se eliminan el sarro y la placa y se pulen los dientes. El tiempo que esto toma varía de un paciente a otro.",
      },
      {
        title: "Consejos y próxima cita",
        description:
          "Recibe consejos específicos sobre el cepillado, la limpieza entre los dientes y los hábitos que afectan su salud bucal, y acordamos cuándo volverá.",
      },
    ],
    limitations: [
      "La atención preventiva reduce la probabilidad de problemas, pero no los descarta. Las caries y la enfermedad de las encías pueden aparecer incluso con un buen cuidado.",
      "La limpieza en la clínica no reemplaza el cuidado diario en casa; la mayor parte del resultado se logra en casa.",
      "La limpieza no revierte el daño existente: caries, pérdida de hueso o encías retraídas.",
      "La frecuencia necesaria de los controles y la limpieza varía de una persona a otra; no hay un único intervalo adecuado para todos.",
    ],
    aftercare: [
      "Cepíllese dos veces al día durante dos minutos con pasta dental con flúor.",
      "Limpie entre los dientes a diario, con hilo dental o cepillos interdentales.",
      "Acuda con la frecuencia acordada para usted, también cuando no tenga síntomas.",
      "Informe si le sangran las encías, si tiene sensibilidad o si nota un cambio en la mordida, en lugar de esperar a que pase.",
      "¿Rechina o aprieta los dientes, o nota desgaste en ellos? Menciónelo en su control; una férula de descarga nocturna a medida puede ayudar a proteger sus dientes y restauraciones.",
    ],
    faq: [
      {
        question: "¿Con qué frecuencia debo venir a un control?",
        answer:
          "Varía según la persona y depende de su salud bucal y de sus factores de riesgo. Después del control acordamos juntos un intervalo adecuado.",
      },
      {
        question: "¿Es dolorosa una limpieza?",
        answer:
          "Por lo general no. Con las encías inflamadas o los cuellos de los dientes sensibles puede resultar incómoda; avísenos y adaptamos el procedimiento.",
      },
      {
        question: "Me sangran las encías al cepillarme. ¿Debo cepillarme menos?",
        answer:
          "El sangrado de encías por lo general es un signo de inflamación, no de cepillarse demasiado. Hágalo evaluar en lugar de evitar esa zona.",
      },
      {
        question: "¿Cuánto cuesta un control o una limpieza?",
        answer:
          "No publicamos un precio fijo, porque el tiempo necesario varía de un paciente a otro. Recibirá una indicación del costo de antemano.",
      },
    ],
  },
  policies: {
    privacy: {
      intro: [
        "Esta política explica qué información personal trata el sitio web de Dentacare Aruba, por qué, y a quién contactar si tiene preguntas. Se aplica únicamente a este sitio web.",
      ],
      sections: [
        {
          heading: "Quiénes somos",
          paragraphs: [
            "Dentacare Aruba, Morgenster 35C, Aruba.",
            "Para preguntas sobre su información personal, escriba a {email}. Esta dirección es solo para preguntas sobre privacidad; para consultar por una cita, use WhatsApp (vea la página de Contacto).",
          ],
        },
        {
          heading: "Qué recopila este sitio web",
          lead: [
            "El sitio web no tiene formulario de contacto, ni cuentas de pacientes, ni boletín informativo. No necesita enviar un formulario ni crear una cuenta para navegar por este sitio web.",
          ],
          items: [
            "Alojamiento: el sitio web está alojado por Vercel. Como ocurre con cualquier sitio web, el proveedor de alojamiento recibe información técnica cuando usted visita una página, como su dirección IP, el tipo de navegador y la página solicitada, para poder entregar el sitio web.",
            "Analítica: el sitio web no utiliza herramientas de analítica, publicidad ni seguimiento.",
            "Fechas en Aruba: las fechas en que el dentista trabaja en Aruba se almacenan en Upstash. Esto no contiene información sobre visitantes ni pacientes.",
            "Inicio de sesión del personal: el sitio web tiene una página privada de inicio de sesión para el personal de la clínica. Para limitar los intentos de adivinar contraseñas, cada intento de inicio de sesión se cuenta durante un máximo de 15 minutos mediante un valor codificado de forma unidireccional, derivado de la dirección IP del visitante y almacenado en Upstash. Este contador de inicios de sesión no contiene la dirección IP en sí.",
          ],
        },
        {
          heading: "Consultas de citas por WhatsApp",
          paragraphs: [
            "Las consultas de citas se hacen por WhatsApp. Cuando usted toca un enlace de WhatsApp en este sitio web, WhatsApp se abre con un mensaje sugerido que puede modificar antes de enviarlo; no se envía nada hasta que usted mismo lo envíe.",
            "Su mensaje, junto con el nombre y el número de teléfono que aparecen en su cuenta de WhatsApp, es tratado entonces por WhatsApp (un servicio de Meta) conforme a la propia política de privacidad de WhatsApp, y por la clínica para responder a su consulta.",
          ],
        },
        {
          heading: "Enlaces a otros servicios",
          paragraphs: [
            "Los enlaces a WhatsApp, Google Maps e Instagram abren esos servicios, que tratan su información conforme a sus propias políticas de privacidad. Este sitio web no incorpora contenido de ellos.",
          ],
        },
        {
          heading: "Fotos de antes y después",
          paragraphs: [
            "Las fotos de antes y después de este sitio web muestran resultados de tratamientos realizados por Sam Abdin y se publican con el consentimiento de los pacientes correspondientes. Para hacer una consulta sobre una foto, o para retirar su consentimiento, escriba a {email}.",
          ],
        },
        {
          heading: "Dónde se trata la información",
          paragraphs: ["Vercel y Upstash pueden tratar información en servidores ubicados fuera de Aruba."],
        },
        {
          heading: "Preguntas y solicitudes",
          paragraphs: [
            "Puede escribir a {email} para preguntar qué información personal tiene la clínica sobre usted, o para pedir que se corrija o se elimine.",
          ],
        },
        {
          heading: "Cambios en esta política",
          paragraphs: [
            "Esta política se actualiza cuando cambia el sitio web. La versión vigente está siempre en esta página.",
          ],
        },
      ],
    },
    cookies: {
      intro: [
        "Esta página explica qué guarda el sitio web de Dentacare Aruba en su navegador. El sitio web no utiliza cookies de analítica, publicidad ni seguimiento.",
      ],
      sections: [
        {
          heading: "Qué guarda el sitio web",
          items: [
            "theme (guardado en el almacenamiento local de su navegador): solo si cambia entre el modo claro y el oscuro, para recordar su elección. Permanece hasta que usted borre los datos de su navegador para este sitio web.",
            "dentacare_admin (cookie): solo para el personal de la clínica que inicia sesión en el editor privado. Mantiene su sesión iniciada, se envía únicamente a las páginas del editor y caduca después de 8 horas o cuando cierran la sesión. Nunca se establece para pacientes ni otros visitantes.",
          ],
          paragraphs: ["El código propio del sitio web no guarda nada más en su navegador."],
        },
        {
          heading: "Otros servicios",
          paragraphs: [
            "Cuando usted sigue un enlace a WhatsApp, Google Maps o Instagram, esos servicios pueden establecer sus propias cookies conforme a sus propias políticas. Este sitio web no incorpora contenido de ellos.",
          ],
        },
        {
          heading: "Gestionar la información guardada",
          paragraphs: [
            "Puede eliminar en cualquier momento lo que el sitio web ha guardado desde la configuración de su navegador, borrando las cookies y los datos del sitio para este sitio web.",
          ],
        },
        {
          heading: "Cambios y preguntas",
          paragraphs: [
            "Si el sitio web empieza a guardar algo más, esta página se actualizará primero. Para preguntas, escriba a {email}.",
          ],
        },
      ],
    },
  },
};

export default es;

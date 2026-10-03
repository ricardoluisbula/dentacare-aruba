# Spanish (es) translation: review list

The Spanish text on this website is a **machine-assisted translation that has not been professionally verified**. Before launch it needs review by a fluent Spanish speaker familiar with dental terminology, ideally someone who knows the Spanish used by Aruba's Spanish-speaking residents and visitors (often Venezuelan or Colombian). Target register: formal "usted", neutral Latin American / Caribbean Spanish.

Files: `src/lib/i18n/dictionaries/es.ts`, `es.treatments.ts`, `es.gallery.ts`, `src/content/es/shared.ts`, `src/content/es/pages.ts`, `src/content/es/treatmentPages.ts`.

The automated test (`npx vitest run src/content -t "es translation"`) only checks completeness, that nothing is left in English, and that names, numbers and tokens are preserved. It cannot judge meaning or quality; the rows below are what a human should check first.

| Where (key path) | English | Spanish | Why to review |
|---|---|---|---|
| `emergencyTreatmentPage.safetyBody` | ...If you have severe pain, swelling, bleeding or an injury and no dates are available, do not wait: seek care from another dental or medical service in Aruba. | ...Si tiene dolor intenso, hinchazón, sangrado o una lesión y no hay fechas disponibles, no espere: busque atención en otro servicio dental o médico en Aruba. | Safety note. Must be unmistakably clear and urgent; confirm nothing is softened. |
| `emergencyTreatmentPage.faqItems[0].answer` | ...Trouble breathing or swallowing because of swelling needs emergency medical care straight away. | ...La dificultad para respirar o tragar debido a una hinchazón requiere atención médica de urgencia de inmediato. | Emergency FAQ (toothache). Check "dolor de muelas" (used for any toothache, also front teeth) and "analgésicos comunes" for ordinary painkillers. |
| `emergencyTreatmentPage.faqItems[1].answer` | ...If a whole tooth has been knocked out, hold it by the crown (not the root)... with a knocked-out adult tooth every minute counts. | ...Si se ha caído un diente completo por un golpe, sosténgalo por la corona (no por la raíz)... con un diente permanente que se ha caído por un golpe, cada minuto cuenta. | Emergency first-aid instructions. "Adult tooth" rendered as "diente permanente" (the clinical meaning); confirm. "Agua tibia" for lukewarm water. |
| `emergencyTreatmentPage.faqItems[3].answer` | Arrange a dental examination as soon as possible... or with another dental service if the dentist is not. | Programe un examen dental lo antes posible... o con otro servicio dental si el dentista no está. | Emergency FAQ; confirm the redirect to other services is clear. |
| `whatsapp.enquiryNote` | A WhatsApp message is an enquiry, not a booking. Your appointment is only confirmed once the practice replies to confirm a date and time. | Un mensaje de WhatsApp es una consulta, no una reserva. Su cita solo queda confirmada cuando la clínica le responde para confirmar una fecha y una hora. | Key expectation-setting note. "Consulta" can also mean a medical consultation; confirm readers understand it as an enquiry/question here. |
| `whatsapp.cta`, `cta.title` | Ask about an appointment (on WhatsApp / in Aruba) | Consulte por una cita (en WhatsApp / en Aruba) | Must not read as "book an appointment". |
| `whatsapp.prefill` | Hello Dentacare Aruba, I would like to ask about an appointment in Aruba. | Hola, Dentacare Aruba. Quisiera hacer una consulta sobre una cita en Aruba. | Message the patient sends; check it sounds natural. |
| `availability.timeZoneNote` | All dates and times are Aruba time (AST, UTC−4). | Todas las fechas y horas están en hora de Aruba (AST, UTC−4). | Confirm phrasing. |
| `shared.treatments.porcelain-veneers.name` (and titles, gallery filter) | Porcelain Veneers | Carillas de porcelana | Treatment name choice. |
| `shared.treatments.composite-restorations.name` (and titles, gallery filter `compositeBonding`) | Composite Veneers | Carillas de resina | Treatment name choice. Alternatives: "Carillas de composite", "Carillas de resina compuesta". The material itself is called "resina" throughout the page text. |
| `shared.treatments.dental-crowns-bridges.name` | Crowns & Bridges | Coronas y puentes | Treatment name choice. |
| `shared.treatments.dental-implants.name` | Dental Implants | Implantes dentales | Treatment name choice. |
| `shared.treatments.clear-aligners.name` | Clear Aligners | Alineadores transparentes | Treatment name choice. The trays are called "férulas transparentes"; confirm this does not get confused with the night guard ("férula de descarga"). |
| `shared.treatments.root-canal-therapy.name` | Root Canal Treatment | Tratamiento de conducto | Treatment name choice. Alternative: "Endodoncia" (more clinical; Spain/LatAm). "Tratamiento de conducto" chosen as most common in Venezuela/Colombia. |
| `shared.treatments.night-guards.name` and all night-guard text | Custom Night Guards / night guard | Férulas de descarga nocturnas a medida / férula de descarga nocturna | Treatment name choice; least certain. Regional alternatives: "placa de bruxismo", "placa miorrelajante", "guarda oclusal", "protector bucal nocturno". The overview mentions "protector bucal nocturno o placa de bruxismo" as other names (for English "bite guard or grinding guard"). |
| `shared.treatments.emergency-aesthetic-dentistry.name` | Emergency & Aesthetic Dentistry | Odontología estética y de urgencia | Treatment name choice; word order swapped for natural Spanish. |
| `shared.treatments.preventive-care.name` | Preventive & Hygiene | Prevención e higiene | Treatment name choice. |
| `shared.cases.case-09.title`, gallery filter | Smile Rehabilitation | Rehabilitación de la sonrisa | Check this is the usual term (alt. "Rehabilitación oral"). |
| teeth grinding throughout (`nightGuardSpotlight`, night-guards page) | teeth grinding / grind or clench | rechinamiento de dientes / rechinar o apretar los dientes | "Bruxismo" is kept where English says bruxism. Alt. "rechinar"/"crujir los dientes". |
| `treatmentPages.clear-aligners.process[3]`, night-guard FAQ | orthodontic retainer / fixed retainer | retenedor de ortodoncia / retenedor fijo | Confirm the distinction from the night guard is clear. |
| `treatmentPages.clear-aligners.limitations[2]` | Small attachments on the teeth, or lightly reshaping contact points | pequeños aditamentos (attachments)... ligero remodelado de los puntos de contacto | Clinical term; "attachments" kept in brackets. Interproximal reduction wording to confirm. |
| `treatmentPages.clear-aligners.suitableFor[0]` | Mildly to moderately crooked teeth | Dientes con apiñamiento leve a moderado | "Apiñamiento" (crowding) is slightly more specific than "crooked"; alt. "dientes levemente a moderadamente torcidos". |
| `treatmentPages.composite-restorations.process[2].title` | Layering and curing | Aplicación en capas y fotopolimerización | Clinical term ("curing" = light-curing assumed); description uses neutral "se endurece". |
| `treatmentPages.dental-crowns-bridges.aftercare[0]` | interdental brush or superfloss | cepillo interdental o hilo dental especial (superfloss) | Product term. |
| `treatmentPages.root-canal-therapy.process[1]` | rubber dam | dique de goma | Clinical term. |
| `treatmentPages.dental-implants.limitations[2]` | peri-implantitis | periimplantitis | Spelling (alt. "peri-implantitis"). |
| `treatmentPages.dental-implants.overview[0]` | removable overdenture | sobredentadura removible | Clinical term. |
| implants pages | jawbone | hueso maxilar | Covers both jaws; confirm. |
| `preventiveCare.faq[1].answer` | sensitive necks of the teeth | cuellos de los dientes sensibles | Clinical term (alt. "cuellos dentales sensibles"). |
| fillings throughout | composite fillings / filling | empastes de resina / empaste | "Empaste" is widely understood; Venezuela/Colombia also say "calza" (Colombia) or "obturación". |
| check-ups throughout | check-up | control / control dental | Alt. "chequeo", "revisión". |
| cost FAQs throughout | personalized cost estimate | presupuesto personalizado | "Presupuesto" chosen; alt. "cotización" (common in LatAm). Confirm no price promise is implied. |
| `policies.privacy` (all) | handles / processed | trata / se trata (información personal) | "Tratar datos" is the standard data-protection verb; confirm it reads naturally and does not sound like a legal guarantee. No rights, legal bases or retention periods were added. |
| `policies.privacy.sections[1].items[3]` | ...counted for up to 15 minutes using a one-way coded value derived from the visitor's IP address... | ...se cuenta durante un máximo de 15 minutos mediante un valor codificado de forma unidireccional, derivado de la dirección IP del visitante... | Technical wording (one-way hash); check accuracy. |
| `policies.privacy.sections[2]` | Appointment enquiries by WhatsApp | Consultas de citas por WhatsApp | WhatsApp/Meta data-handling wording; confirm precision. |
| `policies.privacy.sections[3]`, `policies.cookies.sections[1]` | does not embed content from them | no incorpora contenido de ellos | Technical meaning of "embed". |
| `policies.cookies.sections[0].items` | theme (...local storage) / dentacare_admin (cookie) ... expires after 8 hours | theme (...almacenamiento local) / dentacare_admin (cookie) ... caduca después de 8 horas | Storage names kept as-is; check wording. |
| `common.cookieConsentMessage` and related | We use privacy-friendly analytics... | Usamos analítica respetuosa con la privacidad... | Translated faithfully, but note the English itself says analytics is used while the policies say it is not; that inconsistency is in the source. |
| `teamPage.bio`, `teamPage.experienceValue` | practised dentistry in Amsterdam since 2009 | Ejerce la odontología en Amsterdam desde 2009 | "Amsterdam" deliberately kept without accent (exact name token). Spanish would normally write "Ámsterdam". |
| `hero.headlineAccent` | Artistry in every smile | Arte en cada sonrisa | Marketing slogan; idiomatic. |
| `treatmentsPage.heroEyebrow` | Your Smile. Our Expertise. | Su sonrisa. Nuestra experiencia. | Slogan. |
| `treatmentsPage.comparison.rows.rapid` | Rapid aesthetic concern | Inquietud estética que requiere rapidez | Awkward source phrase; check. |
| `treatmentsPage.comparison.goalColumn` and rows | Concern | Inquietud | Alt. "Problema", "Motivo de consulta". |
| `emergencyTreatmentPage.faqEyebrow` etc. | Good to Know | Bueno saber | Idiomatic; alt. "Conviene saber", "Información útil". |
| `pages.pricingInfo.title` | Fees & Insurance | Tarifas y seguros | Alt. "Honorarios y seguros". |
| `nav.reviews` | Reviews | Opiniones | Alt. "Reseñas", "Testimonios". |
| `nav.about` | About | Nosotros | Alt. "Sobre nosotros". |
| `smileGallery.featuredCaption`, `sliderLabel` | Drag to compare / slider | Deslice para comparar / control | UI wording for the before/after slider. |

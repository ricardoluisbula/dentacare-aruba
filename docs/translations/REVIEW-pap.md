# Aruba Papiamento (`pap`) translation: review list

**Status: machine-assisted, NOT professionally verified.** This translation was produced with machine assistance and has not been checked by a qualified translator. It aims for **Aruba Papiamento** (etymological spelling such as "cu", "y", "con", "cas", "informacion", "tratamento"), not the Curaçao/Bonaire variety and spelling, but some words may still follow the wrong variety or sound unnatural. A **fluent Aruba Papiamento speaker, ideally with dental knowledge, must review it before launch**, starting with the rows at the top of this list. Nobody should describe the translation as verified until that review is done.

Files covered:
- `src/lib/i18n/dictionaries/pap.ts`, `pap.treatments.ts`, `pap.gallery.ts`
- `src/content/pap/shared.ts`, `src/content/pap/pages.ts`, `src/content/pap/pages.treatments.ts`

## Choices to confirm first

- **Form of address: "bo"** (informal "you", possessive "bo") throughout, and **"nos"** for the practice ("we"). "Bo" is the usual form in Aruban public and commercial communication. If the practice prefers a more formal tone ("Señor/Señora", or "Usted"-style phrasing), every sentence that speaks to the patient has to change.
- **Accents — please check carefully (see "Spelling and accents to confirm" below):** the text currently contains **no accented letters except "ñ"**. This is not a deliberate Aruba spelling decision: the translation brief asked to avoid Curaçao-style diacritics (ü, è, ò, ù), and the translator also left out acute accents everywhere. Aruba's official orthography does use some accents, so **valid Aruba accents may be missing**. Nothing in the website code or its tests strips, rewrites or rejects accented letters; a reviewer can add accents directly in the `pap` files.
- **"Practice" = "consultorio"** everywhere (e.g. "e consultorio ta contesta"). Alternative: "clinica" or "practica".
- **"Appointment" = "cita"**, **"enquiry" = "pregunta"**, **"booking" = "reservacion"**.
- **"Patient" = "paciente"** (Aruba; Curaçao writes "pashent").
- **"Gums" = "encia"**: we were unsure between "encia" and "enchia"; please confirm the form used in Aruba.
- **"Website" kept as "website"** and **"browser", "link", "email", "login", "password", "scan", "slider", "tab", "hosting", "newsletter"** kept in English as commonly used in Aruba. Confirm these are acceptable.
- Treatment names (rows 1–10 below) are the most visible choices and need a decision before launch.

## Spelling and accents to confirm

No accents were added or removed automatically, and none will be: these are
questions for a fluent Aruba Papiamento reviewer, who can edit the `pap` files
directly. Counts are how often each word appears in the site text.

1. **Acute accents (á, é, í, ó, ú).** None are used anywhere. Please mark where
   Aruba's official orthography requires an accent and add it. Words to check
   first, by frequency:
   - despues (69), mas (57), aki (44), prome (39), kico (30), ey (15),
     cuminsa (10), semper (9), tambe (8), ainda (4)
   - verb forms after "a"/"wordo" (completed or passive actions), where accent
     marking differs between spelling systems: kita (17), traha (8), evalua (7),
     trata (6), tuma (6), controla (6), publica (5), determina (5),
     recomenda (5), adapta (5), daña (4), planea (4), confirma (3), kibra (3),
     diseña (3), limpia (3), prepara (3), reemplasa (3), and others such as
     studia, bira, repara, sella, pulia, logra, warda, manda, actualisa, pega,
     purba, aplica.
2. **Other diacritics (ü, è, ò, ù).** The translation brief treated these as
   Curaçao/Bonaire spelling and avoided them. If any are valid in Aruba
   spelling for words on this site, please restore them; nothing in the
   checks rejects them.
3. **Dates.** Day and month names are set in `src/lib/availability/dates.ts`
   (`djadomingo`, `djaluna`, `djamars`, `djarason`, `djaweps`, `djabierna`,
   `djasabra`; `januari` … `december`, including `maart`, `augustus`,
   `october`), written in full, lower case, without accents. Please confirm
   the Aruba spellings and capitalisation.
4. **Aruba vs Curaçao forms** already flagged in the table below (e.g. encia /
   enchia, cepia / cepio, kico, salud / saludabel).

## Review table

Most important first: treatment names, safety and emergency wording, the WhatsApp booking note, policies, then clinical terms and spelling.

| # | Where (key path) | English | Papiamento | Why to review |
|---|---|---|---|---|
| 1 | shared `treatments.porcelain-veneers.name` (+ gallery filters, case titles, meta) | Porcelain Veneers | Facetanan di Porcelana | Treatment name; "faceta" (Spanish) vs "veneer" in everyday Aruban use |
| 2 | shared `treatments.composite-restorations.name` (+ `smileGallery.filters.compositeBonding`) | Composite Veneers | Facetanan di Composite | Treatment name; "composite" kept as-is, could be "resina compuesto" |
| 3 | shared `treatments.dental-crowns-bridges.name` | Crowns & Bridges | Coronanan y Brugnan | Treatment name; "brug" (Dutch-derived) for a dental bridge, plural "brugnan" |
| 4 | shared `treatments.dental-implants.name` | Dental Implants | Implantenan Dental | Treatment name; clinical term |
| 5 | shared `treatments.clear-aligners.name` | Clear Aligners | Alineadornan Transparente | Treatment name; no established Papiamento term. Patients may know "aligners" or the brand-like word "Invisalign" (do not use a brand) |
| 6 | shared `treatments.root-canal-therapy.name` | Root Canal Treatment | Tratamento di Canal di Raiz | Treatment name; colloquially people may say "tratamento di nervio". Clinical term |
| 7 | shared `treatments.night-guards.name` (+ meta, links) | Custom Night Guards | Protector di Noche Hecho na Midi | Treatment name; no established term ("protector di noche", "férula"?). "Hecho na midi" for "custom-made" |
| 8 | shared `treatments.emergency-aesthetic-dentistry.name` (+ gallery, case titles) | Emergency & Aesthetic Dentistry | Odontologia di Emergencia y Estetica | Treatment name; "odontologia" may sound formal |
| 9 | shared `treatments.preventive-care.name`, `nav.preventionHygiene` | Preventive & Hygiene / Prevention & Hygiene | Prevencion y Higiena | "Higiena" vs "higiene" spelling in Aruba |
| 10 | shared `cases.case-09.title`, `smileGallery.filters.smileRehabilitation` | Smile Rehabilitation | Rehabilitacion di Sonrisa | Treatment/category name |
| 11 | `emergencyTreatmentPage.safetyBody` | This treatment is only available on the dates the dentist is in Aruba. If you have severe pain, swelling, bleeding or an injury and no dates are available, do not wait: seek care from another dental or medical service in Aruba. | E tratamento aki ta disponibel solamente riba e fechanan cu e dentista ta na Aruba. Si bo tin dolor severo, hinchamento, sangramento of un lesion y no tin fecha disponibel, no warda: busca atencion na otro servicio dental of medico na Aruba. | SAFETY wording; "hinchamento" (swelling), "sangramento" (bleeding), "lesion" (injury) need confirmation; urgency must be unmistakable |
| 12 | `emergencyTreatmentPage.safetyTitle` | Only on the dates the dentist is in Aruba | Solamente riba e fechanan cu e dentista ta na Aruba | Safety heading |
| 13 | `emergencyTreatmentPage.faqItems[0]` (toothache) | ...Trouble breathing or swallowing because of swelling needs emergency medical care straight away. | ...Dificultad pa hala rosea of pa traga pa motibo di hinchamento ta rekeri atencion medico di emergencia mesora. | SAFETY; "hala rosea" (breathe), "traga" (swallow), "pastia comun contra dolor" (ordinary painkillers), "cachete hincha" (swollen cheek), "keintura" (fever), "tene bo dispierto" (keeps you awake) |
| 14 | `emergencyTreatmentPage.faqItems[1]` (broken / knocked-out tooth) | Keep the broken piece in milk or saliva... If a whole tooth has been knocked out, hold it by the crown (not the root), do not clean it... every minute counts. | Warda e pida kibra den lechi of saliva... Si henter un djente a sali pa motibo di un golpi, tene'le na e corona (no na e raiz), no limpia'le... cada minuut ta conta. | SAFETY first-aid instructions; "a sali pa motibo di un golpi" for "knocked out"; "gasa limpi" (clean gauze); "awa tibio" (lukewarm water); "spula" (rinse) |
| 15 | `emergencyTreatmentPage.faqItems[3]` | Arrange a dental examination as soon as possible... or with another dental service if the dentist is not. | Haci un cita pa un examen dental mas pronto posibel... of cu otro servicio dental si e dentista no ta na Aruba. | SAFETY; we made "if the dentist is not [in Aruba]" explicit for clarity; confirm meaning is unchanged |
| 16 | `whatsapp.enquiryNote` | A WhatsApp message is an enquiry, not a booking. Your appointment is only confirmed once the practice replies to confirm a date and time. | Un mensahe via WhatsApp ta un pregunta, no un reservacion. Bo cita ta confirma solamente ora e consultorio contesta pa confirma un fecha y ora. | Must keep enquiry-vs-booking meaning exactly; "reservacion" vs "cita" |
| 17 | `whatsapp.prefill` | Hello Dentacare Aruba, I would like to ask about an appointment in Aruba. | Hola Dentacare Aruba, mi kier puntra tocante un cita na Aruba. | Text the patient sends; "Hola" vs "Bon dia"; politeness level ("mi kier" vs "mi ta desea") |
| 18 | `whatsapp.messagesOnly` | Messages only — this number does not take calls. | Solamente mensahe — e numero aki no ta atende yamada. | "numero" vs "number"; "atende yamada" |
| 19 | `cta.description` | ...The practice replies to arrange a time on one of the dates the dentist is in Aruba, when one is available. | ...E consultorio ta contesta pa fiha un ora riba un di e fechanan cu e dentista ta na Aruba, ora tin un disponibel. | Must not sound like a guaranteed slot |
| 20 | `availability.timeZoneNote` | All dates and times are Aruba time (AST, UTC−4). | Tur fecha y ora ta na ora di Aruba (AST, UTC−4). | "ora" used for both "time" and "hour"; check clarity |
| 21 | `treatmentDetail.disclaimer` | This page is general information, not medical advice or a treatment plan... | E pagina aki ta informacion general, no consejo medico ni un plan di tratamento... | Medical disclaimer; keep its full weight |
| 22 | `treatmentDetail.suitableIntro`, `emergencyTreatmentPage.helpIntro` | This is not a diagnosis... | Esaki no ta un diagnostico... | Medical disclaimer wording; "examen en persona" for "in-person examination" |
| 23 | pages `policies.privacy.intro` and all `policies.privacy.sections` | (privacy policy) | (Politica di Privacidad) | POLICY wording: translated literally; must not read as a legal guarantee. "Politica di Privacidad" vs "Maneho di Privacidad" |
| 24 | pages `policies.privacy.sections[1].items[3]` | Staff sign-in: ...each sign-in attempt is counted for up to 15 minutes using a one-way coded value derived from the visitor's IP address, stored with Upstash. This sign-in counter does not contain the IP address itself. | Login pa personal: ...cada intento di login ta wordo conta pa te 15 minuut, usando un balor codifica di un solo direccion (one-way) deriva di e adres IP di e bishitante, warda cu Upstash. E contador di login aki no ta contene e adres IP mes. | POLICY / technical; "balor codifica di un solo direccion" is a literal rendering of "one-way coded value" and may be unclear |
| 25 | pages `policies.privacy.sections[1].items[0]` | Hosting: the website is hosted by Vercel... | Hosting: e website ta wordo hospeda pa Vercel... "e proveedor di hosting" | POLICY; "hospeda", "proveedor di hosting" |
| 26 | pages `policies.privacy.sections[2].paragraphs` | Appointment enquiries go by WhatsApp... handled by WhatsApp (a Meta service) under WhatsApp's own privacy policy, and by the practice to answer your enquiry. | Pregunta tocante cita ta bai via WhatsApp... ta wordo trata pa WhatsApp (un servicio di Meta) bao di e politica di privacidad propio di WhatsApp, y pa e consultorio pa contesta bo pregunta. | POLICY; "trata" = handle/process; check that it does not imply more than English |
| 27 | pages `policies.privacy.sections[4].paragraphs[0]` | ...published with the consent of the patients concerned. To ask about a photo, or to withdraw your consent, email {email}. | ...ta wordo publica cu permiso di e pacientenan concerni. Pa puntra tocante un foto, of pa retira bo permiso, manda un email na {email}. | POLICY; "permiso" vs "consentimiento" for legal consent |
| 28 | pages `policies.privacy.sections[6].paragraphs[0]` | You can email {email} to ask what personal information the practice holds about you, or to ask for it to be corrected or deleted. | Bo por manda un email na {email} pa puntra ki informacion personal e consultorio tin di bo, of pa pidi pa e informacion ey wordo corigi of borra. | POLICY; must not read as a statutory right |
| 29 | pages `policies.privacy.sections[5]` | Vercel and Upstash may process information on servers outside Aruba. | Vercel y Upstash por procesa informacion riba servidor pafo di Aruba. | POLICY; "por" keeps the "may" |
| 30 | pages `policies.privacy.sections[1].lead` | The website has no contact form, no patient accounts and no newsletter... | E website no tin formulario di contacto, no tin cuenta pa paciente y no tin newsletter... | POLICY; "newsletter" kept in English |
| 31 | pages `policies.privacy.sections[7]` | This policy is updated when the website changes... | E politica aki ta wordo actualisa ora e website cambia... | POLICY |
| 32 | pages `policies.cookies` (all) | (cookie policy) | (Politica di Cookie) | POLICY wording; "cookie" kept; "almacenamento local" (local storage); "datonan di sitio" (site data) |
| 33 | pages `policies.cookies.sections[0].items[1]` | dentacare_admin (cookie): ...It keeps them signed in, is sent only to the editor's pages, and expires after 8 hours or when they sign out. It is never set for patients or other visitors. | dentacare_admin (cookie): ...E ta mantene nan sesion habri, ta wordo manda solamente na e paginanan di e editor, y ta caduca despues di 8 ora of ora nan sali for di e editor. Nunca e ta wordo pone pa paciente ni otro bishitante. | POLICY; "drenta" (sign in), "sesion habri", "sali" (sign out), "caduca" (expires) |
| 34 | pages `policies.cookies.sections[0].items[0]` | theme (stored in your browser's local storage): ... | theme (warda den e almacenamento local di bo browser): ... | POLICY; "almacenamento local" |
| 35 | `common.cookieConsentMessage` | We use privacy-friendly analytics to understand how our website is used. No personal or medical information is ever tracked. | Nos ta usa analisis di uso cu ta respeta privacidad pa compronde con nos website ta wordo usa. Nunca nos ta rastrea informacion personal of medico. | POLICY-like wording; "analisis di uso", "rastrea". NOTE: the English source itself says analytics are used while the policies say none are; this is a content issue for the practice, not a translation one |
| 36 | `common.cookieConsentAccept` / `Decline` | Accept / Decline | Acepta / Rechasa | Spelling "Rechasa" vs "Rechaza"; tone |
| 37 | `common.cookieConsentCurrentGranted` | You have allowed analytics cookies. You can change or withdraw that choice here. | Bo a permiti cookie di analisis. Bo por cambia of retira e escogencia ey aki. | Consent wording |
| 38 | `pages.privacy.title`, `footer.privacyPolicyLink` | Privacy Policy | Politica di Privacidad | Legal title; alternative "Maneho di Privacidad" |
| 39 | `pages.cookies.title`, `footer.cookiePolicyLink` | Cookie Policy | Politica di Cookie | Legal title |
| 40 | `footer.rightsReserved` | All rights reserved. | Tur derecho reserva. | Fixed legal phrase |
| 41 | pages `treatmentPages.dental-implants.limitations[1]` | An implant can fail to integrate, or come loose later. This is uncommon, but it is not a guarantee that can be given in advance. | Un implante por faya di integra, of bira floho despues. Esaki no ta comun, pero no por duna garantia di antemano cu esaki no lo pasa. | Rephrased slightly for clarity ("no guarantee can be given that this will not happen"); confirm no change in meaning |
| 42 | pages `treatmentPages.porcelain-veneers.overview[1]`, `limitations[0]` | That step is irreversible... | E paso ey ta irreversibel... | Key risk statement; "irreversibel" may be too technical for patients |
| 43 | all cost FAQ answers (`...faq[n]` "What does ... cost?") | We do not publish a fixed price... You receive a personalized cost estimate... | Nos no ta publica un prijs fiho... Bo ta ricibi un estimacion di costo personalisa... | "prijs" (Dutch) vs "precio"; "estimacion di costo" vs "presupuesto" |
| 44 | `pages.pricingInfo.title` | Fees & Insurance | Tarifa y Seguro | Term check |
| 45 | pages `treatmentPages.clear-aligners.process[3]`, `nightGuardSpotlight.note`, shared `night-guards.expandedDescription` | orthodontic retainer | retenedor ortodontico | Clinical term; no established Papiamento word. Must stay clearly different from "night guard" |
| 46 | pages `treatmentPages.night-guards.background[0]` and FAQs | teeth grinding / clenching / bruxism | rechiña djente / primi djente / bruxismo | Clinical/idiom; "rechiña" spelling (ñ) and whether "primi djente" is the natural word for clenching |
| 47 | pages `treatmentPages.night-guards.overview[1]` | bite guard or grinding guard | protector di mordida of protector contra rechiña | Alternative names; may not be used in Aruba |
| 48 | pages `treatmentPages.root-canal-therapy.process[1]` | rubber dam | dique di goma | Clinical term; no established Papiamento word |
| 49 | pages `treatmentPages.root-canal-therapy.overview[0]` | a chamber of nerve and blood vessel tissue: the pulp | un camber cu tehido di nervio y vaso sanguineo: e pulpa | Clinical; "camber" (room/chamber) spelling; "tehido" (tissue) |
| 50 | many keys | tissue | tehido | Clinical term; Spanish-derived, confirm spelling |
| 51 | many keys | decay | caries | Clinical term; Aruba spelling ("caries" vs Curaçao "kariès") |
| 52 | many keys | plaque / tartar | placa / sarro | Clinical terms; "sarro" (Spanish) vs Dutch "tandsteen" |
| 53 | many keys | filling | empaste | Clinical term; may be "plombeer"/"plombashon" in everyday speech |
| 54 | many keys | radiograph | radiografia | Clinical term; patients may say "foto di röntgen" |
| 55 | many keys | impression | molde | Clinical term; "molde" vs "impresion" |
| 56 | many keys | bite | mordida | Clinical term |
| 57 | many keys | jaw / jawbone | cakaña / wesu di cakaña | Aruba spelling ("cakaña" vs Curaçao "kakaña") |
| 58 | many keys | enamel | esmalte | Clinical term |
| 59 | many keys | local anaesthetic | anestesia local | Clinical term |
| 60 | pages `treatmentPages.dental-implants.overview[0]` | removable overdenture | protesis removibel (overdenture) | Clinical term; English kept in brackets |
| 61 | pages `treatmentPages.dental-implants.suitableFor[2]` | denture | protesis (djente postiso) | Everyday term check |
| 62 | pages `treatmentPages.dental-implants.limitations[2]` | peri-implantitis | peri-implantitis | Clinical term kept |
| 63 | `preventionHygienePage.faqItems[0]` | ...that can point to periodontitis, which can only be established at the practice. | ...esey por indica periodontitis, loke por wordo determina solamente na e consultorio. | Health FAQ; "rand di encia" (gumline), "encia ta baha" (gums recede), "rosea tin un holor desagradabel" (bad breath) |
| 64 | pages `preventiveCare.faq[1]` | sensitive necks of the teeth | cuello di djente sensibel | Clinical term |
| 65 | pages `treatmentPages.dental-crowns-bridges.aftercare[0]`, `preventiveCare.aftercare[1]` | interdental brush / superfloss / floss | cepio interdental / superfloss / hilo dental | "cepio" spelling (noun) vs "cepia" (verb); Curaçao uses "sepiu"/"sepia" |
| 66 | many keys | brush (verb) / brushing | cepia / cepiamento | Aruba spelling vs Curaçao "sepia" |
| 67 | `preventiveCare.aftercare[0]` | fluoride toothpaste | pasta di djente cu fluor | Term check |
| 68 | pages `treatmentPages.clear-aligners` | trays / attachments / arch / relapse / referral | bandeha / attachment / arco / recaida / referencia | Clinical terms; "attachment" kept in English |
| 69 | pages `treatmentPages.clear-aligners.suitableFor[0]` | Mildly to moderately crooked teeth | Djente cu ta leve te moderadamente torcido | "torcido" vs "scheef" (common in Aruba) |
| 70 | shared `clear-aligners.summary`, others | braces | brackets | Everyday term in Aruba? Alternative "frenillo" |
| 71 | pages `treatmentPages.composite-restorations.suitableFor[3]` | narrower | mas smal | "smal" (Dutch-derived) vs "angosto" |
| 72 | pages `treatmentPages.composite-restorations.process[2]` | Layering and curing | Aplicacion den capa y endurecemento | Clinical term "curing" |
| 73 | pages `treatmentPages.dental-crowns-bridges.suitableFor[2]` | leaking | ta lek | Dutch-derived; clinical meaning (marginal leakage) |
| 74 | pages `treatmentPages.dental-crowns-bridges.aftercare[2]` | ice cubes and pens | blokitonan di ijs y pen | Aruba spelling of "ijs"/"blokito" |
| 75 | pages `treatmentPages.composite-restorations.limitations[1]` | coffee, tea and red wine | cofi, te y biña cora | Aruba spelling "cofi" (Curaçao "kofi"), "biña" |
| 76 | many keys | swelling | hinchamento | Unsure this is the standard Aruban noun; "hinchá"/"hinchazon"? |
| 77 | many keys | bleeding | sangramento | Confirm natural noun |
| 78 | many keys | injury | lesion | Alternative "herida" (wound) |
| 79 | many keys | wear (tooth wear) | desgaste | Clinical term |
| 80 | many keys | crack / cracked | raha | Confirm usage |
| 81 | many keys | loose | floho | Confirm |
| 82 | many keys | chipped | (cu) pida kibra | Idiom for "chipped" |
| 83 | `imageAlts.preventionCleaning` | ultrasonic scaler and dental mirror | scaler ultrasonico y un spil dental | "spil" (mirror) spelling in Aruba; "scaler" kept |
| 84 | many keys | healthy | saludabel | vs "salú" (Curaçao); Aruba spelling check |
| 85 | many keys | health | salud | Aruba spelling (Curaçao "salú") |
| 86 | many keys | which | cua | Aruba spelling (Curaçao "kua") |
| 87 | many keys | what | kico | Aruba spelling (Curaçao "kiko") |
| 88 | many keys | how | con | Aruba spelling (Curaçao "kon") |
| 89 | many keys | with / that | cu | Aruba spelling (Curaçao "ku") |
| 90 | many keys | thing | cos | Aruba spelling (Curaçao "kos") |
| 91 | many keys | home (at home) | na cas | Aruba spelling (Curaçao "kas") |
| 92 | many keys | patient | paciente | Aruba (Curaçao "pashent") |
| 93 | many keys | visit / visitor | bishita / bishitante | Confirm Aruba spelling |
| 94 | many keys | promise (cannot be promised) | priminti | Spelling check |
| 95 | many keys | early / earlier | trempan / mas trempan | Confirm |
| 96 | many keys | gentle | suave | Tone |
| 97 | `nav.home`, `notFound.backHome` | Home / Back to home | Inicio / Bek na inicio | Common Aruban web usage? |
| 98 | `nav.about` | About | Tocante Nos | Navigation label |
| 99 | `nav.reviews`, `pages.reviews` | Reviews | Opinion | Alternatives: "Reseña", "Opinion di paciente" |
| 100 | `contactPage.hoursLabel` | Opening hours | Orario di habri | "orario" spelling |
| 101 | `hero.headlineAccent` | Artistry in every smile | Arte den cada sonrisa | Marketing idiom |
| 102 | `treatmentsPage.heroEyebrow` | Your Smile. Our Expertise. | Bo Sonrisa. Nos Conocemento. | Marketing idiom; "conocemento" spelling |
| 103 | `treatmentsPage.comparison.rows.rapid` | Rapid aesthetic concern | Preocupacion estetico cu mester atencion rapido | Interpretation of an ambiguous English label |
| 104 | `treatmentsPage.trustStrip.communicationText` | Clear guidance, at every step of your journey. | Guia cla, na cada paso di bo trayecto. | Idiom ("journey") |
| 105 | `teamPage.bio`, `homeDentist.body` | trained at the University of Groningen... in the Netherlands | a studia na Universidad di Groningen... na Hulanda | "Hulanda" spelling; "studia" for "trained" |
| 106 | `teamPage.experienceValue` | Practising dentistry in Amsterdam since 2009 | Ta practica odontologia na Amsterdam desde 2009 | Professional wording |
| 107 | `header.languageFallback` | in English | na Ingles | Spelling |
| 108 | `header.switchToLight` / `switchToDark` | Switch to light / dark theme | Cambia pa tema cla / scur | Aruba spelling "cla"/"scur" (Curaçao "kla"/"skur") |
| 109 | `a11y.skipToContent` | Skip to content | Bai directo na e contenido | Accessibility label |
| 110 | gallery `smileGallery.*` | slider / Drag | slider / Hala | "slider" kept in English |
| 111 | gallery `smileGallery.heroEyebrow` | Real Smiles. Real Patients. Real Results. | Sonrisa Real. Paciente Real. Resultado Real. | Marketing |
| 112 | gallery `treatmentsGallery.title` | Transformations We're Proud Of | Transformacionnan di Cual Nos Ta Orguyoso | Grammar/idiom |
| 113 | shared `treatments.porcelain-veneers.description` | ...reveal the confident smile you've been wanting. | ...mustra e sonrisa cu confiansa cu bo tabata desea. | Marketing idiom |
| 114 | shared `treatments.dental-crowns-bridges.description` | ...so it blends in seamlessly. | ...pa e mezcla sin ta nota. | Idiom |
| 115 | shared `treatments.clear-aligners.whoFor` | adults and teens | adulto y hoben | "hoben" for "teens" |
| 116 | `preventionHygienePage.protectTitle` | Protect the Smile You've Invested In | Proteha e Sonrisa Den Cual Bo A Inverti | Grammar/idiom |
| 117 | pages `treatmentPages.night-guards.aftercare` | ventilated case / boiling water / pets | estuche ventila / awa cu ta herbe / animal di cas | Everyday wording |

## Not a translation issue, noted for the practice

- `common.cookieConsentMessage` (English source) says the site uses "privacy-friendly analytics", while both policies say the website does not use analytics. The Papiamento follows the English; the practice should resolve this in the English source.

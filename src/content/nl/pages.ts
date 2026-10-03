// Dutch translation -- machine-assisted, not professionally verified; review items in docs/translations/REVIEW-nl.md
import type { PageContent } from "../types";
import { treatmentPages } from "./treatmentPages";

const nl: PageContent = {
  treatmentPages,
  preventiveCare: {
    overview: [
      "Preventieve zorg is het deel van de tandheelkunde dat erop gericht is problemen te voorkomen of vroeg op te sporen, voordat een grotere behandeling nodig wordt. Het bestaat uit periodieke controles, professionele reiniging en advies dat is afgestemd op uw situatie.",
      "Bij een controle worden de tanden, het tandvlees en de weke delen beoordeeld. Waar nodig worden röntgenfoto's gemaakt om plekken te beoordelen die niet zichtbaar zijn.",
      "Bij een mondhygiëneafspraak worden tandsteen en tandplak verwijderd — ook onder de tandvleesrand, waar de tandenborstel niet komt. Daar begint tandvleesontsteking.",
    ],
    suitableFor: [
      "Iedereen die zijn tanden op de lange termijn gezond wil houden",
      "Tandvlees dat bloedt bij het poetsen of flossen",
      "Zichtbare tandplak of tandsteen",
      "Patiënten met kronen, bruggen, implantaten of facings, die extra onderhoud nodig hebben",
    ],
    process: [
      {
        title: "Controle",
        description:
          "De tanden, het tandvlees, bestaande restauraties en de weke delen worden beoordeeld. Waar nodig worden röntgenfoto's gemaakt.",
      },
      {
        title: "Beoordeling van het tandvlees",
        description: "De toestand van het tandvlees wordt vastgelegd, zodat veranderingen tussen bezoeken kunnen worden gevolgd.",
      },
      {
        title: "Professionele reiniging",
        description:
          "Tandsteen en tandplak worden verwijderd en de tanden worden gepolijst. Hoe lang dat duurt, verschilt per patiënt.",
      },
      {
        title: "Advies en volgende afspraak",
        description:
          "U krijgt concreet advies over poetsen, het reinigen tussen de tanden en gewoonten die uw mondgezondheid beïnvloeden, en we spreken af wanneer u terugkomt.",
      },
    ],
    limitations: [
      "Preventieve zorg verkleint de kans op problemen, maar sluit ze niet uit. Ook bij goede zorg kunnen cariës en tandvleesaandoeningen ontstaan.",
      "Reiniging in de praktijk vervangt de dagelijkse verzorging thuis niet; het grootste deel van het resultaat wordt thuis bereikt.",
      "Bestaande schade — cariës, botverlies, teruggetrokken tandvlees — wordt door reiniging niet ongedaan gemaakt.",
      "Hoe vaak controles en reiniging nodig zijn, verschilt per persoon; er is geen vast interval dat voor iedereen juist is.",
    ],
    aftercare: [
      "Poets twee keer per dag twee minuten met fluoridetandpasta.",
      "Reinig dagelijks tussen de tanden, met floss of ragertjes.",
      "Kom op het voor u afgesproken interval, ook als u geen klachten heeft.",
      "Meld bloedend tandvlees, gevoeligheid of een veranderde beet, in plaats van het af te wachten.",
      "Knarst of klemt u, of merkt u slijtage aan uw tanden op? Vermeld het bij uw controle; een nachtbitje op maat kan helpen uw tanden en restauraties te beschermen.",
    ],
    faq: [
      {
        question: "Hoe vaak moet ik op controle komen?",
        answer:
          "Dat verschilt per persoon en hangt af van uw mondgezondheid en risicofactoren. Na de controle spreken we samen een passend interval af.",
      },
      {
        question: "Is een gebitsreiniging pijnlijk?",
        answer:
          "Meestal niet. Bij ontstoken tandvlees of gevoelige tandhalzen kan het onprettig zijn; laat het ons weten, dan passen we de aanpak aan.",
      },
      {
        question: "Mijn tandvlees bloedt als ik poets. Moet ik minder poetsen?",
        answer:
          "Bloedend tandvlees is meestal een teken van ontsteking, niet van te veel poetsen. Laat het beoordelen in plaats van de plek te ontzien.",
      },
      {
        question: "Wat kost een controle of reiniging?",
        answer:
          "We publiceren hiervoor geen vaste prijs, omdat de benodigde tijd per patiënt verschilt. U ontvangt vooraf een indicatie van de kosten.",
      },
    ],
  },
  policies: {
    privacy: {
      intro: [
        "Dit beleid legt uit welke persoonsgegevens de website van Dentacare Aruba verwerkt, waarom, en bij wie u met vragen terechtkunt. Het geldt alleen voor deze website.",
      ],
      sections: [
        {
          heading: "Wie wij zijn",
          paragraphs: [
            "Dentacare Aruba, Morgenster 35C, Aruba.",
            "Voor vragen over uw persoonsgegevens kunt u e-mailen naar {email}. Dit adres is alleen bedoeld voor privacyvragen; gebruik WhatsApp om naar een afspraak te vragen (zie de contactpagina).",
          ],
        },
        {
          heading: "Wat deze website verzamelt",
          lead: [
            "De website heeft geen contactformulier, geen patiëntaccounts en geen nieuwsbrief. U hoeft geen formulier in te vullen of een account aan te maken om deze website te bekijken.",
          ],
          items: [
            "Hosting: de website wordt gehost door Vercel. Zoals bij elke website ontvangt de host technische informatie wanneer u een pagina bezoekt, zoals uw IP-adres, het type browser en de opgevraagde pagina, om de website te kunnen leveren.",
            "Analyse: de website gebruikt geen analyse-, advertentie- of trackingtools.",
            "Datums op Aruba: de datums waarop de tandarts op Aruba werkt, worden opgeslagen bij Upstash. Dit bevat geen informatie over bezoekers of patiënten.",
            "Inloggen door medewerkers: de website heeft een besloten inlogpagina voor medewerkers van de praktijk. Om het raden van wachtwoorden te beperken, wordt elke inlogpoging tot 15 minuten lang geteld met behulp van een eenrichtingscode die is afgeleid van het IP-adres van de bezoeker en wordt opgeslagen bij Upstash. Deze inlogteller bevat het IP-adres zelf niet.",
          ],
        },
        {
          heading: "Afspraakaanvragen via WhatsApp",
          paragraphs: [
            "Afspraakaanvragen verlopen via WhatsApp. Wanneer u op deze website op een WhatsApp-link tikt, opent WhatsApp met een voorgesteld bericht dat u vóór het versturen kunt aanpassen; er wordt niets verstuurd totdat u het zelf verstuurt.",
            "Uw bericht wordt dan, samen met de naam en het telefoonnummer die in uw WhatsApp-account worden getoond, verwerkt door WhatsApp (een dienst van Meta) onder het eigen privacybeleid van WhatsApp, en door de praktijk om uw aanvraag te beantwoorden.",
          ],
        },
        {
          heading: "Links naar andere diensten",
          paragraphs: [
            "Links naar WhatsApp, Google Maps en Instagram openen die diensten, die uw gegevens verwerken onder hun eigen privacybeleid. Deze website toont geen ingesloten inhoud van deze diensten.",
          ],
        },
        {
          heading: "Voor-en-na-foto's",
          paragraphs: [
            "De voor-en-na-foto's op deze website tonen resultaten van behandelingen door Sam Abdin en worden gepubliceerd met toestemming van de betrokken patiënten. Om een vraag te stellen over een foto, of om uw toestemming in te trekken, kunt u e-mailen naar {email}.",
          ],
        },
        {
          heading: "Waar gegevens worden verwerkt",
          paragraphs: ["Vercel en Upstash kunnen gegevens verwerken op servers buiten Aruba."],
        },
        {
          heading: "Vragen en verzoeken",
          paragraphs: [
            "U kunt e-mailen naar {email} om te vragen welke persoonsgegevens de praktijk over u heeft, of om te vragen die te corrigeren of te verwijderen.",
          ],
        },
        {
          heading: "Wijzigingen in dit beleid",
          paragraphs: [
            "Dit beleid wordt bijgewerkt wanneer de website verandert. De actuele versie staat altijd op deze pagina.",
          ],
        },
      ],
    },
    cookies: {
      intro: [
        "Deze pagina legt uit wat de website van Dentacare Aruba in uw browser opslaat. De website gebruikt geen analytische, advertentie- of trackingcookies.",
      ],
      sections: [
        {
          heading: "Wat de website opslaat",
          items: [
            "theme (opgeslagen in de lokale opslag van uw browser): alleen als u wisselt tussen de lichte en de donkere modus, om uw keuze te onthouden. Dit blijft bewaard totdat u de browsergegevens voor deze website wist.",
            "dentacare_admin (cookie): alleen voor medewerkers van de praktijk die inloggen op de besloten editor. Deze cookie houdt hen ingelogd, wordt alleen naar de pagina's van de editor verstuurd en verloopt na 8 uur of wanneer zij uitloggen. Deze cookie wordt nooit ingesteld voor patiënten of andere bezoekers.",
          ],
          paragraphs: ["De eigen code van de website slaat verder niets op in uw browser."],
        },
        {
          heading: "Andere diensten",
          paragraphs: [
            "Wanneer u een link naar WhatsApp, Google Maps of Instagram volgt, kunnen die diensten hun eigen cookies plaatsen onder hun eigen beleid. Deze website toont geen ingesloten inhoud van deze diensten.",
          ],
        },
        {
          heading: "Opgeslagen gegevens beheren",
          paragraphs: [
            "U kunt wat de website heeft opgeslagen op elk moment verwijderen via de instellingen van uw browser, door de cookies en sitegegevens voor deze website te wissen.",
          ],
        },
        {
          heading: "Wijzigingen en vragen",
          paragraphs: [
            "Als de website iets anders gaat opslaan, wordt deze pagina eerst bijgewerkt. Voor vragen kunt u e-mailen naar {email}.",
          ],
        },
      ],
    },
  },
};

export default nl;

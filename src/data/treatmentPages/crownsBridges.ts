import type { TreatmentPageContent } from "./types";

export const crownsBridges: TreatmentPageContent = {
  overview: [
    "A crown is a cap placed over a tooth, replacing the whole visible upper part. This is done when too little healthy tooth structure remains to support a filling — after a fracture, after a large repair, or after root canal treatment, for example.",
    "A bridge replaces one or more missing teeth by anchoring to the teeth on either side of the gap. Those neighbouring teeth are prepared for this and become part of the construction.",
    "Both are made to measure in a dental laboratory and matched to the shape and colour of your own teeth.",
  ],
  suitableFor: [
    "A tooth that has fractured or decayed beyond what a filling can restore",
    "A tooth that needs protecting after root canal treatment",
    "An existing crown that is loose, leaking or broken",
    "A missing tooth where the neighbouring teeth already have, or need, a restoration",
  ],
  process: [
    {
      title: "Examination and radiograph",
      description: "We assess the tooth, the root and the surrounding bone, and establish whether a crown or bridge is the right choice in your situation or whether another solution fits better.",
    },
    {
      title: "Preparation and impression",
      description: "The tooth is shaped and an impression or digital scan is taken. You leave with a temporary restoration so you can eat and speak normally.",
    },
    {
      title: "Fabrication",
      description: "The laboratory makes the crown or bridge to measure. The shade is matched to the surrounding teeth.",
    },
    {
      title: "Fitting and review",
      description: "The crown or bridge is tried in, the bite and margins are checked, and it is then cemented in place.",
    },
  ],
  limitations: [
    "A crown or bridge requires tooth structure to be removed; for a bridge that applies to the healthy neighbouring teeth as well. This is irreversible.",
    "The margin between crown and tooth remains a place where decay can start if oral hygiene falls short.",
    "A bridge makes cleaning underneath the middle section harder and needs extra attention when brushing.",
    "How long a crown or bridge lasts varies considerably between patients and depends on oral hygiene, bite and habits such as grinding. No fixed lifespan can be promised.",
    "If the underlying tooth or root later develops problems, the crown or bridge may have to be remade.",
  ],
  aftercare: [
    "Brush twice daily and clean between the teeth every day; with a bridge, use an interdental brush or superfloss beneath the middle section.",
    "Attend your regular check-ups and hygiene appointments.",
    "Avoid biting hard objects such as ice cubes and pens.",
    "Do you grind or clench? Ask whether a custom night guard would help protect the crown or bridge.",
    "Tell us straight away if the crown feels loose, the gum around it is inflamed, or the bite changes.",
  ],
  faq: [
    {
      question: "What does a crown cost?",
      // ARUBA DRAFT: new copy, needs practice review -- the reference answer
      // quoted a fixed per-tooth price; no fee is published for Aruba.
      answer: "We do not publish a fixed price for this, because the cost depends on your treatment plan and the materials used. You receive a personalized cost estimate before treatment begins.",
    },
    {
      question: "How many appointments are needed?",
      answer: "Usually at least two: one to prepare and take the impression, and one to fit. A more extensive plan may need more.",
    },
    {
      question: "What is the difference between a crown and a bridge?",
      answer: "A crown restores one existing tooth. A bridge replaces a missing tooth and relies on the teeth either side of the gap to do so.",
    },
    {
      question: "Is an implant an alternative to a bridge?",
      answer: "Sometimes. An implant leaves the neighbouring teeth untouched, but requires sufficient jawbone and a longer overall timeline. What is possible in your situation follows from the examination.",
    },
  ],
};

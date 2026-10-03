import type { TreatmentPageContent } from "./types";

export const preventiveCare: TreatmentPageContent = {
  overview: [
    "Preventive care is the part of dentistry that aims to prevent problems, or find them early, before larger treatment becomes necessary. It consists of periodic check-ups, professional cleaning, and advice tailored to your situation.",
    "At a check-up the teeth, gums and soft tissues are assessed. Radiographs are taken where needed, to assess areas that are not visible.",
    "At a hygiene appointment, tartar and plaque are removed — including below the gum line, where brushing does not reach. That is where gum inflammation begins.",
  ],
  suitableFor: [
    "Anyone who wants to keep their teeth healthy over the long term",
    "Gums that bleed when brushing or flossing",
    "Visible plaque or tartar",
    "Patients with crowns, bridges, implants or veneers, which need extra maintenance",
  ],
  process: [
    {
      title: "Check-up",
      description: "The teeth, gums, existing restorations and soft tissues are assessed. Radiographs are taken where needed.",
    },
    {
      title: "Gum assessment",
      description: "The condition of the gums is recorded, so that changes between visits can be followed.",
    },
    {
      title: "Professional cleaning",
      description: "Tartar and plaque are removed and the teeth are polished. How long this takes differs from patient to patient.",
    },
    {
      title: "Advice and next appointment",
      description: "You receive specific advice on brushing, cleaning between the teeth, and habits that affect your oral health, and we agree when you come back.",
    },
  ],
  limitations: [
    "Preventive care reduces the chance of problems but does not rule them out. Decay and gum disease can occur even with good care.",
    "Cleaning at the practice does not replace daily care at home; most of the result is achieved at home.",
    "Existing damage — decay, bone loss, receded gums — is not undone by cleaning.",
    "How often check-ups and cleaning are needed differs from person to person; there is no single interval that is right for everyone.",
  ],
  aftercare: [
    "Brush twice daily for two minutes with fluoride toothpaste.",
    "Clean between the teeth daily, with floss or interdental brushes.",
    "Attend at the interval agreed for you, including when you have no symptoms.",
    "Report bleeding gums, sensitivity or a changed bite rather than waiting it out.",
    "Do you grind or clench, or notice wear on your teeth? Mention it at your check-up; a custom night guard may help protect your teeth and restorations.",
  ],
  faq: [
    {
      question: "How often should I come for a check-up?",
      answer: "That differs per person and depends on your oral health and risk factors. After the check-up we agree a suitable interval together.",
    },
    {
      question: "Is a cleaning painful?",
      answer: "Usually not. With inflamed gums or sensitive necks of the teeth it can be uncomfortable; tell us and we adjust the approach.",
    },
    {
      question: "My gums bleed when I brush. Should I brush less?",
      answer: "Bleeding gums are usually a sign of inflammation, not of brushing too much. Have it assessed rather than avoiding the area.",
    },
    {
      question: "What does a check-up or cleaning cost?",
      answer: "We do not publish a fixed price for this, because the time needed differs from patient to patient. You receive an indication of the cost beforehand.",
    },
  ],
};

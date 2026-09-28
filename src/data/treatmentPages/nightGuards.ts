import type { TreatmentPageContent } from "./types";
import { TEETH_GRINDING_ANCHOR } from "@/lib/treatmentLinks";

export const nightGuards: TreatmentPageContent = {
  overview: [
    "Many people grind or clench their teeth without realising it. It is often only noticed when the dentist sees signs of wear, or when they wake up with sensitive teeth, tired jaw muscles or a headache.",
    "A night guard — sometimes called a bite guard or grinding guard — is a clear, removable protective appliance made specifically to fit your teeth. It forms a protective layer between the upper and lower teeth and helps limit direct wear and damage from grinding or clenching.",
    "A night guard does not always stop the grinding, and it does not automatically treat the underlying cause. Its main purpose is to protect the teeth and existing restorations.",
  ],
  background: [
    {
      title: "What is teeth grinding?",
      id: TEETH_GRINDING_ANCHOR,
      definition: "Teeth grinding, also known as bruxism, is the unconscious grinding or forceful clenching of the teeth. It can happen during the day or while sleeping.",
      lists: [
        {
          intro: "In practice, this means that someone unconsciously:",
          items: [
            "Grinds the teeth forcefully against each other",
            "Keeps the jaws clenched together for long periods",
            "Does this during sleep, during the day, or both",
          ],
        },
        {
          intro: "Possible signs include:",
          items: [
            "Visible wear, or teeth that are becoming shorter",
            "Chipped, cracked or sensitive teeth",
            "Damage to crowns, bridges, veneers or composite restorations",
            "Tired or tense jaw muscles",
            "Jaw discomfort or a headache on waking",
            "Grinding sounds noticed by a partner",
          ],
        },
      ],
      note: "These signs can also have other causes. Only a dental examination can establish what is going on in your situation.",
    },
  ],
  suitableFor: [
    "You grind or clench your teeth during sleep",
    "You have visible wear on your teeth",
    "You regularly wake up with tense jaw muscles",
    "You want to protect crowns, bridges, veneers, implant crowns or composite restorations",
    "A tooth or restoration has previously been damaged by grinding",
  ],
  process: [
    {
      title: "Examination and assessment",
      description: "The dentist assesses your teeth, restorations, bite and jaw muscles, and looks for signs of wear.",
    },
    {
      title: "Digital scan or impression",
      description: "An accurate scan or impression of your teeth is taken.",
    },
    {
      title: "Custom fabrication",
      description: "The night guard is made individually, so that it fits your teeth properly.",
    },
    {
      title: "Fitting and review",
      description: "The fit and bite are checked. You receive instructions on wearing, cleaning and looking after the guard.",
    },
  ],
  benefits: {
    title: "Possible benefits",
    lists: [
      {
        intro: "A custom-made night guard may:",
        items: [
          "Help protect your teeth from further wear",
          "Reduce the risk of fractures and chipped restorations",
          "Help protect crowns, bridges, veneers and composite restorations",
          "Distribute pressure more evenly across the teeth",
          "Fit more precisely than a generic, shop-bought guard",
        ],
      },
    ],
    note: "A night guard does not cure bruxism and is not a treatment for headaches, jaw-joint problems or pain. Whether it is likely to help you is something the dentist will discuss with you after the examination.",
  },
  limitations: [
    "A night guard protects the teeth, but may not stop the grinding or clenching itself.",
    "It is not a substitute for investigating persistent jaw pain, headaches, sleep problems or other possible causes.",
    "The guard itself can wear down and may eventually need replacing.",
    "Its fit should be checked periodically.",
    "A damaged, loose or uncomfortable guard should be assessed by the practice.",
    "Whether a night guard is suitable for you can only be established after an examination.",
  ],
  aftercare: [
    "Rinse the night guard after every use.",
    "Clean it using the method your dentist recommends.",
    "Do not use boiling or very hot water.",
    "Let it dry before placing it in its ventilated case.",
    "Keep it out of reach of pets.",
    "Bring it with you to your regular check-ups.",
    "Contact the practice if it becomes loose, damaged or uncomfortable.",
  ],
  faq: [
    {
      question: "What is teeth grinding?",
      answer: "Teeth grinding, or bruxism, is unconsciously grinding the teeth against each other or clenching them together with force. It can happen during sleep and during the day. Many people are not aware of it themselves.",
    },
    {
      question: "How do I know whether I grind my teeth?",
      answer: "Possible signs include wear or chipped edges, sensitive teeth, tired jaw muscles or a headache on waking, or a partner who hears the grinding. These symptoms can also have other causes; during an examination the dentist can assess whether grinding or clenching plays a role.",
    },
    {
      question: "Is a night guard the same as an orthodontic retainer?",
      answer: "No. A night guard for grinding protects the teeth and restorations from the forces of grinding and clenching. An orthodontic retainer is worn after braces or aligner treatment to keep the teeth in their new position. They are different appliances with different purposes.",
    },
    {
      question: "Can a night guard stop teeth grinding?",
      answer: "Not always. Its main purpose is protection: the guard absorbs the forces, so teeth and restorations are less likely to be damaged. The grinding itself may continue. If symptoms persist, further investigation into the cause may be needed.",
    },
    {
      question: "How long does a custom night guard last?",
      answer: "It varies from person to person and depends on, among other things, how forcefully you grind or clench and how you look after the guard. No fixed lifespan can be promised. The guard is checked at your review appointments; if it is worn or no longer fits well, it may need replacing.",
    },
    {
      question: "How should I clean my night guard?",
      answer: "Rinse it after every use and clean it using the method your dentist recommends. Do not use boiling or very hot water, let it dry, and store it in a ventilated case out of reach of pets.",
    },
    {
      question: "Can a night guard protect crowns, bridges and veneers?",
      answer: "It can help protect them, because the teeth no longer grind directly against each other. Restorations can still be damaged while wearing a night guard, so regular check-ups remain important.",
    },
    {
      question: "What does a custom night guard cost?",
      answer: "We do not publish a fixed price for this. The final cost depends on the examination, the type of appliance and your personal treatment plan. You receive a cost estimate beforehand.",
    },
  ],
};

/**
 * The treatment catalogue: the short card copy shared by the treatments hub,
 * the night guard spotlight and the detail-page heroes.
 *
 * ARUBA DRAFT: ported (English only) from the reference practice's catalogue;
 * the Aruba practice offers the same treatments. All prices were removed, and
 * card copy that promised permanence or named equipment or techniques the
 * Aruba practice has not confirmed (high magnification, air-polishing,
 * guided/digital planning, "one hour") was rewritten neutrally -- each such
 * line is marked below. Needs practice review before launch.
 */
export type Treatment = {
  slug: string;
  name: string;
  category: "Cosmetic" | "Restorative" | "Orthodontic" | "Preventive" | "Emergency";
  summary: string;
  description: string;
  /**
   * Longer, plain-language clinical explanation shown when a treatment row
   * is expanded in the hub's "More treatments" list. Optional -- only
   * populated for treatments that appear in that accordion list.
   */
  expandedDescription?: string;
  /** Short answer to "who is this treatment for?" -- helps a patient self-select. */
  whoFor: string;
  icon:
    | "veneers"
    | "smile"
    | "implant"
    | "paintbrush"
    | "aligner"
    | "crown"
    | "rootcanal"
    | "hygiene"
    | "repairedtooth"
    | "nightguard";
};

export const treatments: Treatment[] = [
  {
    slug: "porcelain-veneers",
    name: "Porcelain Veneers",
    category: "Cosmetic",
    // ARUBA DRAFT: new copy, needs practice review ("built to last" removed -- no lifespan can be promised).
    summary: "Thin, custom-made shells that can transform the look of your smile.",
    // ARUBA DRAFT: new copy, needs practice review (last clause softened from "looks like it was always yours").
    description:
      "A fast way to correct chips, gaps or discolouration and reveal the confident smile you've been wanting. Each veneer is designed around your face and natural teeth, aiming for a result that looks natural.",
    whoFor:
      "Ideal if you'd like a brighter, more even smile without changing your natural tooth structure more than necessary.",
    expandedDescription:
      "Porcelain veneers are thin, custom-made ceramic shells placed over the front surface of the teeth. They can improve the appearance of discoloration, chips, uneven shapes, small gaps, and other aesthetic concerns. Each veneer is designed to complement your smile while maintaining a natural appearance.",
    icon: "veneers",
  },
  {
    slug: "emergency-aesthetic-dentistry",
    // ARUBA DRAFT: renamed from "1 Hour Emergency Aesthetic Dentistry" -- no
    // treatment time or immediate availability is promised, because the
    // dentist is only in Aruba on specific published dates.
    name: "Emergency & Aesthetic Dentistry",
    category: "Emergency",
    summary: "Fast, discreet aesthetic repair for broken, damaged or missing front teeth.",
    // ARUBA DRAFT: new copy, needs practice review (the reference promised
    // an "immediate" solution "in approximately one hour" using digital planning).
    description:
      "For patients with broken, damaged or missing front teeth who want a fast aesthetic repair. Using carefully selected restorative techniques, the smile can often be rebuilt within a single visit, depending on the clinical situation.",
    // ARUBA DRAFT: new copy, needs practice review ("unexpected dental emergency" and "as quickly as clinically possible" removed).
    whoFor:
      "For patients who want a fast cosmetic repair after tooth damage or tooth loss, in as few visits as the clinical situation allows.",
    icon: "repairedtooth",
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    category: "Restorative",
    // ARUBA DRAFT: new copy, needs practice review ("permanent" removed).
    summary: "A fixed, natural-feeling replacement for missing teeth.",
    // ARUBA DRAFT: new copy, needs practice review ("precise, guided planning" removed).
    description:
      "Implants replace both the root and the crown of a missing tooth, so you can eat, speak and smile with confidence again. Each implant is carefully planned in advance, aiming for a result that looks and feels like your own teeth.",
    whoFor: "Suited to anyone missing one or more teeth who wants a long-term solution rather than a removable one.",
    icon: "implant",
  },
  {
    slug: "composite-restorations",
    name: "Composite Restorations",
    category: "Cosmetic",
    summary: "A gentle way to fix chips, gaps and discolouration in a single visit.",
    description:
      "Composite bonding quickly repairs small imperfections — chips, gaps or uneven edges — and blends seamlessly with your natural teeth. It's a conservative option that protects your healthy tooth structure, often completed in just one appointment.",
    // ARUBA DRAFT: new copy, needs practice review ("affordable" removed -- no fees are published).
    whoFor: "A good option if you want a quick, conservative improvement to a limited number of teeth.",
    icon: "paintbrush",
  },
  {
    slug: "clear-aligners",
    name: "Clear Aligners",
    category: "Orthodontic",
    summary: "Straighten your smile discreetly, without traditional braces.",
    // ARUBA DRAFT: new copy, needs practice review ("nearly invisible" and
    // "digitally mapped" removed; the detail page says aligners can usually be
    // seen at close range).
    description:
      "Clear, removable aligners gradually guide your teeth into place and are more discreet than fixed braces. Your treatment is planned in advance, so you can see what result is being aimed for before you begin.",
    whoFor: "Well suited to adults and teens who want straighter teeth without the look or restrictions of metal braces.",
    expandedDescription:
      "Clear aligners use a series of custom-made transparent trays to gradually move your teeth into a more suitable position. They are removable and offer a discreet alternative to traditional braces for many patients who want to improve tooth alignment and spacing.",
    icon: "aligner",
  },
  {
    slug: "dental-crowns-bridges",
    name: "Crowns & Bridges",
    category: "Restorative",
    summary: "Strong, natural-looking restorations for damaged or missing teeth.",
    description:
      "Crowns and bridges restore the strength and shape of a damaged tooth, or replace one that's missing entirely. Each restoration is carefully matched to your natural teeth in colour and shape, so it blends in seamlessly.",
    whoFor:
      "Recommended if a tooth is significantly worn, cracked or missing and needs more support than a filling can provide.",
    icon: "crown",
  },
  {
    slug: "root-canal-therapy",
    name: "Root Canal Treatment",
    category: "Restorative",
    // ARUBA DRAFT: new copy, needs practice review ("saves" softened to "aims to save").
    summary: "Gentle root canal care that aims to save your natural tooth.",
    // ARUBA DRAFT: new copy, needs practice review ("performed under high
    // magnification" and "most patients are relieved" removed).
    description:
      "When a tooth is infected or badly decayed, this treatment aims to resolve the problem while preserving as much of your natural tooth as possible. It is carried out under local anaesthetic, and many patients experience relief once the cause of the pain is removed.",
    whoFor: "For anyone with tooth pain or infection who wants to save the natural tooth rather than lose it.",
    expandedDescription:
      "Root canal treatment is used when the tissue inside a tooth becomes inflamed or infected. The affected tissue is carefully removed, the inside of the tooth is cleaned and disinfected, and the tooth is sealed. The aim is to relieve symptoms and preserve the natural tooth whenever possible.",
    icon: "rootcanal",
  },
  {
    slug: "preventive-care",
    name: "Preventive & Hygiene",
    category: "Preventive",
    // ARUBA DRAFT: new copy, needs practice review ("for years to come" removed).
    summary: "Professional cleaning and care that helps keep your smile healthy.",
    // ARUBA DRAFT: new copy, needs practice review ("gentle air-polishing" removed).
    description:
      "Regular hygiene visits help protect the results of any treatment and keep your natural teeth healthy. Each visit, including a thorough professional cleaning, is tailored to your specific needs.",
    whoFor:
      "Recommended for every patient — whether you've had recent treatment or simply want to maintain a healthy, confident smile.",
    expandedDescription:
      "Preventive dental care focuses on maintaining healthy teeth and gums and identifying potential problems early. Appointments may include professional cleaning, plaque and tartar removal, gum assessment, oral-health guidance, and routine dental checks based on the patient's individual needs.",
    icon: "hygiene",
  },
  {
    slug: "night-guards",
    name: "Custom Night Guards",
    category: "Preventive",
    summary:
      "A custom-made night guard helps protect your teeth and restorations from damage caused by grinding and clenching.",
    description:
      "A custom-made night guard helps protect your teeth and restorations from wear and damage caused by grinding or clenching. It is made individually for your teeth after an examination.",
    whoFor:
      "Worth discussing if you grind or clench, notice wear on your teeth, or want to protect crowns, bridges or veneers. Whether a night guard suits you can only be established after an examination.",
    expandedDescription:
      "A night guard is a clear, removable protective layer made to fit your teeth and worn at night. It helps limit wear and damage to teeth and restorations caused by grinding or clenching. It is designed to protect, not to move teeth or hold them in position — which is what distinguishes it from an orthodontic retainer.",
    icon: "nightguard",
  },
];

/** A treatment by slug. Throws on an unknown slug, which is a programming error. */
export function getTreatment(slug: string): Treatment {
  const treatment = treatments.find((item) => item.slug === slug);
  if (!treatment) throw new Error(`Unknown treatment slug "${slug}" (src/data/treatments.ts)`);
  return treatment;
}

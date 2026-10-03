/**
 * Privacy Policy and Cookie Policy for the Dentacare Aruba website.
 *
 * Every statement describes what the site's code actually does (checked
 * 2026-10-02) or a fact the practice has confirmed. Nothing here invents a
 * registration detail, retention period, legal basis, compliance claim or
 * guarantee. Where a fact is still missing, the clause is OMITTED rather than
 * printed as a placeholder, and marked `REVIEW:` below; the full list of open
 * points is in docs/ARUBA-LAUNCH-CHECKLIST.md ("Privacy and Cookie policies").
 *
 * Keep this file in step with the code. In particular:
 * - Analytics is disabled (NEXT_PUBLIC_GA_MEASUREMENT_ID unset). If it is ever
 *   enabled, update both policies BEFORE deploying: the consent banner and
 *   Google Analytics cookies (_ga, _ga_*) and the "dentacare-analytics-consent"
 *   browser setting would then apply.
 * - "{email}" in any text is rendered as a link to the privacy contact
 *   (siteConfig.privacyEmail). That address is for privacy questions only.
 */

export type PolicySection = {
  heading: string;
  /** Shown first, before the list. */
  lead?: string[];
  items?: string[];
  /** Shown after the list. */
  paragraphs?: string[];
};

export type Policy = {
  intro: string[];
  sections: PolicySection[];
};

export const privacyPolicy: Policy = {
  intro: [
    "This policy explains what personal information the Dentacare Aruba website handles, why, and who to contact with questions. It covers this website only.",
  ],
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "Dentacare Aruba, Morgenster 35C, Aruba.",
        // REVIEW: legal entity form and any registration number (e.g. Chamber
        // of Commerce) have not been supplied -- omitted, not invented.
        "For questions about your personal information, email {email}. This address is for privacy questions only; to ask about an appointment, please use WhatsApp (see the Contact page).",
      ],
    },
    {
      heading: "What this website collects",
      lead: [
        "The website has no contact form, no patient accounts and no newsletter. You do not need to submit a form or create an account to browse this website.",
      ],
      items: [
        // REVIEW: how long Vercel keeps these logs depends on the hosting plan;
        // no period is stated until confirmed.
        "Hosting: the website is hosted by Vercel. As with any website, the host receives technical information when you visit a page, such as your IP address, browser type and the page requested, in order to deliver the website.",
        "Analytics: the website does not use analytics, advertising or tracking tools.",
        "Dates in Aruba: the dates the dentist works in Aruba are stored with Upstash. This contains no information about visitors or patients.",
        "Staff sign-in: the website has a private sign-in page for practice staff. To limit password guessing, each sign-in attempt is counted for up to 15 minutes using a one-way coded value derived from the visitor's IP address, stored with Upstash. This sign-in counter does not contain the IP address itself.",
      ],
    },
    {
      heading: "Appointment enquiries by WhatsApp",
      paragraphs: [
        "Appointment enquiries go by WhatsApp. When you tap a WhatsApp link on this website, WhatsApp opens with a suggested message that you can change before sending; nothing is sent until you send it yourself.",
        "Your message, together with the name and phone number shown on your WhatsApp account, is then handled by WhatsApp (a Meta service) under WhatsApp's own privacy policy, and by the practice to answer your enquiry.",
        // REVIEW: how long the practice keeps WhatsApp conversations and
        // appointment details, who in the practice has access, and how patient
        // records are kept -- not yet supplied, so not stated.
      ],
    },
    {
      heading: "Links to other services",
      paragraphs: [
        "Links to WhatsApp, Google Maps and Instagram open those services, which handle your information under their own privacy policies. This website does not embed content from them.",
      ],
    },
    {
      heading: "Before-and-after photos",
      paragraphs: [
        // REVIEW: confirm this wording matches the approval obtained for each
        // reused photo (confirmed 2026-10-02: "approved for the Aruba website").
        "The before-and-after photos on this website show results of treatment by Sam Abdin and are published with the consent of the patients concerned. To ask about a photo, or to withdraw your consent, email {email}.",
      ],
    },
    {
      heading: "Where information is processed",
      paragraphs: [
        // REVIEW: the exact regions of the Vercel and Upstash services, and any
        // safeguards for processing outside Aruba, are not yet confirmed.
        "Vercel and Upstash may process information on servers outside Aruba.",
      ],
    },
    {
      heading: "Questions and requests",
      paragraphs: [
        // REVIEW (legal): which rights apply under Aruba's data protection
        // rules, response times, and where a complaint can be made -- not
        // stated until reviewed.
        "You can email {email} to ask what personal information the practice holds about you, or to ask for it to be corrected or deleted.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        // REVIEW: add an effective date once the policy is approved.
        "This policy is updated when the website changes. The current version is always on this page.",
      ],
    },
  ],
};

export const cookiePolicy: Policy = {
  intro: [
    "This page explains what the Dentacare Aruba website stores in your browser. The website does not use analytics, advertising or tracking cookies.",
  ],
  sections: [
    {
      heading: "What the website stores",
      items: [
        "theme (stored in your browser's local storage): only if you switch between light and dark mode, to remember your choice. It stays until you clear your browser's data for this website.",
        "dentacare_admin (cookie): only for practice staff who sign in to the private editor. It keeps them signed in, is sent only to the editor's pages, and expires after 8 hours or when they sign out. It is never set for patients or other visitors.",
      ],
      paragraphs: [
        // Scoped to the application's own code. REVIEW: hosting-platform
        // behaviour is unverified -- confirm whether Vercel sets any cookies
        // on the live site (e.g. if Deployment Protection or the Toolbar is
        // enabled for Production) before stating anything about it.
        "The website's own code stores nothing else in your browser.",
      ],
    },
    {
      heading: "Other services",
      paragraphs: [
        "When you follow a link to WhatsApp, Google Maps or Instagram, those services may set their own cookies under their own policies. This website does not embed content from them.",
      ],
    },
    {
      heading: "Managing stored information",
      paragraphs: ["You can delete what the website has stored at any time in your browser's settings, by clearing cookies and site data for this website."],
    },
    {
      heading: "Changes and questions",
      paragraphs: [
        "If the website starts storing anything else, this page will be updated first. For questions, email {email}.",
      ],
    },
  ],
};

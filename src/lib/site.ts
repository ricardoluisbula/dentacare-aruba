/**
 * DRAFT SWITCH. While true the whole site is kept out of search engines:
 * every page renders `noindex, nofollow`, robots.txt disallows everything,
 * the sitemap is empty, and next.config.ts adds an `X-Robots-Tag` header.
 *
 * Flip to false only after every item in docs/ARUBA-LAUNCH-CHECKLIST.md has
 * been confirmed by the practice -- never as part of an unrelated change.
 */
export const SITE_IS_DRAFT = true;

/**
 * The Aruba clinic's production domain has not been chosen yet. Until it is,
 * this is a reserved `.invalid` placeholder (RFC 2606): it can never resolve,
 * so nothing can accidentally point at someone else's site. Replace it with
 * the confirmed domain as part of launch.
 */
export const PRODUCTION_URL = "https://dentacare-aruba.invalid";

/**
 * Resolves the site URL used for canonical tags, Open Graph URLs and JSON-LD,
 * in priority order:
 * 1. Vercel preview deployments -> their own ephemeral URL.
 * 2. NEXT_PUBLIC_SITE_URL, if set.
 * 3. http://localhost:3000 during local development.
 * 4. The Vercel project's own production URL, when deployed on Vercel.
 * 5. The placeholder {@link PRODUCTION_URL}.
 */
function resolveSiteUrl(): string {
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (explicit) return explicit;

  if (process.env.NODE_ENV === "development" && !process.env.VERCEL_ENV) {
    return "http://localhost:3000";
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return PRODUCTION_URL;
}

const ADDRESS = "Morgenster 35C, Aruba";

/**
 * Confirmed clinic details, and nothing more.
 *
 * Confirmed by the practice (2026-09-28): the address, the WhatsApp number
 * (messages only -- it must never be rendered as a tel: link) and the
 * Instagram profile (shared with Dentacare Osdorp).
 *
 * Deliberately still ABSENT until confirmed: phone number for calls, email,
 * social profiles other than Instagram, and any opening hours. The practice
 * has no fixed weekly hours -- the dates the dentist works in Aruba are
 * entered in the private editor (/admin) and read from the availability
 * store, never hard-coded here.
 */
export const siteConfig = {
  name: "Dentacare Aruba",
  shortName: "Dentacare Aruba",
  description:
    "Dentacare Aruba at Morgenster 35C, Aruba — dental care with Sam Abdin on scheduled dates. Upcoming dates and WhatsApp enquiries.",
  url: resolveSiteUrl(),
  address: {
    line1: "Morgenster 35C",
    country: "Aruba",
    full: ADDRESS,
    // Google Maps search link for the confirmed address (no API key, opens
    // in the visitor's Maps app on mobile).
    mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
  },
  // WhatsApp for MESSAGES ONLY. Never expose it as a tel: link.
  whatsappDisplay: "+31 6 45094057",
  whatsappUrl: "https://wa.me/31645094057",
  instagramUrl: "https://www.instagram.com/Dentacareosdorp/",
  // PRIVACY CONTACT ONLY (confirmed 2026-10-02). Shown on the Privacy and
  // Cookie policy pages for questions about personal data. Never use it as a
  // booking or general contact channel: appointment enquiries go by WhatsApp.
  privacyEmail: "Dentacare@hotmail.com",
  // Only finished pages are linked. About, Reviews, New Patients and Fees &
  // Insurance still exist as unlinked "being prepared" pages until their
  // content is supplied (docs/ARUBA-LAUNCH-CHECKLIST.md); Privacy and Cookies
  // stay linked from the footer.
  nav: [
    { label: "Home", href: "/" },
    { label: "Smile Gallery", href: "/smile-gallery" },
    { label: "Treatments", href: "/treatments" },
    { label: "Prevention & Hygiene", href: "/prevention-hygiene" },
    { label: "Our Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

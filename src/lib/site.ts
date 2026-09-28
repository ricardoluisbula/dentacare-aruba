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

/**
 * Brand-level configuration only.
 *
 * Deliberately contains NO address, phone number, WhatsApp number, email,
 * opening hours, social profiles or Google profile links: none of them have
 * been confirmed for Aruba, and the reference site's values belong to the
 * Amsterdam practice. Components that used to render them now show a
 * "to be confirmed" placeholder or nothing at all. Add each field back here,
 * with the practice's confirmed value, when it is supplied.
 */
export const siteConfig = {
  name: "Dentacare Aruba",
  shortName: "Dentacare Aruba",
  description: "Dentacare Aruba — draft website in preparation. Clinic details have not yet been published.",
  url: resolveSiteUrl(),
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Smile Gallery", href: "/smile-gallery" },
    { label: "Treatments", href: "/treatments" },
    { label: "Prevention & Hygiene", href: "/prevention-hygiene" },
    { label: "Our Team", href: "/team" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

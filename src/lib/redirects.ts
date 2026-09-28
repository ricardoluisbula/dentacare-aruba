/**
 * Permanent redirects for retired URLs.
 *
 * Imported by next.config.ts, so it must stay free of path aliases and
 * runtime dependencies. The Aruba site is new and has no retired URLs yet;
 * the reference site's redirects (Amsterdam MondCheck and preventive-care
 * URLs) were deliberately not carried over.
 */

type Redirect = { source: string; destination: string; permanent: true };

export const PREVENTION_PATH = "/prevention-hygiene";

/** The new-patients information page. */
export const NEW_PATIENTS_PATH = "/new-patients";

export const LEGACY_REDIRECTS: Redirect[] = [];

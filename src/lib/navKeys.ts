export type NavKey =
  | "home"
  | "about"
  | "treatments"
  | "preventionHygiene"
  | "smileGallery"
  | "team"
  | "reviews"
  | "contact";

/** Label for a navigation item, from the dictionary's `nav` block. */
export function navLabel(t: { nav: Record<NavKey, string> }, href: string): string {
  return t.nav[navKeyByHref[href]];
}

export const navKeyByHref: Record<string, NavKey> = {
  "/": "home",
  "/about": "about",
  "/smile-gallery": "smileGallery",
  "/treatments": "treatments",
  "/prevention-hygiene": "preventionHygiene",
  "/team": "team",
  "/reviews": "reviews",
  "/contact": "contact",
};

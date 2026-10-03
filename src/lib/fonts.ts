import type { Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";

/**
 * The site's typefaces and viewport, shared by the two places that render a
 * whole document: `[locale]/layout.tsx` and `global-not-found.tsx`.
 */
export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const fontVariables = `${fraunces.variable} ${manrope.variable}`;

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Lets the page use the full screen on notched iPhones; the header, the
  // floating buttons and the page gutters add env(safe-area-inset-*) so no
  // control sits under the notch or the home indicator.
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffdfa" },
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
  ],
};

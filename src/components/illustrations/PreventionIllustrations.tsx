import type { SVGProps } from "react";

/**
 * Large-scale line illustrations for the Prevention & Hygiene page, built to
 * match the same stroke API as the hand-drawn treatment icons in
 * TreatmentIcons.tsx (currentColor stroke, round caps/joins, no fill on the
 * line art itself) so they read as part of the same illustration system.
 * Recoloured from the reference site's green to this site's gold palette.
 */

/** A tooth nested inside a protective shield outline, with a small sparkle and leaf accent. */
export function ProtectSmileIllustration({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 320 320" fill="none" className={className} {...props}>
      <circle cx="160" cy="160" r="130" className="fill-gold-100 dark:fill-gold-950/60" />

      {/* Shield outline */}
      <path
        d="M160 46c26 14 54 20 80 20 4 56-6 116-80 168-74-52-84-112-80-168 26 0 54-6 80-20Z"
        className="text-accent-deep dark:text-accent"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinejoin="round"
      />

      {/* Tooth nested inside the shield */}
      <path
        d="M160 108c-16 0-24 9-33 9-10 0-19-6-27-1-10 5-9 19-4 29 6 12 6 27 10 44 4 16 10 36 21 36 9 0 10-15 14-25 3-6 6-10 11-10s8 4 11 10c4 10 5 25 14 25 11 0 17-20 21-36 4-17 4-32 10-44 5-10 6-24-4-29-8-5-17 1-27 1-9 0-17-9-33-9Z"
        className="text-accent-deep dark:text-accent"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Sparkle + leaf accents */}
      <g className="text-accent" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M244 92v18M235 101h18" />
      </g>
      <path
        d="M70 210c14-16 36-20 50-10-4 18-22 32-42 30-6-8-10-14-8-20Z"
        className="text-gold-400 dark:text-gold-600"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

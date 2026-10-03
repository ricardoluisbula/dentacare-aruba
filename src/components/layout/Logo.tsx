import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The Dentacare Aruba wordmark, drawn as inline SVG so it stays crisp at any
 * size and follows the theme without swapping image files: "Dentacare" in the
 * site's display serif (Fraunces italic) in champagne gold, a hairline rule,
 * "ARUBA" in tracked capitals, and the tooth outline from the original
 * Dentacare mark -- recoloured from the reference site's green to gold.
 *
 * Sized by height like the image it replaces (`h-9 w-auto`). `textLength`
 * pins each word to the same width whether or not the web font has loaded,
 * so the layout never shifts. A standalone copy for print and favicon work
 * lives in assets-source/logo-dentacare-aruba.svg.
 */
export function Logo({
  className = "h-9 w-auto",
}: {
  className?: string;
  /** Accepted for call-site compatibility with the former image logo. */
  priority?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 300 80"
      role="img"
      aria-label={siteConfig.name}
      className={cn("shrink-0 overflow-visible", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="47"
        textLength="236"
        lengthAdjust="spacingAndGlyphs"
        className="fill-gold-700 dark:fill-gold-400"
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontStyle: "italic", fontSize: 50, fontWeight: 400 }}
      >
        Dentacare
      </text>
      <line x1="3" y1="57" x2="238" y2="57" strokeWidth="1.25" className="stroke-gold-500" />
      <text
        x="238"
        y="77"
        textAnchor="end"
        textLength="78"
        lengthAdjust="spacingAndGlyphs"
        className="fill-ink-900 dark:fill-ivory-50"
        style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.32em" }}
      >
        ARUBA
      </text>
      <path
        transform="translate(252 5)"
        d="M10 2C3 3 0 11 2 20c2 8 5 14 6 24 1 9 3 22 7 24s4-10 5-18c1-5 2-8 2-8s1 3 2 8c1 8 1 20 5 18s6-15 7-24c1-10 4-16 6-24 2-9-1-17-8-18-5-1-8 2-12 3-4-1-7-4-12-3Z"
        fill="none"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="stroke-gold-500 dark:stroke-gold-400"
      />
    </svg>
  );
}

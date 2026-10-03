import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Reveal, REVEAL_EASE } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

/**
 * The small line beside every eyebrow label draws in (scaleX, transform-only
 * so it never reflows neighboring text) just as the label fades in -- a
 * quiet, handcrafted beat rather than the label simply appearing.
 */
function EyebrowLine() {
  return (
    <motion.span
      aria-hidden
      data-reveal=""
      className="h-px w-8 origin-left bg-accent"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: REVEAL_EASE }}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  headingId,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
  /**
   * Optional stable anchor on the <h2> itself, for deep links. The heading
   * then also carries a scroll margin, so a browser's own fragment scroll
   * (without JavaScript) never leaves it under the fixed header either;
   * LenisProvider's HashScroll measures the header for the scripted landing.
   */
  headingId?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep dark:text-accent">
            <EyebrowLine />
            {eyebrow}
          </span>
        </Reveal>
      )}
      {/* Deliberately wider gaps than a flat 0/0.08/0.16 cascade -- each beat
          (label, then headline, then supporting text) gets a moment to be
          seen on its own before the next arrives. */}
      <Reveal
        as="h2"
        id={headingId}
        delay={0.16}
        // Plain concatenation, not cn(): tailwind-merge reads the custom
        // `text-section` size and `text-fg` colour as the same utility and
        // would drop the size.
        className={`max-w-2xl text-balance break-words font-display text-section font-medium leading-[1.1] text-fg${headingId ? " scroll-mt-32" : ""}`}
      >
        {title}
      </Reveal>
      {description && (
        <Reveal delay={0.3}>
          <p className="max-w-xl text-balance text-base leading-relaxed text-fg-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

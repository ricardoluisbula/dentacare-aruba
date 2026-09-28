"use client";

import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { NightGuardIcon } from "@/components/treatments/TreatmentIcons";
import { getTreatment } from "@/data/treatments";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { TEETH_GRINDING_PATH, treatmentDetailPath } from "@/lib/treatmentLinks";
import { cn } from "@/lib/utils";

const SLUG = "night-guards";

/**
 * A single, wide highlight card for the night guard, placed inside the
 * treatments hub's list rather than as a fifth card in a four-column grid,
 * which would leave one card orphaned on its own row.
 *
 * Name, description and link text all come from the same sources as every
 * other treatment card -- the catalogue and `treatmentsPage.treatmentLinks` --
 * so the spotlight can never describe the treatment differently from its own
 * page. The one line of its own copy says what it is not: a protective guard,
 * not an orthodontic retainer. Deliberately photo-free.
 *
 * Renders an <h3>: its host places it under its own section <h2>.
 */
export function NightGuardSpotlight({
  className,
  showDefinitionLink = false,
}: {
  className?: string;
  /** Adds a "What is teeth grinding?" text link to the definition on the night guard page. */
  showDefinitionLink?: boolean;
}) {
  const { t } = useTranslation();
  const item = getTreatment(SLUG);
  const copy = t.nightGuardSpotlight;

  return (
    <Reveal className={cn("w-full", className)}>
      <div className="relative overflow-hidden rounded-[2rem] border border-surface-border bg-bg-elevated px-6 py-8 sm:px-10 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--accent-glow),transparent_70%)] opacity-60 dark:opacity-30"
        />
        <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-10">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-surface-border bg-bg text-accent shadow-[0_8px_20px_-8px_rgba(0,0,0,0.25)]">
            <NightGuardIcon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep dark:text-accent">
              {copy.eyebrow}
            </p>
            <h3 className="text-balance break-words font-display text-xl text-fg sm:text-2xl">{item.name}</h3>
            <p className="max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-base">{item.description}</p>
            {showDefinitionLink && (
              <Link
                href={TEETH_GRINDING_PATH}
                className="-mx-1 w-fit rounded-sm px-1 py-1 text-sm font-medium text-accent-deep underline decoration-accent-deep/40 underline-offset-4 transition-colors duration-200 hover:text-accent-deep/80 hover:decoration-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-accent dark:decoration-accent/40 dark:hover:text-accent/80 dark:hover:decoration-accent"
              >
                {copy.definitionLink}
              </Link>
            )}
            <p className="mt-1 inline-flex max-w-2xl items-start gap-2 text-xs leading-relaxed text-fg-muted">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
              {copy.note}
            </p>
          </div>

          <Button href={treatmentDetailPath(SLUG)} className="w-full shrink-0 sm:w-auto">
            {t.treatmentsPage.treatmentLinks[SLUG]}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

"use client";

import { ArrowUpRight, UserRound } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/**
 * Home page introduction to the dentist. Text only: it states nothing beyond
 * his verified details, and the portrait slot stays a placeholder until an
 * approved photo is supplied.
 */
export function HomeDentist() {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <Reveal>
          <div className="glass grid items-center gap-8 overflow-hidden rounded-[2.5rem] p-6 sm:p-10 md:grid-cols-[auto_1fr] md:gap-12 lg:p-14">
            <div className="mx-auto flex aspect-[4/5] w-44 flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-dashed border-accent/50 bg-gradient-to-b from-gold-50 to-gold-100 text-center text-gold-700 sm:w-52 dark:from-ink-800 dark:to-gold-950 dark:text-gold-300">
              <UserRound className="h-10 w-10" strokeWidth={1.25} aria-hidden="true" />
              <span className="px-4 text-xs font-medium">{t.teamPage.portraitPlaceholder}</span>
            </div>
            <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep dark:text-accent">
                {t.homeDentist.eyebrow}
              </span>
              <h2 className="font-display text-section font-medium leading-[1.1] text-fg">{t.homeDentist.title}</h2>
              <p className="max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">{t.homeDentist.body}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-4 md:justify-start">
                <Button href="/team" variant="outline">
                  {t.homeDentist.cta}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="/treatments" variant="ghost">
                  {t.homeDentist.treatmentsCta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

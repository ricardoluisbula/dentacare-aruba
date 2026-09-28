"use client";

import { CircleDashed } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export type DraftPageKey = keyof Dictionary["pages"];

/**
 * ARUBA DRAFT placeholder for every inner page: the reference site's page hero
 * (same typography, glow and reveal sequence), followed by a panel that says
 * plainly what information is still needed before the page can be written.
 *
 * Nothing here states a clinic fact. When a page's real content arrives,
 * replace its `<DraftPage>` with the page's own body component.
 */
export function DraftPage({ page }: { page: DraftPageKey }) {
  const { t } = useTranslation();
  const copy = t.pages[page];

  return (
    <>
      <PageHero eyebrow={t.draft.badge} title={copy.title} description={copy.description} />

      <section className="pb-8">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
              <div aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep dark:text-accent">
                {t.draftPage.panelEyebrow}
              </span>
              <h2 className="mt-3 text-balance font-display text-2xl font-medium leading-snug text-fg sm:text-3xl">
                {t.draftPage.panelTitle}
              </h2>

              <h3 className="mt-8 text-sm font-semibold text-fg">{t.draftPage.needsHeading}</h3>
              <StaggerGroup className="mt-4">
                <ul className="flex flex-col gap-3">
                  {copy.needs.map((need) => (
                    <StaggerItem as="li" key={need} className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                      <CircleDashed className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                      {need}
                    </StaggerItem>
                  ))}
                </ul>
              </StaggerGroup>

              <div className="mt-10">
                <Button href="/" variant="outline">
                  {t.draftPage.backHome}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

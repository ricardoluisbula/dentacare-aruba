"use client";

import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { siteConfig } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export type DraftPageKey = Exclude<keyof Dictionary["pages"], "team" | "contact" | "privacy" | "cookies">;

/**
 * A page whose content is still being prepared: About, Reviews, New Patients
 * and Fees & Insurance (none of them linked anywhere). Patients see the page
 * title, a short
 * honest note and a way on -- never an internal to-do list; what each page
 * still needs is tracked in docs/ARUBA-LAUNCH-CHECKLIST.md.
 *
 * When a page's real content arrives, replace its `<DraftPage>` with the
 * page's own body component.
 */
export function DraftPage({ page }: { page: DraftPageKey }) {
  const { t } = useTranslation();
  const copy = t.pages[page];

  return (
    <>
      <PageHero eyebrow={siteConfig.name} title={copy.title} description={copy.description} />

      <section className="pb-8">
        <Container className="!max-w-2xl">
          <Reveal>
            <div className="glass relative flex flex-col items-center gap-6 overflow-hidden rounded-[2rem] p-8 text-center sm:p-10">
              <div aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
              <p className="text-base leading-relaxed text-fg-muted">{t.preparingPage.notice}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button href="/contact#aruba-dates" variant="primary">
                  {t.preparingPage.contactLink}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href="/" variant="outline">
                  {t.preparingPage.backHome}
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

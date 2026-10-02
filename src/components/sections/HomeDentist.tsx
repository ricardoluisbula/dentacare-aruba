"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/**
 * Home page introduction to the dentist. States nothing beyond his verified
 * details. The portrait is the reference site's photo of Sam Abdin, shown
 * whole (object-contain, anchored to the top) on an ivory mat, as the
 * reference's MeetDentist section does -- never cropped or zoomed.
 */
export function HomeDentist() {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <Reveal>
          <div className="glass grid items-center gap-8 overflow-hidden rounded-[2.5rem] p-6 sm:p-10 md:grid-cols-[auto_1fr] md:gap-12 lg:p-14">
            <div className="group mx-auto w-44 overflow-hidden rounded-[1.75rem] border border-surface-border bg-ivory-200 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] sm:w-52">
              <Image
                src="/images/team/sam.webp"
                alt={t.imageAlts.samPortrait}
                width={1279}
                height={1600}
                sizes="(min-width: 640px) 208px, 176px"
                className="h-auto w-full object-contain object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
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

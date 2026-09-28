"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { ArubaDates } from "@/components/availability/ArubaDates";
import { WhatsAppEnquiry } from "@/components/availability/WhatsAppEnquiry";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import type { AvailabilityEntry } from "@/lib/availability/dates";

/** Home page: the next few confirmed dates in Aruba, and the WhatsApp enquiry. */
export function NextDatesSection({ entries }: { entries: AvailabilityEntry[] }) {
  const { t } = useTranslation();

  return (
    <section id="aruba-dates" className="relative scroll-mt-28 py-16 sm:py-24">
      <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <SectionHeading
            align="left"
            className="items-center text-center lg:items-start lg:text-left"
            eyebrow={t.availability.eyebrow}
            title={t.availability.title}
            description={t.availability.description}
          />
          <Reveal delay={0.2} className="w-full">
            <WhatsAppEnquiry placement="homepage" className="items-center lg:items-start" noteClassName="mx-auto lg:mx-0" />
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ArubaDates entries={entries} limit={3} showMoreLink />
        </Reveal>
      </Container>
    </section>
  );
}

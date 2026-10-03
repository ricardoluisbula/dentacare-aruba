"use client";

import type { ReactNode } from "react";
import { Clock, ExternalLink, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { ArubaDates } from "@/components/availability/ArubaDates";
import { WhatsAppEnquiry, useWhatsAppHref } from "@/components/availability/WhatsAppEnquiry";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
import type { AvailabilityEntry } from "@/lib/availability/dates";

const LINK =
  "inline-flex items-center gap-1.5 rounded-sm font-medium text-accent-deep underline-offset-4 hover:underline dark:text-accent";

function DetailRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700 dark:bg-gold-950 dark:text-gold-300">
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5 text-sm">
        <span className="font-semibold text-fg">{label}</span>
        <div className="text-fg-muted">{children}</div>
      </div>
    </li>
  );
}

export function ContactBody({ entries }: { entries: AvailabilityEntry[] }) {
  const { t } = useTranslation();
  const whatsappHref = useWhatsAppHref();
  const icon = "h-5 w-5";

  return (
    <>
      <PageHero eyebrow={t.contactPage.eyebrow} title={t.contactPage.title} description={t.contactPage.description} />

      <section className="pb-8">
        <Container className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div id="aruba-dates" className="flex scroll-mt-28 flex-col gap-8">
            <SectionHeading
              align="left"
              eyebrow={t.availability.eyebrow}
              title={t.availability.title}
              description={t.availability.description}
            />
            <Reveal delay={0.1}>
              <ArubaDates entries={entries} />
            </Reveal>
            <Reveal delay={0.15}>
              <WhatsAppEnquiry placement="contact_card" className="items-center sm:items-start" noteClassName="text-center sm:text-left" />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <aside aria-labelledby="contact-details-heading" className="glass rounded-[2rem] p-7 sm:p-9">
              <h2 id="contact-details-heading" className="font-display text-2xl font-medium text-fg">
                {t.contactPage.detailsHeading}
              </h2>
              <ul className="mt-7 flex flex-col gap-6">
                <DetailRow icon={<MapPin className={icon} strokeWidth={1.75} aria-hidden="true" />} label={t.contactPage.addressLabel}>
                  <address className="not-italic text-fg">{siteConfig.address.full}</address>
                  <a
                    href={siteConfig.address.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("click_maps", { placement: "contact_details" })}
                    className={`${LINK} mt-1`}
                  >
                    {t.contactPage.mapsLink}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only"> {t.a11y.opensInNewTab}</span>
                  </a>
                </DetailRow>
                <DetailRow icon={<WhatsAppIcon className={icon} aria-hidden="true" />} label={t.contactPage.whatsappLabel}>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("click_whatsapp", { placement: "contact_details" })}
                    className={LINK}
                  >
                    {siteConfig.whatsappDisplay}
                    <span className="sr-only"> {t.a11y.opensInNewTab}</span>
                  </a>
                  <p className="mt-1 text-xs">{t.whatsapp.messagesOnly}</p>
                </DetailRow>
                <DetailRow icon={<InstagramIcon className={icon} aria-hidden="true" />} label={t.contactPage.instagramLabel}>
                  <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={LINK} aria-label={t.header.instagramLabel}>
                    @dentacareosdorp
                  </a>
                </DetailRow>
                <DetailRow icon={<Clock className={icon} strokeWidth={1.75} aria-hidden="true" />} label={t.contactPage.hoursLabel}>
                  {t.contactPage.hoursValue}
                </DetailRow>
                {/* Phone and email rows return here once the practice
                    confirms them; unconfirmed rows are not shown. */}
              </ul>
            </aside>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

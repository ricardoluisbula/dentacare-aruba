"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Crown,
  HeartHandshake,
  Info,
  MessageCircle,
  Search,
  ShieldCheck,
  Smile,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal as PageReveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Reveal } from "@/components/animations/Reveal";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { CTASection } from "@/components/sections/CTASection";
import { ProtectSmileIllustration } from "@/components/illustrations/PreventionIllustrations";
import { PREVENTION_RELATED_SLUGS, preventionExtras, preventionFaq } from "@/data/preventionContent";
import { treatmentDetailPath } from "@/lib/treatmentLinks";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/**
 * The Prevention & Hygiene page -- the information page for the
 * "preventive-care" treatment.
 *
 * ARUBA DRAFT: ported from the reference site with its hero photo of a
 * professional cleaning. Its clinic-interior photo, call / email / WhatsApp
 * rows, opening-hours logic and online "Dental Check" invitation were
 * removed. The closing call to action is the shared CTASection.
 */

function PreventionHero() {
  const { t } = useTranslation();
  const copy = t.preventionHygienePage;
  const STAGGER = 0.14;
  const DISTANCE = 18;

  return (
    <section className="relative overflow-hidden bg-ivory-100/40 pt-28 pb-12 sm:pt-32 sm:pb-16 dark:bg-transparent">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_65%_55%_at_50%_-8%,var(--accent-glow),transparent)] opacity-70 dark:opacity-45"
      />
      <Container className="!max-w-[1560px] grid w-full items-center gap-12 lg:grid-cols-[0.82fr_1fr] lg:gap-16">
        <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
          <Reveal
            as="span"
            delay={STAGGER}
            distance={DISTANCE}
            duration={0.6}
            className="inline-flex items-center gap-2 rounded-full border border-surface-border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep dark:text-accent"
          >
            {copy.heroEyebrow}
          </Reveal>
          <Reveal
            as="h1"
            delay={STAGGER * 2}
            distance={DISTANCE}
            duration={0.6}
            className="mt-4 w-full max-w-xl text-balance break-words font-display text-[clamp(2rem,1.3rem+3.2vw,3.5rem)] font-medium leading-[1.05] text-fg"
          >
            {copy.heroTitle}
          </Reveal>
          <Reveal
            as="p"
            delay={STAGGER * 3}
            distance={DISTANCE}
            duration={0.55}
            className="mt-4 max-w-lg text-balance font-display text-lg italic leading-snug text-accent-deep dark:text-accent"
          >
            {copy.heroSubtitle}
          </Reveal>
          <Reveal
            as="p"
            delay={STAGGER * 4}
            distance={DISTANCE}
            duration={0.6}
            className="mt-4 max-w-lg text-balance text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            {copy.heroDescription}
          </Reveal>
        </div>

        {/* Rendered at the photo's own native ratio (1536x1024) via intrinsic
            width/height + h-auto, so nothing is cropped or stretched. */}
        <Reveal delay={STAGGER * 3} distance={0} duration={0.9} className="relative mx-auto w-full lg:max-w-[680px]">
          <div className="overflow-hidden rounded-[32px] border border-gold-200/80 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] dark:border-gold-900/50">
            <Image
              src="/images/prevention-hygiene-professional-cleaning.png"
              alt={t.imageAlts.preventionCleaning}
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 1023px) 100vw, 680px"
              className="h-auto w-full object-cover object-center"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const benefitIcons = [ShieldCheck, Sparkles, HeartHandshake, Search, Smile, Crown];

function WhyPreventionSection() {
  const { t } = useTranslation();
  const copy = t.preventionHygienePage;
  return (
    <section className="py-12 sm:py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={copy.whyEyebrow} title={copy.whyTitle} />
        <StaggerGroup className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" amount="some">
          {copy.benefits.map((benefit, i) => {
            const Icon = benefitIcons[i];
            return (
              <StaggerItem key={benefit.title} className="flex flex-col items-center gap-3 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="font-display text-base text-fg">{benefit.title}</h3>
                <p className="max-w-[240px] text-sm leading-relaxed text-fg-muted">{benefit.description}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}

function ServicesSection() {
  const { t } = useTranslation();
  const copy = t.preventionHygienePage;
  const items = copy.services.map((service) => ({ question: service.title, answer: service.description }));
  const half = Math.ceil(items.length / 2);

  return (
    <section className="bg-ivory-100/60 py-12 sm:py-20 lg:py-28 dark:bg-transparent">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={copy.servicesEyebrow} title={copy.servicesTitle} />
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
          <PageReveal>
            <FAQAccordion items={items.slice(0, half)} />
          </PageReveal>
          <PageReveal delay={0.1}>
            <FAQAccordion items={items.slice(half)} />
          </PageReveal>
        </div>
      </Container>
    </section>
  );
}

const processIcons = [ClipboardCheck, Sparkles, MessageCircle, CalendarCheck];

function VisitAndProtectSection() {
  const { t } = useTranslation();
  const copy = t.preventionHygienePage;
  return (
    <section className="py-12 sm:py-20 lg:py-28">
      <Container className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
        <div className="flex flex-col gap-10 rounded-[2rem] border border-surface-border bg-bg-elevated p-8 sm:p-10">
          <SectionHeading align="left" eyebrow={copy.processEyebrow} title={copy.processTitle} />
          <RevealGroup className="grid gap-x-6 gap-y-10 sm:grid-cols-2" stagger={0.1}>
            {copy.processSteps.map((step, i) => {
              const Icon = processIcons[i];
              return (
                <motion.div key={step.title} data-reveal="" variants={revealItem} className="flex flex-col items-start gap-3 text-left">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-[0_8px_24px_-8px_var(--accent)]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-bg-elevated text-xs font-semibold text-accent-deep shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)] dark:text-accent">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-base text-fg">{step.title}</h3>
                  <p className="max-w-[240px] text-xs leading-relaxed text-fg-muted">{step.description}</p>
                </motion.div>
              );
            })}
          </RevealGroup>
        </div>

        <PageReveal delay={0.15}>
          <div className="flex h-full flex-col items-center justify-center gap-5 rounded-[2rem] bg-gold-50 p-8 text-center sm:p-10 dark:border dark:border-surface-border dark:bg-bg-elevated">
            <ProtectSmileIllustration className="h-32 w-32" aria-hidden="true" />
            <h3 className="text-balance break-words font-display text-xl font-medium leading-[1.15] text-fg">{copy.protectTitle}</h3>
            <p className="text-balance text-sm leading-relaxed text-fg-muted">{copy.protectDescription}</p>
          </div>
        </PageReveal>
      </Container>
    </section>
  );
}

/**
 * What prevention cannot do, what to do at home, and where to read about
 * treatment when something does need repairing (src/data/preventionContent.ts).
 */
function ExpectationsSection() {
  const { t } = useTranslation();
  const extras = preventionExtras();

  return (
    <section className="pb-12 sm:pb-20 lg:pb-28">
      <Container className="grid gap-8 lg:grid-cols-2">
        <PageReveal className="flex flex-col gap-5 rounded-[2rem] border border-surface-border bg-bg-elevated p-8 sm:p-10">
          <h2 className="inline-flex items-center gap-3 font-display text-xl font-medium text-fg">
            <Info className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
            {t.treatmentDetail.limitationsTitle}
          </h2>
          <ul className="flex flex-col gap-3">
            {extras.limitations.map((entry) => (
              <li key={entry} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-sm leading-relaxed text-fg-muted">{entry}</span>
              </li>
            ))}
          </ul>
        </PageReveal>

        <PageReveal delay={0.1} className="flex flex-col gap-5 rounded-[2rem] border border-surface-border bg-bg-elevated p-8 sm:p-10">
          <h2 className="inline-flex items-center gap-3 font-display text-xl font-medium text-fg">
            <ShieldCheck className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
            {t.treatmentDetail.aftercareTitle}
          </h2>
          <ul className="flex flex-col gap-3">
            {extras.aftercare.map((entry) => (
              <li key={entry} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                <span className="text-sm leading-relaxed text-fg-muted">{entry}</span>
              </li>
            ))}
          </ul>
        </PageReveal>

        <PageReveal delay={0.15} className="flex flex-col gap-4 lg:col-span-2">
          <h2 className="font-display text-xl font-medium text-fg">{t.preventionHygienePage.relatedTitle}</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">{t.preventionHygienePage.relatedIntro}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {PREVENTION_RELATED_SLUGS.map((slug) => (
              <li key={slug}>
                <Link
                  href={treatmentDetailPath(slug)}
                  className="-mx-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-accent-deep transition-colors hover:text-accent-deep/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-accent dark:hover:text-accent/80"
                >
                  {t.treatmentsPage.treatmentLinks[slug]}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </PageReveal>
      </Container>
    </section>
  );
}

function PreventionFAQSection() {
  const { t } = useTranslation();
  const copy = t.preventionHygienePage;
  return (
    <section className="bg-ivory-100/60 py-12 sm:py-20 lg:py-28 dark:bg-transparent">
      <Container className="flex flex-col items-center gap-14">
        <SectionHeading eyebrow={copy.faqEyebrow} title={copy.faqTitle} />
        <PageReveal delay={0.1} className="w-full max-w-2xl">
          <FAQAccordion items={preventionFaq(copy.faqItems)} />
        </PageReveal>
      </Container>
    </section>
  );
}

export function PreventionHygienePageBody() {
  const { t } = useTranslation();
  return (
    <>
      <PreventionHero />
      <WhyPreventionSection />
      <ServicesSection />
      <VisitAndProtectSection />
      <ExpectationsSection />
      <PreventionFAQSection />
      <CTASection title={t.preventionHygienePage.contactTitle} description={t.preventionHygienePage.contactDescription} />
    </>
  );
}

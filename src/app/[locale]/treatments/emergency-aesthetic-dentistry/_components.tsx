"use client";

import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  ClipboardCheck,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal as PageReveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Reveal } from "@/components/animations/Reveal";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { treatmentIcons } from "@/components/treatments/TreatmentIcons";
import { getTreatment } from "@/data/treatments";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/**
 * The emergency & aesthetic dentistry page: fast aesthetic repair of damaged
 * front teeth.
 *
 * ARUBA DRAFT: ported from the reference site's "1 hour emergency" page with
 * its before/after sliders, patient case, published price range, call /
 * WhatsApp buttons and every promise of same-day or immediate availability
 * removed -- the dentist is only in Aruba on specific published dates. A short
 * safety note (SafetyNote below) says so plainly.
 */

const SLUG = "emergency-aesthetic-dentistry";

function EmergencyHero() {
  const { t } = useTranslation();
  const item = getTreatment(SLUG);
  const Icon = treatmentIcons[item.icon];

  return (
    <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--accent-glow),transparent)] opacity-60 dark:opacity-40"
      />
      <Container className="flex w-full min-w-0 flex-col gap-8">
        <Link
          href="/treatments"
          className="-mx-1 inline-flex w-fit items-center gap-1.5 rounded-sm px-1 text-xs font-medium text-fg-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          {t.treatmentDetail.backToTreatments}
        </Link>

        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-surface-border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep dark:text-accent">
              <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              {t.emergencyTreatmentPage.heroEyebrow}
            </span>
          </Reveal>
          <Reveal
            as="h1"
            delay={0.1}
            className="max-w-3xl text-balance break-words font-display text-hero font-medium leading-[1.05] text-fg"
          >
            {item.name}
          </Reveal>
          <Reveal as="p" delay={0.2} className="max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {item.description}
          </Reveal>
          <Reveal delay={0.3} className="w-full max-w-2xl">
            <SafetyNote />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/**
 * ARUBA DRAFT: new safety copy, needs practice review. Treatment is only
 * possible on the dates the dentist is in Aruba; anyone with severe symptoms
 * when no dates are available is told to seek care elsewhere without waiting.
 */
function SafetyNote() {
  const { t } = useTranslation();
  // ARUBA DRAFT: new safety copy, needs practice review
  const copy = t.emergencyTreatmentPage;
  return (
    <aside
      aria-labelledby="emergency-availability-title"
      className="flex items-start gap-4 rounded-2xl border border-accent/40 bg-accent/5 px-5 py-4 sm:px-6 sm:py-5"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-deep dark:text-accent">
        <CalendarClock className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 id="emergency-availability-title" className="text-sm font-semibold text-fg">
          {copy.safetyTitle}
        </h2>
        <p className="text-sm leading-relaxed text-fg-muted">{copy.safetyBody}</p>
      </div>
    </aside>
  );
}

function WhoMayHelpSection() {
  const { t } = useTranslation();
  const copy = t.emergencyTreatmentPage;
  return (
    <section className="py-12 sm:py-20 lg:py-28">
      <Container>
        <PageReveal className="flex max-w-3xl flex-col gap-6">
          <SectionHeading align="left" eyebrow={copy.helpEyebrow} title={copy.helpTitle} />
          <p className="text-base leading-relaxed text-fg-muted">{copy.helpIntro}</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {copy.helpItems.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-fg-muted">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <p className="text-sm italic leading-relaxed text-fg-muted/80">{copy.helpClosing}</p>
        </PageReveal>
      </Container>
    </section>
  );
}

const processIcons = [ClipboardCheck, MessageCircle, Sparkles, HeartHandshake];

function ProcessSection() {
  const { t } = useTranslation();
  const copy = t.emergencyTreatmentPage;
  return (
    <section className="bg-ivory-100/60 py-12 sm:py-20 lg:py-28 dark:bg-transparent">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={copy.processEyebrow} title={copy.processTitle} />
        <RevealGroup className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-7 hidden h-px bg-surface-border lg:block" />
          {copy.processSteps.map((step, i) => {
            const Icon = processIcons[i];
            return (
              <motion.div key={step.title} data-reveal="" variants={revealItem} className="relative flex flex-col items-center gap-3 text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-[0_8px_24px_-8px_var(--accent)]">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-bg-elevated text-xs font-semibold text-accent-deep shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)] dark:text-accent">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-base text-fg">{step.title}</h3>
                <p className="max-w-[220px] text-xs leading-relaxed text-fg-muted">{step.description}</p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}

function ExpectationsSection() {
  const { t } = useTranslation();
  const copy = t.emergencyTreatmentPage;
  return (
    <section className="py-12 sm:py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={copy.expectationsEyebrow} title={copy.expectationsTitle} />
        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
          {copy.expectationsItems.map((line) => (
            <motion.div
              key={line}
              data-reveal=""
              variants={revealItem}
              className="flex flex-col items-center gap-3 rounded-2xl border border-surface-border bg-bg-elevated p-6 text-center transition-all duration-[250ms] hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,0.22)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Stethoscope className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-fg">{line}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

function FAQSection() {
  const { t } = useTranslation();
  const copy = t.emergencyTreatmentPage;
  return (
    <section className="bg-ivory-100/60 py-12 sm:py-20 lg:py-28 dark:bg-transparent">
      <Container className="flex flex-col items-center gap-14">
        <SectionHeading eyebrow={copy.faqEyebrow} title={copy.faqTitle} />
        <PageReveal delay={0.1} className="w-full max-w-2xl">
          <FAQAccordion items={copy.faqItems} />
        </PageReveal>
      </Container>
    </section>
  );
}

export function EmergencyTreatmentPageBody() {
  const { t } = useTranslation();
  return (
    <>
      <EmergencyHero />
      <WhoMayHelpSection />
      <ProcessSection />
      <ExpectationsSection />
      <FAQSection />
      <CTASection
        title={t.emergencyTreatmentPage.finalCtaTitle}
        description={t.emergencyTreatmentPage.finalCtaDescription}
      />
    </>
  );
}

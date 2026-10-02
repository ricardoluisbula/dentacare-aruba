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
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { treatmentIcons } from "@/components/treatments/TreatmentIcons";
import { getTreatment } from "@/data/treatments";
import { EMERGENCY_ALIGNMENT, EMERGENCY_2_ALIGNMENT } from "@/data/photoAlignments";
import { useDepthParallax } from "@/lib/hooks/useDepthParallax";
import { galleryResultsPath } from "@/lib/treatmentLinks";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/**
 * The emergency & aesthetic dentistry page: fast aesthetic repair of damaged
 * front teeth.
 *
 * ARUBA DRAFT: ported from the reference site's emergency page, including its
 * two before/after photo pairs (treated by Sam Abdin; the reference's third
 * slider repeated the hero pair and was not carried over). Its published
 * price range, call / WhatsApp buttons, online "Dental Check" invitation and
 * every promise of same-day or immediate availability were removed -- the
 * dentist is only in Aruba on specific published dates. A short safety note
 * (SafetyNote below) says so plainly.
 */

const SLUG = "emergency-aesthetic-dentistry";

/**
 * The same emergency-repair photography as the home page's EmergencyService
 * section: the hero features the full-tooth-loss case, the "who this may
 * help" section the single-gap case, so the page uses both pairs without
 * repeating either.
 */
const heroCase = {
  beforeImage: "/images/home/emergency-care-2-before.webp",
  afterImage: "/images/home/emergency-care-2-after.webp",
};
const featuredCase = {
  beforeImage: "/images/home/emergency-care-before.webp",
  afterImage: "/images/home/emergency-care-after.webp",
};

function EmergencyHero() {
  const { t } = useTranslation();
  const item = getTreatment(SLUG);
  const Icon = treatmentIcons[item.icon];
  const { ref: mediaRef, y: depthY } = useDepthParallax();

  return (
    <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--accent-glow),transparent)] opacity-60 dark:opacity-40"
      />
      <Container className="!max-w-[1560px] flex w-full min-w-0 flex-col gap-8">
        <Link
          href="/treatments"
          className="-mx-1 inline-flex w-fit items-center gap-1.5 rounded-sm px-1 text-xs font-medium text-fg-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          {t.treatmentDetail.backToTreatments}
        </Link>

        <div className="grid w-full items-center gap-12 lg:grid-cols-[0.82fr_1fr] lg:gap-16">
          <div className="flex min-w-0 flex-col items-start gap-6">
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

          <motion.div ref={mediaRef} style={{ y: depthY }} className="relative mx-auto w-full max-w-md lg:max-w-[75%]">
            {/*
              4/3 on mobile, 3/2 from sm: (reference values): these photos
              (~2.28-2.39/1 native, EMERGENCY_2_ALIGNMENT) are wider than
              either container, so the crop only trims the sides.
            */}
            <Reveal scale={1.025} distance={0} duration={0.95}>
              <BeforeAfterSlider
                aspectClassName="aspect-[4/3] sm:aspect-[3/2]"
                beforeImage={heroCase.beforeImage}
                afterImage={heroCase.afterImage}
                beforeAlt={t.emergencyService.beforeAlt}
                afterAlt={t.emergencyService.afterAlt}
                beforeLabel={t.smileGallery.before}
                afterLabel={t.smileGallery.after}
                ariaLabel={`${t.smileGallery.sliderLabel}: ${item.name}`}
                imageSizes="(max-width: 1024px) 90vw, 40vw"
                alignment={EMERGENCY_2_ALIGNMENT}
                priority
                className="border border-surface-border shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]"
              />
            </Reveal>
            {/* ARUBA DRAFT: new copy, needs practice review */}
            <p className="mt-4 text-left text-xs leading-relaxed text-fg-muted">
              {t.smileGallery.caseCaption} {t.smileGallery.treatedByNote}
            </p>
          </motion.div>
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
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <PageReveal className="flex flex-col gap-6">
          <SectionHeading align="left" eyebrow={copy.helpEyebrow} title={copy.helpTitle} />
          <p className="text-base leading-relaxed text-fg-muted">{copy.helpIntro}</p>
          <ul className="flex flex-col gap-3">
            {copy.helpItems.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-fg-muted">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <p className="text-sm italic leading-relaxed text-fg-muted/80">{copy.helpClosing}</p>
        </PageReveal>
        {/*
          Same 4/3 -> 3/2 (sm:+) ratios as the hero. This pair
          (EMERGENCY_ALIGNMENT, ~1.22/1 and ~1.45/1 native) was verified on the
          reference site: the extra crop lands in lip-skin margin, well clear
          of the teeth and the missing-tooth gap this photo exists to show.
        */}
        <PageReveal delay={0.1} className="flex w-full flex-col gap-3 lg:max-w-[85%]">
          <BeforeAfterSlider
            aspectClassName="aspect-[4/3] sm:aspect-[3/2]"
            beforeImage={featuredCase.beforeImage}
            afterImage={featuredCase.afterImage}
            beforeAlt={t.emergencyService.beforeAlt}
            afterAlt={t.emergencyService.afterAlt}
            beforeLabel={t.smileGallery.before}
            afterLabel={t.smileGallery.after}
            ariaLabel={`${t.smileGallery.sliderLabel}: ${t.emergencyService.title}`}
            imageSizes="(max-width: 1024px) 90vw, 45vw"
            alignment={EMERGENCY_ALIGNMENT}
            className="border border-surface-border shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)]"
          />
          <Link
            href={galleryResultsPath("emergency")}
            className="-mx-1 inline-flex w-fit items-center gap-1.5 rounded-sm px-1 text-sm font-medium text-accent-deep underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-accent"
          >
            {t.galleryLinks.resultsLink}
          </Link>
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

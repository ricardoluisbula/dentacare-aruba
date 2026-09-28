"use client";

import { useState } from "react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronDown, HeartHandshake, MessagesSquare, ShieldCheck, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal as PageReveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { NightGuardSpotlight } from "@/components/sections/NightGuardSpotlight";
import { treatmentIcons } from "@/components/treatments/TreatmentIcons";
import { getTreatment } from "@/data/treatments";
import { FEATURED_SLUGS, REMAINING_SLUGS, treatmentDetailPath, type TreatmentSlug } from "@/lib/treatmentLinks";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * The treatments hub. Ported from the reference site's hub with its photo
 * hero, before/after sliders, patient-case gallery, dentist photo and direct
 * call/WhatsApp buttons removed (ARUBA DRAFT: none of that exists for Aruba).
 * The closing call to action is the shared CTASection.
 *
 * Every treatment card links to its own information page -- never /contact.
 * Slug lists and paths live in src/lib/treatmentLinks.ts so the hub's routing
 * is covered by tests that run without rendering React.
 */

const LIST_ANCHOR = "our-treatments";

function TreatmentsHero() {
  const { t } = useTranslation();
  const copy = t.treatmentsPage;

  return (
    <PageHero
      eyebrow={copy.heroEyebrow}
      title={
        <>
          {copy.heroTitle}
          {/* Explicit space so the accessible name does not run the two lines together. */}
          <br />{" "}
          <span className="inline-block pb-[0.12em] text-gradient-accent italic">{copy.heroAccent}</span>
        </>
      }
      description={copy.heroDescription}
    >
      <Button href={`#${LIST_ANCHOR}`} variant="outline">
        {copy.heroCta}
      </Button>
    </PageHero>
  );
}

const trustStripIcons = [ShieldCheck, UserCheck, MessagesSquare, HeartHandshake];

function TrustStrip() {
  const { t } = useTranslation();
  const s = t.treatmentsPage.trustStrip;
  const items = [
    { title: s.invasiveTitle, text: s.invasiveText },
    { title: s.personalTitle, text: s.personalText },
    { title: s.communicationTitle, text: s.communicationText },
    { title: s.repairTitle, text: s.repairText },
  ];

  return (
    <section className="pb-4 sm:pb-8">
      <Container>
        <PageReveal>
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 rounded-[2rem] border border-surface-border bg-bg-elevated px-6 py-8 sm:grid-cols-2 sm:gap-y-8 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-surface-border">
            {items.map((item, i) => {
              const Icon = trustStripIcons[i];
              return (
                <div key={item.title} className={cn("flex items-start gap-3", i > 0 && "lg:pl-6")}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-fg">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-fg-muted">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </PageReveal>
      </Container>
    </section>
  );
}

function FeaturedTreatments() {
  const { t } = useTranslation();
  const q = t.treatmentsPage.quickFacts;
  const facts: Record<(typeof FEATURED_SLUGS)[number], [string, string]> = {
    "composite-restorations": [q.personalizedAssessment, q.naturalAppearance],
    "dental-implants": [q.treatmentPlanRequired, q.suitableCasesVary],
    "emergency-aesthetic-dentistry": [q.personalizedAssessment, q.suitableCasesVary],
    "preventive-care": [q.personalizedAssessment, q.gentleApproach],
  };

  return (
    <section id={LIST_ANCHOR} className="scroll-mt-28 py-12 sm:py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={t.treatmentsPage.featuredEyebrow} title={t.treatmentsPage.featuredTitle} />

        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
          {FEATURED_SLUGS.map((slug) => {
            const item = getTreatment(slug);
            const Icon = treatmentIcons[item.icon];
            return (
              <motion.div
                key={slug}
                id={slug}
                data-reveal=""
                variants={revealItem}
                className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-surface-border bg-bg-elevated p-6 transition-all duration-[250ms] hover:-translate-y-1 hover:!border-accent/30 hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,0.22)] focus-within:-translate-y-1 focus-within:!border-accent/30 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 dark:bg-gold-950 dark:text-gold-300"
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg text-fg">{item.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{item.description}</p>
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {facts[slug].map((fact) => (
                      <span
                        key={fact}
                        className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-deep dark:text-accent"
                      >
                        <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                        {fact}
                      </span>
                    ))}
                  </div>
                  {/* The card's only link; its ::after makes the whole card the hit target. */}
                  <Link
                    href={treatmentDetailPath(slug)}
                    className="-mx-2 -mb-2 inline-flex w-fit items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-accent-deep transition-colors hover:text-accent-deep/80 focus-visible:outline-none after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring dark:text-accent dark:hover:text-accent/80"
                  >
                    {t.treatmentsPage.treatmentLinks[slug]} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}

function RemainingTreatments() {
  const { t } = useTranslation();
  const [openSlug, setOpenSlug] = useState<TreatmentSlug | null>(null);

  return (
    <section className="pb-12 sm:pb-20 lg:pb-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading align="left" eyebrow={t.treatmentsPage.remainingEyebrow} title={t.treatmentsPage.remainingTitle} />
        <RevealGroup className="flex flex-col divide-y divide-surface-border rounded-3xl border border-surface-border bg-bg-elevated" stagger={0.06}>
          {REMAINING_SLUGS.map((slug) => {
            const item = getTreatment(slug);
            const Icon = treatmentIcons[item.icon];
            const isOpen = openSlug === slug;
            const panelId = `treatment-panel-${slug}`;
            const triggerId = `treatment-trigger-${slug}`;
            return (
              <motion.div key={slug} id={slug} data-reveal="" variants={revealItem}>
                <div className="flex items-stretch">
                  {/* A toggle button plus a separate navigation link: a
                      <button> cannot legally contain an <a>. */}
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={item.name}
                    onClick={() => setOpenSlug((prev) => (prev === slug ? null : slug))}
                    className="group flex min-w-0 flex-1 items-center gap-4 py-5 pl-6 pr-2 text-left transition-colors hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:pl-8"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-deep transition-colors group-hover:bg-accent group-hover:text-accent-contrast dark:text-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="break-words font-display text-base text-fg">{item.name}</p>
                      <p className="mt-0.5 truncate text-sm text-fg-muted">{item.summary}</p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-fg-muted transition-transform duration-300 ease-premium",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <Link
                    href={treatmentDetailPath(slug)}
                    aria-label={`${t.treatmentsPage.treatmentLinks[slug]} — ${item.name}`}
                    className="flex shrink-0 items-center py-5 pl-2 pr-6 text-fg-muted transition-colors hover:bg-accent/5 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:pr-8"
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows] duration-300 ease-premium"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="max-w-2xl pb-6 pl-[5.25rem] pr-6 sm:pb-7 sm:pl-[5.75rem] sm:pr-8">
                      <p className="rounded-2xl bg-ivory-100/70 px-4 py-3.5 text-sm leading-relaxed text-fg-muted sm:text-base dark:bg-white/5">
                        {item.expandedDescription ?? item.description}
                      </p>
                      <Link
                        href={treatmentDetailPath(slug)}
                        className="mt-3 -mx-2 inline-flex w-fit items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-accent-deep transition-colors hover:text-accent-deep/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-accent dark:hover:text-accent/80"
                      >
                        {t.treatmentsPage.treatmentLinks[slug]}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>
        {/* Directly under the list whose last row is the night guard, next to
            crowns & bridges -- the restorative work it helps protect. */}
        <NightGuardSpotlight showDefinitionLink />
      </Container>
    </section>
  );
}

/**
 * Cautious, dot-based general guidance only -- not a clinical diagnosis. The
 * disclaimer beneath the table repeats that suitability is only ever confirmed
 * during an assessment. ARUBA DRAFT: carried over unchanged from the reference
 * site, where it was also flagged for clinical sign-off.
 */
const COMPARISON_COLUMNS = [
  "composite-restorations",
  "dental-crowns-bridges",
  "porcelain-veneers",
  "dental-implants",
  "emergency-aesthetic-dentistry",
] as const;
type ComparisonColumn = (typeof COMPARISON_COLUMNS)[number];
const COMPARISON_ROW_KEYS = ["discoloration", "chipped", "missing", "rapid", "strengthen"] as const;
const COMPARISON_MATRIX: Record<(typeof COMPARISON_ROW_KEYS)[number], Record<ComparisonColumn, boolean>> = {
  discoloration: {
    "composite-restorations": false,
    "dental-crowns-bridges": true,
    "porcelain-veneers": true,
    "dental-implants": false,
    "emergency-aesthetic-dentistry": false,
  },
  chipped: {
    "composite-restorations": true,
    "dental-crowns-bridges": true,
    "porcelain-veneers": false,
    "dental-implants": false,
    "emergency-aesthetic-dentistry": true,
  },
  missing: {
    "composite-restorations": false,
    "dental-crowns-bridges": true,
    "porcelain-veneers": false,
    "dental-implants": true,
    "emergency-aesthetic-dentistry": true,
  },
  rapid: {
    "composite-restorations": true,
    "dental-crowns-bridges": false,
    "porcelain-veneers": true,
    "dental-implants": false,
    "emergency-aesthetic-dentistry": true,
  },
  strengthen: {
    "composite-restorations": false,
    "dental-crowns-bridges": true,
    "porcelain-veneers": false,
    "dental-implants": false,
    "emergency-aesthetic-dentistry": true,
  },
};

function ComparisonSection() {
  const { t } = useTranslation();
  const c = t.treatmentsPage.comparison;

  return (
    // `overflow-x-hidden` keeps the table's min-width from widening the page on mobile.
    <section className="overflow-x-hidden bg-ivory-100/60 py-12 sm:py-20 lg:py-28 dark:bg-transparent">
      <Container className="grid grid-cols-1 gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:items-center xl:gap-16">
        <PageReveal className="flex min-w-0 flex-col gap-6">
          <SectionHeading align="left" eyebrow={c.eyebrow} title={c.title} />
          <p className="max-w-md text-base leading-relaxed text-fg-muted">{c.description}</p>
          <div>
            <a
              href="#comparison-table"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium tracking-wide text-accent-contrast shadow-[0_8px_30px_-8px_var(--accent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-6px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:translate-y-0"
            >
              {c.cta}
            </a>
          </div>
        </PageReveal>

        <PageReveal delay={0.1} className="flex min-w-0 flex-col gap-4">
          <div id="comparison-table" className="scroll-mt-28" />
          <div data-lenis-prevent className="overflow-x-auto rounded-[1.75rem] border border-surface-border bg-bg-elevated">
            <table className="w-full min-w-[520px] table-fixed border-collapse text-left">
              <caption className="sr-only">
                {c.title} — {c.suitableLabel} / {c.notTypicalLabel}
              </caption>
              <thead>
                <tr className="border-b border-surface-border">
                  <th scope="col" className="w-[20%] break-words px-3 py-4 text-xs font-semibold uppercase tracking-wide text-fg-muted">
                    {c.goalColumn}
                  </th>
                  {COMPARISON_COLUMNS.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="w-[16%] break-words px-3 py-4 text-center text-xs font-semibold uppercase tracking-wide text-fg-muted"
                    >
                      {getTreatment(col).name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROW_KEYS.map((rowKey) => (
                  <tr key={rowKey} className="border-b border-surface-border last:border-b-0">
                    <th scope="row" className="break-words px-3 py-4 text-sm font-medium text-fg">
                      {c.rows[rowKey]}
                    </th>
                    {COMPARISON_COLUMNS.map((col) => {
                      const suitable = COMPARISON_MATRIX[rowKey][col];
                      return (
                        <td key={col} className="px-3 py-4 text-center">
                          <span
                            className={cn(
                              "mx-auto flex h-6 w-6 items-center justify-center rounded-full border",
                              suitable ? "border-accent bg-accent text-accent-contrast" : "border-surface-border bg-transparent text-transparent"
                            )}
                          >
                            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                          </span>
                          <span className="sr-only">{suitable ? c.suitableLabel : c.notTypicalLabel}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-surface-border bg-bg-elevated px-5 py-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <ShieldCheck className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="text-sm leading-relaxed text-fg-muted">{c.disclaimer}</p>
          </div>
        </PageReveal>
      </Container>
    </section>
  );
}

export function TreatmentsPageBody() {
  const { t } = useTranslation();
  return (
    <>
      <TreatmentsHero />
      <TrustStrip />
      <FeaturedTreatments />
      <RemainingTreatments />
      <ComparisonSection />
      <CTASection title={t.treatmentsPage.finalCta.title} description={t.treatmentsPage.finalCta.description} />
    </>
  );
}

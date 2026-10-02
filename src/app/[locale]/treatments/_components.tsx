"use client";

import { useState } from "react";
import Image from "next/image";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, HeartHandshake, MessagesSquare, ShieldCheck, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal as PageReveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { CATEGORY_FILTER_KEY } from "@/components/gallery/categoryMeta";
import { beforeAfterCases } from "@/data/beforeAfterCases";
import { useDepthParallax } from "@/lib/hooks/useDepthParallax";
import { CTASection } from "@/components/sections/CTASection";
import { NightGuardSpotlight } from "@/components/sections/NightGuardSpotlight";
import { treatmentIcons } from "@/components/treatments/TreatmentIcons";
import { getTreatment } from "@/data/treatments";
import { FEATURED_SLUGS, REMAINING_SLUGS, treatmentDetailPath, type TreatmentSlug } from "@/lib/treatmentLinks";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * The treatments hub. Ported from the reference site's hub, including its
 * before/after hero, the photos on the featured treatment cards and the
 * patient-case row (cases treated by Sam Abdin; see beforeAfterCases.ts).
 * ARUBA DRAFT: the reference's direct call/WhatsApp buttons, its contact
 * button, its dentist-photo closing panel and its online "Dental Check"
 * invitation were removed; the closing call to action is the shared
 * CTASection.
 *
 * Every treatment card links to its own information page -- never /contact.
 * Slug lists and paths live in src/lib/treatmentLinks.ts so the hub's routing
 * is covered by tests that run without rendering React.
 */

const LIST_ANCHOR = "our-treatments";

/**
 * Hand-picked, not file-order: each photo is used once on this page, and a
 * card only shows a photo of its OWN treatment. Two cards show their icon on
 * a plain gold panel instead:
 * - implants: the reference used a photo of its own premises' instruments,
 *   which is not used on this site, and no gallery case is an implant result;
 * - composite veneers: the reference used case-10, a porcelain veneers
 *   result, which would misrepresent what composite veneers achieve.
 */
const FEATURED_IMAGES: Partial<Record<(typeof FEATURED_SLUGS)[number], { src: string; fit: "cover" | "contain" }>> = {
  "emergency-aesthetic-dentistry": { src: "/images/home/emergency-care-after.webp", fit: "cover" },
  // The Prevention & Hygiene page's own hero photo (1536x1024).
  "preventive-care": { src: "/images/prevention-hygiene-professional-cleaning.png", fit: "cover" },
};

const HERO_CASE_ID = "case-06";

/**
 * The patient-case row. The reference showed four cases; its fourth uses
 * photos that are not carried over to this site, so it was dropped rather
 * than replaced -- the odd last card is centred instead.
 */
const GALLERY_CASE_IDS = ["case-02", "case-08", "case-15"];
/** Uniform landscape media ratio for every card in this row (reference value). */
const GALLERY_CARD_ASPECT = "16 / 9";

function TreatmentsHero() {
  const { t } = useTranslation();
  const copy = t.treatmentsPage;
  const heroCase = beforeAfterCases.find((c) => c.id === HERO_CASE_ID)!;
  const { ref: mediaRef, y: depthY } = useDepthParallax();
  const STAGGER = 0.14;
  const DISTANCE = 18;

  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_65%_55%_at_50%_-8%,var(--accent-glow),transparent)] opacity-70 dark:opacity-45"
      />
      <Container className="!max-w-[1560px] grid w-full items-center gap-12 lg:grid-cols-[0.82fr_1fr] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
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
            className="mt-4 max-w-xl text-balance break-words font-display text-[clamp(2rem,1.3rem+3.2vw,3.5rem)] font-medium leading-[1.05] text-fg"
          >
            {copy.heroTitle}
            {/* Explicit space so the accessible name does not run the two lines together. */}
            <br />{" "}
            <span className="inline-block pb-[0.12em] text-gradient-accent italic">{copy.heroAccent}</span>
          </Reveal>

          <Reveal
            as="p"
            delay={STAGGER * 3}
            distance={DISTANCE}
            duration={0.6}
            className="mt-4 max-w-lg text-balance text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            {copy.heroDescription}
          </Reveal>

          <Reveal
            delay={STAGGER * 4}
            distance={DISTANCE}
            duration={0.6}
            className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Button href={`#${LIST_ANCHOR}`} variant="outline">
              {copy.heroCta}
            </Button>
          </Reveal>
        </div>

        <motion.div
          ref={mediaRef}
          style={{ y: depthY }}
          className="relative mx-auto w-full max-w-md lg:max-w-[clamp(350px,calc(60.1vw_-_265px),600px)]"
        >
          <Reveal
            as="div"
            delay={STAGGER * 6}
            distance={12}
            duration={0.6}
            className="absolute -left-5 -top-6 z-10 hidden w-44 items-start gap-2 rounded-2xl bg-bg-elevated p-3 shadow-[0_16px_40px_-14px_rgba(0,0,0,0.35)] sm:flex"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <UserCheck className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-[13px] font-semibold text-fg">{t.treatmentsHeroBadge.title}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-fg-muted">{t.treatmentsHeroBadge.text}</p>
            </div>
          </Reveal>

          <Reveal scale={1.025} distance={0} duration={0.95}>
            <BeforeAfterSlider
              // case-06's native photos are exactly 16/9 (1200x675), so its
              // calibrated anchor alignment applies here unchanged.
              aspectClassName="aspect-[16/9]"
              beforeImage={heroCase.beforeImage}
              afterImage={heroCase.afterImage}
              beforeAlt={heroCase.beforeAlt}
              afterAlt={heroCase.afterAlt}
              beforeLabel={t.smileGallery.before}
              afterLabel={t.smileGallery.after}
              ariaLabel={`${t.smileGallery.sliderLabel}: ${heroCase.title}`}
              imageSizes="(max-width: 1024px) 90vw, 45vw"
              alignment={heroCase.alignment}
              priority
              className="border border-surface-border shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]"
            />
          </Reveal>
          {/* ARUBA DRAFT: new copy, needs practice review */}
          <p className="mt-4 text-left text-xs leading-relaxed text-fg-muted">
            {t.smileGallery.caseCaption} {t.smileGallery.treatedByNote}
          </p>
        </motion.div>
      </Container>
    </section>
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
            const image = FEATURED_IMAGES[slug];
            return (
              <motion.div
                key={slug}
                id={slug}
                data-reveal=""
                variants={revealItem}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-surface-border bg-bg-elevated transition-all duration-[250ms] hover:-translate-y-1 hover:!border-accent/30 hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,0.22)] focus-within:-translate-y-1 focus-within:!border-accent/30"
              >
                {/*
                  Landscape ratio (sm:+) keeps the title and description in
                  view alongside the photo; mobile keeps 4/3 so the photo
                  doesn't go too shallow on a narrow card. Verified on the
                  reference site via object-cover crop simulation: every photo
                  keeps its full subject in frame at default center position.
                */}
                <div className={cn("relative aspect-[4/3] w-full overflow-hidden sm:aspect-[19/9]", image ? "bg-ink-900" : "bg-gold-100 dark:bg-gold-950")}>
                  {image ? (
                    <>
                      <Image
                        src={image.src}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 20vw"
                        className={cn(
                          image.fit === "contain" ? "object-contain" : "object-cover",
                          "transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        )}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-900/0 via-transparent to-transparent transition-colors duration-[250ms] group-hover:from-espresso-900/10" />
                    </>
                  ) : (
                    // No photo for this treatment (see FEATURED_IMAGES): a plain,
                    // decorative gold panel -- not a stand-in photograph.
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-br from-gold-100 via-ivory-100 to-gold-200 dark:from-gold-950 dark:via-ink-900 dark:to-gold-900"
                    />
                  )}
                </div>
                {/* Not `relative`: the card link's ::after has to position
                    against the whole card (photo included), so the icon is
                    anchored by its own zero-height wrapper instead. */}
                <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-8">
                  <div aria-hidden="true" className="relative -mb-4 h-0">
                    <div className="absolute -top-14 left-0 flex h-12 w-12 items-center justify-center rounded-2xl border border-surface-border bg-bg-elevated text-accent shadow-[0_8px_20px_-8px_rgba(0,0,0,0.25)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                  </div>
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

function TransformationGallery() {
  const { t } = useTranslation();
  const cases = GALLERY_CASE_IDS.map((id) => beforeAfterCases.find((c) => c.id === id)!);

  return (
    <section id="patient-transformations" className="scroll-mt-28 py-12 sm:py-20 lg:py-28">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow={t.treatmentsGallery.eyebrow}
            title={t.treatmentsGallery.title}
            className="items-center text-center lg:items-start lg:text-left"
          />
          <Link
            href="/smile-gallery"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-accent-deep transition-colors hover:text-accent-deep/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-accent dark:hover:text-accent/80 lg:inline-flex"
          >
            {t.treatmentsGallery.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Capped at 2 columns at every desktop width (a ~500-520px per-card
            target); the odd last card is centred at the same width. */}
        <RevealGroup className="mx-auto grid w-full max-w-[1064px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-7" stagger={0.08}>
          {cases.map((item, index) => {
            const categoryLabel = t.smileGallery.filters[CATEGORY_FILTER_KEY[item.treatmentCategories[0]]];
            const isOddLast = cases.length % 2 === 1 && index === cases.length - 1;
            return (
              <motion.div
                key={item.id}
                data-reveal=""
                variants={revealItem}
                className={cn("group/card flex", isOddLast && "md:col-span-2 md:mx-auto md:w-[calc(50%-0.875rem)]")}
              >
                <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-surface-border bg-bg-elevated shadow-[0_4px_18px_-14px_rgba(24,20,12,0.22)] transition-shadow duration-[350ms] hover:shadow-[0_18px_40px_-18px_rgba(24,20,12,0.28)]">
                  {/* Every card shares this aspect ratio and `cover` fit -- a
                      presentation-only override, the same pattern as
                      GRID_COVER_OVERRIDES in GalleryGrid.tsx. */}
                  <BeforeAfterSlider
                    aspectRatio={GALLERY_CARD_ASPECT}
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    beforeAlt={item.beforeAlt}
                    afterAlt={item.afterAlt}
                    beforeLabel={t.smileGallery.before}
                    afterLabel={t.smileGallery.after}
                    ariaLabel={`${t.smileGallery.sliderLabel}: ${item.title}`}
                    imageSizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 520px"
                    imageFit="cover"
                    alignment={item.alignment}
                    className="!rounded-none !shadow-none !ring-0 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover/card:scale-[1.015]"
                  />

                  {/* The whole content block is one link; the slider above is
                      a sibling, so dragging it never triggers navigation. */}
                  <Link
                    href="/smile-gallery"
                    aria-label={`${t.smileGallery.viewCase}: ${item.title}`}
                    className="flex flex-1 flex-col items-start px-5 pb-5 pt-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-deep dark:text-accent">
                      {categoryLabel}
                    </span>
                    <h3 className="mt-1.5 font-display text-lg text-fg">{item.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-xs font-semibold uppercase tracking-[0.1em] text-accent-deep transition-colors group-hover/card:text-accent dark:text-accent">
                      {t.smileGallery.viewCase}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/card:translate-x-1"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>

        <div className="flex flex-col items-center gap-6">
          {/* ARUBA DRAFT: new copy, needs practice review */}
          <p className="max-w-md text-balance text-center text-xs text-fg-muted">{t.smileGallery.treatedByNote}</p>
          <Button
            href="/smile-gallery"
            variant="outline"
            className="!border-accent/40 !bg-transparent !text-accent-deep !px-9 hover:!border-accent hover:!bg-accent/5 hover:!text-accent dark:!text-accent"
          >
            {t.treatmentsGallery.cta} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
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
      <TransformationGallery />
      <CTASection title={t.treatmentsPage.finalCta.title} description={t.treatmentsPage.finalCta.description} />
    </>
  );
}

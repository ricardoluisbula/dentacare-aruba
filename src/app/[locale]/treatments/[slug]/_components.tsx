"use client";

import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, Info, ShieldCheck, type LucideIcon } from "lucide-react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { treatmentIcons } from "@/components/treatments/TreatmentIcons";
import type { Treatment } from "@/data/treatments";
import { useLocalizedContent } from "@/content/useLocalizedContent";
import type { TreatmentPageContent, TreatmentPageSection } from "@/data/treatmentPages";
import {
  RELATED_TREATMENT_SLUGS,
  galleryCategoryForTreatment,
  galleryResultsPath,
  treatmentDetailPath,
  type TreatmentSlug,
} from "@/lib/treatmentLinks";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/**
 * One page template shared by every treatment without a hand-built page.
 *
 * Section order follows how a patient actually decides: what the treatment is,
 * whether it applies to them, what happens, what it cannot do, what they are
 * responsible for afterwards, and the questions they were going to ask anyway.
 *
 * ARUBA DRAFT: the reference template's price block, online "Dental Check"
 * invitation and direct-contact buttons were removed; the closing call to
 * action is the shared CTASection. Its before-and-after link is kept only on
 * pages whose treatment has cases in the Smile Gallery, and opens the gallery
 * on that category.
 */
export function TreatmentDetailBody({ slug, content }: { slug: string; content: TreatmentPageContent }) {
  const { t } = useTranslation();
  const { getTreatment } = useLocalizedContent();

  const item = getTreatment(slug);
  const copy = t.treatmentDetail;
  const Icon = treatmentIcons[item.icon];
  const related = RELATED_TREATMENT_SLUGS[slug as TreatmentSlug] ?? [];
  const galleryCategory = galleryCategoryForTreatment(slug);

  return (
    <>
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
            {copy.backToTreatments}
          </Link>

          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-surface-border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep dark:text-accent">
                <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                {t.treatmentsPage.categories[categoryKey(item.category)]}
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
              {item.summary}
            </Reveal>
          </div>
        </Container>
      </section>

      <Section title={copy.overviewTitle}>
        <div className="flex max-w-2xl flex-col gap-4">
          {content.overview.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-fg-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {content.background?.map((section) => (
        <Section key={section.title} title={section.title} headingId={section.id} description={section.definition}>
          <SectionLists section={section} />
        </Section>
      ))}

      <Section title={copy.suitableTitle} description={copy.suitableIntro}>
        <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
          {content.suitableFor.map((entry) => (
            <li key={entry} className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
              <span className="text-sm leading-relaxed text-fg-muted">{entry}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg-muted">{item.whoFor}</p>
      </Section>

      <Section title={copy.processTitle} description={copy.processIntro}>
        {/* An ordered list, not a decorative grid: these steps happen in this
            sequence, and a screen reader should be told so. */}
        <ol className="flex max-w-3xl flex-col gap-6">
          {content.process.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-surface-border font-display text-sm text-accent-deep dark:text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-lg text-fg">{step.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Always above the limitations, never in place of them: every item is
          a "may", and the section's note says what the treatment does not do. */}
      {content.benefits && (
        <Section title={content.benefits.title}>
          <SectionLists section={content.benefits} />
        </Section>
      )}

      <Section title={copy.limitationsTitle} icon={Info}>
        <ul className="flex max-w-3xl flex-col gap-3">
          {content.limitations.map((entry) => (
            <li key={entry} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-sm leading-relaxed text-fg-muted">{entry}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={copy.aftercareTitle} icon={ShieldCheck}>
        <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
          {content.aftercare.map((entry) => (
            <li key={entry} className="flex items-start gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
              <span className="text-sm leading-relaxed text-fg-muted">{entry}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={copy.faqTitle}>
        <FAQAccordion items={content.faq} className="max-w-3xl" />
      </Section>

      <section className="pb-12 sm:pb-16">
        <Container className="flex flex-col gap-8">
          <Reveal>
            <p className="max-w-3xl rounded-3xl border border-surface-border bg-accent/5 p-6 text-sm leading-relaxed text-fg-muted sm:p-8">
              {copy.disclaimer}
            </p>
          </Reveal>

          {(related.length > 0 || galleryCategory) && (
            <Reveal delay={0.1} className="flex flex-col gap-4">
              <h2 className="font-display text-sm uppercase tracking-[0.2em] text-fg">{copy.relatedTitle}</h2>
              <div className="flex flex-wrap gap-4">
                {related.map((relatedSlug) => (
                  <Button key={relatedSlug} href={treatmentDetailPath(relatedSlug)} variant="outline">
                    {t.treatmentsPage.treatmentLinks[relatedSlug]}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </Button>
                ))}
                {galleryCategory && (
                  <Button href={galleryResultsPath(galleryCategory)} variant="outline">
                    {t.galleryLinks.resultsLink}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </Button>
                )}
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <CTASection title={copy.ctaTitle} description={copy.ctaDescription} />
    </>
  );
}

/** A titled content block, so every section on the page shares one rhythm. */
function Section({
  title,
  description,
  icon: Icon,
  headingId,
  children,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** Stable deep-link anchor on the section's <h2>. */
  headingId?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-10 sm:py-14">
      <Container className="flex flex-col gap-6">
        <SectionHeading
          align="left"
          title={
            Icon ? (
              <span className="inline-flex items-center gap-3">
                <Icon className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                {title}
              </span>
            ) : (
              title
            )
          }
          description={description}
          headingId={headingId}
        />
        <Reveal delay={0.1}>{children}</Reveal>
      </Container>
    </section>
  );
}

/**
 * The bulleted lists of an optional `background` or `benefits` section, with
 * the section's closing caveat set apart below them so it cannot be skimmed
 * past as another bullet.
 */
function SectionLists({ section }: { section: TreatmentPageSection }) {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      {section.lists.map((list, index) => (
        <div key={list.intro ?? index} className="flex flex-col gap-3">
          {list.intro && <p className="text-base leading-relaxed text-fg-muted">{list.intro}</p>}
          <ul className="grid gap-3 sm:grid-cols-2">
            {list.items.map((entry) => (
              <li key={entry} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                <span className="text-sm leading-relaxed text-fg-muted">{entry}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {section.note && (
        <p className="flex max-w-2xl items-start gap-3 rounded-2xl border border-surface-border bg-bg-elevated px-5 py-4 text-sm leading-relaxed text-fg-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} aria-hidden="true" />
          <span>{section.note}</span>
        </p>
      )}
    </div>
  );
}

/** Maps a `Treatment.category` to its key in the treatments dictionary. */
function categoryKey(category: Treatment["category"]) {
  return category.toLowerCase() as Lowercase<Treatment["category"]>;
}

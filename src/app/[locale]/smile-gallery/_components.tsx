"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Check, HeartHandshake, MessagesSquare, ShieldCheck, UserCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal as PageReveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CATEGORY_ICON } from "@/components/gallery/categoryMeta";
import { beforeAfterCases } from "@/data/beforeAfterCases";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/*
 * The Smile Gallery, ported (English only) from the reference site's results
 * page. ARUBA DRAFT changes: the closing panel's clinic-interior photo and its
 * contact button were dropped in favour of the shared CTASection, the trust
 * strip reuses this site's own treatments-page trust copy, and a short note
 * says who treated the cases (see `smileGallery.treatedByNote`).
 */

// Same lazy-loaded lightbox the grid uses -- shares the same chunk, so
// opening it here doesn't add any extra JS beyond what the grid already
// pulls in once a card is clicked.
const GalleryModal = dynamic(() => import("@/components/gallery/GalleryModal").then((m) => m.GalleryModal));

/**
 * Single hero case, not a carousel -- one large, unhurried transformation
 * gets the full-width slider and its own story panel (badge, title,
 * description, CTA) before the editorial grid below shows the rest. The
 * category icon comes from the case's own `treatmentCategories`, never
 * hardcoded, so this stays accurate whichever case is flagged `featured`.
 */
function FeaturedTransformation() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredCase = beforeAfterCases.find((item) => item.featured) ?? beforeAfterCases[0];
  const CategoryIcon = CATEGORY_ICON[featuredCase.treatmentCategories[0]];
  /** Two safe, general reassurances (the treatments page's quick-fact chips), not per-case specifics. */
  const metadata = [t.treatmentsPage.quickFacts.naturalAppearance, t.treatmentsPage.quickFacts.personalizedAssessment];

  return (
    <section className="pb-12 sm:pb-20 lg:pb-28">
      <Container>
        {/*
          One continuous card -- image and info panel share the same border,
          radius and shadow. At `lg:` the image stretches to match the info
          panel's natural height via CSS Grid's default `stretch` alignment.
          The image area uses a fixed `16/9` ratio, matching the featured
          case's own native photo aspect, so both lips stay in frame (see the
          case-09 alignment comment in beforeAfterCases.ts).
        */}
        <PageReveal className="overflow-hidden rounded-[2rem] border border-surface-border bg-bg-elevated shadow-[0_4px_24px_-14px_rgba(0,0,0,0.15)] lg:grid lg:grid-cols-[1.5fr_1fr]">
          <div className="relative">
            <BeforeAfterSlider
              aspectClassName="aspect-[16/9]"
              beforeImage={featuredCase.beforeImage}
              afterImage={featuredCase.afterImage}
              beforeAlt={featuredCase.beforeAlt}
              afterAlt={featuredCase.afterAlt}
              beforeLabel={t.smileGallery.before}
              afterLabel={t.smileGallery.after}
              ariaLabel={`${t.smileGallery.sliderLabel}: ${featuredCase.title}`}
              imageSizes="(max-width: 1024px) 100vw, 60vw"
              imageFit={featuredCase.imageFit}
              alignment={featuredCase.alignment}
              priority
              className="!rounded-none !shadow-none !ring-0"
            />
          </div>

          <div className="flex flex-col items-center gap-5 px-7 py-9 text-center sm:px-9 sm:py-10 lg:items-start lg:justify-center lg:px-10 lg:py-12 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep dark:text-accent">
              <CategoryIcon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              {t.smileGallery.featuredBadge}
            </span>
            <h2 className="max-w-md text-balance break-words font-display text-section font-medium leading-[1.1] text-fg">
              {featuredCase.title}
            </h2>
            <span aria-hidden className="h-px w-10 bg-accent" />
            <p className="max-w-sm text-balance text-base leading-relaxed text-fg-muted">{featuredCase.description}</p>

            <ul className="flex flex-col gap-2">
              {metadata.map((fact) => (
                <li key={fact} className="flex items-center gap-2.5 text-sm text-fg">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-2">
              <Button onClick={() => setIsModalOpen(true)}>
                {t.smileGallery.viewCase}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </PageReveal>
        <p className="mt-3 text-center text-xs text-fg-muted">{t.smileGallery.featuredCaption}</p>
      </Container>

      <GalleryModal
        item={isModalOpen ? featuredCase : null}
        onClose={() => setIsModalOpen(false)}
        onPrev={() => {}}
        onNext={() => {}}
        labels={{
          before: t.smileGallery.before,
          after: t.smileGallery.after,
          close: t.smileGallery.modalClose,
          previous: t.smileGallery.modalPrevious,
          next: t.smileGallery.modalNext,
          sliderLabel: t.smileGallery.sliderLabel,
        }}
      />
    </section>
  );
}

const trustStripIcons = [ShieldCheck, UserCheck, MessagesSquare, HeartHandshake];

/** The reference's four-item trust strip, filled with this site's already-reviewed treatments-page trust copy -- no new claims. */
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
                <div
                  key={item.title}
                  className={cn("flex items-start gap-3 transition-transform duration-[250ms] hover:-translate-y-0.5", i > 0 && "lg:pl-6")}
                >
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

export function SmileGalleryPageBody() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero eyebrow={t.smileGallery.heroEyebrow} title={t.smileGallery.heroTitle} description={t.smileGallery.heroDescription}>
        {/* ARUBA DRAFT: new copy, needs practice review */}
        <p className="max-w-xl text-balance text-sm leading-relaxed text-fg-muted">{t.smileGallery.treatedByNote}</p>
      </PageHero>

      <FeaturedTransformation />

      <section className="pb-12 sm:pb-20 lg:pb-28">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            eyebrow={t.smileGallery.browseEyebrow}
            title={t.smileGallery.browseTitle}
            description={t.smileGallery.browseDescription}
          />
          <GalleryGrid />
          <p className="text-center text-sm text-fg-muted">
            {t.smileGallery.disclaimer} {t.smileGallery.treatedByNote}
          </p>
        </Container>
      </section>

      <TrustStrip />
      <CTASection />
    </>
  );
}

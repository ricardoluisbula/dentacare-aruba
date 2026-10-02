"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { useDepthParallax } from "@/lib/hooks/useDepthParallax";
import { beforeAfterCases } from "@/data/beforeAfterCases";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/**
 * The homepage's single large transformation moment, placed shortly after
 * the dates section. Ported from the reference site (English only). Reuses
 * the smile-gallery "featured case" copy (patientResultsEyebrow /
 * seeTheDifference / seeTheDifferenceDescription) and case-10 -- a case not
 * shown in the SmileGalleryPreview grid further down (the first four cases)
 * or as the Smile Gallery's featured case (case-09), so nothing repeats in
 * close proximity. case-10 needs no grid-cover override in GalleryGrid,
 * confirming its native photos already crop safely at its own declared
 * "16/9" ratio, so that ratio (matching Hero's slider) is used as-is here
 * rather than risking an unverified custom crop. BeforeAfterSlider itself
 * is reused untouched; only the surrounding entrance motion is new.
 */
export function SignatureTransformation() {
  const { t } = useTranslation();
  const featuredCase = beforeAfterCases.find((item) => item.id === "case-10") ?? beforeAfterCases[0];
  const { ref: sliderRef, y: depthY } = useDepthParallax([-6, 6]);

  return (
    <section className="relative overflow-hidden bg-bg-elevated py-16 sm:py-28 lg:py-36">
      {/* Ambient glow leads rather than follows -- it's already gently
          present as a backdrop (no delay, slow 1.4s fade) by the time the
          heading and slider arrive, instead of visibly "switching on". */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Reveal fadeOnly duration={1.4} className="absolute inset-x-0 top-1/2 h-[520px] w-full -translate-y-1/2">
          <div className="h-full w-full bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,var(--accent-glow),transparent)] opacity-[0.07] dark:opacity-[0.05]" />
        </Reveal>
      </div>

      {/* This is the homepage's emotional centerpiece: the heading is
          allowed to fully resolve (SectionHeading's own label -> heading ->
          description cadence) before the slider begins its slow, deliberate
          unveiling, then a long pause before anything else competes with
          it -- an art-gallery beat, not another content block. */}
      <Container className="flex flex-col items-center gap-16">
        <SectionHeading
          eyebrow={t.smileGallery.patientResultsEyebrow}
          title={t.smileGallery.seeTheDifference}
          description={t.smileGallery.seeTheDifferenceDescription}
        />

        {/*
          Sized down from the old max-w-4xl/max-w-6xl (896-1152px, nearly
          full-bleed on desktop) to feel like a featured patient result
          rather than a full-screen photo. Mobile/tablet keep the original
          w-full + 16/9 ratio untouched (Container's own padding already
          gives a contained card with comfortable margins there); only the
          `lg:` (1024px+) tier gets the new ~68vw/1040px-cap width and a
          shorter aspect ratio. case-10 has no alignment/transform (native
          scale 1 -- see beforeAfterCases.ts), so the shorter container
          crops a modest, symmetric ~11% off the top+bottom via ordinary
          object-cover -- no custom anchor/transform to disturb, and no
          image files, alignment data, or slider mechanics touched.
        */}
        <div className="mx-auto flex w-full flex-col items-center md:w-[min(88vw,900px)] lg:w-[min(68vw,1040px)]">
          <motion.div ref={sliderRef} style={{ y: depthY }} className="w-full">
            <Reveal scale={0.98} duration={1.1} delay={0.5} className="w-full">
              <BeforeAfterSlider
                aspectClassName="aspect-[16/9] lg:aspect-[2/1]"
                beforeImage={featuredCase.beforeImage}
                afterImage={featuredCase.afterImage}
                beforeAlt={featuredCase.beforeAlt}
                afterAlt={featuredCase.afterAlt}
                beforeLabel={t.smileGallery.before}
                afterLabel={t.smileGallery.after}
                ariaLabel={`${t.smileGallery.sliderLabel}: ${featuredCase.title}`}
                imageSizes="(max-width: 768px) 100vw, (max-width: 1024px) 88vw, 1040px"
                alignment={featuredCase.alignment}
                className="border border-surface-border shadow-[0_28px_80px_-24px_rgba(0,0,0,0.3)]"
              />
            </Reveal>
          </motion.div>

          {/* Quiet on purpose -- a small caption, not a second headline, so
              it never competes with the photograph itself. */}
          <Reveal delay={0.68} duration={0.45} distance={10} className="mt-6 flex flex-col items-center gap-1 text-center">
            <span className="font-display text-lg text-fg">{featuredCase.title}</span>
            <p className="max-w-md text-sm text-fg-muted">{featuredCase.description}</p>
            <p className="mt-1 text-xs text-fg-muted/80">{t.smileGallery.featuredCaption}</p>
            {/* ARUBA DRAFT: new copy, needs practice review */}
            <p className="text-xs text-fg-muted/80">{t.smileGallery.treatedByNote}</p>
          </Reveal>
        </div>

        <Reveal delay={0.82} duration={0.55}>
          <Button href="/smile-gallery" variant="outline">
            {t.smileGalleryPreview.cta} <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

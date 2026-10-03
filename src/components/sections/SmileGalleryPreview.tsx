"use client";

import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { staggerItemVariants } from "@/components/animations/StaggerItem";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useLocalizedContent } from "@/content/useLocalizedContent";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/**
 * Card-specific framing override for cases whose default object-fit
 * treatment doesn't read well at this row's shared 4:3 ratio. Only case-05
 * needs one: its native photo (803x271, ~2.96/1) is far wider than any of
 * this row's other three cards' photos, so the plain `object-contain` it
 * needs elsewhere (to avoid cropping into its teeth -- see the "zero safe
 * crop margin" note on this case in beforeAfterCases.ts) left a large,
 * mostly-black letterboxed band here, worse above the teeth than below
 * since the source photo's own dark background sits mostly above them.
 *
 * Verified against the real file before picking these numbers: sampled
 * per-row/per-column brightness to confirm the top ~20% is genuinely bare
 * background (safe to trim) while neither side has a clean margin (the
 * teeth run close to both edges) -- then rendered actual crops at several
 * trim levels and inspected them directly. 20% off each side is the most
 * that stays clearly clear of the teeth; a full edge-to-edge crop (no
 * letterbox at all) visibly clips the outermost tooth on both sides.
 * Anchoring the remaining (smaller) void to the bottom via `top: 0` keeps
 * it below the smile, where it already blends into the card's existing
 * gradient/title overlay instead of sitting above it.
 */
const CARD_FRAMING: Record<string, { wrapperStyle: CSSProperties; aspectRatio: string }> = {
  "case-05": {
    wrapperStyle: { left: "-33.335%", top: 0, width: "166.667%" },
    aspectRatio: "803 / 271",
  },
};

/** Home page teaser for the Smile Gallery, ported from the reference site (English only, green section background mapped to ivory). */
export function SmileGalleryPreview() {
  const { t } = useTranslation();
  const { cases: beforeAfterCases } = useLocalizedContent();
  const featured = beforeAfterCases.slice(0, 4);

  return (
    <section className="bg-ivory-100/60 py-12 sm:py-20 lg:py-28 dark:bg-transparent">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow={t.smileGalleryPreview.eyebrow}
            title={t.smileGalleryPreview.title}
            description={t.smileGalleryPreview.description}
            className="items-center text-center lg:items-start lg:text-left"
          />
        </div>

        <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4" stagger={0.08}>
          {featured.map((item) => {
            const framing = CARD_FRAMING[item.id];
            return (
            <motion.div key={item.id} variants={staggerItemVariants}>
              <Link
                href="/smile-gallery"
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-surface-border bg-ink-900 shadow-[0_12px_36px_-18px_rgba(0,0,0,0.25)] transition-transform duration-[350ms] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {/*
                  4:3 (not the old 4:5 portrait) -- these are wide dental
                  close-up photos (2.3-4.2:1 native), and a portrait card was
                  cropping away 65-80% of each photo's width. `imageFit`
                  respects the same per-case "contain" flag the gallery grid
                  already uses for photos with zero safe crop margin (e.g.
                  case-05's extreme macro shot), so nothing gets stretched or
                  cropped into teeth/lips. CARD_FRAMING above overrides this
                  per-card for the one case where plain contain/cover reads
                  inconsistently with the other three cards in this row.
                */}
                {framing ? (
                  <div className="absolute" style={{ ...framing.wrapperStyle, aspectRatio: framing.aspectRatio }}>
                    <Image
                      src={item.afterImage}
                      alt={item.afterAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <Image
                    src={item.afterImage}
                    alt={item.afterAlt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                    className={cn(
                      item.imageFit === "contain" ? "object-contain" : "object-cover",
                      "transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    )}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/0 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-display text-sm text-white sm:text-base">
                  {item.title}
                </span>
              </Link>
            </motion.div>
            );
          })}
        </StaggerGroup>

        <div className="flex flex-col items-center gap-6">
          {/* ARUBA DRAFT: new copy, needs practice review */}
          <p className="max-w-md text-balance text-center text-xs text-fg-muted">{t.smileGallery.treatedByNote}</p>
          <Button href="/smile-gallery" variant="outline">
            {t.smileGalleryPreview.cta} <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

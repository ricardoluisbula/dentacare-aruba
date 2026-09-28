"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppEnquiry } from "@/components/availability/WhatsAppEnquiry";
import { Reveal } from "@/components/animations/Reveal";
import { useDepthParallax } from "@/lib/hooks/useDepthParallax";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/**
 * Cinematic one-time entrance, in this order: hero image (with its subtle
 * scale-in) leads, then headline, paragraph, CTA, and finally the
 * reassurance line -- all built on the shared `Reveal` component so every
 * beat gets the same easing, reduced-motion handling and `data-reveal`
 * no-JS fallback.
 */
const HERO_STAGGER = 0.16;
const HERO_DISTANCE = 20;

export function Hero() {
  const { t } = useTranslation();
  const { ref: mediaRef, y: depthY } = useDepthParallax();

  return (
    <section className="relative overflow-hidden pt-28 pb-10 lg:flex lg:min-h-[calc(100vh-150px)] lg:items-center lg:pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(ellipse_65%_55%_at_50%_-8%,var(--accent-glow),transparent)] opacity-70 dark:opacity-45"
      />

      <Container className="!max-w-[1560px] grid w-full items-center gap-8 lg:grid-cols-[0.82fr_1fr] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Reveal
            as="span"
            delay={HERO_STAGGER}
            distance={HERO_DISTANCE}
            duration={0.6}
            className="inline-flex items-center gap-2 rounded-full border border-surface-border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep dark:text-accent"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero.badge}
          </Reveal>

          <Reveal
            as="h1"
            delay={HERO_STAGGER * 2}
            distance={HERO_DISTANCE}
            duration={0.6}
            className="mt-4 max-w-2xl text-balance break-words font-display text-[clamp(2rem,1.35rem+3.4vw,3.75rem)] font-medium leading-[0.98] text-fg"
          >
            {t.hero.headlinePrefix}{" "}
            {/* pb: the gradient is painted with background-clip: text, which
                clips descenders at this tight leading. */}
            <span className="block pb-[0.12em] text-[0.82em] text-gradient-accent italic">
              {t.hero.headlineAccent}
            </span>
          </Reveal>

          <Reveal
            as="p"
            delay={HERO_STAGGER * 3}
            distance={HERO_DISTANCE}
            duration={0.6}
            className="mt-4 max-w-lg text-balance text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            {t.hero.paragraph}
          </Reveal>

          <Reveal
            delay={HERO_STAGGER * 4}
            distance={HERO_DISTANCE}
            duration={0.6}
            className="mt-7 flex flex-wrap items-center justify-center gap-5 lg:justify-start"
          >
            {/* Appointment enquiries go by WhatsApp message (confirmed Aruba
                number). Never a tel: link -- the number takes messages only. */}
            <WhatsAppEnquiry placement="hero" showNote={false} />
            <Button href="#aruba-dates" variant="outline">
              {t.hero.ctaDates}
            </Button>
          </Reveal>

          <Reveal
            as="p"
            delay={HERO_STAGGER * 5}
            distance={HERO_DISTANCE}
            duration={0.55}
            className="mt-4 max-w-md text-balance text-xs leading-relaxed text-fg-muted sm:text-sm"
          >
            {t.whatsapp.enquiryNote}
          </Reveal>
        </div>

        <motion.div
          ref={mediaRef}
          style={{ y: depthY }}
          className="relative mx-auto w-full max-w-md lg:max-w-[88%]"
        >
          {/* ARUBA DRAFT: image slot at the reference hero photo's exact
              1672x941 ratio, so the final Aruba photograph drops in without
              changing the layout. The reference photo itself was not reused:
              it shows the Amsterdam clinic's own signage. */}
          <Reveal scale={1.025} distance={0} duration={0.95}>
            <HeroImagePlaceholder title={t.hero.imagePlaceholderTitle} note={t.hero.imagePlaceholderNote} />
          </Reveal>
        </motion.div>
      </Container>
    </section>
  );
}

function HeroImagePlaceholder({ title, note }: { title: string; note: string }) {
  return (
    <figure className="relative aspect-[1672/941] overflow-hidden rounded-[2rem] border border-surface-border bg-gradient-to-br from-gold-50 via-ivory-100 to-gold-200 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] dark:from-ink-800 dark:via-ink-900 dark:to-gold-950">
      {/* Decorative: soft sun disc and horizon lines in the brand gold. */}
      <svg aria-hidden="true" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-gold-300)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-gold-300)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="1180" cy="330" r="420" fill="url(#hero-sun)" />
        <circle cx="1180" cy="330" r="150" fill="none" stroke="var(--color-gold-500)" strokeOpacity="0.35" strokeWidth="2" />
        {[610, 660, 715, 775, 840].map((y, i) => (
          <line key={y} x1="0" x2="1672" y1={y} y2={y} stroke="var(--color-gold-500)" strokeOpacity={0.28 - i * 0.04} strokeWidth="2" />
        ))}
      </svg>
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5 sm:p-7">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg-elevated/80 text-accent-deep backdrop-blur dark:text-accent">
          <ImageIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="flex flex-col text-left">
          <span className="text-sm font-semibold text-fg">{title}</span>
          <span className="text-xs text-fg-muted">{note}</span>
        </span>
      </figcaption>
    </figure>
  );
}

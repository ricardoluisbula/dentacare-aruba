"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppEnquiry } from "@/components/availability/WhatsAppEnquiry";
import { Reveal } from "@/components/animations/Reveal";
import { useDepthParallax } from "@/lib/hooks/useDepthParallax";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { siteConfig } from "@/lib/site";

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
          {/* A finished gold illustration in the reference hero photo's exact
              1672x941 frame, so an Aruba clinic photograph can replace it
              later without changing the layout. (The reference photo was not
              reused: it shows the Amsterdam clinic's own signage.) */}
          <Reveal scale={1.025} distance={0} duration={0.95}>
            <HeroArtwork location={siteConfig.address.full} brand={siteConfig.name} />
          </Reveal>
        </motion.div>
      </Container>
    </section>
  );
}

/** Wave crest for the layered "sea": a smooth curve across the frame at `y`. */
function wave(y: number, amp: number, shift: number): string {
  const s = shift;
  return `M0 ${y} C ${280 + s} ${y - amp}, ${560 + s} ${y + amp}, 836 ${y} S ${1392 - s} ${y - amp}, 1672 ${y} L1672 941 L0 941 Z`;
}

const WAVES = [
  { y: 600, amp: 34, shift: 0, opacity: 0.32 },
  { y: 668, amp: 28, shift: 60, opacity: 0.4 },
  { y: 742, amp: 24, shift: -40, opacity: 0.5 },
  { y: 826, amp: 18, shift: 30, opacity: 0.62 },
];

/**
 * The home hero's illustration: a Caribbean sun over a layered gold sea, with
 * the Dentacare tooth outline from the logo, drawn entirely in the brand's
 * gold tokens so it follows light and dark mode. Purely decorative (the SVG
 * is aria-hidden); the address label is real text.
 */
function HeroArtwork({ location, brand }: { location: string; brand: string }) {
  return (
    <figure className="relative aspect-[1672/941] overflow-hidden rounded-[2rem] border border-surface-border bg-gradient-to-br from-gold-50 via-ivory-100 to-gold-200 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] dark:from-ink-800 dark:via-ink-900 dark:to-gold-950">
      <svg aria-hidden="true" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="hero-art-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-gold-300)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-gold-300)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-art-sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold-100)" />
            <stop offset="100%" stopColor="var(--color-gold-400)" />
          </linearGradient>
          <linearGradient id="hero-art-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold-300)" />
            <stop offset="100%" stopColor="var(--color-gold-600)" />
          </linearGradient>
          <filter id="hero-art-soft" x="-60%" y="-40%" width="220%" height="180%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>

        {/* Sun: glow, disc and two quiet rings. */}
        <circle cx="1190" cy="318" r="470" fill="url(#hero-art-glow)" />
        <circle cx="1190" cy="318" r="148" fill="url(#hero-art-sun)" opacity="0.92" />
        <circle cx="1190" cy="318" r="196" fill="none" stroke="var(--color-gold-500)" strokeOpacity="0.32" strokeWidth="2" />
        <circle cx="1190" cy="318" r="262" fill="none" stroke="var(--color-gold-500)" strokeOpacity="0.16" strokeWidth="2" />

        {/* Sea: layered gold waves. */}
        {WAVES.map((w) => (
          <path key={w.y} d={wave(w.y, w.amp, w.shift)} fill="url(#hero-art-sea)" fillOpacity={w.opacity} />
        ))}

        {/* The sun's reflection on the water. */}
        {[628, 662, 698, 736, 778].map((y, i) => (
          <line
            key={y}
            x1={1190 - (120 - i * 18)}
            x2={1190 + (120 - i * 18)}
            y1={y}
            y2={y}
            stroke="var(--color-ivory-50)"
            strokeOpacity={0.55 - i * 0.08}
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}

        {/* The Dentacare tooth mark, with a soft halo. */}
        <g transform="translate(332 132) scale(5.6)">
          <path d="M10 2C3 3 0 11 2 20c2 8 5 14 6 24 1 9 3 22 7 24s4-10 5-18c1-5 2-8 2-8s1 3 2 8c1 8 1 20 5 18s6-15 7-24c1-10 4-16 6-24 2-9-1-17-8-18-5-1-8 2-12 3-4-1-7-4-12-3Z" fill="none" stroke="var(--color-gold-300)" strokeWidth="3" strokeOpacity="0.8" filter="url(#hero-art-soft)" />
          <path d="M10 2C3 3 0 11 2 20c2 8 5 14 6 24 1 9 3 22 7 24s4-10 5-18c1-5 2-8 2-8s1 3 2 8c1 8 1 20 5 18s6-15 7-24c1-10 4-16 6-24 2-9-1-17-8-18-5-1-8 2-12 3-4-1-7-4-12-3Z" fill="var(--color-ivory-50)" fillOpacity="0.35" stroke="var(--color-gold-600)" strokeWidth="1.1" strokeLinejoin="round" />
        </g>
      </svg>

      <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-xl border border-white/50 bg-bg-elevated/75 px-2.5 py-1.5 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35)] backdrop-blur-md sm:bottom-6 sm:left-6 sm:gap-3 sm:rounded-2xl sm:px-4 sm:py-3 dark:border-white/10">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700 sm:h-9 sm:w-9 dark:bg-gold-950 dark:text-gold-300">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className="flex flex-col text-left leading-tight">
          <span className="text-xs font-semibold text-fg sm:text-sm">{brand}</span>
          <span className="text-[11px] text-fg-muted sm:text-xs">{location}</span>
        </span>
      </figcaption>
    </figure>
  );
}

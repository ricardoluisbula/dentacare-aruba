"use client";

import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppEnquiry } from "@/components/availability/WhatsAppEnquiry";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/** Outlined secondary on the dark espresso panel. */
const SECONDARY_ON_DARK =
  "!border-ivory-50/60 !text-ivory-50 !bg-transparent hover:!border-ivory-50 hover:!bg-ivory-50/10";

/**
 * Closing panel shared by the home page. Same structure and motion as the
 * reference site's closing CTA, recoloured from olive green to espresso and
 * champagne gold.
 *
 * The one appointment action is a WhatsApp message to the confirmed Aruba
 * number, always with the note that a message does not confirm an
 * appointment. No tel: link: the number takes messages only.
 */
export function CTASection({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const { t } = useTranslation();

  return (
    <section className="relative py-12 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <div className="focus-on-dark noise-overlay relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-espresso-700 via-espresso-800 to-espresso-900 px-6 py-16 text-center sm:px-16 sm:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_0%,var(--color-gold-700),transparent_70%)] opacity-35"
            />
            <div aria-hidden className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-200">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {eyebrow ?? t.cta.eyebrow}
              </span>
              <h2 className="text-balance font-display text-section font-medium leading-[1.1] text-ivory-50">
                {title ?? t.cta.title}
              </h2>
              <p className="text-balance text-base leading-relaxed text-ivory-200 sm:text-lg">
                {description ?? t.cta.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
                <WhatsAppEnquiry placement="closing_cta" variant="onDark" showNote={false} />
                <Button href="/contact#aruba-dates" variant="outline" className={SECONDARY_ON_DARK}>
                  {t.cta.datesLink}
                </Button>
              </div>
              <p className="max-w-md text-balance text-xs leading-relaxed text-ivory-200/90 sm:text-sm">{t.whatsapp.enquiryNote}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

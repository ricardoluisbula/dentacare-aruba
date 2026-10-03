"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { staggerItemVariants } from "@/components/animations/StaggerItem";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { EMERGENCY_ALIGNMENT, EMERGENCY_2_ALIGNMENT } from "@/data/photoAlignments";

/**
 * Home page section showing the two emergency aesthetic repair photo pairs,
 * most dramatic transformation first: case 1 is a full tooth loss restored to
 * a complete, even smile; case 2 is a single gap between two teeth closed.
 *
 * ARUBA DRAFT: adapted from the reference site's "Signature Emergency
 * Service". Its call button, opening-hours logic, price range and every
 * "1 hour" / same-day promise were removed -- the dentist is only in Aruba on
 * scheduled dates, which the note under the photos says plainly. The one
 * action is the treatment's own information page.
 */
const cases = [
  {
    id: "case-1",
    beforeImage: "/images/home/emergency-care-2-before.webp",
    afterImage: "/images/home/emergency-care-2-after.webp",
    alignment: EMERGENCY_2_ALIGNMENT,
  },
  {
    id: "case-2",
    beforeImage: "/images/home/emergency-care-before.webp",
    afterImage: "/images/home/emergency-care-after.webp",
    alignment: EMERGENCY_ALIGNMENT,
  },
];

export function EmergencyService() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-ivory-100/60 py-12 sm:py-20 lg:py-28 dark:bg-transparent">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Reveal fadeOnly duration={1.1} className="absolute inset-x-0 top-1/2 h-[480px] w-full -translate-y-1/2">
          <div className="h-full w-full bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,var(--accent-glow),transparent)] opacity-[0.07] dark:opacity-[0.05]" />
        </Reveal>
      </div>

      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow={t.emergencyService.eyebrow}
          title={t.emergencyService.title}
          description={t.emergencyService.description}
        />

        {/*
          Mobile (stacked, single column) uses 4/3; sm:+ (two columns)
          switches to the shorter 3/2. Verified safe on the reference site via
          object-cover crop simulation against both photo pairs' native
          dimensions: case-1's photos (~2.28/1, very wide) show MORE of the
          image at 3/2 than at 4/3; case-2's photos (~1.22/1 and ~1.45/1) lose
          a modest amount of lip-skin margin at top/bottom, well clear of the
          teeth and the missing-tooth gap both photos exist to show.
        */}
        <div className="mx-auto w-full max-w-[1400px]">
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:gap-10" stagger={0.1}>
            {cases.map((item) => (
              <motion.div key={item.id} variants={staggerItemVariants}>
                <BeforeAfterSlider
                  aspectClassName="aspect-[4/3] sm:aspect-[3/2]"
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeAlt={t.emergencyService.beforeAlt}
                  afterAlt={t.emergencyService.afterAlt}
                  beforeLabel={t.smileGallery.before}
                  afterLabel={t.smileGallery.after}
                  ariaLabel={`${t.smileGallery.sliderLabel}: ${t.emergencyService.title}`}
                  imageSizes="(max-width: 640px) 90vw, (max-width: 1400px) 45vw, 680px"
                  alignment={item.alignment}
                />
              </motion.div>
            ))}
          </StaggerGroup>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="max-w-lg text-xs leading-relaxed text-fg-muted">
            {t.smileGallery.caseCaption} {t.smileGallery.treatedByNote}
          </p>
          <p className="inline-flex max-w-lg items-center gap-2 text-sm font-medium text-fg">
            <CalendarClock className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
            {t.emergencyTreatmentPage.safetyTitle}
          </p>
        </div>

        <div className="flex justify-center">
          <Button href="/treatments/emergency-aesthetic-dentistry" variant="outline">
            {t.treatmentsPage.treatmentLinks["emergency-aesthetic-dentistry"]}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

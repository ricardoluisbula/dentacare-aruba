"use client";

import Image from "next/image";
import { GraduationCap, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/**
 * The dentist's profile, limited to verified details: his education
 * (University of Groningen) and that he has practised dentistry in Amsterdam
 * since 2009 -- a fact about him, not about the Aruba practice. No title
 * ("Dr."), specialism, memberships or biography claims until confirmed. The
 * portrait is the reference site's photo of Sam Abdin, shown whole
 * (object-contain, anchored to the top) on an ivory mat.
 */
export function TeamBody() {
  const { t } = useTranslation();
  const p = t.teamPage;

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} description={p.description} />

      <section className="pb-8">
        <Container className="max-w-5xl">
          <Reveal>
            <article className="glass grid gap-10 rounded-[2.5rem] p-6 sm:p-10 md:grid-cols-[auto_1fr] md:gap-14 lg:p-14">
              <div className="mx-auto h-fit w-56 overflow-hidden rounded-[1.75rem] border border-surface-border bg-ivory-200 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] sm:w-64">
                <Image
                  src="/images/team/sam.webp"
                  alt={t.imageAlts.samPortrait}
                  width={1279}
                  height={1600}
                  sizes="(min-width: 640px) 256px, 224px"
                  priority
                  className="h-auto w-full object-contain object-top"
                />
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="font-display text-section font-medium leading-[1.1] text-fg">{p.name}</h2>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent-deep dark:text-accent">{p.role}</p>
                </div>
                {p.bio.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-fg-muted sm:text-lg">
                    {paragraph}
                  </p>
                ))}

                <div className="border-t border-surface-border pt-6">
                  <h3 className="font-display text-lg font-medium text-fg">{p.credentialsHeading}</h3>
                  <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div className="flex gap-3">
                      <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                      <div>
                        <dt className="text-sm font-semibold text-fg">{p.educationLabel}</dt>
                        <dd className="mt-0.5 text-sm text-fg-muted">{p.educationValue}</dd>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                      <div>
                        <dt className="text-sm font-semibold text-fg">{p.experienceLabel}</dt>
                        <dd className="mt-0.5 text-sm text-fg-muted">{p.experienceValue}</dd>
                      </div>
                    </div>
                  </dl>
                </div>
                <p className="text-sm italic text-fg-muted">{p.teamNote}</p>
              </div>
            </article>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

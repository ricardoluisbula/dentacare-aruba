"use client";

import { ArrowUpRight, Clock, Images, MessageSquareQuote, Phone, Stethoscope, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

type ItemKey = keyof Dictionary["overview"]["items"];

const ITEMS: { key: ItemKey; href: string; icon: LucideIcon }[] = [
  { key: "treatments", href: "/treatments", icon: Stethoscope },
  { key: "team", href: "/team", icon: Users },
  { key: "smileGallery", href: "/smile-gallery", icon: Images },
  { key: "reviews", href: "/reviews", icon: MessageSquareQuote },
  { key: "visit", href: "/contact", icon: Clock },
  { key: "contact", href: "/contact", icon: Phone },
];

/**
 * ARUBA DRAFT home section: one card per area of the site that is waiting on
 * the practice's confirmed information. Uses the reference site's card
 * language (glass surface, rounded-3xl, accent icon badge, staggered reveal)
 * so the design can be reviewed before any real content exists. Replace with
 * the real home sections as their content is supplied.
 */
export function DraftOverview() {
  const { t } = useTranslation();

  return (
    <section id="draft-overview" className="relative scroll-mt-28 py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={t.overview.eyebrow} title={t.overview.title} description={t.overview.description} />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ key, href, icon: Icon }) => {
            const item = t.overview.items[key];
            return (
              <StaggerItem key={key}>
                <Link
                  href={href}
                  className="group glass relative flex h-full flex-col gap-5 rounded-3xl p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:!border-accent/40 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 dark:bg-gold-950 dark:text-gold-300">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-dashed border-accent/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-deep dark:text-accent">
                      {t.overview.status}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xl font-medium text-fg">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-fg-muted">{item.body}</p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep dark:text-accent">
                    {t.overview.open}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}

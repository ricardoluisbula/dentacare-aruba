import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Shared layout for legal/policy pages (privacy, cookies, complaints, terms,
 * pricing info, disclaimer).
 *
 * No page using this layout renders a bracketed placeholder. Where a legal
 * detail is unconfirmed (see src/data/legal.ts), the page omits that clause
 * rather than printing a template token at a visitor. Which of these pages are
 * publicly linked and indexable is decided per page, in its own page.tsx.
 */
export function LegalPageLayout({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <section className="pb-20 pt-36 sm:pt-44 sm:pb-28">
      <Container className="mx-auto flex !max-w-3xl flex-col gap-8">
        <Reveal>
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-section font-medium leading-[1.1] text-fg">{title}</h1>
            {updated && <p className="text-sm text-fg-muted">{updated}</p>}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="flex flex-col gap-6 text-sm leading-relaxed text-fg-muted [&_h2]:mt-4 [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-fg [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:leading-relaxed">
            {children}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

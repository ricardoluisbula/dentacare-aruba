import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--accent-glow),transparent)] opacity-60 dark:opacity-40"
      />
      <Container className="flex w-full min-w-0 flex-col items-center text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent-deep dark:text-accent">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.1} className="w-full min-w-0">
          <h1 className="mt-6 w-full max-w-3xl text-balance break-words font-display text-hero font-medium leading-[1.05] text-fg">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.2} className="w-full min-w-0">
            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-fg-muted sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.3} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {children}
          </Reveal>
        )}
      </Container>
    </section>
  );
}

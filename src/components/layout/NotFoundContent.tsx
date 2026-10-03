"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { localizePath } from "@/lib/i18n/routing";

/**
 * The 404 page's content, in the active language, with a way home and to
 * contact. Rendered by `global-not-found.tsx` for every URL that does not
 * resolve (the server-rendered 404), and by `[locale]/not-found.tsx` when a
 * page calls `notFound()` during a client-side navigation.
 */
export function NotFoundContent() {
  const { t, locale } = useTranslation();

  return (
    <section className="flex min-h-[70vh] items-center justify-center py-32">
      <Container className="flex flex-col items-center text-center">
        <span aria-hidden="true" className="font-display text-8xl text-accent">
          404
        </span>
        <h1 className="mt-6 font-display text-3xl text-fg sm:text-4xl">{t.notFound.title}</h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted">{t.notFound.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={localizePath("/", locale)}>{t.notFound.backHome}</Button>
          <Button href={localizePath("/contact", locale)} variant="outline">
            {t.notFound.contactUs}
          </Button>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useTranslation } from "@/lib/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-accent focus-visible:px-5 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-accent-contrast focus-visible:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {t.a11y.skipToContent}
    </a>
  );
}

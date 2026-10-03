"use client";

import { useMemo } from "react";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { localizedCases, localizedTreatment, localizedTreatments } from "./shared";

/** Treatments and before/after cases with their text in the page's language. */
export function useLocalizedContent() {
  const { locale } = useTranslation();
  return useMemo(
    () => ({
      treatments: localizedTreatments(locale),
      getTreatment: (slug: string) => localizedTreatment(slug, locale),
      cases: localizedCases(locale),
    }),
    [locale]
  );
}

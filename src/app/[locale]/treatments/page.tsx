import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/localeParams";
import { buildPageMetadata } from "@/lib/seo";
import { TreatmentsPageBody } from "./_components";

const PATH = "/treatments";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({ path: PATH, locale, ...getDictionary(locale).treatmentsMeta.hub });
}

export default async function TreatmentsPage({ params }: LocaleParams) {
  await resolveLocale(params);
  return <TreatmentsPageBody />;
}

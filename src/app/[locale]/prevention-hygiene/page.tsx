import type { Metadata } from "next";
import { TrackTreatmentView } from "@/components/treatments/TrackTreatmentView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/localeParams";
import { buildPageMetadata } from "@/lib/seo";
import { getPreventiveCare } from "@/content/pages";
import { PreventionHygienePageBody } from "./_components";

const PATH = "/prevention-hygiene";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({ path: PATH, locale, ...getDictionary(locale).treatmentsMeta.prevention });
}

export default async function PreventionHygienePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  return (
    <>
      {/* The information page for the "preventive-care" treatment. */}
      <TrackTreatmentView slug="preventive-care" />
      <PreventionHygienePageBody preventiveCare={getPreventiveCare(locale)} />
    </>
  );
}

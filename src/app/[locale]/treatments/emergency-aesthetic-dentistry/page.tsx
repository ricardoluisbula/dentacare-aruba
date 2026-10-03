import type { Metadata } from "next";
import { TrackTreatmentView } from "@/components/treatments/TrackTreatmentView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/localeParams";
import { buildPageMetadata } from "@/lib/seo";
import { EmergencyTreatmentPageBody } from "./_components";

const SLUG = "emergency-aesthetic-dentistry";
const PATH = `/treatments/${SLUG}`;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({ path: PATH, locale, ...getDictionary(locale).treatmentsMeta.emergency });
}

export default async function EmergencyAestheticDentistryPage({ params }: LocaleParams) {
  await resolveLocale(params);

  return (
    <>
      <TrackTreatmentView slug={SLUG} />
      <EmergencyTreatmentPageBody />
    </>
  );
}

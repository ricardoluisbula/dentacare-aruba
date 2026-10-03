import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackTreatmentView } from "@/components/treatments/TrackTreatmentView";
import { genericTreatmentSlugs, treatmentPages } from "@/data/treatmentPages";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getTreatmentPageContent } from "@/content/pages";
import { isLocale, locales } from "@/lib/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { TreatmentDetailBody } from "./_components";

type Params = { params: Promise<{ locale: string; slug: string }> };

/**
 * Only the slugs below exist. An unknown one ("/treatments/nope") is then a
 * route that does not match, answered by the site's 404 -- rather than a
 * notFound() thrown while rendering.
 *
 * `emergency-aesthetic-dentistry` is not in `genericTreatmentSlugs`: it has
 * its own hand-built route, which Next.js prefers over this dynamic one.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => genericTreatmentSlugs.map((slug) => ({ locale, slug })));
}

/** Rejects any slug this route does not own, rather than rendering an empty shell. */
async function resolveParams(params: Params["params"]) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !treatmentPages[slug]) notFound();
  return { locale, slug };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await resolveParams(params);
  const meta = getDictionary(locale).treatmentsMeta.details[slug];
  return buildPageMetadata({ path: `/treatments/${slug}`, locale, ...meta });
}

export default async function TreatmentDetailPage({ params }: Params) {
  const { locale, slug } = await resolveParams(params);

  return (
    <>
      <TrackTreatmentView slug={slug} />
      {/* Long page text is picked here, on the server, for this language only. */}
      <TreatmentDetailBody slug={slug} content={getTreatmentPageContent(slug, locale)} />
    </>
  );
}

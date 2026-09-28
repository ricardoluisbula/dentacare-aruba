import type { Metadata } from "next";
import { getPageMeta } from "@/lib/i18n/pageMeta";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/localeParams";
import { buildPageMetadata } from "@/lib/seo";
import { DraftPage } from "@/components/layout/DraftPage";

const PATH = "/pricing-info";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({ path: PATH, locale, ...getPageMeta(PATH, locale) });
}

/** ARUBA DRAFT placeholder -- see src/components/layout/DraftPage.tsx. */
export default async function PricingInfoPage({ params }: LocaleParams) {
  await resolveLocale(params);
  return <DraftPage page="pricingInfo" />;
}

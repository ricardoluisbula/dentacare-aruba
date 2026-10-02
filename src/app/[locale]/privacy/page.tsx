import type { Metadata } from "next";
import { getPageMeta } from "@/lib/i18n/pageMeta";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/localeParams";
import { buildPageMetadata } from "@/lib/seo";
import { PolicyBody } from "@/components/legal/PolicyBody";
import { privacyPolicy } from "@/data/policies";

const PATH = "/privacy";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({ path: PATH, locale, ...getPageMeta(PATH, locale) });
}

/** Policy text: src/data/policies.ts (open points marked REVIEW there). */
export default async function PrivacyPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  return <PolicyBody title={getDictionary(locale).pages.privacy.title} policy={privacyPolicy} />;
}

import type { Metadata } from "next";
import { getPageMeta } from "@/lib/i18n/pageMeta";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/localeParams";
import { buildPageMetadata } from "@/lib/seo";
import { TeamBody } from "@/components/team/TeamBody";

const PATH = "/team";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({ path: PATH, locale, ...getPageMeta(PATH, locale) });
}

export default async function TeamPage({ params }: LocaleParams) {
  await resolveLocale(params);
  return <TeamBody />;
}

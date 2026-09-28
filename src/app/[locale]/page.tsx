import type { Metadata } from "next";
import { getPageMeta } from "@/lib/i18n/pageMeta";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/localeParams";
import { buildPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { DraftOverview } from "@/components/sections/DraftOverview";
import { CTASection } from "@/components/sections/CTASection";

const PATH = "/";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({ path: PATH, locale, ...getPageMeta(PATH, locale) });
}

/**
 * ARUBA DRAFT home page. The reference site's home sections (trust bar,
 * treatments, before-and-after cases, dentist introduction, reviews,
 * languages spoken, MondCheck) all present Amsterdam facts, so they are not
 * rendered here. They return, one by one, as the Aruba practice confirms the
 * content each needs -- see docs/ARUBA-LAUNCH-CHECKLIST.md.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <DraftOverview />
      <CTASection />
    </>
  );
}

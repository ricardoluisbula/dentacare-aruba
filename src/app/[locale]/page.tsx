import type { Metadata } from "next";
import { getPageMeta } from "@/lib/i18n/pageMeta";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/localeParams";
import { buildPageMetadata } from "@/lib/seo";
import { readAvailability } from "@/lib/availability/store";
import { todayInAruba, upcomingEntries } from "@/lib/availability/dates";
import { Hero } from "@/components/sections/Hero";
import { NextDatesSection } from "@/components/sections/NextDatesSection";
import { HomeDentist } from "@/components/sections/HomeDentist";
import { DraftOverview } from "@/components/sections/DraftOverview";
import { CTASection } from "@/components/sections/CTASection";

const PATH = "/";

/**
 * Rendered on every request, so a date added or removed in the editor shows
 * up for the very next visitor. (A cached page refreshed with revalidatePath
 * can still serve one stale copy while it regenerates -- not acceptable for
 * a calendar.) Costs one small database read per page view.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({ path: PATH, locale, ...getPageMeta(PATH, locale) });
}

/**
 * ARUBA DRAFT home page. Sections that would present unconfirmed facts
 * (trust bar, before-and-after cases, reviews, languages spoken) are not
 * rendered; DraftOverview lists what is still to come.
 */
export default async function Home({ params }: LocaleParams) {
  await resolveLocale(params);
  const { entries } = await readAvailability();
  const upcoming = upcomingEntries(entries, todayInAruba());

  return (
    <>
      <Hero />
      <NextDatesSection entries={upcoming} />
      <HomeDentist />
      <DraftOverview />
      <CTASection />
    </>
  );
}

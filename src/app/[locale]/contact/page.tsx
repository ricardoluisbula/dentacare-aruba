import type { Metadata } from "next";
import { getPageMeta } from "@/lib/i18n/pageMeta";
import { resolveLocale, type LocaleParams } from "@/lib/i18n/localeParams";
import { buildPageMetadata } from "@/lib/seo";
import { readAvailability } from "@/lib/availability/store";
import { todayInAruba, upcomingEntries } from "@/lib/availability/dates";
import { ContactBody } from "@/components/contact/ContactBody";

const PATH = "/contact";

/** Rendered on every request, like the home page, so the dates are never stale. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({ path: PATH, locale, ...getPageMeta(PATH, locale) });
}

export default async function ContactPage({ params }: LocaleParams) {
  await resolveLocale(params);
  const { entries } = await readAvailability();
  return <ContactBody entries={upcomingEntries(entries, todayInAruba())} />;
}

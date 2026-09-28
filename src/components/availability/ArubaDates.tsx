"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CalendarClock, Clock } from "lucide-react";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { StaggerGroup } from "@/components/animations/StaggerGroup";
import { StaggerItem } from "@/components/animations/StaggerItem";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import {
  formatDateRange,
  formatTimeRange,
  isoStart,
  todayInAruba,
  upcomingEntries,
  type AvailabilityEntry,
} from "@/lib/availability/dates";

/**
 * The next confirmed dates the dentist works in Aruba, in Aruba time.
 *
 * `entries` are the upcoming entries as of the server render (Home and
 * Contact render on every request). The list is filtered again on the
 * visitor's device against today's date in Aruba, so a page left open past
 * midnight never keeps showing a day that has passed.
 *
 * With no future dates it says dates will be announced. It never shows hours
 * that were not entered, and never implies an appointment is available or
 * confirmed.
 */
export function ArubaDates({
  entries,
  limit,
  showMoreLink = false,
}: {
  entries: AvailabilityEntry[];
  /** Show at most this many (home page); undefined shows all (Contact page). */
  limit?: number;
  showMoreLink?: boolean;
}) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(entries);

  useEffect(() => {
    setCurrent(upcomingEntries(entries, todayInAruba()));
  }, [entries]);

  if (current.length === 0) {
    return (
      <div className="glass flex flex-col items-center gap-3 rounded-3xl p-8 text-center sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 dark:bg-gold-950 dark:text-gold-300">
          <CalendarClock className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="font-display text-xl font-medium text-fg">{t.availability.emptyTitle}</h3>
        <p className="max-w-md text-sm leading-relaxed text-fg-muted">{t.availability.emptyBody}</p>
      </div>
    );
  }

  const shown = limit ? current.slice(0, limit) : current;
  const hidden = current.length - shown.length;

  return (
    <div className="flex flex-col gap-4">
      <StaggerGroup>
        <ul aria-label={t.availability.listLabel} className="flex flex-col gap-3">
          {shown.map((entry) => {
            const hours = formatTimeRange(entry);
            return (
              <StaggerItem
                as="li"
                key={entry.id}
                className="glass flex flex-col gap-2 rounded-2xl px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6"
              >
                <span className="inline-flex items-center gap-3 font-medium text-fg">
                  <CalendarDays className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  <time dateTime={isoStart(entry)}>{formatDateRange(entry.startDate, entry.endDate)}</time>
                </span>
                <span className="inline-flex items-center gap-3 pl-8 text-sm text-fg-muted sm:pl-0">
                  <Clock className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  {hours ?? <span className="italic">{t.availability.hoursPending}</span>}
                </span>
              </StaggerItem>
            );
          })}
        </ul>
      </StaggerGroup>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-fg-muted sm:text-sm">
        <p>{t.availability.timeZoneNote}</p>
        {showMoreLink && hidden > 0 && (
          <Link
            href="/contact#aruba-dates"
            className="font-medium text-accent-deep underline-offset-4 hover:underline dark:text-accent"
          >
            {t.availability.moreDates} ({current.length})
          </Link>
        )}
      </div>
    </div>
  );
}

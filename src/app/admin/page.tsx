import { redirect } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { isSignedIn } from "@/lib/admin/auth";
import { readAvailability, storeKind } from "@/lib/availability/store";
import { pastEntries, todayInAruba, upcomingEntries, formatDateRange } from "@/lib/availability/dates";
import { signOut } from "./actions";
import { EntryForm, EntryRow } from "./_components";

/** Always rendered fresh: this page shows (and edits) the live calendar. */
export const dynamic = "force-dynamic";

export default async function AdminDatesPage() {
  if (!(await isSignedIn())) redirect("/admin/login");

  const doc = await readAvailability();
  const kind = storeKind();
  const today = todayInAruba();
  const upcoming = upcomingEntries(doc.entries, today);
  const past = pastEntries(doc.entries, today);
  const version = doc.updatedAt ?? "";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
      <header className="flex items-center justify-between gap-4">
        <Logo className="h-9 w-auto" />
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-4 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-gold-500 hover:text-gold-800"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </form>
      </header>

      <main>
        <h1 className="mt-10 font-display text-3xl font-medium sm:text-4xl">Dates in Aruba</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-500 sm:text-base">
          Add the days the dentist will work in Aruba. All dates and times are <strong>Aruba time</strong>. Changes
          appear on the Home and Contact pages straight away.{" "}
          <a href="/contact#aruba-dates" target="_blank" className="inline-flex items-center gap-1 font-medium text-gold-800 underline underline-offset-4">
            View public page <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>

        {kind !== "redis" && (
          <p role="status" className="mt-6 rounded-2xl border border-gold-300 bg-gold-50 p-4 text-sm leading-relaxed text-gold-900">
            {kind === "file"
              ? "Local test mode: dates are saved in a file on this computer only, not on the live website."
              : "No database is connected to this deployment, so dates cannot be saved yet. See docs/ARUBA-DATES.md."}
          </p>
        )}

        <section aria-labelledby="add-heading" className="mt-8 rounded-3xl border border-surface-border bg-white p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)] sm:p-8">
          <h2 id="add-heading" className="font-display text-xl font-medium">Add dates</h2>
          <p className="mt-1 text-sm text-ink-500">One day, or a range of consecutive days with the same hours.</p>
          <EntryForm version={version} today={today} />
        </section>

        <section aria-labelledby="upcoming-heading" className="mt-10">
          <h2 id="upcoming-heading" className="font-display text-xl font-medium">
            Upcoming <span className="text-ink-400">({upcoming.length})</span>
          </h2>
          {upcoming.length === 0 ? (
            <p className="mt-3 rounded-2xl border border-dashed border-gold-300 p-5 text-sm text-ink-500">
              No upcoming dates. The website currently says that upcoming dates will be announced.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {upcoming.map((entry) => (
                <EntryRow key={entry.id} entry={entry} version={version} today={today} />
              ))}
            </ul>
          )}
        </section>

        {past.length > 0 && (
          <details className="mt-10 rounded-2xl border border-surface-border bg-white/60 p-5">
            <summary className="cursor-pointer text-sm font-medium text-ink-700">
              Past dates ({past.length}) — not shown on the website
            </summary>
            <ul className="mt-3 flex flex-col gap-1 text-sm text-ink-500">
              {past.map((e) => (
                <li key={e.id}>
                  {formatDateRange(e.startDate, e.endDate)}
                  {e.startTime && ` · ${e.startTime} – ${e.endTime}`}
                </li>
              ))}
            </ul>
          </details>
        )}
      </main>
    </div>
  );
}

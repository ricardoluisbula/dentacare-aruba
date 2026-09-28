/**
 * Dates the dentist works in Aruba -- data model, validation and display.
 *
 * Pure functions only (no storage, no React), shared by the public pages, the
 * private editor and the tests.
 *
 * Every date and time here is Aruba local time. Aruba uses Atlantic Standard
 * Time (UTC-4) all year and has no daylight saving time. Dates are stored as
 * plain calendar strings ("2026-10-12") and times as "HH:MM", never as
 * instants, so no conversion can shift a working day onto the wrong date.
 */

export const ARUBA_TIME_ZONE = "America/Aruba";

/** One working day, or a run of consecutive working days with the same hours. */
export type AvailabilityEntry = {
  id: string;
  /** First working day, "YYYY-MM-DD", Aruba local date. */
  startDate: string;
  /** Last working day (inclusive); equal to startDate for a single day. */
  endDate: string;
  /** Daily start and end time, "HH:MM" Aruba time -- both set or both null. */
  startTime: string | null;
  endTime: string | null;
};

export type AvailabilityDocument = {
  entries: AvailabilityEntry[];
  /** ISO timestamp of the last save; used to detect conflicting edits. */
  updatedAt: string | null;
};

export const EMPTY_DOCUMENT: AvailabilityDocument = { entries: [], updatedAt: null };

/** Longest single range, to catch a mistyped year ("2026-10-01" to "2027-10-01"). */
export const MAX_RANGE_DAYS = 92;
/** How far ahead dates may be entered. */
export const MAX_DAYS_AHEAD = 2 * 366;
export const MAX_ENTRIES = 200;

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;
const DAY_MS = 86_400_000;

/** Days since the epoch for a valid "YYYY-MM-DD", or null. */
export function dayNumber(date: string): number | null {
  const m = DATE_RE.exec(date);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const ms = Date.UTC(y, mo - 1, d);
  const check = new Date(ms);
  // Rejects impossible dates such as 2026-02-30, which Date.UTC would roll over.
  if (check.getUTCFullYear() !== y || check.getUTCMonth() !== mo - 1 || check.getUTCDate() !== d) return null;
  return Math.round(ms / DAY_MS);
}

/** Today's calendar date in Aruba, "YYYY-MM-DD". */
export function todayInAruba(now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ARUBA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function minutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Entries still to come (ending today or later, Aruba time), soonest first. */
export function upcomingEntries(entries: AvailabilityEntry[], today: string): AvailabilityEntry[] {
  return sortEntries(entries.filter((e) => e.endDate >= today));
}

export function pastEntries(entries: AvailabilityEntry[], today: string): AvailabilityEntry[] {
  return sortEntries(entries.filter((e) => e.endDate < today)).reverse();
}

export function sortEntries(entries: AvailabilityEntry[]): AvailabilityEntry[] {
  return [...entries].sort((a, b) => a.startDate.localeCompare(b.startDate) || a.endDate.localeCompare(b.endDate));
}

export type EntryInput = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
};

export type ValidationResult =
  | { ok: true; value: Omit<AvailabilityEntry, "id"> }
  | { ok: false; error: string };

/**
 * Validates one entry as typed into the editor. `others` are the existing
 * entries (excluding the one being edited), checked for overlaps.
 */
export function validateEntry(input: EntryInput, others: AvailabilityEntry[], today: string): ValidationResult {
  const startDate = input.startDate.trim();
  const endDate = (input.endDate.trim() || startDate).trim();
  const startTime = input.startTime.trim();
  const endTime = input.endTime.trim();

  const start = dayNumber(startDate);
  const end = dayNumber(endDate);
  const todayN = dayNumber(today)!;
  if (start === null) return { ok: false, error: "Enter a valid first date." };
  if (end === null) return { ok: false, error: "Enter a valid last date." };
  if (end < start) return { ok: false, error: "The last date must be on or after the first date." };
  if (end - start + 1 > MAX_RANGE_DAYS) {
    return { ok: false, error: `A single range can cover at most ${MAX_RANGE_DAYS} days. Please check the dates.` };
  }
  if (end < todayN) return { ok: false, error: "These dates are already in the past." };
  if (start > todayN + MAX_DAYS_AHEAD) return { ok: false, error: "Dates can be entered up to two years ahead." };

  if (Boolean(startTime) !== Boolean(endTime)) {
    return { ok: false, error: "Enter both a start and an end time, or leave both empty." };
  }
  if (startTime && (!TIME_RE.test(startTime) || !TIME_RE.test(endTime))) {
    return { ok: false, error: "Enter times as HH:MM, for example 09:00." };
  }
  if (startTime && minutes(endTime) <= minutes(startTime)) {
    return { ok: false, error: "The end time must be after the start time." };
  }

  const clash = others.find((o) => o.startDate <= endDate && startDate <= o.endDate);
  if (clash) {
    return { ok: false, error: `These dates overlap with ${formatDateRange(clash.startDate, clash.endDate)}. Edit that entry instead.` };
  }
  if (others.length + 1 > MAX_ENTRIES) return { ok: false, error: "Too many entries. Remove some past dates first." };

  return {
    ok: true,
    value: { startDate, endDate, startTime: startTime || null, endTime: endTime || null },
  };
}

/** Accepts only well-formed entries when reading stored data; anything else is dropped. */
export function parseDocument(raw: unknown): AvailabilityDocument {
  if (!raw || typeof raw !== "object") return EMPTY_DOCUMENT;
  const doc = raw as { entries?: unknown; updatedAt?: unknown };
  const entries = Array.isArray(doc.entries) ? doc.entries.filter(isEntry) : [];
  return { entries: sortEntries(entries), updatedAt: typeof doc.updatedAt === "string" ? doc.updatedAt : null };
}

function isEntry(e: unknown): e is AvailabilityEntry {
  if (!e || typeof e !== "object") return false;
  const x = e as Record<string, unknown>;
  const timeOk = (t: unknown) => t === null || (typeof t === "string" && TIME_RE.test(t));
  return (
    typeof x.id === "string" &&
    typeof x.startDate === "string" &&
    typeof x.endDate === "string" &&
    dayNumber(x.startDate) !== null &&
    dayNumber(x.endDate) !== null &&
    x.endDate >= x.startDate &&
    timeOk(x.startTime) &&
    timeOk(x.endTime) &&
    (x.startTime === null) === (x.endTime === null)
  );
}

// --- Display -----------------------------------------------------------------

function utcDate(date: string): Date {
  return new Date(dayNumber(date)! * DAY_MS);
}

// The date is built at UTC midnight, so it is formatted in UTC: formatting in
// any other zone could show the previous day. Parts are assembled by hand so
// the output ("Mon 12 Oct 2026") does not depend on a runtime's punctuation.
const PARTS = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function parts(date: Date) {
  const p = Object.fromEntries(PARTS.formatToParts(date).map((x) => [x.type, x.value]));
  return { weekday: p.weekday, day: p.day, month: p.month, year: p.year };
}

const WEEKDAY_DAY_MONTH_YEAR = { format: (d: Date) => { const p = parts(d); return `${p.weekday} ${p.day} ${p.month} ${p.year}`; } };
const WEEKDAY_DAY_MONTH = { format: (d: Date) => { const p = parts(d); return `${p.weekday} ${p.day} ${p.month}`; } };
const WEEKDAY_DAY = { format: (d: Date) => { const p = parts(d); return `${p.weekday} ${p.day}`; } };

/**
 * "Mon 12 Oct 2026", "Mon 12 – Fri 16 Oct 2026",
 * "Mon 28 Sept – Fri 2 Oct 2026", "Mon 28 Dec 2026 – Fri 1 Jan 2027".
 */
export function formatDateRange(startDate: string, endDate: string): string {
  const start = utcDate(startDate);
  const end = utcDate(endDate);
  if (startDate === endDate) return WEEKDAY_DAY_MONTH_YEAR.format(start);
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();
  const first = sameMonth ? WEEKDAY_DAY.format(start) : sameYear ? WEEKDAY_DAY_MONTH.format(start) : WEEKDAY_DAY_MONTH_YEAR.format(start);
  return `${first} – ${WEEKDAY_DAY_MONTH_YEAR.format(end)}`;
}

/** "09:00 – 17:00", or null when no hours were entered. */
export function formatTimeRange(entry: Pick<AvailabilityEntry, "startTime" | "endTime">): string | null {
  return entry.startTime && entry.endTime ? `${entry.startTime} – ${entry.endTime}` : null;
}

/** Machine-readable start for <time dateTime>, with Aruba's fixed UTC-4 offset. */
export function isoStart(entry: AvailabilityEntry): string {
  return entry.startTime ? `${entry.startDate}T${entry.startTime}-04:00` : entry.startDate;
}

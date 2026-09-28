"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { CalendarDays, Clock, Pencil, Trash2 } from "lucide-react";
import { formatDateRange, formatTimeRange, type AvailabilityEntry } from "@/lib/availability/dates";
import { deleteEntry, saveEntry, signIn, type ActionState } from "./actions";

const INPUT =
  "mt-1.5 block w-full rounded-xl border border-ink-200 bg-white px-3.5 py-3 text-base text-ink-900 shadow-sm outline-none transition focus:border-gold-600 focus:ring-2 focus:ring-gold-300";
const LABEL = "text-sm font-medium text-ink-700";
const PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 shadow-[0_8px_24px_-10px_var(--color-gold-600)] transition hover:bg-gold-400 disabled:cursor-wait disabled:opacity-60";
const SECONDARY =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 transition hover:border-gold-500 hover:text-gold-800";

function Feedback({ state }: { state: ActionState }) {
  if (state.error) {
    return (
      <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
        {state.error}
      </p>
    );
  }
  if (state.message) {
    return (
      <p role="status" className="mt-4 rounded-xl bg-gold-50 px-4 py-3 text-sm text-gold-900">
        {state.message}
      </p>
    );
  }
  return null;
}

function SubmitButton({ children, pendingLabel, className = PRIMARY }: { children: React.ReactNode; pendingLabel: string; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}

export function SignInForm() {
  const [state, action] = useActionState(signIn, {});
  return (
    <form action={action} className="mt-6">
      <label htmlFor="password" className={LABEL}>
        Password
      </label>
      <input id="password" name="password" type="password" autoComplete="current-password" required className={INPUT} />
      <Feedback state={state} />
      <div className="mt-6">
        <SubmitButton pendingLabel="Signing in…">Sign in</SubmitButton>
      </div>
    </form>
  );
}

/** Add form, or -- given an `entry` -- the inline edit form for it. */
export function EntryForm({
  version,
  today,
  entry,
  onDone,
}: {
  version: string;
  today: string;
  entry?: AvailabilityEntry;
  onDone?: () => void;
}) {
  const [state, action] = useActionState(saveEntry, {});
  const prefix = entry ? `edit-${entry.id}` : "add";

  useEffect(() => {
    if (state.message && onDone) onDone();
  }, [state, onDone]);

  return (
    <form action={action} className="mt-5">
      <input type="hidden" name="version" value={version} />
      {entry && <input type="hidden" name="id" value={entry.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${prefix}-start`} className={LABEL}>
            First date
          </label>
          <input id={`${prefix}-start`} name="startDate" type="date" required min={entry ? undefined : today} defaultValue={entry?.startDate} className={INPUT} />
        </div>
        <div>
          <label htmlFor={`${prefix}-end`} className={LABEL}>
            Last date <span className="font-normal text-ink-400">(leave empty for one day)</span>
          </label>
          <input id={`${prefix}-end`} name="endDate" type="date" min={entry ? undefined : today} defaultValue={entry && entry.endDate !== entry.startDate ? entry.endDate : undefined} className={INPUT} />
        </div>
        <div>
          <label htmlFor={`${prefix}-from`} className={LABEL}>
            From <span className="font-normal text-ink-400">(Aruba time, optional)</span>
          </label>
          <input id={`${prefix}-from`} name="startTime" type="time" step={900} defaultValue={entry?.startTime ?? undefined} className={INPUT} />
        </div>
        <div>
          <label htmlFor={`${prefix}-to`} className={LABEL}>
            Until <span className="font-normal text-ink-400">(Aruba time, optional)</span>
          </label>
          <input id={`${prefix}-to`} name="endTime" type="time" step={900} defaultValue={entry?.endTime ?? undefined} className={INPUT} />
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-500">
        Leave the times empty if the hours are not fixed yet — the website then shows the date only, never made-up hours.
      </p>
      <Feedback state={state} />
      <div className="mt-5 flex flex-wrap gap-3">
        <SubmitButton pendingLabel="Saving…">{entry ? "Save changes" : "Add dates"}</SubmitButton>
        {onDone && (
          <button type="button" onClick={onDone} className={SECONDARY}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export function EntryRow({ entry, version, today }: { entry: AvailabilityEntry; version: string; today: string }) {
  const [editing, setEditing] = useState(false);
  const [deleteState, deleteAction] = useActionState(deleteEntry, {});
  const hours = formatTimeRange(entry);
  const label = formatDateRange(entry.startDate, entry.endDate);

  return (
    <li className="rounded-2xl border border-surface-border bg-white p-5 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.3)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center gap-2 font-medium text-ink-900">
            <CalendarDays className="h-4 w-4 text-gold-600" aria-hidden="true" />
            {label}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-ink-500">
            <Clock className="h-4 w-4 text-gold-600" aria-hidden="true" />
            {hours ? `${hours} Aruba time` : "Hours not set — shown as date only"}
          </span>
        </div>
        {!editing && (
          <div className="flex gap-2">
            <button type="button" onClick={() => setEditing(true)} className={SECONDARY} aria-label={`Edit ${label}`}>
              <Pencil className="h-4 w-4" aria-hidden="true" />
              Edit
            </button>
            <form
              action={deleteAction}
              onSubmit={(e) => {
                if (!window.confirm(`Remove ${label} from the website?`)) e.preventDefault();
              }}
            >
              <input type="hidden" name="version" value={version} />
              <input type="hidden" name="id" value={entry.id} />
              <SubmitButton pendingLabel="Removing…" className={`${SECONDARY} hover:!border-red-400 hover:!text-red-700`}>
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Remove
                <span className="sr-only"> {label}</span>
              </SubmitButton>
            </form>
          </div>
        )}
      </div>
      {deleteState.error && <Feedback state={deleteState} />}
      {editing && <EntryForm entry={entry} version={version} today={today} onDone={() => setEditing(false)} />}
    </li>
  );
}

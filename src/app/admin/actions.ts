"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAttempts,
  endSession,
  isAdminConfigured,
  isSignedIn,
  passwordMatches,
  registerAttempt,
  startSession,
} from "@/lib/admin/auth";
import { readAvailability, StoreNotConfiguredError, writeAvailability } from "@/lib/availability/store";
import { sortEntries, todayInAruba, validateEntry } from "@/lib/availability/dates";

/**
 * Server actions for the private dates editor. Every action checks the
 * session itself -- the page hiding a button is not protection. Next.js
 * also rejects server-action requests from other origins (CSRF).
 */

export type ActionState = { error?: string; message?: string };

export async function signIn(_prev: ActionState, form: FormData): Promise<ActionState> {
  if (!isAdminConfigured()) return { error: "Sign-in is not set up on this deployment yet." };

  // The attempt is counted before the password is checked (see registerAttempt).
  const attempt = await registerAttempt();
  if (attempt === "locked") return { error: "Too many incorrect attempts. Please wait 15 minutes and try again." };
  if (attempt === "unavailable") return { error: "Sign-in is temporarily unavailable. Please try again in a few minutes." };

  const password = String(form.get("password") ?? "");
  if (!passwordMatches(password)) {
    // A short, fixed delay makes guessing slower without affecting real use.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "That password is not correct." };
  }

  await clearAttempts();
  await startSession();
  redirect("/admin");
}

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

/** Pages that show the dates; refreshed immediately after every change. */
function refreshPublicPages() {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/contact", "page");
  revalidatePath("/admin");
}

async function loadForEdit(form: FormData) {
  if (!(await isSignedIn())) return { error: "Your session has ended. Please sign in again." } as const;
  const doc = await readAvailability();
  if (String(form.get("version") ?? "") !== (doc.updatedAt ?? "")) {
    return { error: "The dates were changed in another window. Reload the page and try again." } as const;
  }
  return { doc } as const;
}

async function save(entries: Parameters<typeof sortEntries>[0]): Promise<ActionState | null> {
  try {
    await writeAvailability({ entries: sortEntries(entries), updatedAt: new Date().toISOString() });
  } catch (error) {
    if (error instanceof StoreNotConfiguredError) return { error: error.message };
    console.error("[availability] save failed:", error);
    return { error: "The dates could not be saved. Please try again." };
  }
  refreshPublicPages();
  return null;
}

/** Adds a new entry, or updates the one named by the form's `id`. */
export async function saveEntry(_prev: ActionState, form: FormData): Promise<ActionState> {
  const loaded = await loadForEdit(form);
  if ("error" in loaded) return { error: loaded.error };

  const id = String(form.get("id") ?? "");
  const existing = loaded.doc.entries;
  if (id && !existing.some((e) => e.id === id)) return { error: "That entry no longer exists. Reload the page." };

  const result = validateEntry(
    {
      startDate: String(form.get("startDate") ?? ""),
      endDate: String(form.get("endDate") ?? ""),
      startTime: String(form.get("startTime") ?? ""),
      endTime: String(form.get("endTime") ?? ""),
    },
    existing.filter((e) => e.id !== id),
    todayInAruba()
  );
  if (!result.ok) return { error: result.error };

  const entry = { id: id || randomUUID(), ...result.value };
  const next = id ? existing.map((e) => (e.id === id ? entry : e)) : [...existing, entry];
  return (await save(next)) ?? { message: id ? "Changes saved." : "Dates added." };
}

export async function deleteEntry(_prev: ActionState, form: FormData): Promise<ActionState> {
  const loaded = await loadForEdit(form);
  if ("error" in loaded) return { error: loaded.error };

  const id = String(form.get("id") ?? "");
  const next = loaded.doc.entries.filter((e) => e.id !== id);
  if (next.length === loaded.doc.entries.length) return { error: "That entry no longer exists. Reload the page." };
  return (await save(next)) ?? { message: "Dates removed." };
}

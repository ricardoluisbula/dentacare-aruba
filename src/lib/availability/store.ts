import { promises as fs } from "node:fs";
import path from "node:path";
import { EMPTY_DOCUMENT, parseDocument, type AvailabilityDocument } from "./dates";

/**
 * Where the Aruba dates are kept. SERVER-ONLY: import this from server
 * components and server actions, never from a "use client" module.
 *
 * Chosen by environment, with no code change needed to switch:
 *
 * 1. Upstash Redis (the production store) -- used when its REST credentials
 *    are present: KV_REST_API_URL + KV_REST_API_TOKEN (the names Vercel's
 *    Marketplace integration injects) or UPSTASH_REDIS_REST_URL +
 *    UPSTASH_REDIS_REST_TOKEN. The whole calendar is one small JSON value.
 * 2. A local JSON file (.data/aruba-availability.json, git-ignored) -- used
 *    when running on your own machine (`npm run dev` / `next start`).
 * 3. Otherwise (a Vercel deployment with no database connected): reading
 *    returns no dates, so the site says dates will be announced, and saving
 *    is refused with an explanation. Nothing is ever invented.
 */

const KEY = "dentacare-aruba:availability:v1";
// AVAILABILITY_FILE lets the end-to-end tests use a throwaway file.
const FILE = process.env.AVAILABILITY_FILE
  ? path.resolve(process.env.AVAILABILITY_FILE)
  : path.join(process.cwd(), ".data", "aruba-availability.json");

export type StoreKind = "redis" | "file" | "none";

function redisConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

export function storeKind(): StoreKind {
  if (redisConfig()) return "redis";
  // Vercel's filesystem is read-only and not shared between instances, so a
  // file store would silently lose edits there.
  if (!process.env.VERCEL) return "file";
  return "none";
}

/** Runs one Redis command over Upstash's REST API. */
export async function redisCommand(command: (string | number)[]): Promise<unknown> {
  const config = redisConfig();
  if (!config) throw new Error("Redis is not configured.");
  const res = await fetch(config.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis request failed (${res.status}).`);
  const body = (await res.json()) as { result?: unknown; error?: string };
  if (body.error) throw new Error(`Redis error: ${body.error}`);
  return body.result;
}

export async function readAvailability(): Promise<AvailabilityDocument> {
  const kind = storeKind();
  try {
    if (kind === "redis") {
      const raw = await redisCommand(["GET", KEY]);
      return typeof raw === "string" ? parseDocument(JSON.parse(raw)) : EMPTY_DOCUMENT;
    }
    if (kind === "file") {
      return parseDocument(JSON.parse(await fs.readFile(FILE, "utf8")));
    }
  } catch (error) {
    // A missing file is the normal empty state. Any other failure is logged
    // and shown as "no dates yet" -- the public site must never break, and
    // must never show stale or made-up dates in place of real ones.
    if ((error as NodeJS.ErrnoException)?.code !== "ENOENT") {
      console.error("[availability] read failed:", error);
    }
  }
  return EMPTY_DOCUMENT;
}

export class StoreNotConfiguredError extends Error {}

export async function writeAvailability(doc: AvailabilityDocument): Promise<void> {
  const kind = storeKind();
  const body = JSON.stringify(doc);
  if (kind === "redis") {
    await redisCommand(["SET", KEY, body]);
    return;
  }
  if (kind === "file") {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    // Write-then-rename, so a crash mid-write never leaves a half file.
    const tmp = `${FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, body, "utf8");
    await fs.rename(tmp, FILE);
    return;
  }
  throw new StoreNotConfiguredError(
    "Saving is not available yet: no database is connected to this deployment. See docs/ARUBA-DATES.md."
  );
}

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redisCommand, storeKind } from "@/lib/availability/store";

/**
 * Sign-in for the private dates editor (/admin). SERVER-ONLY.
 *
 * There is no password or secret in the source code. Both come from
 * environment variables set in the hosting dashboard (or .env.local on your
 * own machine):
 *
 * - ADMIN_PASSWORD        -- the shared password the practice team signs in
 *                            with (at least 12 characters).
 * - ADMIN_SESSION_SECRET  -- a long random value (at least 32 characters) used
 *                            to sign the session cookie. Changing it signs
 *                            everyone out immediately.
 *
 * On a hosted (Vercel) deployment a third setting is required: the Upstash
 * Redis database (KV_REST_API_URL + KV_REST_API_TOKEN). The failed sign-in
 * limit is kept there so it holds across every server instance; process
 * memory is not shared between serverless instances and would not enforce it.
 *
 * If any required setting is missing, sign-in is disabled entirely -- there
 * is no default password and no weaker fallback.
 */

export const SESSION_COOKIE = "dentacare_admin";
export const SESSION_HOURS = 8;
export const MAX_ATTEMPTS = 5;
export const LOCKOUT_SECONDS = 15 * 60;

function config(): { password: string; secret: string } | null {
  const password = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  return password.length >= 12 && secret.length >= 32 ? { password, secret } : null;
}

/** Hosted deployments must keep the attempt limit in shared storage. */
const isHosted = () => Boolean(process.env.VERCEL);

/** What is still missing before sign-in can be enabled, or null when ready. */
export function adminSetupIssue(): "credentials" | "shared-storage" | null {
  if (!config()) return "credentials";
  if (isHosted() && storeKind() !== "redis") return "shared-storage";
  return null;
}

export function isAdminConfigured(): boolean {
  return adminSetupIssue() === null;
}

const sha256 = (value: string) => createHash("sha256").update(value, "utf8").digest();

/** Constant-time comparison, so response timing reveals nothing about the password. */
export function passwordMatches(candidate: string): boolean {
  const c = config();
  if (!c) return false;
  return timingSafeEqual(sha256(candidate), sha256(c.password));
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** "<expiry ms>.<random nonce>.<HMAC>" */
export function createSessionToken(now = Date.now()): string {
  const c = config();
  if (!c) throw new Error("Admin sign-in is not configured.");
  const payload = `${now + SESSION_HOURS * 3_600_000}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${sign(payload, c.secret)}`;
}

export function verifySessionToken(token: string | undefined, now = Date.now()): boolean {
  const c = config();
  if (!c || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expected = Buffer.from(sign(payload, c.secret));
  const given = Buffer.from(parts[2]);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  return Number(parts[0]) > now;
}

export async function isSignedIn(): Promise<boolean> {
  // A removed setting also ends existing sessions, not just new sign-ins.
  if (!isAdminConfigured()) return false;
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}

export async function startSession(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, "", { path: "/admin", maxAge: 0 });
}

// --- Sign-in attempt limit -----------------------------------------------------
// At most MAX_ATTEMPTS sign-in attempts per visitor IP per 15 minutes; a
// correct password clears the count, so in practice this limits wrong
// passwords. Every attempt reserves its slot BEFORE the password is checked,
// in one atomic step, so simultaneous requests cannot slip past the limit.
//
// Storage:
// - Upstash Redis whenever it is configured -- one counter shared by every
//   server instance. Hosted deployments cannot enable sign-in without it
//   (see adminSetupIssue).
// - Process memory only when running on your own machine (`npm run dev` /
//   `next start`), which is a single process.
// If Redis cannot be reached, sign-in is refused (fail closed) rather than
// continuing without the limit.

/**
 * Atomically counts one attempt and makes sure the counter expires. Setting
 * the expiry in the same script means a counter can never be left without
 * one (which would lock an address out permanently).
 */
const COUNT_ATTEMPT_SCRIPT =
  "local c = redis.call('INCR', KEYS[1]) " +
  "if redis.call('TTL', KEYS[1]) < 0 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end " +
  "return c";

const memoryAttempts = new Map<string, { count: number; resetAt: number }>();

async function clientKey(): Promise<string> {
  const h = await headers();
  // On Vercel the first x-forwarded-for entry is the client address as seen
  // by Vercel's edge (it overwrites any value the client sent).
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  // Hashed, so no raw IP address is ever stored.
  return `dentacare-aruba:login-attempts:${createHash("sha256").update(ip).digest("hex").slice(0, 32)}`;
}

export type AttemptResult = "allowed" | "locked" | "unavailable";

/** Reserves one sign-in attempt for this visitor. Call before checking the password. */
export async function registerAttempt(): Promise<AttemptResult> {
  const key = await clientKey();

  if (storeKind() === "redis") {
    try {
      const count = Number(await redisCommand(["EVAL", COUNT_ATTEMPT_SCRIPT, 1, key, LOCKOUT_SECONDS]));
      return count > MAX_ATTEMPTS ? "locked" : "allowed";
    } catch (error) {
      console.error("[admin] attempt limit unavailable:", error);
      return "unavailable";
    }
  }

  // Never reached on a hosted deployment: sign-in is disabled there without Redis.
  if (isHosted()) return "unavailable";

  const now = Date.now();
  const entry = memoryAttempts.get(key);
  if (!entry || entry.resetAt <= now) {
    memoryAttempts.set(key, { count: 1, resetAt: now + LOCKOUT_SECONDS * 1000 });
    return "allowed";
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS ? "locked" : "allowed";
}

/** Clears this visitor's count after a correct password. */
export async function clearAttempts(): Promise<void> {
  const key = await clientKey();
  if (storeKind() === "redis") {
    try {
      await redisCommand(["DEL", key]);
    } catch (error) {
      // The counter still expires on its own; signing in is not blocked by this.
      console.error("[admin] could not clear attempt count:", error);
    }
    return;
  }
  memoryAttempts.delete(key);
}

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// auth.ts reads cookies/headers from next/headers; every request here comes
// from the same (documentation-range) client address.
vi.mock("next/headers", () => ({
  cookies: vi.fn(),
  headers: vi.fn(async () => new Headers({ "x-forwarded-for": "203.0.113.7" })),
}));

type Auth = typeof import("./auth");

/** A fresh copy of the module: what a separate serverless instance would have (its own memory). */
async function freshInstance(): Promise<Auth> {
  vi.resetModules();
  return import("./auth");
}

/**
 * A stand-in for Upstash's REST API, shared by every "instance". Each command
 * runs to completion before the next, as in Redis, so EVAL is atomic.
 */
function fakeRedis() {
  const counters = new Map<string, number>();
  const calls: unknown[][] = [];
  const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
    const command = JSON.parse(String(init.body)) as (string | number)[];
    calls.push(command);
    let result: unknown = null;
    if (command[0] === "EVAL") {
      const key = String(command[3]);
      result = (counters.get(key) ?? 0) + 1;
      counters.set(key, result as number);
    } else if (command[0] === "DEL") {
      counters.delete(String(command[1]));
      result = 1;
    }
    return new Response(JSON.stringify({ result }), { status: 200 });
  });
  return { fetchMock, calls };
}

beforeEach(() => {
  vi.stubEnv("ADMIN_PASSWORD", "correct horse battery");
  vi.stubEnv("ADMIN_SESSION_SECRET", "x".repeat(40));
  vi.stubEnv("VERCEL", "");
  vi.stubEnv("KV_REST_API_URL", "");
  vi.stubEnv("KV_REST_API_TOKEN", "");
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("admin sign-in configuration", () => {
  it("is disabled without both credentials -- there is no default password", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "");
    const auth = await freshInstance();
    expect(auth.adminSetupIssue()).toBe("credentials");
    expect(auth.isAdminConfigured()).toBe(false);
    expect(auth.passwordMatches("")).toBe(false);
  });

  it("is disabled with a short password or secret", async () => {
    vi.stubEnv("ADMIN_PASSWORD", "short");
    expect((await freshInstance()).isAdminConfigured()).toBe(false);
    vi.stubEnv("ADMIN_PASSWORD", "correct horse battery");
    vi.stubEnv("ADMIN_SESSION_SECRET", "too-short");
    expect((await freshInstance()).isAdminConfigured()).toBe(false);
  });

  it("stays disabled on a hosted deployment until the shared Redis store is connected", async () => {
    vi.stubEnv("VERCEL", "1");
    let auth = await freshInstance();
    expect(auth.adminSetupIssue()).toBe("shared-storage");
    expect(auth.isAdminConfigured()).toBe(false);

    vi.stubEnv("KV_REST_API_URL", "https://example.upstash.io");
    vi.stubEnv("KV_REST_API_TOKEN", "token");
    auth = await freshInstance();
    expect(auth.adminSetupIssue()).toBeNull();
  });

  it("is enabled locally (single process) with the credentials alone", async () => {
    expect((await freshInstance()).adminSetupIssue()).toBeNull();
  });

  it("checks the password", async () => {
    const auth = await freshInstance();
    expect(auth.passwordMatches("correct horse battery")).toBe(true);
    expect(auth.passwordMatches("correct horse batter")).toBe(false);
  });

  it("accepts its own session token and rejects tampered or expired ones", async () => {
    const auth = await freshInstance();
    const now = Date.UTC(2026, 8, 28);
    const token = auth.createSessionToken(now);
    expect(auth.verifySessionToken(token, now + 1000)).toBe(true);
    expect(auth.verifySessionToken(token, now + 9 * 3_600_000)).toBe(false);

    const [expiry, nonce, sig] = token.split(".");
    expect(auth.verifySessionToken(`${Number(expiry) + 999_999}.${nonce}.${sig}`, now)).toBe(false);
    expect(auth.verifySessionToken(undefined, now)).toBe(false);
    expect(auth.verifySessionToken("garbage", now)).toBe(false);
  });

  it("invalidates every session when the secret changes", async () => {
    const auth = await freshInstance();
    const token = auth.createSessionToken();
    vi.stubEnv("ADMIN_SESSION_SECRET", "y".repeat(40));
    expect(auth.verifySessionToken(token)).toBe(false);
  });
});

describe("sign-in attempt limit with Upstash Redis", () => {
  beforeEach(() => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("KV_REST_API_URL", "https://example.upstash.io");
    vi.stubEnv("KV_REST_API_TOKEN", "token");
  });

  it("is shared across server instances, not kept in process memory", async () => {
    const redis = fakeRedis();
    vi.stubGlobal("fetch", redis.fetchMock);

    // Attempts spread over three separate instances, as on Vercel.
    const results: string[] = [];
    for (let i = 0; i < 6; i++) {
      const instance = await freshInstance();
      results.push(await instance.registerAttempt());
    }
    expect(results).toEqual(["allowed", "allowed", "allowed", "allowed", "allowed", "locked"]);
  });

  it("counts atomically with an expiry, and never stores the raw IP", async () => {
    const redis = fakeRedis();
    vi.stubGlobal("fetch", redis.fetchMock);
    const auth = await freshInstance();
    await auth.registerAttempt();

    const [command] = redis.calls;
    expect(command[0]).toBe("EVAL");
    expect(String(command[1])).toMatch(/INCR[\s\S]*EXPIRE/);
    expect(command[4]).toBe(auth.LOCKOUT_SECONDS);
    expect(JSON.stringify(redis.calls)).not.toContain("203.0.113.7");
  });

  it("lets through at most five of many simultaneous attempts", async () => {
    vi.stubGlobal("fetch", fakeRedis().fetchMock);
    const auth = await freshInstance();
    const results = await Promise.all(Array.from({ length: 12 }, () => auth.registerAttempt()));
    expect(results.filter((r) => r === "allowed")).toHaveLength(auth.MAX_ATTEMPTS);
  });

  it("clears the count after a correct password", async () => {
    vi.stubGlobal("fetch", fakeRedis().fetchMock);
    const auth = await freshInstance();
    for (let i = 0; i < 4; i++) await auth.registerAttempt();
    await auth.clearAttempts();
    for (let i = 0; i < 5; i++) expect(await auth.registerAttempt()).toBe("allowed");
  });

  it("refuses sign-in when Redis cannot be reached (fails closed)", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("down", { status: 503 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const auth = await freshInstance();
    expect(await auth.registerAttempt()).toBe("unavailable");
  });
});

describe("sign-in attempt limit on your own machine", () => {
  it("uses process memory (single process) and locks after five attempts", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const auth = await freshInstance();
    const results = [];
    for (let i = 0; i < 6; i++) results.push(await auth.registerAttempt());
    expect(results.at(-1)).toBe("locked");
    expect(results.filter((r) => r === "allowed")).toHaveLength(5);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

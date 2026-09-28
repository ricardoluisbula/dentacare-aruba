import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ALLOWED_PARAMS,
  ANALYTICS_CONSENT_KEY,
  DEDUPE_WINDOW_MS,
  __resetAnalyticsForTests,
  buildParams,
  COOKIE_SETTINGS_EVENT,
  disableAnalytics,
  enableAnalytics,
  openCookieSettings,
  trackEvent,
} from "./analytics";

/**
 * The analytics module runs in the browser, so these tests stand up the three
 * things it reads -- `localStorage` (consent), `location` (page path) and
 * `gtag` -- and assert on exactly what would have been sent to Google.
 */

type Call = unknown[];

function setup({ consent, path = "/treatments/dental-implants" }: { consent: string | null; path?: string }) {
  const store = new Map<string, string>();
  if (consent !== null) store.set(ANALYTICS_CONSENT_KEY, consent);
  const win: Record<string, unknown> = {
    localStorage: { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => store.set(k, v) },
    location: { pathname: path },
  };
  vi.stubGlobal("window", win);
  return win;
}

/** Installs a gtag that records its calls, as GA would receive them. */
function withGtag(win: Record<string, unknown>) {
  const calls: Call[] = [];
  win.gtag = (...args: unknown[]) => calls.push(args);
  return calls;
}

const events = (calls: Call[]) => calls.filter((c) => c[0] === "event");

beforeEach(() => {
  __resetAnalyticsForTests();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-06-10T10:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("consent", () => {
  it("sends nothing without consent", () => {
    const calls = withGtag(setup({ consent: null }));
    trackEvent("click_phone", { placement: "header", destination_type: "landline" });
    expect(calls).toEqual([]);
  });

  it("sends nothing after the visitor declined", () => {
    const calls = withGtag(setup({ consent: "denied" }));
    trackEvent("click_whatsapp", { placement: "floating_button", destination_type: "whatsapp" });
    expect(calls).toEqual([]);
  });

  it("does not queue pre-consent events to send later", () => {
    const win = setup({ consent: null });
    trackEvent("view_treatment", { treatment_slug: "dental-implants" });
    (win.localStorage as { setItem: (k: string, v: string) => void }).setItem(ANALYTICS_CONSENT_KEY, "granted");
    enableAnalytics("G-TEST");
    const sent = (win.dataLayer as IArguments[]).map((a) => Array.from(a));
    expect(sent.filter((c) => c[0] === "event")).toEqual([]);
  });

  it("sends once consent is granted", () => {
    const calls = withGtag(setup({ consent: "granted" }));
    trackEvent("click_phone", { placement: "header", destination_type: "landline" });
    expect(events(calls)).toHaveLength(1);
  });

  it("treats blocked storage as no consent", () => {
    const win = setup({ consent: "granted" });
    win.localStorage = {
      getItem: () => {
        throw new Error("SecurityError");
      },
    };
    const calls = withGtag(win);
    expect(() => trackEvent("click_phone", { placement: "header" })).not.toThrow();
    expect(calls).toEqual([]);
  });
});

describe("parameters", () => {
  it("attaches locale and page_path from the URL", () => {
    const calls = withGtag(setup({ consent: "granted", path: "/treatments/dental-implants" }));
    trackEvent("view_treatment", { treatment_slug: "dental-implants", placement: "treatment_page" });
    expect(events(calls)[0]).toEqual([
      "event",
      "view_treatment",
      { locale: "en", page_path: "/treatments/dental-implants", placement: "treatment_page", treatment_slug: "dental-implants" },
    ]);
  });

  it("fills in the destination for each outbound click", () => {
    const calls = withGtag(setup({ consent: "granted", path: "/contact" }));
    trackEvent("click_phone", { placement: "contact_card" });
    trackEvent("click_whatsapp", { placement: "contact_card" });
    trackEvent("contact_form_submit_success", { placement: "contact_form" });
    expect(events(calls).map((c) => (c[2] as Record<string, string>).destination_type)).toEqual([
      "landline",
      "whatsapp",
      "contact_form",
    ]);
  });

  it("reports default-language pages with their unprefixed path", () => {
    expect(buildParams({}, "/contact")).toEqual({ locale: "en", page_path: "/contact" });
    expect(buildParams({}, "/en/contact")).toEqual({ locale: "en", page_path: "/contact" });
  });

  it("lets select_language report the language chosen", () => {
    expect(buildParams({ locale: "it", placement: "header" }, "/en/about")).toEqual({
      locale: "it",
      page_path: "/about",
      placement: "header",
    });
  });

  it("drops any parameter outside the allowed set", () => {
    const params = buildParams(
      { placement: "contact_form", name: "Jan", email: "jan@example.com", message: "kies" } as never,
      "/contact"
    )!;
    expect(Object.keys(params).every((k) => (ALLOWED_PARAMS as readonly string[]).includes(k))).toBe(true);
    expect(JSON.stringify(params)).not.toMatch(/Jan|example|kies/);
  });

  it("refuses the whole event if a value looks like personal data", () => {
    const calls = withGtag(setup({ consent: "granted" }));
    for (const bad of ["jan@example.com", "+31 6 12345678", "Mijn tand is afgebroken", "A".repeat(80)]) {
      trackEvent("click_phone", { placement: bad as never });
      trackEvent("view_treatment", { treatment_slug: bad });
    }
    expect(calls).toEqual([]);
  });

  it("never sends the query string or hash", () => {
    expect(buildParams({}, "/contact")).toEqual({ locale: "en", page_path: "/contact" });
    // The module reads `location.pathname` only; a path containing one is refused outright.
    expect(buildParams({}, "/contact?email=jan@example.com")).toBeNull();
  });
});

describe("duplicates", () => {
  it("sends an identical event once within the dedupe window", () => {
    const calls = withGtag(setup({ consent: "granted" }));
    trackEvent("click_phone", { placement: "header", destination_type: "landline" });
    trackEvent("click_phone", { placement: "header", destination_type: "landline" });
    expect(events(calls)).toHaveLength(1);
  });

  it("sends it again once the window has passed", () => {
    const calls = withGtag(setup({ consent: "granted" }));
    trackEvent("click_phone", { placement: "header", destination_type: "landline" });
    vi.advanceTimersByTime(DEDUPE_WINDOW_MS + 1);
    trackEvent("click_phone", { placement: "header", destination_type: "landline" });
    expect(events(calls)).toHaveLength(2);
  });

  it("counts different placements separately", () => {
    const calls = withGtag(setup({ consent: "granted" }));
    trackEvent("click_phone", { placement: "header", destination_type: "landline" });
    trackEvent("click_phone", { placement: "footer", destination_type: "landline" });
    expect(events(calls)).toHaveLength(2);
  });
});

describe("start-up", () => {
  it("holds a consented event until GA is initialised, then sends it after config", () => {
    const win = setup({ consent: "granted" });
    trackEvent("view_treatment", { treatment_slug: "dental-implants", placement: "treatment_page" });
    expect(win.dataLayer).toBeUndefined();

    enableAnalytics("G-TEST");
    const sent = (win.dataLayer as IArguments[]).map((a) => Array.from(a));
    expect(sent.map((c) => c[0])).toEqual(["js", "config", "event"]);
    expect(sent[1]).toEqual(["config", "G-TEST", { anonymize_ip: true }]);
    expect(sent[2][1]).toBe("view_treatment");
  });

  it("initialises only once", () => {
    const win = setup({ consent: "granted" });
    enableAnalytics("G-TEST");
    enableAnalytics("G-TEST");
    const configs = (win.dataLayer as IArguments[]).filter((a) => a[0] === "config");
    expect(configs).toHaveLength(1);
  });
});

describe("withdrawing consent", () => {
  /** A cookie jar that honours expiry and domain the way the browser does, for GA's cookies. */
  function cookieJar(initial: string[]) {
    const jar = new Map(initial.map((c) => [c.split("=")[0], c]));
    const writes: string[] = [];
    vi.stubGlobal("document", {
      get cookie() {
        return [...jar.values()].join("; ");
      },
      set cookie(value: string) {
        writes.push(value);
        const name = value.split("=")[0];
        if (/expires=Thu, 01 Jan 1970/.test(value)) jar.delete(name);
      },
    });
    return { jar, writes };
  }

  it("stops trackEvent as soon as the stored choice is denied", () => {
    const win = setup({ consent: "granted" });
    const calls = withGtag(win);
    trackEvent("click_phone", { placement: "footer" });
    (win.localStorage as { setItem: (k: string, v: string) => void }).setItem(ANALYTICS_CONSENT_KEY, "denied");
    vi.advanceTimersByTime(DEDUPE_WINDOW_MS + 1);
    trackEvent("click_phone", { placement: "footer" });
    expect(events(calls)).toHaveLength(1);
  });

  it("sets Google's opt-out flag so gtag.js sends nothing further, including page views", () => {
    const win = setup({ consent: "denied" });
    cookieJar([]);
    (win.location as Record<string, string>).hostname = "www.example.com";
    disableAnalytics("G-TEST");
    expect(win["ga-disable-G-TEST"]).toBe(true);
  });

  it("deletes the GA cookies on the host and on the parent domain, and nothing else", () => {
    const win = setup({ consent: "denied" });
    (win.location as Record<string, string>).hostname = "www.example.com";
    const { jar, writes } = cookieJar(["_ga=GA1.1.123", "_ga_ABC123=GS1.1", "_gid=GA1.1.9", "dentacare-locale=en"]);
    disableAnalytics("G-TEST");
    expect([...jar.keys()]).toEqual(["dentacare-locale"]);
    expect(writes.some((w) => w.includes("domain=.example.com"))).toBe(true);
    expect(writes.every((w) => !w.startsWith("dentacare-locale"))).toBe(true);
  });

  it("drops events still waiting for GA to initialise", () => {
    const win = setup({ consent: "granted" });
    cookieJar([]);
    (win.location as Record<string, string>).hostname = "localhost";
    trackEvent("view_treatment", { treatment_slug: "dental-implants" });
    (win.localStorage as { setItem: (k: string, v: string) => void }).setItem(ANALYTICS_CONSENT_KEY, "denied");
    disableAnalytics("G-TEST");
    (win.localStorage as { setItem: (k: string, v: string) => void }).setItem(ANALYTICS_CONSENT_KEY, "granted");
    enableAnalytics("G-TEST");
    const sent = (win.dataLayer as IArguments[]).map((a) => Array.from(a));
    expect(sent.filter((c) => c[0] === "event")).toEqual([]);
  });

  it("lifts the opt-out flag again when the visitor re-accepts", () => {
    const win = setup({ consent: "granted" });
    cookieJar([]);
    (win.location as Record<string, string>).hostname = "localhost";
    enableAnalytics("G-TEST");
    disableAnalytics("G-TEST");
    expect(win["ga-disable-G-TEST"]).toBe(true);
    enableAnalytics("G-TEST");
    expect(win["ga-disable-G-TEST"]).toBe(false);
    // Still a single GA initialisation.
    expect((win.dataLayer as IArguments[]).filter((a) => a[0] === "config")).toHaveLength(1);
  });

  it("reopens the consent dialog through one window event", () => {
    const win = setup({ consent: "granted" });
    const dispatched: string[] = [];
    win.dispatchEvent = (e: Event) => dispatched.push(e.type);
    openCookieSettings();
    expect(dispatched).toEqual([COOKIE_SETTINGS_EVENT]);
  });
});

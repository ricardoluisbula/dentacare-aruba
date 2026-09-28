import { stripLocale } from "@/lib/i18n/routing";

/**
 * Privacy-safe conversion tracking for Google Analytics 4.
 *
 * This is the only module that talks to `gtag`. Every call site goes through
 * `trackEvent`, which enforces three rules no caller can opt out of:
 *
 * 1. **Consent first.** Nothing is sent unless the visitor accepted the
 *    analytics banner (`ANALYTICS_CONSENT_KEY` === "granted") *and* GA has been
 *    configured. Without both, `trackEvent` is a silent no-op.
 * 2. **A closed parameter set.** Only `ALLOWED_PARAMS` survive, and each value
 *    is checked against a fixed pattern. There is no way to send a name, an
 *    email address, a phone number, message text, form contents or anything
 *    else a visitor typed -- even by mistake, because an unknown key is dropped
 *    and a value that is not a short slug is refused.
 * 3. **No duplicates.** The same event with the same parameters inside
 *    `DEDUPE_WINDOW_MS` is sent once, so a double click, or a click handler
 *    and a navigation both reporting the same action, cannot inflate counts.
 *
 * `locale` and `page_path` are attached automatically from the URL -- the
 * pathname only, never the query string or hash, which could carry anything.
 *
 * The full event table lives in docs/ANALYTICS.md.
 */

export type AnalyticsEvent =
  | "click_phone"
  | "click_whatsapp"
  | "click_email"
  | "click_maps"
  | "contact_form_submit_success"
  | "view_treatment"
  | "select_language"
  | "click_google_reviews";

/**
 * Where on the page an action happened. Combined with `page_path` this says
 * exactly which button was used, without a separate event per button.
 */
export type AnalyticsPlacement =
  | "header"
  | "mobile_menu"
  | "contact_menu"
  | "floating_button"
  | "hero"
  | "contact_card"
  | "contact_details"
  | "closing_cta"
  | "footer"
  | "emergency_section"
  | "contact_form"
  | "reviews_section"
  | "map_card"
  | "treatment_page"
  | "homepage"
  | "prevention_page"
  | "emergency_page"
  | "new_patients_page";

export type AnalyticsDestination =
  | "landline"
  | "whatsapp"
  | "email"
  | "google_maps"
  | "google_reviews"
  | "contact_form";

export type AnalyticsParams = {
  placement?: AnalyticsPlacement;
  treatment_slug?: string;
  destination_type?: AnalyticsDestination;
  /** Normally derived from the URL; set explicitly only by `select_language`, where it is the language chosen. */
  locale?: string;
};

/** The only parameter names that can ever reach Google Analytics. */
export const ALLOWED_PARAMS = ["locale", "page_path", "placement", "treatment_slug", "destination_type"] as const;

/** Every allowed value is a short lowercase slug or a site path -- never free text. */
const SAFE_VALUE = /^[a-z0-9_-]{1,64}$/;
const SAFE_PATH = /^\/[a-z0-9/_-]{0,120}$/;

export const ANALYTICS_CONSENT_KEY = "dentacare-analytics-consent";
export const DEDUPE_WINDOW_MS = 800;

/** Dispatched on window to reopen the consent dialog (see openCookieSettings). */
export const COOKIE_SETTINGS_EVENT = "dentacare:open-cookie-settings";

/** Whether this build has Google Analytics configured at all. Without it there is nothing to consent to. */
export const ANALYTICS_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [gaDisableFlag: `ga-disable-${string}`]: boolean | undefined;
  }
}

type Queued = { event: AnalyticsEvent; params: Record<string, string> };

let pending: Queued[] = [];
const lastSent = new Map<string, number>();

function hasConsent(): boolean {
  try {
    return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) === "granted";
  } catch {
    // Storage blocked (private mode, strict settings): treat as no consent.
    return false;
  }
}

/**
 * Reduces caller parameters to the allowed set and adds `locale`/`page_path`.
 * Exported for tests; returns null if any supplied value is unsafe, so a bad
 * call sends nothing rather than a partially scrubbed event.
 */
export function buildParams(params: AnalyticsParams, pathname: string): Record<string, string> | null {
  const { locale: urlLocale, path } = stripLocale(pathname || "/");
  const merged: Record<string, unknown> = { locale: urlLocale, page_path: path, ...params };
  const out: Record<string, string> = {};

  for (const key of ALLOWED_PARAMS) {
    const value = merged[key];
    if (value === undefined) continue;
    if (typeof value !== "string") return null;
    const ok = key === "page_path" ? SAFE_PATH.test(value) : SAFE_VALUE.test(value);
    if (!ok) return null;
    out[key] = value;
  }
  return out;
}

function send(event: AnalyticsEvent, params: Record<string, string>) {
  const key = `${event}|${JSON.stringify(params)}`;
  const now = Date.now();
  const previous = lastSent.get(key);
  if (previous !== undefined && now - previous < DEDUPE_WINDOW_MS) return;
  lastSent.set(key, now);
  window.gtag!("event", event, params);
}

/**
 * Each outbound click event has exactly one kind of destination, so it is
 * filled in here rather than repeated -- and possibly contradicted -- at every
 * call site.
 */
const DEFAULT_DESTINATION: Partial<Record<AnalyticsEvent, AnalyticsDestination>> = {
  click_phone: "landline",
  click_whatsapp: "whatsapp",
  click_email: "email",
  click_maps: "google_maps",
  click_google_reviews: "google_reviews",
  contact_form_submit_success: "contact_form",
};

export function trackEvent(event: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  if (!hasConsent()) return;

  const withDestination: AnalyticsParams = { destination_type: DEFAULT_DESTINATION[event], ...params };
  const safe = buildParams(withDestination, window.location.pathname);
  if (!safe) return;

  if (typeof window.gtag === "function") {
    send(event, safe);
  } else {
    // Consent is granted but GA is still initialising -- typically a
    // view_treatment fired from the first page's own effect. Held until
    // `enableAnalytics` runs, then sent in order. Nothing is queued without
    // consent, so an event can never be sent retroactively.
    pending.push({ event, params: safe });
  }
}

/**
 * Initialises gtag after consent. Called from Analytics.tsx, never elsewhere.
 * `gtag('config')` also sends the page view for the current page, and GA4's
 * enhanced measurement reports later client-side navigations itself.
 */
export function enableAnalytics(measurementId: string): void {
  if (typeof window === "undefined") return;
  // Re-accepting after a withdrawal in the same visit: gtag is already
  // loaded, so lifting Google's own opt-out flag is all that is needed.
  window[`ga-disable-${measurementId}`] = false;
  if (typeof window.gtag === "function") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the Arguments object itself, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });

  const queued = pending;
  pending = [];
  for (const { event, params } of queued) send(event, params);
}

/**
 * Withdrawal of consent. Called from Analytics.tsx when a visitor who had
 * accepted chooses "Decline" in the cookie settings.
 *
 * `trackEvent` already stops on its own -- it re-reads the stored choice on
 * every call. This also stops what gtag.js would send by itself (page views on
 * later navigations) via Google's documented opt-out flag, drops anything still
 * queued, and deletes the GA cookies already set, so the visitor is back in the
 * same state as someone who declined from the start.
 */
export function disableAnalytics(measurementId: string): void {
  if (typeof window === "undefined") return;
  window[`ga-disable-${measurementId}`] = true;
  pending = [];
  deleteAnalyticsCookies();
}

/** Google Analytics' own first-party cookies: _ga, _ga_<ID>, _gid, _gat*. */
const GA_COOKIE = /^(_ga(_.+)?|_gid|_gat.*)$/;

function deleteAnalyticsCookies() {
  if (typeof document === "undefined") return;
  const names = document.cookie
    .split(";")
    .map((part) => part.split("=")[0].trim())
    .filter((name) => GA_COOKIE.test(name));
  // GA sets its cookies on the widest domain it can (e.g. ".example.com"),
  // so expire each one on the host and on every parent domain.
  const labels = window.location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < labels.length - 1; i++) domains.push(`; domain=.${labels.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

/** Reopens the consent dialog, e.g. from the footer's "Cookie settings" button. */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

/** Test-only reset of module state. */
export function __resetAnalyticsForTests() {
  pending = [];
  lastSent.clear();
}

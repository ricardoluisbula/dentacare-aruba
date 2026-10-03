"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { X } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import {
  ANALYTICS_CONSENT_KEY as CONSENT_KEY,
  COOKIE_SETTINGS_EVENT,
  disableAnalytics,
  enableAnalytics,
} from "@/lib/analytics";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type Consent = "granted" | "denied" | null;

function readStoredConsent(): Consent {
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

const BUTTON_FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated";

/**
 * The site's one consent system and its one Google Analytics installation.
 *
 * Loads Google Analytics 4 only when both of the following are true:
 * 1. NEXT_PUBLIC_GA_MEASUREMENT_ID is configured (see .env.example) -- if
 *    unset, this component renders nothing at all, no banner included.
 * 2. The visitor has explicitly accepted the cookie consent banner below.
 *
 * The same banner reopens from the footer's "Cookie settings" button
 * (openCookieSettings), where the choice can be changed or withdrawn at any
 * time. Withdrawing stops all further analytics and deletes the GA cookies
 * (disableAnalytics).
 *
 * No patient-identifying data is ever sent to analytics -- see
 * src/lib/analytics.ts and docs/ANALYTICS.md for the exact list of events
 * tracked (button clicks and page views only, never form field values).
 */
export function Analytics() {
  const { t, mounted } = useTranslation();
  const [consent, setConsent] = useState<Consent>(null);
  const [loaded, setLoaded] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    setConsent(readStoredConsent());
    setLoaded(true);
  }, []);

  // gtag is initialised here, in code, rather than by an inline script: that
  // lets src/lib/analytics.ts hold events fired before GA is ready (the first
  // page's view_treatment) and flush them in order once it is.
  useEffect(() => {
    if (GA_MEASUREMENT_ID && consent === "granted") enableAnalytics(GA_MEASUREMENT_ID);
  }, [consent]);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const open = () => {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setSettingsOpen(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  const visible = mounted && loaded && (consent === null || settingsOpen);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    openerRef.current?.focus();
    openerRef.current = null;
  }, []);

  // Reopened on request: move focus into the dialog, and let Escape close it.
  useEffect(() => {
    if (!settingsOpen) return;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSettings();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [settingsOpen, closeSettings]);

  if (!GA_MEASUREMENT_ID) return null;

  const respond = (value: "granted" | "denied") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
    if (value === "denied" && GA_MEASUREMENT_ID) disableAnalytics(GA_MEASUREMENT_ID);
    setConsent(value);
    if (settingsOpen) closeSettings();
  };

  return (
    <>
      {consent === "granted" && (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      )}

      {visible && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label={t.common.cookieConsentAriaLabel}
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-surface-border bg-bg-elevated p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col gap-1.5">
            <p className="text-sm leading-relaxed text-fg-muted">{t.common.cookieConsentMessage}</p>
            {settingsOpen && consent !== null && (
              <p className="text-sm font-medium leading-relaxed text-fg">
                {consent === "granted" ? t.common.cookieConsentCurrentGranted : t.common.cookieConsentCurrentDenied}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => respond("denied")}
              aria-pressed={settingsOpen ? consent === "denied" : undefined}
              className={`rounded-full border border-surface-border px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg ${BUTTON_FOCUS}`}
            >
              {t.common.cookieConsentDecline}
            </button>
            <button
              type="button"
              onClick={() => respond("granted")}
              aria-pressed={settingsOpen ? consent === "granted" : undefined}
              className={`rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-colors hover:opacity-90 ${BUTTON_FOCUS}`}
            >
              {t.common.cookieConsentAccept}
            </button>
            {settingsOpen && consent !== null && (
              <button
                type="button"
                onClick={closeSettings}
                aria-label={t.common.cookieSettingsClose}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-fg ${BUTTON_FOCUS}`}
              >
                <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

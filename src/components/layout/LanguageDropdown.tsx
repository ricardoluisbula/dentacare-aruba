"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useTranslation, locales, type Locale } from "@/lib/i18n/LanguageProvider";
import { HTML_LANG, LOCALE_LABEL, LOCALIZED_ROUTE_LOCALES, stripLocale } from "@/lib/i18n/routing";
import { trackEvent } from "@/lib/analytics";

const CODE: Record<Locale, string> = { en: "EN", nl: "NL", es: "ES", pap: "PAP" };

type LanguageOption = {
  locale: Locale;
  label: string;
  code: string;
  /** The locale-independent route; LocaleLink resolves it for `locale`. */
  route: string;
  current: boolean;
  /**
   * The page has no version in this language, so the link leads to the
   * documented fallback instead (see LOCALIZED_ROUTE_LOCALES). Shown to the
   * visitor, so choosing "Español" never silently lands on English.
   */
  fallback: boolean;
};

/**
 * One link per language, each to the equivalent of the page being read.
 *
 * Real links rather than buttons that navigate from script: every option has
 * a URL (so it can be opened in a new tab, crawled, and announced by screen
 * readers as a link to that language), and the URL alone decides the language
 * -- there is no remembered-language cookie that could send "Nederlands" back
 * to English (see src/middleware.ts).
 */
function useLanguageOptions(): LanguageOption[] {
  const { locale, notFound } = useTranslation();
  const current = stripLocale(usePathname() ?? "/").path;
  // On the 404 page there is no equivalent page to switch to: each language
  // leads to its home page instead of to another 404.
  const path = notFound ? "/" : current;
  return locales.map((l) => {
    const published = LOCALIZED_ROUTE_LOCALES[path];
    return {
      locale: l,
      label: LOCALE_LABEL[l],
      code: CODE[l],
      route: path,
      current: l === locale,
      fallback: Boolean(published && !published.includes(l)),
    };
  });
}

function onChoose(option: LanguageOption, from: Locale, placement: "header" | "mobile_menu") {
  // Recorded while the URL is still the page the visitor switched from;
  // re-selecting the current language is not a selection.
  if (option.locale !== from) trackEvent("select_language", { locale: option.locale, placement });
}

/** Approximate height of the open menu, for choosing whether it opens up or down. */
const MENU_HEIGHT_ESTIMATE = 4 * 44 + 16;
/** The menu's minimum width (min-w-[11rem]) plus a gutter. */
const MENU_WIDTH_ESTIMATE = 176 + 16;

/**
 * The header's language menu (desktop, from 1440px): a disclosure button that
 * opens a list of four links.
 *
 * - The trigger announces the control and the current language, and its
 *   expanded state; the current option carries `aria-current`.
 * - Opening moves focus to the current language; arrow keys, Home and End
 *   move between options; Escape or a click outside closes it and returns
 *   focus to the trigger; Tab past either end closes it.
 * - It opens upward when there is not enough room below the trigger, and is
 *   aligned to whichever side keeps it inside the viewport.
 */
function LanguageDropdownMenu({ className = "" }: { className?: string }) {
  const { locale, t } = useTranslation();
  const options = useLanguageOptions();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<{ up: boolean; alignLeft: boolean }>({ up: false, alignLeft: false });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuId = useId();
  const current = options.find((o) => o.current)!;

  // Measured before paint, so the menu never flashes in the wrong direction.
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom;
    setPlacement({
      up: below < MENU_HEIGHT_ESTIMATE && rect.top > below,
      // Right-aligned by default (the trigger sits at the right of the
      // header); left-aligned if that would push the menu past the left edge.
      alignLeft: rect.right < MENU_WIDTH_ESTIMATE,
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    optionRefs.current[locales.indexOf(locale)]?.focus();

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, locale]);

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleOptionKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const focus = (i: number) => optionRefs.current[(i + locales.length) % locales.length]?.focus();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focus(index + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focus(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focus(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focus(locales.length - 1);
    } else if (e.key === "Tab" && ((!e.shiftKey && index === locales.length - 1) || (e.shiftKey && index === 0))) {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={open}
        aria-controls={menuId}
        // Says what the control does and what is chosen now, e.g.
        // "Select website language: English".
        aria-label={`${t.header.languageLabel}: ${current.label}`}
        data-testid="language-trigger"
        className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-accent/45 bg-gold-50/70 px-4 text-sm font-medium text-accent-deep transition-colors hover:border-accent hover:bg-gold-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:bg-gold-950/40 dark:text-accent dark:hover:bg-gold-950/70"
      >
        <Globe className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        <span lang={HTML_LANG[current.locale]}>{current.label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-200", open && "rotate-180")} strokeWidth={2} aria-hidden="true" />
      </button>

      {open && (
        <ul
          id={menuId}
          aria-label={t.header.languageLabel}
          data-lenis-prevent
          data-testid="language-menu"
          className={cn(
            "absolute z-50 min-w-[12rem] overflow-hidden rounded-2xl border border-accent/30 bg-bg-elevated py-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)]",
            placement.up ? "bottom-[calc(100%+0.5rem)]" : "top-[calc(100%+0.5rem)]",
            placement.alignLeft ? "left-0" : "right-0"
          )}
        >
          {options.map((option, index) => (
            <li key={option.locale}>
              <LocaleLink
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                href={option.route}
                targetLocale={option.locale}
                hrefLang={HTML_LANG[option.fallback ? "en" : option.locale]}
                lang={HTML_LANG[option.locale]}
                aria-current={option.current ? "true" : undefined}
                onClick={() => {
                  onChoose(option, locale, "header");
                  setOpen(false);
                }}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
                className={cn(
                  "flex min-h-11 w-full items-center justify-between gap-3 whitespace-nowrap px-4 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  option.current ? "bg-accent/10 font-medium text-accent-deep dark:text-accent" : "text-fg-muted hover:bg-surface hover:text-fg"
                )}
              >
                <span>
                  {option.label}
                  {option.fallback && <span className="ml-1 text-xs opacity-70">({t.header.languageFallback})</span>}
                </span>
                {option.current && <Check className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />}
              </LocaleLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * The mobile menu's language choice: all four languages always visible, as a
 * two-column grid of links, so nothing has to open inside a panel that is
 * itself scrolling on a small phone. Same links, same `aria-current`, same
 * fallback note as the header menu.
 */
function LanguageListMenu({ className = "" }: { className?: string }) {
  const { locale, t } = useTranslation();
  const options = useLanguageOptions();

  return (
    <nav aria-label={t.header.languageLabel} className={className} data-testid="language-list">
      <p className="px-1 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted">
        <Globe className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" strokeWidth={1.75} aria-hidden="true" />
        {t.header.languageHeading}
      </p>
      <ul className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <li key={option.locale} className="min-w-0">
            <LocaleLink
              href={option.route}
              targetLocale={option.locale}
              hrefLang={HTML_LANG[option.fallback ? "en" : option.locale]}
              lang={HTML_LANG[option.locale]}
              aria-current={option.current ? "true" : undefined}
              onClick={() => onChoose(option, locale, "mobile_menu")}
              className={cn(
                "flex min-h-11 w-full items-center justify-between gap-2 rounded-2xl border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                option.current
                  ? "border-accent/60 bg-accent/10 font-semibold text-accent-deep dark:text-accent"
                  : "border-surface-border text-fg hover:border-accent/40 hover:bg-surface"
              )}
            >
              <span className="min-w-0">
                <span className="block">{option.label}</span>
                {option.fallback && <span className="block text-[11px] font-normal text-fg-muted">{t.header.languageFallback}</span>}
              </span>
              {option.current && <Check className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden="true" />}
            </LocaleLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * A language switcher is only useful with more than one language: both
 * switchers render nothing if the site is ever reduced to one locale.
 */
const HAS_LANGUAGE_CHOICE = locales.length > 1;

export function LanguageDropdown(props: { className?: string }) {
  return HAS_LANGUAGE_CHOICE ? <LanguageDropdownMenu {...props} /> : null;
}

export function LanguageList(props: { className?: string }) {
  return HAS_LANGUAGE_CHOICE ? <LanguageListMenu {...props} /> : null;
}

"use client";

import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { siteConfig } from "@/lib/site";
import { navKeyByHref } from "@/lib/navKeys";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/layout/Logo";
import { LanguageDropdown, LanguageList } from "@/components/layout/LanguageDropdown";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useWhatsAppHref } from "@/components/availability/WhatsAppEnquiry";
import { trackEvent } from "@/lib/analytics";
import { TreatmentsDropdown, useTreatmentsMenuItems } from "@/components/layout/TreatmentsDropdown";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

/** Only starts auto-hiding once scrolled this far past the top -- without a
 * floor, a 20px twitch-scroll right at page load would hide the header
 * before a visitor has even seen it once. */
const AUTO_HIDE_THRESHOLD = 120;

/** Desktop, hover-capable, motion-safe only: touch devices have no
 * persistent hover to bring a hidden header back, and this is the same
 * 1440px width the nav itself switches from the hamburger to the full menu
 * at -- a mouse-capable browser window resized narrower than that still
 * shows the hamburger UI, where auto-hide would have nothing useful to
 * reveal anyway. */
const AUTO_HIDE_QUERY = "(min-width: 1440px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Links the hamburger toggle to the panel it controls, for aria-controls. */
const MOBILE_MENU_ID = "mobile-menu";

export function Navbar() {
  // Compared against locale-independent hrefs ("/about"), so the current page
  // is still marked as current on "/en/about" and "/it/about". Comparing the
  // raw pathname would silently drop aria-current on every non-Dutch page.
  const pathname = stripLocale(usePathname() ?? "/").path;
  const { t } = useTranslation();
  const treatmentsMenuItems = useTreatmentsMenuItems();
  const whatsappHref = useWhatsAppHref();
  // Rendered in the top-level nav row/list on both desktop and mobile;
  // "Prevention & Hygiene" is deliberately excluded here and only reachable
  // through the "Treatments" dropdown/accordion below. `siteConfig.nav`
  // itself is left untouched -- the footer's own "Explore" list also reads
  // it directly and still lists every page, sitemap-style.
  const navItems = siteConfig.nav.filter((item) => item.href !== "/prevention-hygiene");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [treatmentsMobileOpen, setTreatmentsMobileOpen] = useState(false);
  const [autoHideEnabled, setAutoHideEnabled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  // Distinguishes "the menu closed because the visitor dismissed it" from
  // "the menu closed because the route changed". Focus belongs back on the
  // toggle in the first case; in the second the new page owns focus.
  const dismissedRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia(AUTO_HIDE_QUERY);
    const update = () => setAutoHideEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveals immediately the moment any of these become true, independent of
  // whether a scroll frame happens to fire -- the useLenis callback below
  // only runs while Lenis's own loop is actively animating (mid-scroll or
  // settling momentum), so relying on it alone would leave hover-reveal
  // silently broken whenever the page is fully at rest when the cursor
  // enters the top zone (a real gap caught during testing, not theoretical).
  useEffect(() => {
    if (!autoHideEnabled || interacting || open) setHidden(false);
  }, [autoHideEnabled, interacting, open]);

  // Drives scroll-direction-based hide/reveal from Lenis's own per-frame
  // scroll callback (already rAF-batched internally, so this adds no extra
  // scroll-event work) -- reveals instantly on any upward scroll, hides
  // only on sustained downward scroll past AUTO_HIDE_THRESHOLD once none of
  // the interacting/open/disabled conditions above hold.
  useLenis(
    (lenis) => {
      if (!autoHideEnabled || interacting || open) return;
      if (lenis.direction === -1) {
        setHidden(false);
      } else if (lenis.direction === 1 && lenis.scroll > AUTO_HIDE_THRESHOLD) {
        setHidden(true);
      }
    },
    [autoHideEnabled, interacting, open]
  );

  /** Closes the menu the way a visitor dismisses it -- focus returns to the toggle. */
  const closeMenu = () => {
    dismissedRef.current = true;
    setOpen(false);
  };

  // A route change closes the menu too, but that is not a dismissal: the new
  // page should own focus, so the flag stays clear.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Collapses the mobile "Treatments" disclosure whenever the
  // mobile menu itself closes (route change above, or the visitor closing it
  // directly) so they always start fresh, collapsed, the next time it's opened.
  useEffect(() => {
    if (!open) setTreatmentsMobileOpen(false);
  }, [open]);

  // Locks page scroll behind the open menu (the menu panel scrolls on its
  // own), and flags the open state on <html> so the floating back-to-top
  // button steps aside instead of sitting on top of the menu's
  // last rows -- which is exactly where the language choice is.
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    if (open) root.dataset.menuOpen = "";
    else delete root.dataset.menuOpen;
    return () => {
      root.style.overflow = "";
      delete root.dataset.menuOpen;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /**
   * Focus follows the menu.
   *
   * Opening moves focus to the first control inside the panel, so a keyboard
   * or screen-reader user continues from where the new content actually is
   * rather than from a toggle whose panel they cannot reach without tabbing
   * back through the header. Dismissing puts focus back on the toggle -- the
   * element that opened the menu is where the visitor expects to land, and
   * without this focus falls to <body> and the next Tab restarts from the top
   * of the document.
   *
   * A close caused by navigating to a new page is excluded: that page gets to
   * decide where focus goes.
   */
  useEffect(() => {
    if (open) {
      const first = menuPanelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
      return;
    }
    if (dismissedRef.current) {
      dismissedRef.current = false;
      menuButtonRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      {/* Always-mounted, invisible activation strip -- the only way to bring
          a hidden header back without touching the keyboard or scrolling
          up. `min-[1440px]:` + the same hover/pointer/motion gate as the hide logic
          itself keeps this fully inert (and out of the tab order, via
          aria-hidden) on touch devices, which have no persistent hover to
          use it with. */}
      <div
        aria-hidden="true"
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        className="fixed inset-x-0 top-0 z-50 hidden h-4 min-[1440px]:block"
      />
      <header
        onFocus={() => setInteracting(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false);
        }}
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium",
          scrolled || open
            ? "pb-3 pt-[calc(0.75rem+env(safe-area-inset-top))]"
            : "pb-5 pt-[calc(1.25rem+env(safe-area-inset-top))]",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
      <Container className="flex items-center justify-between">
        {/* Explicit `auto minmax(0,1fr) auto` grid instead of the previous
            `flex justify-between` -- flexbox let the nav-links `<ul>` (the
            only child with `min-w-0`) get squeezed below its content's
            natural width whenever the 8-item menu's total width exceeded
            the nav bar's, and since its `li`s are `shrink-0`, they don't
            shrink along with it -- they silently overflow the squeezed box
            and visually collide with whatever sits to its right (the
            reported "Contact overlaps the globe button" bug). Grid's
            explicit tracks (each child pinned to its column below via
            `[grid-column:N]`, so a `hidden` child at one breakpoint can't
            get auto-placed into the wrong track) don't have that failure
            mode: column 3 (icon cluster) always keeps its own reserved
            width, so the two can never share the same space. Genuinely
            *not* overlapping still additionally depends on column 2's
            content actually fitting -- see the `<ul>` gap/font comment
            below for that half of the fix. */}
        <nav
          className={cn(
            "grid w-full items-center gap-x-2 rounded-full px-[clamp(0.375rem,-1.625rem+2.5vw,0.625rem)] py-2.5 transition-all duration-500 [grid-template-columns:auto_minmax(0,1fr)_auto] min-[1440px]:py-4",
            scrolled || open ? "glass-strong shadow-[0_8px_32px_-12px_rgba(0,0,0,0.25)]" : "bg-transparent"
          )}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center py-1 [grid-column:1]"
            aria-label={siteConfig.name}
          >
            {/* Constant size from `sm` up -- never shrunk to help the nav
                fit (see the link/gap comments below for where that room
                comes from instead). */}
            <Logo className="h-8 w-auto sm:h-9" priority />
          </Link>

          {/* `min-w-0` lets this column-2 grid item actually shrink to its
              track's width instead of overflowing based on content (the
              other half of the fix -- see the `<nav>` comment above) --
              `justify-center` then centers the (possibly-narrower-than-
              natural) link row within that track, per "keep the main
              navigation centered." Font size and gap are both fluid
              `clamp()`s rather than the previous two-tier `min-[1440px]:`
              / `min-[1440px]:` jump: they now track viewport width
              continuously, tuned so that at exactly 1440px -- the tightest
              point the desktop nav ever has to fit at, confirmed on Dutch's
              "Maak kennis met uw tandarts" plus the "Contact" dropdown's
              own chevron -- there's still 20px+ of clear space before the
              language/theme cluster, growing to a roomier feel by 1440px
              and holding flat from there (each `clamp()`'s max deliberately
              engages by ~1440px, not 1920px -- `Container`'s own
              `max-width: 88rem` means the nav's actual available width
              already stops growing around there too, so a raw `vw`-based
              value left free to keep climbing all the way to 1920px would
              overshoot and eat back into the same clearance this is meant
              to protect). Below 1440px even the floor doesn't fit, so the
              hamburger covers 1024-1279px too (unchanged from before), per
              the brief's explicit priority (readable size first, gap
              second, breakpoint last). */}
          <ul className="hidden min-w-0 items-center justify-center gap-3 min-[1440px]:flex [grid-column:2]">
            {navItems.map((item) => {
              // "Prevention & Hygiene" now nests under "Treatments" (see
              // TreatmentsDropdown below), so the trigger itself reads as
              // current on either page, not just its own.
              const active = item.href === "/treatments" ? pathname === "/treatments" || pathname === "/prevention-hygiene" : pathname === item.href;
              // `font-medium` (500) matches the requested weight. No
              // letter-spacing here -- at this size/weight it isn't needed
              // for legibility, and the extra per-character width it added
              // was exactly what made 15px text not fit at 1440px in an
              // earlier pass. Shared between the plain nav links below and
              // the "Contact" dropdown trigger so both read as the same
              // style of nav item.
              const linkClassName = cn(
                "group relative whitespace-nowrap rounded-full px-0 py-3 text-[0.9375rem] font-medium transition-colors duration-200",
                // The active item is 15-16px text, so it needs 4.5:1. On the
                // light header `--accent` gives 3.49:1; `--accent-deep` gives
                // 7.27:1. Dark mode keeps `--accent`, which already passes.
                // The accent underline beneath it is a non-text indicator and
                // is left exactly as designed.
                active ? "text-accent-deep dark:text-accent" : "text-fg-muted hover:text-fg"
              );

              // ARUBA DRAFT: "Contact" is a plain link to the placeholder
              // contact page. The reference site's Contact dropdown offered
              // call / WhatsApp / email / Instagram actions that all reached
              // the Amsterdam clinic, so it is not wired up until the Aruba
              // practice's own details are confirmed.

              // "Treatments" is a dropdown (see TreatmentsDropdown.tsx): its trigger is a real link to
              // `/treatments` -- hovering/focusing it additionally reveals
              // "Prevention & Hygiene" underneath.
              if (item.href === "/treatments") {
                return (
                  <TreatmentsDropdown
                    key={item.href}
                    active={active}
                    linkClassName={linkClassName}
                    treatmentsHref={item.href}
                    treatmentsLabel={t.nav[navKeyByHref[item.href]]}
                  />
                );
              }

              return (
                <li key={item.href} className="shrink-0">
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={linkClassName}>
                    {t.nav[navKeyByHref[item.href]]}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-x-2.5 bottom-1.5 h-px w-0 bg-accent transition-[width] duration-[240ms] ease-premium group-hover:w-[calc(100%-1.25rem)]",
                        active && "w-[calc(100%-1.25rem)]"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Always column 3 regardless of which of the two mutually-
              exclusive children below is showing -- pinning this wrapper
              (rather than each child individually) is what keeps the
              hamburger-mode controls from being auto-placed into column 2
              once the `<ul>` above disappears (`hidden`) below 1440px. */}
          <div className="flex shrink-0 items-center justify-end [grid-column:3]">
            <div className="hidden shrink-0 items-center gap-2 min-[1440px]:flex min-[1440px]:gap-3">
              {/* Only language + theme live here -- visible from `min-[1440px]`
                  (the same breakpoint the desktop nav itself activates at --
                  see AUTO_HIDE_QUERY and every other `min-[1440px]:`
                  breakpoint in this file) since those two must never be
                  hidden while the desktop nav is showing. */}
              <LanguageDropdown />
              <ThemeToggle className="shrink-0" />
            </div>

            <div className="flex shrink-0 items-center gap-2 min-[1440px]:hidden">
              {/* Below 1440px the menu collapses, but tablets and laptops keep
                  the language selector visible in the bar. Phones have no
                  room beside the logo; it is the first group in their menu. */}
              <LanguageDropdown className="hidden sm:block" />
              <ThemeToggle className="shrink-0" />
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => (open ? closeMenu() : setOpen(true))}
                aria-label={open ? t.header.closeMenu : t.header.openMenu}
                aria-expanded={open}
                aria-controls={MOBILE_MENU_ID}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-surface-border text-fg transition-colors duration-200 hover:!border-accent/50 hover:text-accent-deep dark:hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="min-[1440px]:hidden"
          >
            <Container className="mt-3">
              <div
                id={MOBILE_MENU_ID}
                ref={menuPanelRef}
                aria-label={t.header.menuLabel}
                data-lenis-prevent
                data-testid="mobile-menu"
                // Never taller than the space under the header: on a short
                // phone (320x568) or at 200% zoom the panel scrolls inside
                // itself, so the language choice at its end stays reachable
                // while the page behind stays locked. The background is fully
                // opaque in both themes: the shared glass tint is 8% white in
                // dark mode, and even at 97% the large hero heading still
                // showed through behind the menu items.
                className="glass-strong flex max-h-[calc(100dvh-6.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] flex-col gap-1 overflow-y-auto overscroll-contain rounded-3xl !bg-bg-elevated p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)]"
              >
                {/* First in the mobile menu: the appointment enquiry. A WhatsApp
                    MESSAGE link to the confirmed Aruba number -- never tel:. */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("click_whatsapp", { placement: "mobile_menu" })}
                  className="mb-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3.5 text-base font-semibold text-accent-contrast shadow-[0_8px_30px_-8px_var(--accent)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
                  {t.whatsapp.short}
                  <span className="sr-only"> {t.a11y.opensInNewTab}</span>
                </a>
                {/* Language choice near the top of the menu, so it is seen
                    without scrolling on a phone. */}
                <LanguageList className="mb-2 border-b border-surface-border px-2 pb-4 pt-1" />
                {navItems.map((item) => {
                  const active =
                    item.href === "/treatments"
                      ? pathname === "/treatments" || pathname === "/prevention-hygiene"
                      : pathname === item.href;
                  const itemClassName = cn(
                    "rounded-2xl px-4 py-3.5 text-base font-medium transition-colors duration-200",
                    active ? "bg-accent/10 text-accent-deep dark:text-accent" : "text-fg-muted hover:bg-surface hover:text-fg"
                  );

                  // "Treatments" expands in place instead of navigating
                  // straight away -- its own
                  // link to `/treatments` plus "Prevention & Hygiene" live
                  // inside the expanded panel (see TreatmentsDropdown.tsx),
                  // so tapping the row toggles the submenu without losing
                  // the ability to reach the Treatments hub itself.
                  if (item.href === "/treatments") {
                    return (
                      <div key={item.href}>
                        <button
                          type="button"
                          onClick={() => setTreatmentsMobileOpen((v) => !v)}
                          aria-expanded={treatmentsMobileOpen}
                          aria-controls="mobile-treatments-options"
                          className={cn("flex w-full items-center justify-between gap-2", itemClassName)}
                        >
                          {t.nav.treatments}
                          <ChevronDown
                            className={cn("h-4 w-4 shrink-0 transition-transform duration-200", treatmentsMobileOpen && "rotate-180")}
                            aria-hidden="true"
                          />
                        </button>
                        <div
                          id="mobile-treatments-options"
                          className="grid transition-[grid-template-rows] duration-300 ease-premium"
                          style={{ gridTemplateRows: treatmentsMobileOpen ? "1fr" : "0fr" }}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="flex flex-col gap-0.5 py-1 pl-4">
                              {treatmentsMenuItems.map((mi) => {
                                const subActive = pathname === mi.href;
                                return (
                                  <Link
                                    key={mi.key}
                                    href={mi.href}
                                    aria-current={subActive ? "page" : undefined}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                      "rounded-xl px-4 py-3 text-sm transition-colors duration-200 hover:bg-surface hover:text-fg",
                                      subActive ? "bg-accent/10 text-accent-deep dark:text-accent" : "text-fg-muted"
                                    )}
                                  >
                                    {mi.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link key={item.href} href={item.href} className={itemClassName}>
                      {t.nav[navKeyByHref[item.href]]}
                    </Link>
                  );
                })}
                <div className="mt-2 flex items-center border-t border-surface-border px-2 pb-1 pt-3">
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.header.instagramLabel}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-surface-border text-fg-muted transition-colors duration-200 hover:!border-accent/50 hover:text-accent-deep dark:hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}

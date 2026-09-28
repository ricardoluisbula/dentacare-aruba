"use client";

import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n/routing";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export type TreatmentsMenuItem = {
  key: string;
  label: string;
  href: string;
};

/** The "Treatments" nav item's sub-pages -- one shared source so the desktop
 * dropdown panel and the mobile accordion (see Navbar.tsx) can never drift
 * out of sync on labels or hrefs. `treatments-page` (the hub itself) is only
 * rendered by the mobile accordion: on desktop the trigger is itself a real
 * link to `/treatments`, so repeating it inside the panel would be a
 * redundant duplicate of what clicking the trigger text already does. */
export function useTreatmentsMenuItems(): TreatmentsMenuItem[] {
  const { t } = useTranslation();
  return [
    { key: "treatments-page", label: t.nav.treatments, href: "/treatments" },
    { key: "prevention-hygiene", label: t.nav.preventionHygiene, href: "/prevention-hygiene" },
  ];
}

/** Desktop-only "Treatments" nav dropdown -- replaces the plain nav Link for
 * that one item. Unlike ContactDropdown's trigger (a `<button>`, since
 * "Contact" has no single destination of its own), this trigger is a real
 * `Link` to `/treatments`: clicking the label navigates normally, while
 * hovering, focusing, or clicking reveals "Prevention & Hygiene" underneath
 * without blocking that direct navigation. `linkClassName` is passed in from
 * Navbar so the trigger matches its sibling links' size/weight/color exactly
 * (single source of truth for that shared styling lives there). */
export function TreatmentsDropdown({
  active,
  linkClassName,
  treatmentsHref,
  treatmentsLabel,
}: {
  active: boolean;
  linkClassName: string;
  treatmentsHref: string;
  treatmentsLabel: string;
}) {
  const { t } = useTranslation();
  // Locale-stripped, matching Navbar's own active-page comparisons, so
  // "Prevention & Hygiene" is correctly detected as current on "/es/prevention-hygiene" too.
  const pathname = stripLocale(usePathname() ?? "/").path;
  const items = useTreatmentsMenuItems().filter((item) => item.key !== "treatments-page");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        // No ref on the trigger `Link` itself (LocaleLink doesn't declare a
        // forwarded `ref` prop) -- it's the only direct-child anchor of the
        // root `<li>` when closed, so this reaches it unambiguously without
        // risking picking up one of the panel's own links instead.
        rootRef.current?.querySelector<HTMLAnchorElement>(':scope > a[aria-haspopup="true"]')?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={rootRef}
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <Link
        href={treatmentsHref}
        aria-current={active ? "page" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(linkClassName, "inline-flex items-center gap-0.5")}
      >
        {treatmentsLabel}
        <ChevronDown
          className={cn("h-3 w-3 shrink-0 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-2.5 bottom-1.5 h-px w-0 bg-accent transition-[width] duration-[240ms] ease-premium group-hover:w-[calc(100%-1.25rem)]",
            active && "w-[calc(100%-1.25rem)]"
          )}
        />
      </Link>

      {open && (
        // Positioned flush against the trigger (`top-full`, no gap) with the
        // visual spacing moved to this wrapper's own `pt-2` instead -- a real
        // gap here would create a dead zone the pointer has to cross to get
        // from the trigger into the panel, which breaks "keep it open while
        // the cursor moves into the dropdown" (see ContactDropdown, which
        // uses the same technique for the same reason).
        <div className="absolute left-0 top-full z-50 pt-2">
          <div
            aria-label={t.header.treatmentsMenu.label}
            data-lenis-prevent
            className="min-w-[14rem] overflow-hidden rounded-2xl border border-surface-border bg-bg-elevated py-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)]"
          >
            {items.map((item) => {
              const itemActive = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={itemActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block whitespace-nowrap px-4 py-2.5 text-sm transition-colors hover:bg-accent/10 hover:text-accent-deep dark:hover:text-accent focus-visible:bg-accent/10 focus-visible:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring dark:focus-visible:text-accent",
                    itemActive ? "bg-accent/10 text-accent-deep dark:text-accent" : "text-fg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </li>
  );
}

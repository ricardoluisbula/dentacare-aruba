"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Info, X } from "lucide-react";

export type GlossaryTermProps = {
  /** Visible, clickable text -- stands in for the matched phrase inside the
   * surrounding description, so it must read naturally in that sentence. */
  label: string;
  title: string;
  closeLabel: string;
  children: React.ReactNode;
};

type Position = {
  top: number;
  left: number;
  width: number;
  tailLeft: number;
  placeAbove: boolean;
};

const POPOVER_MAX_WIDTH = 320;
const VIEWPORT_MARGIN = 16;
const GAP = 10;

/** Small, reusable educational popover for glossary-style terms embedded in
 * running text (e.g. the Preventive & Hygiene treatment description). Not a
 * modal: it's non-blocking, dismissible from several input types, and
 * portaled to `document.body` with viewport-clamped `position: fixed`
 * coordinates computed on open -- required both to escape the accordion
 * panel's `overflow-hidden` (used for its grid-row collapse animation,
 * which would otherwise clip an `absolute`-positioned popover) and to stay
 * fully on-screen on narrow viewports. */
export function GlossaryTerm({ label, title, closeLabel, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Runs after the popover mounts (open) so its real, content-driven height
  // is known -- text length varies a lot across the four languages, so a
  // fixed/guessed height would misplace the flip-above check on longer
  // Dutch/Italian copy.
  useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const popover = popoverRef.current;
    if (!trigger || !popover) return;

    const triggerRect = trigger.getBoundingClientRect();
    const width = Math.min(POPOVER_MAX_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
    const height = popover.offsetHeight;

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const placeAbove =
      spaceBelow < height + GAP + VIEWPORT_MARGIN && triggerRect.top > height + GAP + VIEWPORT_MARGIN;

    const idealTop = placeAbove ? triggerRect.top - height - GAP : triggerRect.bottom + GAP;
    // Neither direction may have enough room on a short viewport (e.g. a
    // narrow phone in the middle of a long page) -- clamp so the popover
    // always stays fully on-screen even then, rather than trusting the
    // above/below choice alone to guarantee that.
    const maxTop = Math.max(window.innerHeight - VIEWPORT_MARGIN - height, VIEWPORT_MARGIN);
    const top = Math.min(Math.max(idealTop, VIEWPORT_MARGIN), maxTop);
    const idealLeft = triggerRect.left + triggerRect.width / 2 - width / 2;
    const left = Math.min(Math.max(idealLeft, VIEWPORT_MARGIN), window.innerWidth - width - VIEWPORT_MARGIN);
    const tailLeft = Math.min(Math.max(triggerRect.left + triggerRect.width / 2 - left, 16), width - 16);

    setPosition({ top, left, width, tailLeft, placeAbove });
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || popoverRef.current?.contains(target)) return;
      setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    // Scrolling or resizing invalidates the computed fixed-position
    // coordinates -- rather than tracking the trigger on every scroll
    // frame, just dismiss (the same lightweight-popover convention used by
    // most native browser UI, e.g. the address bar autofill dropdown).
    const handleDismiss = () => setOpen(false);

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleDismiss, { passive: true, capture: true });
    window.addEventListener("resize", handleDismiss);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleDismiss, { capture: true });
      window.removeEventListener("resize", handleDismiss);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline rounded-sm bg-transparent p-0 font-medium text-accent-deep underline decoration-accent-deep/50 decoration-dotted underline-offset-4 transition-colors duration-200 hover:decoration-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-accent dark:decoration-accent/50 dark:hover:decoration-accent"
      >
        {label}
      </button>
      {open &&
        createPortal(
          <>
            {/* Subtle page-separation scrim -- not a click target (the
                existing document-level mousedown listener above already
                closes the popover on any outside click, backdrop included)
                and not heavy: just enough blur to keep large underlying
                headings from visually competing with the popover's own
                text, per the readability fix this backdrop exists for. */}
            <div
              aria-hidden="true"
              className="fixed inset-0 z-[105] bg-ink-950/5 backdrop-blur-[2px]"
            />
            <div
              ref={popoverRef}
              role="dialog"
              aria-modal="false"
              aria-labelledby={titleId}
              style={{
                position: "fixed",
                top: position?.top ?? 0,
                left: position?.left ?? 0,
                width: position?.width ?? POPOVER_MAX_WIDTH,
                visibility: position ? "visible" : "hidden",
              }}
              // Solid `bg-bg-elevated` (not the translucent `glass-strong`
              // used elsewhere, e.g. the nav) -- that 82%-opacity glass was
              // exactly what let underlying page text bleed through and
              // compete with the popover's own text. This is the same
              // opaque warm-white/dark-ink surface token already used for
              // other solid cards (FAQAccordion, the language dropdown
              // panel), so it stays on the existing palette in both themes.
              className="z-[110] flex max-h-[min(75vh,28rem)] flex-col overflow-hidden rounded-2xl border border-surface-border bg-bg-elevated p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)]"
            >
              <span
                aria-hidden="true"
                className="absolute h-3 w-3 rotate-45 rounded-[2px] border border-surface-border bg-bg-elevated"
                style={{
                  left: (position?.tailLeft ?? 0) - 6,
                  top: position?.placeAbove ? "100%" : undefined,
                  bottom: position?.placeAbove ? undefined : "100%",
                  marginTop: position?.placeAbove ? -6 : undefined,
                  marginBottom: position?.placeAbove ? undefined : -6,
                }}
              />
              <div className="flex shrink-0 items-start justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <Info className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" strokeWidth={1.75} />
                  <h4 id={titleId} className="text-sm font-semibold text-fg">
                    {title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label={closeLabel}
                  className="-m-1 shrink-0 rounded-full p-1 text-fg-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              {/* Only the body scrolls (header stays pinned, keeping the
                  close button reachable) if translated copy is ever long
                  enough to exceed the viewport-based max-height above. */}
              <div className="mt-2 space-y-2 overflow-y-auto text-sm leading-relaxed text-fg-muted">
                {children}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";

/** Restrained, premium-feeling defaults — smooths wheel input only, leaves touch scrolling native. */
const LENIS_OPTIONS: LenisOptions = {
  duration: 1.1,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 0.9,
  touchMultiplier: 1,
  stopInertiaOnNavigate: true,
};

const HEADER_OFFSET_BUFFER = 16;

/** Disables Lenis entirely for visitors who prefer reduced motion, leaving native scrolling untouched. */
function ReducedMotionGuard() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenis.destroy();
    }
  }, [lenis]);

  return null;
}

/**
 * Keeps Lenis's virtual scroll position in sync with Next.js's own scroll-to-top on route changes.
 *
 * Skipped when the URL has a fragment: `/contact#contact-form` must land on the form, and this
 * reset also re-runs when the Lenis instance first becomes available -- which is what used to
 * throw a directly opened anchor link back to the top of the page. HashScroll handles those.
 */
function RouteScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

/**
 * An element's distance from the top of the document by layout alone. Unlike
 * getBoundingClientRect, offsetTop ignores CSS transforms, so the scroll-reveal
 * and page-entrance animations (which translate content while it fades in) do
 * not move the landing point halfway through.
 */
function layoutTop(el: HTMLElement): number {
  let top = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
}

/** How long after a back/forward navigation HashScroll leaves the scroll position to the browser. */
const POPSTATE_GRACE_MS = 1000;

/**
 * Lands on the element named by the URL fragment when a page is opened directly, refreshed, or
 * reached from another page with a `#section` link -- below the fixed header, not under it.
 *
 * The first alignment runs straight after mount. Content above the target can still change
 * height while the page settles (web fonts, images), so it re-aligns -- instantly, and only if
 * the target has actually moved -- once fonts are ready, once the page has loaded, and shortly
 * after mount. The first wheel, touch, key or
 * pointer input stops all of that, so it never pulls against a visitor who has started to
 * scroll. Back/forward navigation is left entirely to the browser.
 */
function HashScroll() {
  const lenis = useLenis();
  const pathname = usePathname();
  const lastPopState = useRef(-Infinity);

  useEffect(() => {
    const onPopState = () => {
      lastPopState.current = performance.now();
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;
    if (performance.now() - lastPopState.current < POPSTATE_GRACE_MS) return;

    let cancelled = false;
    const stop = () => {
      cancelled = true;
    };
    const inputs = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    for (const type of inputs) window.addEventListener(type, stop, { passive: true, once: true });

    const align = () => {
      if (cancelled) return;
      let target: Element | null = null;
      try {
        target = document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return;
      }
      if (!(target instanceof HTMLElement)) return;
      const header = document.querySelector("header");
      const clearance = (header?.getBoundingClientRect().height ?? 0) + HEADER_OFFSET_BUFFER;
      const top = Math.max(0, layoutTop(target) - clearance);
      if (Math.abs(window.scrollY - top) < 2) return;
      window.scrollTo({ top, behavior: "instant" });
      lenis?.scrollTo(top, { immediate: true, force: true });
    };

    align();
    const timers = [window.setTimeout(align, 50), window.setTimeout(align, 450)];
    void document.fonts?.ready.then(align);
    if (document.readyState !== "complete") window.addEventListener("load", align, { once: true });

    return () => {
      stop();
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("load", align);
      for (const type of inputs) window.removeEventListener(type, stop);
    };
  }, [pathname, lenis]);

  return null;
}

/**
 * Smoothly scrolls to same-page anchor targets through Lenis, offset by the fixed header's
 * actual measured height (not a hardcoded value), and keeps the URL hash shareable.
 */
function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const headerOffset = () => {
      const header = document.querySelector("header");
      return -((header?.getBoundingClientRect().height ?? 0) + HEADER_OFFSET_BUFFER);
    };

    const scrollToHash = (hash: string) => {
      const target = document.querySelector(hash);
      if (!(target instanceof HTMLElement)) return;
      lenis.scrollTo(target, { offset: headerOffset(), duration: 1.2 });
    };

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.pathname !== window.location.pathname || !url.hash) return;
      if (!document.querySelector(url.hash)) return;

      event.preventDefault();
      scrollToHash(url.hash);
      window.history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", handleClick);

    // Opening a page at a fragment (direct link, refresh, or from another page) is
    // handled by HashScroll; this component only owns same-page anchor clicks.
    return () => document.removeEventListener("click", handleClick);
  }, [lenis]);

  return null;
}

/**
 * Global smooth-scroll provider. Wraps the whole app in a single Lenis instance (via the
 * official `lenis/react` integration, which handles the requestAnimationFrame loop and
 * React Strict Mode's double-effect invocation internally) so it works consistently across
 * every route without re-initializing per page or per component.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <ReducedMotionGuard />
      <RouteScrollReset />
      <HashScroll />
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}

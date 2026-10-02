"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  type SyntheticEvent,
} from "react";
import { cn } from "@/lib/utils";

/*
 * Ported from the reference site's before/after slider. ARUBA DRAFT changes:
 * the decorative "teal" palette was removed (no teal tokens in this site),
 * and the handle, divider and Before/After captions use the gold accent.
 */

/**
 * Dev-only calibration aid, never present in a production bundle: the
 * `process.env.NODE_ENV !== "production"` check is a compile-time constant
 * that Next.js's build strips (dead-code-eliminates) entirely in production.
 * Add `?alignDebug=1` to any page URL in `next dev` to see, per slider: a red
 * crosshair at the container center, a green marker for the BEFORE photo's
 * anatomical anchor and another for AFTER's (both computed AFTER the
 * transform is applied -- at a correctly registered case they sit on top of
 * each other), and a full numeric breakdown of the geometry that produced
 * them, down to the anchor delta in pixels.
 */
const ALIGN_DEBUG_AVAILABLE = process.env.NODE_ENV !== "production";

/**
 * A normalized point in SOURCE-IMAGE space: 0,0 is the photo's top-left
 * corner, 1,1 is its bottom-right corner, regardless of the photo's actual
 * pixel dimensions. An anchor should mark the same physical anatomical
 * landmark (the dental midline / contact point between the upper central
 * incisors, by default) in both the before and after photo -- see
 * `AnchoredImageAlignment`.
 */
export type ImageAnchor = { x: number; y: number };

/**
 * One photo's calibration: `scale` is the additional zoom applied on top of
 * whatever object-fit already does (1 = no extra zoom; never construct this
 * with a scale below 1, since the safety clamp in `computeAnchoredTransform`
 * already assumes the object-fit baseline is the minimum). `anchor` is that
 * photo's normalized source-image coordinate for the shared landmark.
 */
export type AnchoredImageAlignment = {
  scale: number;
  anchor: ImageAnchor;
};

/**
 * A case's alignment at one breakpoint tier: independent before/after
 * calibration, plus an optional shared `target` -- the normalized point in
 * the CONTAINER (not the photo) where both anchors should land. Defaults to
 * dead center (0.5, 0.5); override only when a case benefits from anchoring
 * off-center (e.g. to leave more room below for a caption).
 */
export type ResponsiveAlignment = {
  before: AnchoredImageAlignment;
  after: AnchoredImageAlignment;
  target?: ImageAnchor;
};

/**
 * A case's complete anatomically-anchored alignment, one `ResponsiveAlignment`
 * per breakpoint tier. `tablet` is optional and falls back to `desktop` when
 * omitted. Used by the cases in beforeAfterCases.ts that have been through
 * landmark identification (case-06, case-09, case-12).
 */
export type AnchorCaseAlignment = {
  desktop: ResponsiveAlignment;
  tablet?: ResponsiveAlignment;
  mobile: ResponsiveAlignment;
};

/**
 * One photo's pre-anchor calibration: `scale` zooms in around the image's
 * own center (>1 = zoom in, never construct below 1); `translateX`/
 * `translateY` then shift the already-scaled image, as a percentage of the
 * container's width/height (positive X = right, positive Y = down). Applied
 * once, statically -- unlike `AnchoredImageAlignment`, nothing here is
 * recalculated from live container/image pixel measurements, so the same
 * numbers apply at every breakpoint.
 */
export type LegacyImageTransform = {
  scale?: number;
  translateX?: number;
  translateY?: number;
};

/**
 * The pre-anchor alignment shape: independent before/after pan/zoom, no
 * breakpoint tiers. This is the long-standing system every gallery case
 * other than case-09 still uses -- kept alive here (rather than migrated)
 * specifically so those cases keep rendering exactly as they did before the
 * anchor-registration work started, until each is individually recalibrated.
 */
export type LegacyCaseAlignment = {
  before?: LegacyImageTransform;
  after?: LegacyImageTransform;
};

/**
 * A case's before/after alignment -- either the new anatomically-anchored
 * system (`AnchorCaseAlignment`) or the older flat percentage system
 * (`LegacyCaseAlignment`). Use `isAnchorCaseAlignment` to tell them apart at
 * runtime: an anchor alignment always has a `desktop` key, a legacy one
 * never does (it only ever has `before`/`after`).
 */
export type CaseAlignment = LegacyCaseAlignment | AnchorCaseAlignment;

export function isAnchorCaseAlignment(alignment: CaseAlignment): alignment is AnchorCaseAlignment {
  return "desktop" in alignment;
}

const DEFAULT_TARGET: ImageAnchor = { x: 0.5, y: 0.5 };

type PixelSize = { width: number; height: number };

/**
 * The full result of registering one photo's anchor to the shared target,
 * in the container's own pixel space -- both the CSS transform to apply and
 * every intermediate value the debug overlay needs to explain it.
 */
type ComputedAnchorTransform = {
  translateX: number;
  translateY: number;
  scale: number;
  coverScale: number;
  renderedWidth: number;
  renderedHeight: number;
  cropX: number;
  cropY: number;
  screenAnchorX: number;
  screenAnchorY: number;
  clamped: boolean;
};

/**
 * The mathematical core of the alignment system. Given the photo's real
 * (natural) pixel dimensions and the container's actual rendered pixel
 * dimensions, this calculates exactly how `object-fit` has already placed
 * the photo (Step 3: cover/contain geometry), then solves for the uniform
 * scale + pixel translation that puts this photo's anchor at the shared
 * target position (Steps 4-5) -- clamped so the photo can never expose an
 * empty edge of its container (Step 10: if the requested anchor position
 * would require pulling the photo further than its own edge, the scale is
 * increased just enough to make it reachable, rather than leaving a gap).
 */
function computeAnchoredTransform(
  container: PixelSize,
  natural: PixelSize,
  alignment: AnchoredImageAlignment,
  target: ImageAnchor,
  fit: "cover" | "contain"
): ComputedAnchorTransform {
  const coverScale =
    fit === "contain"
      ? Math.min(container.width / natural.width, container.height / natural.height)
      : Math.max(container.width / natural.width, container.height / natural.height);

  const renderedWidth = natural.width * coverScale;
  const renderedHeight = natural.height * coverScale;
  const cropX = (renderedWidth - container.width) / 2;
  const cropY = (renderedHeight - container.height) / 2;

  const baseAnchorX = alignment.anchor.x * renderedWidth - cropX;
  const baseAnchorY = alignment.anchor.y * renderedHeight - cropY;

  const cx = container.width / 2;
  const cy = container.height / 2;
  const targetX = target.x * container.width;
  const targetY = target.y * container.height;

  let scale = Math.max(alignment.scale, 1);
  let clamped = false;

  const solve = (s: number) => ({
    translateX: targetX - (cx + (baseAnchorX - cx) * s),
    translateY: targetY - (cy + (baseAnchorY - cy) * s),
  });

  // Step 10: "contain" is deliberately letterboxed -- gaps there are the
  // point, not a bug -- so the coverage clamp only applies to "cover".
  if (fit === "cover") {
    const fitsAt = (s: number) => {
      const { translateX, translateY } = solve(s);
      const boundX = (renderedWidth * s) / 2 - container.width / 2;
      const boundY = (renderedHeight * s) / 2 - container.height / 2;
      return Math.abs(translateX) <= boundX + 0.01 && Math.abs(translateY) <= boundY + 0.01;
    };
    let iterations = 0;
    while (!fitsAt(scale) && iterations < 80) {
      scale *= 1.02;
      clamped = true;
      iterations++;
    }
  }

  let { translateX, translateY } = solve(scale);

  if (fit === "cover") {
    const boundX = (renderedWidth * scale) / 2 - container.width / 2;
    const boundY = (renderedHeight * scale) / 2 - container.height / 2;
    const clampedX = Math.max(-boundX, Math.min(boundX, translateX));
    const clampedY = Math.max(-boundY, Math.min(boundY, translateY));
    if (clampedX !== translateX || clampedY !== translateY) clamped = true;
    translateX = clampedX;
    translateY = clampedY;
  }

  return {
    translateX,
    translateY,
    scale,
    coverScale,
    renderedWidth,
    renderedHeight,
    cropX,
    cropY,
    screenAnchorX: cx + (baseAnchorX - cx) * scale + translateX,
    screenAnchorY: cy + (baseAnchorY - cy) * scale + translateY,
    clamped,
  };
}

function transformStyle(computed: ComputedAnchorTransform | null): CSSProperties {
  if (!computed) {
    return { transform: "translate3d(0px, 0px, 0) scale(1)", transformOrigin: "center center" };
  }
  return {
    transform: `translate3d(${computed.translateX.toFixed(2)}px, ${computed.translateY.toFixed(2)}px, 0) scale(${computed.scale.toFixed(4)})`,
    transformOrigin: "center center",
  };
}

/** Renders a `LegacyImageTransform` exactly as the pre-anchor system did -- a static, container-relative-percentage transform, unchanged from before this session's alignment-architecture work began. */
function legacyTransformStyle(t?: LegacyImageTransform): CSSProperties | undefined {
  if (!t) return undefined;
  const { scale = 1, translateX = 0, translateY = 0 } = t;
  return { transform: `translate(${translateX}%, ${translateY}%) scale(${scale})` };
}

type Breakpoint = "mobile" | "tablet" | "desktop";

/** Matches the project's Tailwind `sm`/`lg` breakpoints (640px/1024px are the nearest standard steps; 768px is used here to match `md`, the width every other responsive card layout in this project switches on). */
function getBreakpoint(width: number): Breakpoint {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/** SSR-safe: defaults to "desktop" (matches server-rendered markup) and corrects on mount + resize. */
function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
  useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return breakpoint;
}

function resolveAlignment(alignment: AnchorCaseAlignment | undefined, breakpoint: Breakpoint): ResponsiveAlignment | undefined {
  if (!alignment) return undefined;
  if (breakpoint === "mobile") return alignment.mobile;
  if (breakpoint === "tablet") return alignment.tablet ?? alignment.desktop;
  return alignment.desktop;
}

/** Tracks a DOM element's live rendered pixel size (Step 7): recalculates on mount and on every resize, including container-only resizes a window resize wouldn't catch (e.g. a breakpoint changing the card's own layout width). */
function useElementSize(ref: RefObject<HTMLElement | null>): PixelSize {
  const [size, setSize] = useState<PixelSize>({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

/** Captures an <img>'s real (natural) pixel dimensions once it finishes loading -- the other half of Step 7's "actual rendered container, not guessed percentages." */
function useNaturalSize(): [PixelSize | null, (e: SyntheticEvent<HTMLImageElement>) => void] {
  const [size, setSize] = useState<PixelSize | null>(null);
  const onLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      setSize({ width: img.naturalWidth, height: img.naturalHeight });
    }
  }, []);
  return [size, onLoad];
}

const palettes = {
  gold: {
    before: "from-ink-700 via-ink-800 to-ink-900",
    after: "from-gold-200 via-ivory-100 to-gold-100 dark:from-gold-800 dark:via-ink-800 dark:to-gold-900",
  },
  ink: {
    before: "from-ink-700 via-ink-800 to-ink-900",
    after: "from-ivory-200 via-ivory-100 to-ivory-50 dark:from-ink-600 dark:via-ink-800 dark:to-ink-950",
  },
} as const;

type BeforeAfterSliderProps = {
  /** Decorative gradient flavor, used when no real photos are supplied. */
  palette?: keyof typeof palettes;
  className?: string;
  /** Tailwind aspect-ratio class for the container. Defaults to the original portrait crop. */
  aspectClassName?: string;
  /**
   * Raw CSS aspect-ratio value (e.g. "16 / 9"), for cases whose ratio is only
   * known at runtime (data-driven, varies per photo). Tailwind's JIT scanner
   * can't see dynamically-interpolated class names like `aspect-[${x}]`, so
   * this goes through inline style instead, which also just naturally wins
   * over aspectClassName since inline styles always beat classes.
   */
  aspectRatio?: string;
  /** Real case photos. When both are provided, they replace the decorative gradients. */
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  ariaLabel?: string;
  imageSizes?: string;
  /** Only set true for a slider that renders above the fold. */
  priority?: boolean;
  /**
   * This case's before/after alignment -- either the new anatomically-
   * anchored system or the older flat percentage system; see the
   * `CaseAlignment` doc comment above for how the two are told apart. Omit
   * for a pair that already lines up natively; the photo then renders with
   * plain object-fit and no extra transform, which is the only positioning
   * system in effect anywhere in this component --
   * there is no secondary `objectPosition` escape hatch layered on top of
   * it, so a photo's crop can never be fought over by two different props.
   */
  alignment?: CaseAlignment;
  /**
   * "cover" (default) fills the container, cropping any overflow -- ideal
   * when the source photo has margin to spare. "contain" shows the entire
   * photo letterboxed on a neutral card-matching background instead of
   * cropping -- use this for a source photo whose native framing is already
   * tighter than the container's aspect ratio (e.g. an extreme macro shot
   * with zero margin), so the container can still match every other
   * gallery card's size without cropping into teeth/lips to get there.
   */
  imageFit?: "cover" | "contain";
  /**
   * Omits the "Before" text badge only -- for a caller that already places
   * its own badge (e.g. a treatment-category pill) in that same top-left
   * corner, so the two never stack on top of each other. "After" always
   * renders (nothing else competes for the top-right corner), which keeps
   * the reveal direction legible even with this one hidden. Purely visual:
   * the slider's accessible name comes from `ariaLabel` on the handle, not
   * from this badge, so hiding it never reduces what's announced.
   */
  hideBeforeBadge?: boolean;
};

export function BeforeAfterSlider({
  palette = "gold",
  className,
  aspectClassName = "aspect-[4/5]",
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Before",
  afterLabel = "After",
  ariaLabel = "Compare before and after dental treatment",
  imageSizes = "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px",
  priority = false,
  aspectRatio,
  alignment,
  imageFit = "cover",
  hideBeforeBadge = false,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasRealImages = Boolean(beforeImage && afterImage);

  const anchorAlignment = alignment && isAnchorCaseAlignment(alignment) ? alignment : undefined;
  const legacyAlignment = alignment && !isAnchorCaseAlignment(alignment) ? alignment : undefined;

  const breakpoint = useBreakpoint();
  const resolved = resolveAlignment(anchorAlignment, breakpoint);
  const target = resolved?.target ?? DEFAULT_TARGET;

  const containerSize = useElementSize(containerRef);
  const [beforeNatural, onBeforeLoad] = useNaturalSize();
  const [afterNatural, onAfterLoad] = useNaturalSize();

  const beforeComputed =
    resolved && beforeNatural && containerSize.width > 0
      ? computeAnchoredTransform(containerSize, beforeNatural, resolved.before, target, imageFit)
      : null;
  const afterComputed =
    resolved && afterNatural && containerSize.width > 0
      ? computeAnchoredTransform(containerSize, afterNatural, resolved.after, target, imageFit)
      : null;

  // Anchor cases get the live-measured transform; legacy cases (everything
  // else, for now) get the original static percentage transform unchanged.
  const beforeStyle = anchorAlignment ? transformStyle(beforeComputed) : legacyTransformStyle(legacyAlignment?.before);
  const afterStyle = anchorAlignment ? transformStyle(afterComputed) : legacyTransformStyle(legacyAlignment?.after);

  const [debugOn, setDebugOn] = useState(false);
  useEffect(() => {
    if (!ALIGN_DEBUG_AVAILABLE) return;
    setDebugOn(new URLSearchParams(window.location.search).get("alignDebug") === "1");
  }, []);

  const x = useMotionValue(50);
  const clip = useTransform(x, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleLeft = useTransform(x, (v) => `${v}%`);

  // Keep aria-valuenow in sync without triggering a React re-render on every
  // drag frame (motion values bypass React's render cycle by design). Only
  // relevant when the slider carries real, informative content.
  useMotionValueEvent(x, "change", (latest) => {
    if (!hasRealImages) return;
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(latest)));
  });

  const setPercent = (pct: number) => {
    x.set(Math.min(100, Math.max(0, pct)));
  };

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPercent(((clientX - rect.left) / rect.width) * 100);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updateFromClientX(e.clientX);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    const target = e.target as HTMLElement;
    if (target.hasPointerCapture?.(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 5;
    const current = x.get();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPercent(current - step);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPercent(current + step);
    } else if (e.key === "Home") {
      e.preventDefault();
      setPercent(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPercent(100);
    }
  };

  const colors = palettes[palette];
  // "contain" letterboxes on a neutral card-matching backdrop rather than
  // the dark backdrop used behind cover-fit images (which is only ever
  // visible as a brief loading flash, never as a deliberate mat).
  const realImageBg = imageFit === "contain" ? "bg-bg-elevated" : "bg-ink-900";
  const afterLayerClasses = hasRealImages ? realImageBg : `noise-overlay bg-gradient-to-br ${colors.after}`;
  const beforeLayerClasses = hasRealImages ? realImageBg : `noise-overlay bg-gradient-to-br ${colors.before}`;
  const imageFitClass = imageFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-full touch-pan-y select-none overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-28px_rgba(24,28,20,0.35)] ring-1 ring-black/5 transition-shadow duration-[250ms] hover:shadow-[0_32px_72px_-24px_rgba(24,28,20,0.42)] dark:ring-white/10",
        aspectClassName,
        className
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* After (base layer) */}
      <div className={cn("absolute inset-0 overflow-hidden", afterLayerClasses)}>
        {hasRealImages && (
          // The alignment transform lives on this wrapper, not the <Image>
          // itself -- Next.js's `fill` mode fills whatever box it's given,
          // so scaling/translating this ancestor repositions the photo
          // without ever touching the shared clip-path layer the slider
          // reveals (see `computeAnchoredTransform` above).
          <div className="absolute inset-0" style={afterStyle}>
            <Image
              src={afterImage as string}
              alt={afterAlt}
              fill
              draggable={false}
              sizes={imageSizes}
              priority={priority}
              onLoad={onAfterLoad}
              className={imageFitClass}
            />
          </div>
        )}
        {/* Understated editorial caption, not a UI badge: plain small-caps
            text with just a drop-shadow for contrast (no pill, no border) --
            a soft top scrim backs it up on photos too light for the shadow
            alone to keep it legible, without reading as an overlay itself. */}
        {hasRealImages && <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent" />}
        <span className="absolute right-4 top-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
          {afterLabel}
        </span>
      </div>

      {/* Before (clipped layer) */}
      <motion.div style={{ clipPath: clip }} className={cn("absolute inset-0 overflow-hidden", beforeLayerClasses)}>
        {hasRealImages && (
          <div className="absolute inset-0" style={beforeStyle}>
            <Image
              src={beforeImage as string}
              alt={beforeAlt}
              fill
              draggable={false}
              sizes={imageSizes}
              priority={priority}
              onLoad={onBeforeLoad}
              className={imageFitClass}
            />
          </div>
        )}
        {!hideBeforeBadge && (
          <>
            {hasRealImages && <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent" />}
            <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
              {beforeLabel}
            </span>
          </>
        )}
      </motion.div>

      {/* Divider line: soft glow + hairline core for a more refined, less "app-default" look */}
      <motion.div
        style={{ left: handleLeft }}
        className="pointer-events-none absolute inset-y-0 z-10 -translate-x-1/2"
      >
        <div className="h-full w-[3px] bg-gold-100 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_0_16px_rgba(234,220,187,0.7)]" />
      </motion.div>

      {/* Interactive handle. ARIA slider semantics only apply when there is
          real, informative content to compare -- a purely decorative
          gradient placeholder has nothing to announce and is hidden from
          the accessibility tree instead of exposing a misleading slider. */}
      <motion.div
        ref={handleRef}
        role={hasRealImages ? "slider" : undefined}
        tabIndex={hasRealImages ? 0 : -1}
        aria-hidden={hasRealImages ? undefined : true}
        aria-label={hasRealImages ? ariaLabel : undefined}
        aria-valuemin={hasRealImages ? 0 : undefined}
        aria-valuemax={hasRealImages ? 100 : undefined}
        aria-valuenow={hasRealImages ? 50 : undefined}
        aria-orientation={hasRealImages ? "horizontal" : undefined}
        onKeyDown={hasRealImages ? handleKeyDown : undefined}
        style={{ left: handleLeft }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          // Refined and small (36px, within the 34-40px target at every
          // breakpoint) rather than the previous 44px floating-button look --
          // a soft shadow and hairline border instead of the heavier one so
          // it reads as a precision instrument on the photograph, not a UI
          // control sitting on top of it.
          "absolute top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-accent/60 bg-bg-elevated/95 text-accent-deep shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35)] outline-none backdrop-blur-sm dark:text-accent",
          hasRealImages && "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        )}
      >
        <ChevronsLeftRight className="h-3.5 w-3.5" strokeWidth={2} />
      </motion.div>

      {ALIGN_DEBUG_AVAILABLE && debugOn && hasRealImages && (
        <div className="pointer-events-none absolute inset-0 z-30 overflow-visible">
          {/* Red: container center (the box, NOT necessarily the target). */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-red-500/60" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-red-500/60" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500 bg-red-500/30" />

          {/* Green: each photo's actual anatomical anchor, computed AFTER
              its transform is applied. At a correctly registered case these
              two dots sit exactly on top of each other (and on the target,
              which defaults to the red crosshair but can be overridden). */}
          {beforeComputed && (
            <div
              className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-lime-400 bg-lime-400/40"
              style={{ left: beforeComputed.screenAnchorX, top: beforeComputed.screenAnchorY }}
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-lime-300">B</span>
            </div>
          )}
          {afterComputed && (
            <div
              className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-400 bg-emerald-400/40"
              style={{ left: afterComputed.screenAnchorX, top: afterComputed.screenAnchorY }}
            >
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-300">A</span>
            </div>
          )}

          <div className="absolute inset-x-1 top-1 flex flex-wrap gap-1 font-mono text-[9px] leading-tight text-lime-300">
            <div className="rounded bg-black/85 px-1.5 py-1">breakpoint: {breakpoint}</div>
            <div className="rounded bg-black/85 px-1.5 py-1">
              container: {containerSize.width.toFixed(0)}x{containerSize.height.toFixed(0)}
            </div>
            {!alignment && <div className="rounded bg-black/85 px-1.5 py-1 text-amber-300">alignment: none (identity)</div>}
            {legacyAlignment && (
              <div className="rounded bg-black/85 px-1.5 py-1 text-sky-300">
                alignment: legacy before(scale {legacyAlignment.before?.scale ?? 1}, x {legacyAlignment.before?.translateX ?? 0}, y{" "}
                {legacyAlignment.before?.translateY ?? 0}) after(scale {legacyAlignment.after?.scale ?? 1}, x{" "}
                {legacyAlignment.after?.translateX ?? 0}, y {legacyAlignment.after?.translateY ?? 0}) -- not anchor-visualized
              </div>
            )}
            {resolved && beforeNatural && afterNatural && (
              <>
                <div className="w-full" />
                <div className="rounded bg-black/85 px-1.5 py-1">
                  before: src {beforeNatural.width}x{beforeNatural.height} anchor ({resolved.before.anchor.x.toFixed(3)},{" "}
                  {resolved.before.anchor.y.toFixed(3)}) inScale {resolved.before.scale.toFixed(2)}
                </div>
                <div className="rounded bg-black/85 px-1.5 py-1">
                  after: src {afterNatural.width}x{afterNatural.height} anchor ({resolved.after.anchor.x.toFixed(3)},{" "}
                  {resolved.after.anchor.y.toFixed(3)}) inScale {resolved.after.scale.toFixed(2)}
                </div>
                {beforeComputed && (
                  <div className="rounded bg-black/85 px-1.5 py-1">
                    before: cover {beforeComputed.coverScale.toFixed(3)} rendered {beforeComputed.renderedWidth.toFixed(0)}x
                    {beforeComputed.renderedHeight.toFixed(0)} crop ({beforeComputed.cropX.toFixed(0)},{" "}
                    {beforeComputed.cropY.toFixed(0)}) scale {beforeComputed.scale.toFixed(3)} translate (
                    {beforeComputed.translateX.toFixed(1)}px, {beforeComputed.translateY.toFixed(1)}px){" "}
                    {beforeComputed.clamped ? "[clamped]" : ""}
                  </div>
                )}
                {afterComputed && (
                  <div className="rounded bg-black/85 px-1.5 py-1">
                    after: cover {afterComputed.coverScale.toFixed(3)} rendered {afterComputed.renderedWidth.toFixed(0)}x
                    {afterComputed.renderedHeight.toFixed(0)} crop ({afterComputed.cropX.toFixed(0)},{" "}
                    {afterComputed.cropY.toFixed(0)}) scale {afterComputed.scale.toFixed(3)} translate (
                    {afterComputed.translateX.toFixed(1)}px, {afterComputed.translateY.toFixed(1)}px){" "}
                    {afterComputed.clamped ? "[clamped]" : ""}
                  </div>
                )}
                {beforeComputed && afterComputed && (
                  <div
                    className={cn(
                      "rounded px-1.5 py-1",
                      Math.abs(beforeComputed.screenAnchorX - afterComputed.screenAnchorX) < 2 &&
                        Math.abs(beforeComputed.screenAnchorY - afterComputed.screenAnchorY) < 2
                        ? "bg-emerald-900/90 text-emerald-300"
                        : "bg-red-900/90 text-red-300"
                    )}
                  >
                    anchor delta: X {(beforeComputed.screenAnchorX - afterComputed.screenAnchorX).toFixed(1)}px Y{" "}
                    {(beforeComputed.screenAnchorY - afterComputed.screenAnchorY).toFixed(1)}px
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Very subtle scroll-linked depth for a single feature image/media block --
 * desktop (real hover + fine pointer) only, and only when the user hasn't
 * asked for reduced motion. transform-only (no layout properties touched),
 * so it can never cause a layout shift or affect an inner slider's crop.
 * Shared by every homepage moment that deserves this cue (Hero, the
 * Signature Transformation slider) instead of duplicating the logic.
 */
export function useDepthParallax(range: [number, number] = [-8, 8]) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(desktopQuery.matches && !motionQuery.matches);
    update();
    desktopQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      desktopQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const depthY = useTransform(scrollYProgress, [0, 1], range);

  return { ref, y: (enabled ? depthY : 0) as MotionValue<number> | number };
}

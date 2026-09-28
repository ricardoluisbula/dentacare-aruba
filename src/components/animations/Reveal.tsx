"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Shared premium easing curve for the sitewide scroll-reveal system. */
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

type RevealTag = "div" | "span" | "li" | "h1" | "h2" | "h3" | "p";

/**
 * Fades content in and moves it gently upward as it enters the viewport.
 * Plays once per element (`viewport.once`). Respects prefers-reduced-motion
 * globally via <MotionConfig reducedMotion="user"> in MotionProvider, and
 * degrades to fully visible, un-animated content if JavaScript never loads
 * (see the [data-reveal] rules in globals.css and the root layout's
 * <noscript> fallback).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  distance = 18,
  fadeOnly = false,
  scale,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  /** Optional element id, e.g. a stable anchor on a revealed heading. */
  id?: string;
  /** Seconds to wait before starting, for staggering sibling Reveals. */
  delay?: number;
  duration?: number;
  /** Starting vertical offset in pixels; ignored when fadeOnly is true. */
  distance?: number;
  /** Opacity-only reveal, no vertical movement -- for the hero media/slider. */
  fadeOnly?: boolean;
  /**
   * Optional starting scale (e.g. 0.985) that eases to 1 alongside the fade
   * -- opt-in only, so every existing caller is completely unaffected.
   * Intended for a handful of large "feature" images, not cards or grids.
   */
  scale?: number;
  as?: RevealTag;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      id={id}
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: fadeOnly ? 0 : distance, ...(scale !== undefined ? { scale } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale !== undefined ? { scale: 1 } : {}) }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease: REVEAL_EASE }}
    >
      {children}
    </MotionTag>
  );
}

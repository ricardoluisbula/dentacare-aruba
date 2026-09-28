"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { REVEAL_EASE } from "@/components/animations/Reveal";

/**
 * Raw variants for card components that are already their own `motion.div`
 * (e.g. ReviewCard) -- pass directly as `variants={staggerItemVariants}`
 * inside a <StaggerGroup> instead of wrapping with <StaggerItem>.
 */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: REVEAL_EASE } },
};

/** A single item inside a <StaggerGroup>. Inherits its reveal timing from the parent's stagger. */
export function StaggerItem({
  children,
  className,
  as = "div",
  layout = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  /** Enable Framer Motion's layout animation, e.g. for filterable grids that reflow. */
  layout?: boolean;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag data-reveal="" className={className} variants={staggerItemVariants} layout={layout}>
      {children}
    </MotionTag>
  );
}

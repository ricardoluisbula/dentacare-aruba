"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Parent wrapper for a group of comparable elements (cards, list items) that
 * should reveal one after another as the group enters the viewport. Pair
 * with <StaggerItem> for each child. Plays once per group.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
  amount = 0.2,
  "data-lenis-prevent": dataLenisPrevent,
}: {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's reveal start. */
  stagger?: number;
  delayChildren?: number;
  /**
   * Fraction of the group's own bounding box that must be in view before its
   * children reveal (framer-motion's `viewport.amount`). Defaults to 0.2, a
   * fine threshold for the short 1-2 row groups every other caller uses.
   * A group with many rows (e.g. a 15-card review grid spanning 5 rows) can
   * become tall enough that 20% of its *own* height is still hundreds of
   * pixels below the fold, so its children stay invisible for far longer
   * than a user would scroll before assuming the section is broken -- pass
   * a smaller number (or "some", which fires as soon as any part of the
   * group is visible) for that kind of long, multi-row group instead.
   */
  amount?: number | "some" | "all";
  /** Set on independently-scrollable groups (e.g. a horizontal carousel) so Lenis leaves them to native scroll. */
  "data-lenis-prevent"?: boolean;
}) {
  return (
    <motion.div
      className={className}
      data-lenis-prevent={dataLenisPrevent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

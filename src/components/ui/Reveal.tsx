"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  "data-lenis-prevent": dataLenisPrevent,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  /** Set on independently-scrollable groups (e.g. a horizontal carousel) so Lenis leaves them to native scroll. */
  "data-lenis-prevent"?: boolean;
}) {
  return (
    <motion.div
      className={className}
      data-lenis-prevent={dataLenisPrevent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

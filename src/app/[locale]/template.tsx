"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { REVEAL_EASE } from "@/components/animations/Reveal";

/**
 * Next.js re-mounts `template.tsx` (unlike `layout.tsx`, which persists) on
 * every route change, giving each page a fresh entrance without an exit
 * transition -- deliberately one-way and understated, not a flashy route
 * transition. A touch of vertical settle alongside the fade (rather than a
 * flat opacity swap) gives new pages the same quiet "arrival" feel as every
 * other reveal on the site, using the same shared easing curve. Wraps only
 * the routed page content inside `<main>` (see layout.tsx), never the
 * persistent header/footer/floating buttons. Inherits reduced-motion
 * handling for free from MotionProvider's <MotionConfig reducedMotion="user">
 * higher up the tree.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Makes every Framer Motion animation sitewide respect the user's prefers-reduced-motion setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

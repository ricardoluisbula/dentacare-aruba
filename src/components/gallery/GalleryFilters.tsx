"use client";

import { motion } from "framer-motion";
import type { CategoryIconComponent } from "@/components/gallery/categoryMeta";
import { cn } from "@/lib/utils";

export type GalleryFilterValue =
  | "all"
  | "smile-rehabilitation"
  | "composite-bonding"
  | "crowns"
  | "veneers"
  | "emergency";

export function GalleryFilters({
  options,
  active,
  onChange,
}: {
  options: { value: GalleryFilterValue; label: string; icon: CategoryIconComponent }[];
  active: GalleryFilterValue;
  onChange: (value: GalleryFilterValue) => void;
}) {
  return (
    <div
      role="group"
      data-lenis-prevent
      /*
        Below `sm` the pill row scrolls sideways and bleeds to the screen
        edges, which means cancelling the container's own horizontal padding
        with an equal negative margin. `container-lux` pads by 1.25rem at this
        breakpoint (see globals.css), so the pair here must be -mx-5/px-5:
        the previous -mx-6/px-6 overshot by 4px on each side and pushed the
        whole document 5px wider than the viewport, giving every page with a
        filter row a horizontal scrollbar on a phone. The `sm:` overrides
        cancel both once the row wraps instead of scrolling.
      */
      className="-mx-5 flex items-center gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {options.map((option) => {
        const isActive = option.value === active;
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "border-transparent text-accent-contrast shadow-[0_10px_28px_-10px_var(--accent)]"
                : "border-surface-border text-fg-muted hover:-translate-y-0.5 hover:border-accent/40 hover:text-fg hover:shadow-[0_6px_18px_-12px_rgba(0,0,0,0.25)]"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="gallery-filter-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full bg-accent"
              />
            )}
            <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

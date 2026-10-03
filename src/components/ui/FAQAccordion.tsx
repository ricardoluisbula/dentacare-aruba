"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type FAQItem = {
  question: string;
  answer: string;
};

export function FAQAccordion({ items, className }: { items: FAQItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={cn("flex flex-col divide-y divide-surface-border rounded-3xl border border-surface-border bg-bg-elevated", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const buttonId = `${baseId}-button-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:px-8"
              >
                <span className="font-display text-base text-fg sm:text-lg">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-accent transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-fg-muted sm:px-8 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

"use client";

// Ported from the reference site's lightbox. ARUBA DRAFT: English only, and
// the price / price-note lines were removed.

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import type { BeforeAfterCase } from "@/data/beforeAfterCases";
import { cn } from "@/lib/utils";
import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { GALLERY_CATEGORY_TREATMENT, treatmentDetailPath } from "@/lib/treatmentLinks";

export function GalleryModal({
  item,
  onClose,
  onPrev,
  onNext,
  labels,
}: {
  item: BeforeAfterCase | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  labels: { before: string; after: string; close: string; previous: string; next: string; sliderLabel: string };
}) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!item) return;

    triggerRef.current = document.activeElement;
    closeButtonRef.current?.focus();
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        onPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        onNext();
        return;
      }
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [item, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-md sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-full w-full max-w-4xl flex-col gap-6 overflow-y-auto rounded-[2rem] bg-bg-elevated p-5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.55)] sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-bg-elevated/90 text-fg backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>

            <div className="relative">
              <BeforeAfterSlider
                key={item.id}
                aspectClassName="aspect-[16/10]"
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeAlt={item.beforeAlt}
                afterAlt={item.afterAlt}
                beforeLabel={labels.before}
                afterLabel={labels.after}
                ariaLabel={`${labels.sliderLabel}: ${item.title}`}
                imageSizes="(max-width: 900px) 100vw, 900px"
                imageFit={item.imageFit}
                alignment={item.alignment}
                priority
              />

              <button
                type="button"
                onClick={onPrev}
                aria-label={labels.previous}
                className={cn(
                  "absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:-left-4"
                )}
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label={labels.next}
                className={cn(
                  "absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:-right-4"
                )}
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 text-center">
              <h2 id="gallery-modal-title" className="font-display text-2xl text-fg">
                {item.title}
              </h2>
              <p className="mx-auto max-w-md text-sm text-fg-muted">{item.description}</p>
              <RelatedTreatmentLink category={item.treatmentCategories[0]} label={t.smileGallery.relatedTreatment} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * "Related treatment" link from a case to the page for the treatment it shows.
 * Nothing renders for a category without a single matching treatment page
 * (see GALLERY_CATEGORY_TREATMENT).
 */
function RelatedTreatmentLink({ category, label }: { category: BeforeAfterCase["treatmentCategories"][number]; label: string }) {
  const { t } = useTranslation();
  const slug = GALLERY_CATEGORY_TREATMENT[category];
  if (!slug) return null;
  return (
    <p className="mt-2 text-sm text-fg-muted">
      <span className="sr-only">{label}: </span>
      <Link
        href={treatmentDetailPath(slug)}
        className="-mx-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-2 font-medium text-accent-deep transition-colors hover:text-accent-deep/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-accent dark:hover:text-accent/80"
      >
        {t.treatmentsPage.treatmentLinks[slug]}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </p>
  );
}

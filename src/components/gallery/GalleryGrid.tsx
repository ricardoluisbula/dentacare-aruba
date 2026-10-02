"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { beforeAfterCases, type BeforeAfterCase, type TreatmentCategory } from "@/data/beforeAfterCases";
import { BeforeAfterSlider } from "@/components/gallery/BeforeAfterSlider";
import { GalleryFilters, type GalleryFilterValue } from "@/components/gallery/GalleryFilters";
import { CATEGORY_ICON, CATEGORY_FILTER_KEY, ALL_RESULTS_ICON, type CategoryIconComponent } from "@/components/gallery/categoryMeta";
import { GALLERY_FILTER_HASH_PREFIX } from "@/lib/treatmentLinks";
import { staggerItemVariants } from "@/components/animations/StaggerItem";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/*
 * Ported from the reference site's gallery grid. ARUBA DRAFT changes: English
 * only (no per-locale case data), no price line on the cards, and only
 * categories that actually have a case get a filter pill. A link such as
 * `/smile-gallery#results-crowns` (see `galleryResultsPath` in
 * src/lib/treatmentLinks.ts) opens the grid with that category selected.
 */

// Lightbox is only needed once a card is clicked -- deferring its chunk
// (and framer-motion's AnimatePresence usage inside it) keeps it out of the
// initial /smile-gallery JS payload. Its content duplicates the grid cards,
// so there's no SEO/content loss from loading it lazily.
const GalleryModal = dynamic(() => import("@/components/gallery/GalleryModal").then((m) => m.GalleryModal));

/**
 * Grid-only overrides for cases whose source photos don't match the shared
 * 16/9 tier closely enough for object-cover without cropping into the
 * smile. Each entry's data record keeps a safe imageFit:"contain" default
 * (used by the lightbox modal, which always renders at a fixed 16/10 box),
 * while here in the grid we instead give the card its own near-native
 * aspect ratio + "cover" so the photo fills it edge-to-edge with only a
 * small, imperceptible crop -- far less than forcing the standard 16/9
 * tier would cause.
 */
const GRID_COVER_OVERRIDES: Record<string, string> = {
  // Porcelain Veneers (before 810x251, ~3.227/1 native; after 803x271,
  // ~2.963/1 native). Using "after"'s own (narrower) native ratio as the
  // container means "after" needs zero crop at all, and "before" only ever
  // crops horizontally (never top/bottom, ~4% off each side) -- a
  // narrower-or-equal container always crops purely horizontally (see
  // computeAnchoredTransform's coverScale math in BeforeAfterSlider.tsx).
  "case-05": "803 / 271",
  // Anchor-based alignment (see beforeAfterCases.ts): wider than this case's
  // own AFTER-native ratio on purpose. A zero-crop container here still
  // forced ~1.2x zoom, which read as too tight; this wider ratio (just past
  // the numerically-solved minimum, ~2.7477) lets both photos render at
  // scale 1.0 by using vertical margin that was already safe to crop -- see
  // the case-12 alignment comment for the measured crop windows this relies on.
  "case-12": "2.76 / 1", // Porcelain Veneers
};

/**
 * Editorial, magazine-style rhythm instead of a repetitive equal grid: a
 * 12-column track with each card's width cycling every 6 cards, so no two
 * consecutive rows read the same width pattern. Heights are never forced to
 * match; each card sizes to its own image + copy.
 */
const CARD_LAYOUT = [
  { span: "lg:col-span-4" },
  { span: "lg:col-span-4" },
  { span: "lg:col-span-4" },
  { span: "sm:col-span-2 lg:col-span-6" },
  { span: "lg:col-span-3" },
  { span: "lg:col-span-3" },
] as const;

/**
 * Display order for grouping the default ("all") gallery view by treatment
 * category: Porcelain Veneers first, then Crowns, per the clinic's ordering
 * request on the reference site. Any other category present in the data
 * (e.g. Emergency) is appended after these two, in the order it first
 * appears among the (non-featured) cases. Categories with zero cases are
 * never grouped/rendered.
 */
const PRIMARY_CATEGORY_ORDER: TreatmentCategory[] = ["veneers", "crowns"];

/** Every filter pill, in display order; only those with at least one grid case are shown. */
const FILTER_ORDER: TreatmentCategory[] = ["composite-bonding", "crowns", "veneers", "emergency", "smile-rehabilitation"];

type CategoryGroup = { category: TreatmentCategory; items: BeforeAfterCase[] };

/** Groups cases by their primary (first-listed) treatment category, in `PRIMARY_CATEGORY_ORDER` followed by first-appearance order for the rest. Case order *within* a group is preserved exactly as it appears in the source data. */
function groupByCategory(cases: BeforeAfterCase[]): CategoryGroup[] {
  const order: TreatmentCategory[] = [...PRIMARY_CATEGORY_ORDER];
  for (const item of cases) {
    const category = item.treatmentCategories[0];
    if (!order.includes(category)) order.push(category);
  }
  return order
    .map((category) => ({ category, items: cases.filter((item) => item.treatmentCategories[0] === category) }))
    .filter((group) => group.items.length > 0);
}

/**
 * Editorial section heading for one treatment group in the default ("all")
 * view: a small numeral, the category name (the same filter-pill label every
 * card's own eyebrow shows -- no new copy), and a hairline divider.
 */
function CategorySectionHeading({ index, label }: { index: number; label: string }) {
  return (
    <Reveal className="flex flex-col gap-4">
      <div className="flex items-baseline gap-4">
        <span className="font-display text-sm font-medium text-accent/70">{String(index).padStart(2, "0")}</span>
        <h3 className="font-display text-xl font-medium uppercase tracking-[0.15em] text-fg sm:text-2xl">{label}</h3>
      </div>
      <span aria-hidden className="h-px w-full bg-surface-border" />
    </Reveal>
  );
}

const gridCases = beforeAfterCases.filter((item) => !item.featured);
const availableCategories = FILTER_ORDER.filter((category) => gridCases.some((item) => item.treatmentCategories.includes(category)));

export function GalleryGrid() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<GalleryFilterValue>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Deep link from a treatment page ("#results-crowns"): select that
  // category once on mount and bring the grid into view. Read on the client
  // only, so the statically rendered page stays the same for every visitor.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash.startsWith(GALLERY_FILTER_HASH_PREFIX)) return;
    const category = hash.slice(GALLERY_FILTER_HASH_PREFIX.length) as TreatmentCategory;
    if (!availableCategories.includes(category)) return;
    setActiveFilter(category);
    rootRef.current?.scrollIntoView({ block: "start" });
  }, []);

  const filterOptions: { value: GalleryFilterValue; label: string; icon: CategoryIconComponent }[] = [
    { value: "all", label: t.smileGallery.filters.all, icon: ALL_RESULTS_ICON },
    ...availableCategories.map((category) => ({
      value: category,
      label: t.smileGallery.filters[CATEGORY_FILTER_KEY[category]],
      icon: CATEGORY_ICON[category],
    })),
  ];

  // In the "all" view, cases are grouped by treatment category so every case
  // belonging to the same treatment sits together. A single-category filter
  // renders as one plain (unheaded) group.
  const groups: CategoryGroup[] = useMemo(() => {
    if (activeFilter === "all") return groupByCategory(gridCases);
    const items = gridCases.filter((item) => item.treatmentCategories.includes(activeFilter as TreatmentCategory));
    return items.length > 0 ? [{ category: activeFilter as TreatmentCategory, items }] : [];
  }, [activeFilter]);

  const showHeadings = activeFilter === "all" && groups.length > 1;

  // The flat, absolutely-ordered list every card's modal open/prev/next
  // index refers to -- always the concatenation of the groups above, so it
  // matches on-screen order exactly.
  const filtered = useMemo(() => groups.flatMap((group) => group.items), [groups]);
  const indexById = useMemo(() => new Map(filtered.map((item, index) => [item.id, index] as const)), [filtered]);

  const openItem = openIndex !== null ? filtered[openIndex] : null;

  return (
    <div ref={rootRef} className="flex scroll-mt-28 flex-col gap-12">
      <GalleryFilters options={filterOptions} active={activeFilter} onChange={setActiveFilter} />

      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-28">
        {groups.map((group, groupIndex) => (
          <div key={group.category} className="flex flex-col gap-8 sm:gap-10">
            {showHeadings && (
              <CategorySectionHeading
                index={groupIndex + 1}
                label={t.smileGallery.filters[CATEGORY_FILTER_KEY[group.category]]}
              />
            )}

            <motion.div
              layout
              className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-7"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {group.items.map((item, localIndex) => {
                // A category with only one case gets a wider, centered card
                // instead of a narrow tile floating beside empty space.
                const layoutSpan =
                  group.items.length === 1 ? "lg:col-span-6 lg:col-start-4" : CARD_LAYOUT[localIndex % CARD_LAYOUT.length].span;
                const categoryLabel = t.smileGallery.filters[CATEGORY_FILTER_KEY[group.category]];
                const absoluteIndex = indexById.get(item.id)!;

                return (
                  <motion.div key={item.id} layout variants={staggerItemVariants} className={cn("group flex flex-col", layoutSpan)}>
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col overflow-hidden rounded-3xl border border-surface-border bg-bg-elevated shadow-[0_4px_18px_-14px_rgba(24,20,12,0.22)] transition-shadow duration-[350ms] hover:shadow-[0_18px_40px_-18px_rgba(24,20,12,0.28)]"
                    >
                      <BeforeAfterSlider
                        aspectRatio={GRID_COVER_OVERRIDES[item.id] ?? item.aspectRatio.replace("/", " / ")}
                        beforeImage={item.beforeImage}
                        afterImage={item.afterImage}
                        beforeAlt={item.beforeAlt}
                        afterAlt={item.afterAlt}
                        beforeLabel={t.smileGallery.before}
                        afterLabel={t.smileGallery.after}
                        ariaLabel={`${t.smileGallery.sliderLabel}: ${item.title}`}
                        imageSizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        imageFit={GRID_COVER_OVERRIDES[item.id] ? "cover" : item.imageFit}
                        alignment={item.alignment}
                        // Photography-led hover: the whole slider scales up
                        // fractionally (never translates), clipped by this
                        // card's own `overflow-hidden`, so it can never expose
                        // an empty edge. `motion-safe:` skips this entirely
                        // under prefers-reduced-motion.
                        className="!rounded-none !shadow-none !ring-0 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.015]"
                      />

                      {/* The whole content block is one button (not just the
                          "View case" line) so clicking the title, description, or
                          surrounding padding also opens the case -- the slider
                          above has its own pointer handlers and isn't part of
                          this element, so dragging it is never intercepted. */}
                      <button
                        type="button"
                        onClick={() => setOpenIndex(absoluteIndex)}
                        aria-label={`${t.smileGallery.viewCase}: ${item.title}`}
                        className="group/content flex w-full flex-col items-start px-6 pb-7 pt-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elevated"
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-deep dark:text-accent">
                          {categoryLabel}
                        </span>
                        <h3 className="mt-2 font-display text-lg text-fg">{item.title}</h3>
                        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent-deep transition-colors group-hover/content:text-accent dark:text-accent">
                          {t.smileGallery.viewCase}
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/content:translate-x-1"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </span>
                      </button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>

      <GalleryModal
        item={openItem}
        onClose={() => setOpenIndex(null)}
        onPrev={() => setOpenIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))}
        onNext={() => setOpenIndex((i) => (i === null ? null : (i + 1) % filtered.length))}
        labels={{
          before: t.smileGallery.before,
          after: t.smileGallery.after,
          close: t.smileGallery.modalClose,
          previous: t.smileGallery.modalPrevious,
          next: t.smileGallery.modalNext,
          sliderLabel: t.smileGallery.sliderLabel,
        }}
      />
    </div>
  );
}

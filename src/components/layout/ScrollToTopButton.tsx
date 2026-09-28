"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

const SHOW_AFTER_PX = 500;

/**
 * Bottom-right corner. (The reference site stacked this above a floating
 * WhatsApp button; that button is not part of the Aruba draft, so this now
 * takes the corner itself. If a floating contact button returns, move this
 * back up above it.)
 */
export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0 });
      return;
    }
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label={t.common.scrollToTop}
          data-floating-action=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-[background-color,box-shadow] duration-300 hover:bg-accent-deep hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:bottom-[calc(2rem+env(safe-area-inset-bottom))] sm:right-[calc(2rem+env(safe-area-inset-right))] sm:h-[52px] sm:w-[52px]"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

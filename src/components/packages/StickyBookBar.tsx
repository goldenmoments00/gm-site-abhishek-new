"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  BOOKING_URL,
  Celebration,
  formatINR,
  priceFrom,
} from "@/data/packages";

const RED = "#8a1212";

interface StickyBookBarProps {
  celebration: Celebration;
}

/**
 * Slim booking pill that appears once the visitor scrolls past the hero.
 * Reflects the currently selected celebration; dismissible.
 */
export default function StickyBookBar({ celebration }: StickyBookBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.85);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = visible && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 sm:bottom-6"
        >
          <div className="flex items-center gap-3 rounded-full bg-[#1a1a1a] py-2 pl-5 pr-2 text-[#FFF6E5] shadow-[0_18px_50px_rgba(26,26,26,0.45)]">
            <div className="min-w-0 flex-1">
              <p className="truncate font-morganite text-xl font-bold uppercase leading-none tracking-[0.08em]">
                {celebration.name}
              </p>
              <p className="truncate font-plusJakartaSans text-[11px] text-[#FFF6E5]/60">
                {celebration.packages.length}{" "}
                {celebration.packages.length === 1
                  ? "collection"
                  : "collections"}{" "}
                · from {formatINR(priceFrom(celebration))}
              </p>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded-full px-5 py-3 font-plusJakartaSans text-xs font-bold uppercase tracking-[0.15em] text-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              style={{ backgroundColor: RED }}
            >
              Book a date
            </a>
            <button
              type="button"
              aria-label="Dismiss booking bar"
              onClick={() => setDismissed(true)}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[#FFF6E5]/60 transition-colors hover:text-[#FFF6E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

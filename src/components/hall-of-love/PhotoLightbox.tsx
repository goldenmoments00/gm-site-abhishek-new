"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { HallOfLovePhoto } from "@/data/hallOfLoveData";

interface PhotoLightboxProps {
  photo: HallOfLovePhoto | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotoLightbox({
  photo,
  onClose,
  onNext,
  onPrev,
}: PhotoLightboxProps) {
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, onClose, onNext, onPrev]);

  // Handle swipe on mobile
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      onNext();
    }
    if (isRightSwipe) {
      onPrev();
    }
  };

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >


          {/* Navigation Buttons (Desktop mainly, hidden on small screens) */}
          <button
            onClick={onPrev}
            className="absolute left-6 top-1/2 z-50 -translate-y-1/2 hidden md:block rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:outline-none"
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={onNext}
            className="absolute right-6 top-1/2 z-50 -translate-y-1/2 hidden md:block rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:outline-none"
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image Container */}
          <div className="relative flex h-full w-full flex-col items-center justify-center p-4 sm:p-12">
            <div className="relative inline-flex items-center justify-center">
              <motion.img
                key={photo.id}
                src={photo.full_image_url}
                alt={photo.name}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl shadow-black/50"
              />
              {/* Close Button on the photo */}
              <button
                onClick={onClose}
                className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 z-50 flex items-center justify-center rounded-full bg-black/80 p-2 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black focus:outline-none shadow-xl border border-white/20"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Client Name Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-0 right-0 text-center"
            >
              <h3 className="font-nyghtSerif text-3xl text-white md:text-4xl">
                {photo.name}
              </h3>
              <p className="mt-2 font-plusJakartaSans text-sm text-white/70 uppercase tracking-widest">
                Part of the Golden Moments Family
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

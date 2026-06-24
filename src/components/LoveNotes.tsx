"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

interface LoveNotesProps {
  lead?: string;
  title?: string;
}

const RED = "#8a1212";
const INK = "#1a1a1a";

/**
 * Shared testimonial carousel — a red torn-paper "love note" pinned to the
 * cream page with masking tape, matching the landing page's Happy Clients
 * cards. Auto-advances, pauses on hover/focus, supports swipe + keyboard.
 */
export default function LoveNotes({
  lead = "Kind",
  title = "WORDS",
}: LoveNotesProps) {
  const reduced = useReducedMotion();
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const count = TESTIMONIALS.length;
  const go = useCallback(
    (dir: number) => {
      setIndex(([i]) => [(i + dir + count) % count, dir]);
    },
    [count],
  );

  useEffect(() => {
    if (reduced || paused) return;
    const t = window.setInterval(() => go(1), 5500);
    return () => window.clearInterval(t);
  }, [reduced, paused, go]);

  const testimonial = TESTIMONIALS[index];

  return (
    <section
      className="relative z-10 px-5 py-20 md:py-28"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center md:mb-14">
          <span
            className="font-nyghtSerif italic text-lg md:text-xl"
            style={{ color: `${INK}99` }}
          >
            {lead}
          </span>
          <h2
            className="font-morganite font-bold uppercase leading-[0.85] tracking-[0.04em] text-6xl md:text-8xl"
            style={{ color: INK }}
          >
            {title}
          </h2>
        </div>

        <div
          className="relative mx-auto max-w-2xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="What couples say"
        >
          {/* deck shadow cards behind, for a stacked-notes feel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 bottom-24 -rotate-2 rounded-sm"
            style={{ backgroundColor: `${RED}22` }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 bottom-24 rotate-1 rounded-sm"
            style={{ backgroundColor: `${RED}33` }}
          />

          <div className="relative min-h-[340px] sm:min-h-[300px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.figure
                key={testimonial.id}
                custom={direction}
                initial={
                  reduced
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: direction >= 0 ? 90 : -90,
                        rotate: direction >= 0 ? 2.5 : -2.5,
                      }
                }
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={
                  reduced
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: direction >= 0 ? -90 : 90,
                        rotate: direction >= 0 ? -2.5 : 2.5,
                      }
                }
                transition={{ duration: 0.45, ease: "easeOut" }}
                drag={reduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                className="relative flex min-h-[340px] flex-col justify-between rounded-sm p-7 text-white shadow-[0_24px_60px_rgba(138,18,18,0.28)] sm:min-h-[300px] md:p-10"
                style={{
                  backgroundColor: RED,
                  backgroundImage:
                    "url('/webflow/pictlens/images/paper-red.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* masking tape */}
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-8 h-6 w-24 -rotate-6 opacity-80 shadow-sm"
                  style={{ backgroundColor: "#FFF6E5" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-3 right-8 h-6 w-16 rotate-3 opacity-80 shadow-sm"
                  style={{ backgroundColor: "#FFF6E5" }}
                />

                <blockquote className="font-nyghtSerif text-xl italic leading-relaxed md:text-2xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full border-2 border-white/40 object-cover"
                  />
                  <div>
                    <p className="font-morganite text-2xl font-bold uppercase tracking-[0.08em]">
                      {testimonial.name}
                    </p>
                    <p className="font-plusJakartaSans text-sm text-white/70">
                      {testimonial.detail}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-[#1a1a1a] hover:text-[#FFF6E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212]"
              style={{ borderColor: `${INK}4d`, color: INK }}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1} of ${count}`}
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  className="flex h-11 w-6 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212] rounded-full"
                >
                  <span
                    aria-hidden="true"
                    className="block h-2.5 w-2.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: i === index ? RED : `${INK}33`,
                      transform: i === index ? "scale(1.3)" : undefined,
                    }}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-[#1a1a1a] hover:text-[#FFF6E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212]"
              style={{ borderColor: `${INK}4d`, color: INK }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

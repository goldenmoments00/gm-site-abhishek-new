"use client";

import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  X,
} from "lucide-react";
import PillNavbar from "@/components/PillNavbar";
import Footer from "@/components/Footer";
import TornBanner, { TORN_OVERLAP } from "@/components/TornBanner";
import FilmsSection from "@/components/gallery/FilmsSection";
import LoveNotes from "@/components/LoveNotes";
import InstaReels from "@/components/gallery/InstaReels";
import { BOOKING_URL } from "@/data/packages";
import "./gallery.css";

const INK = "#1a1a1a";
const RED = "#8a1212";
const CREAM = "#FFF6E5";

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
  /** Intrinsic ratio used by the masonry collage (portrait / landscape / square). */
  w: number;
  h: number;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1000&fit=crop&crop=faces",
    title: "Eternal Vows",
    category: "Wedding",
    description: "A moment of pure love captured forever",
    w: 800,
    h: 1000,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=600&fit=crop&crop=entropy",
    title: "First Dance",
    category: "Pre Wedding",
    description: "Dancing into forever together",
    w: 900,
    h: 600,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=1040&fit=crop&crop=faces",
    title: "Golden Hour",
    category: "Rice Ceremony",
    description: "Love illuminated by nature's light",
    w: 800,
    h: 1040,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=800&fit=crop&crop=faces",
    title: "Promise Ring",
    category: "Maternity",
    description: "The beginning of a beautiful journey",
    w: 800,
    h: 800,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1120&fit=crop&crop=faces",
    title: "Bridal Portrait",
    category: "Portfolio",
    description: "Elegance in its purest form",
    w: 800,
    h: 1120,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&h=640&fit=crop&crop=center",
    title: "Wedding Rings",
    category: "Corporate",
    description: "Symbols of eternal commitment",
    w: 900,
    h: 640,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=1000&fit=crop&crop=faces",
    title: "Tender Moment",
    category: "Wedding",
    description: "Pure emotion in every glance",
    w: 800,
    h: 1000,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=960&h=620&fit=crop&crop=faces",
    title: "Sunset Kiss",
    category: "Pre Wedding",
    description: "Romance painted by the setting sun",
    w: 960,
    h: 620,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=1000&fit=crop&crop=faces",
    title: "Celebration",
    category: "Corporate",
    description: "Joy shared with loved ones",
    w: 800,
    h: 1000,
  },
];

const categories = ["All", "Wedding", "Pre Wedding", "Rice Ceremony", "Maternity", "Portfolio", "Corporate"];
const eventCategories = categories.filter((c) => c !== "All");

const categoryTagline: Record<string, string> = {
  Wedding: "The Big Day",
  "Pre Wedding": "Before The Vows",
  "Rice Ceremony": "First Bites",
  Maternity: "New Beginnings",
  Portfolio: "Your Best Angles",
  Corporate: "Professional Excellence",
};

/** Clean, frameless wedding photos for the hero (parallax + scrolling bars). */
const FRAMES = Array.from({ length: 15 }).map((_, i) => `/images/gallery/slider/slider-${i + 1}.jpg`);

const imagesIn = (category: string) =>
  category === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === category);

/* ------------------------------------------------------------------ */
/* Hero — frameless parallax photos (desktop) + scrolling image bars   */
/* ------------------------------------------------------------------ */

const HERO_PHOTOS = [
  { src: "/images/gallery/hero/hero1.jpg", className: "left-[2%] top-[8%] w-64 xl:w-80", rotate: -7, moveX: 250, moveY: 150, entryX: -800, entryY: -400, delay: 0.7 },
  { src: "/images/gallery/hero/hero2.jpg", className: "left-[15%] top-[28%] w-48 xl:w-64", rotate: 5, moveX: 150, moveY: -50, entryX: -800, entryY: 400, delay: 1.7 },
  { src: "/images/gallery/hero/hero3.jpg", className: "left-[21%] top-[10%] w-48 xl:w-64", rotate: -4, moveX: 100, moveY: 200, entryX: -400, entryY: -600, delay: 0.2 },
  { src: "/images/gallery/hero/hero4.jpg", className: "right-[3%] top-[10%] w-64 xl:w-80", rotate: 8, moveX: -250, moveY: 150, entryX: 800, entryY: -400, delay: 2.2 },
  { src: "/images/gallery/hero/hero5.jpg", className: "right-[16%] top-[30%] w-48 xl:w-64", rotate: -5, moveX: -150, moveY: -50, entryX: 800, entryY: 400, delay: 1.2 },
];

function ParallaxPhoto({
  photo,
  index,
  scrollYProgress,
}: {
  photo: typeof HERO_PHOTOS[0];
  index: number;
  scrollYProgress: any;
}) {
  const reduced = useReducedMotion();
  
  // Move outwards (away from center) instead of inwards
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -photo.moveY * 1.5]);
  const x = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -photo.moveX * 1.5]);
  // Increase rotation slightly as they move out
  const rotate = useTransform(scrollYProgress, [0, 1], [photo.rotate, photo.rotate * 1.5]);
  
  // Blur as it scrolls
  const blurValue = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);
  // Optionally fade slightly
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: photo.entryX, y: photo.entryY }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.2, delay: photo.delay, type: "spring", bounce: 0.3 }}
      className={`pointer-events-none absolute z-[1] hidden lg:block ${photo.className}`}
      style={{ opacity }}
    >
      <motion.figure
        aria-hidden="true"
        className="bg-white p-1 sm:p-1.5 shadow-[0_22px_50px_rgba(26,26,26,0.22)]"
        style={{ x, y, rotate, filter }}
      >
        <img
          src={photo.src}
          alt=""
          className="h-auto w-full object-cover"
        />
      </motion.figure>
    </motion.div>
  );
}

function MarqueeRow({
  images,
  direction,
  scrollYProgress,
}: {
  images: string[];
  direction: "left" | "right";
  scrollYProgress: import("framer-motion").MotionValue<number>;
}) {
  // Repeat enough times to create a very long track
  const track = [...images, ...images, ...images, ...images];
  
  // Smooth the scroll progress so the movement has buttery inertia
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  // Move a much smaller distance for a slower, graceful effect
  const xLeft = useTransform(smoothProgress, [0, 1], ["-5%", "-15%"]);
  const xRight = useTransform(smoothProgress, [0, 1], ["-15%", "-5%"]);
  
  const x = direction === "left" ? xLeft : xRight;

  return (
    <div className="overflow-hidden">
      <motion.div
        style={{ x }}
        className="flex w-max gap-3"
      >
        {track.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="w-32 flex-shrink-0 overflow-hidden border-[3px] border-white shadow-2xl shadow-black/30 md:w-44"
          >
            <Image
              src={src}
              alt=""
              width={230}
              height={295}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function GalleryHero({ onJump }: { onJump: (category: string) => void }) {
  const reduced = useReducedMotion();
  const letters = "GALLERY".split("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scrollToCollection = () =>
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[110vh] flex-col overflow-hidden"
    >
      {/* paper grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      {/* desktop: frameless scroll-parallax photos behind the title */}
      {HERO_PHOTOS.map((photo, i) => (
        <ParallaxPhoto key={photo.src} photo={photo} index={i} scrollYProgress={scrollYProgress} />
      ))}

      {/* centre composition */}
      <div className="relative z-10 flex flex-col items-center justify-center px-5 pb-40 pt-32 text-center md:pb-52 md:pt-36">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-3 font-plusJakartaSans text-[10px] font-bold uppercase tracking-[0.3em] sm:text-[11px] sm:tracking-[0.32em]"
          style={{ color: RED }}
        >
          <span aria-hidden="true" className="inline-block h-px w-8 sm:w-10" style={{ backgroundColor: RED }} />
          The wall of moments
          <span aria-hidden="true" className="inline-block h-px w-8 sm:w-10" style={{ backgroundColor: RED }} />
        </motion.p>

        <div className="relative mt-4">
          <motion.span
            initial={reduced ? false : { opacity: 0, x: -16, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="absolute -top-3 left-1 z-10 font-nyghtSerif text-3xl italic md:-top-5 md:left-6 md:text-5xl"
            style={{ color: RED }}
          >
            our
          </motion.span>
          <h1
            className="font-morganite font-bold uppercase leading-[0.8] tracking-[0.04em] text-[clamp(5rem,24vw,15rem)]"
            style={{ color: INK }}
            aria-label="Our gallery"
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className={`inline-block ${i % 2 === 1 ? "text-outline-ink" : ""}`}
                initial={reduced ? false : { opacity: 0, y: "0.3em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.18 + i * 0.07 }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto mt-4 max-w-md font-plusJakartaSans text-sm leading-relaxed md:text-base"
          style={{ color: `${INK}99` }}
        >
          Timeless stories captured through our lens — every frame below made it
          to the wall.
        </motion.p>

        {/* quick-jump category links */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          <span
            className="font-plusJakartaSans text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color: `${INK}59` }}
          >
            Jump to
          </span>
          {eventCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onJump(category)}
              className="font-nyghtSerif text-base italic underline decoration-1 underline-offset-4 transition-colors hover:text-[#8a1212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212] rounded md:text-lg"
              style={{ color: INK, textDecorationColor: `${INK}40` }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.button
          type="button"
          onClick={scrollToCollection}
          aria-label="Scroll to the collection"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mx-auto mt-8 flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212]"
          style={{ backgroundColor: RED }}
        >
          <motion.span
            animate={reduced ? undefined : { y: [0, 3, 0] }}
            transition={reduced ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={17} aria-hidden="true" />
          </motion.span>
        </motion.button>
      </div>

      {/* scrolling image bars — two opposing rows pinned to the bottom */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-[2] mt-16 -rotate-2 space-y-3 pb-8"
        aria-hidden="true"
      >
        <MarqueeRow images={FRAMES} direction="left" scrollYProgress={scrollYProgress} />
        <MarqueeRow images={[...FRAMES].reverse()} direction="right" scrollYProgress={scrollYProgress} />
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Collection — category cards → per-category collage                  */
/* ------------------------------------------------------------------ */

function CategoryCardItem({
  category,
  onSelect,
  className = "",
}: {
  category: string;
  onSelect: (category: string) => void;
  className?: string;
}) {
  const imgs = imagesIn(category);
  const cover = imgs[0]?.src;
  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      aria-label={`View ${category} collection`}
      className={`group relative aspect-video w-full overflow-hidden rounded-none text-left shadow-[0_14px_38px_rgba(26,26,26,0.12)] transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8a1212]/60 ${className}`}
    >
      {cover && (
        <Image
          src={cover}
          alt=""
          fill
          sizes="(max-width: 640px) 60vw, 25vw"
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <ArrowUpRight
        size={18}
        aria-hidden="true"
        className="absolute right-3 top-3 text-white/90 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="font-nyghtSerif text-xs italic text-white/70">
          {categoryTagline[category] ?? ""}
        </span>
        <h3 className="font-morganite text-3xl font-bold uppercase leading-[0.9] tracking-[0.05em] text-white md:text-4xl">
          {category}
        </h3>
        <span className="font-plusJakartaSans text-[11px] uppercase tracking-[0.18em] text-white/70">
          {imgs.length} {imgs.length === 1 ? "frame" : "frames"}
        </span>
      </div>
    </button>
  );
}

function CategoryCards({ onSelect }: { onSelect: (category: string) => void }) {
  const loopedCats = [...eventCategories, ...eventCategories];
  // Pause the auto-scroll while touched/hovered so cards stay tappable.
  const [paused, setPaused] = useState(false);
  return (
    <section className={`${TORN_OVERLAP} pb-20 md:pb-24 pt-16 md:pt-24`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-16 max-w-4xl px-5 text-center md:mb-24"
      >
        <p
          className="font-plusJakartaSans text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]"
          style={{ color: "#8a1212" }}
        >
          Gallery 01 · Explore
        </p>
        <h2
          className="mt-4 font-morganite text-7xl font-bold uppercase leading-[0.85] tracking-[0.04em] md:text-9xl"
          style={{ color: "#1a1a1a" }}
        >
          Our Photos
        </h2>
        <p
          className="mx-auto mt-6 max-w-md font-plusJakartaSans text-sm md:text-base leading-relaxed"
          style={{ color: "#1a1a1a99" }}
        >
          Four chapters of every love story. Pick one to wander through its collage — then tap any frame to see it up close.
        </p>
      </motion.div>

      {/* MOBILE: auto-moving catalogue of category cards (pauses on touch) */}
      <div
        className="mt-10 overflow-hidden sm:hidden"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onPointerDown={() => setPaused(true)}
      >
        <div
          className="marquee-track-left flex w-max gap-4 px-4"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {loopedCats.map((cat, i) => (
            <div key={`${cat}-${i}`} className="w-72 flex-shrink-0">
              <CategoryCardItem category={cat} onSelect={onSelect} />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: grid of category cards */}
      <motion.div 
        className="mx-auto mt-12 hidden max-w-6xl grid-cols-2 gap-5 px-5 sm:grid lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
      >
        {eventCategories.map((cat) => (
          <motion.div
            key={cat}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
            }}
            className="h-full"
          >
            <CategoryCardItem category={cat} onSelect={onSelect} className="h-full" />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => onSelect("All")}
          className="font-nyghtSerif text-lg italic underline decoration-1 underline-offset-4 transition-colors hover:text-[#8a1212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212] rounded"
          style={{ color: INK, textDecorationColor: `${INK}40` }}
        >
          or wander through every moment →
        </button>
      </div>
    </section>
  );
}

/** Frameless collage tile. */
function CollageTile({
  image,
  onClick,
  sizes,
}: {
  image: GalleryImage;
  onClick: () => void;
  sizes: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${image.title}`}
      className="group relative block w-full overflow-hidden rounded-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8a1212]/60"
    >
      <Image
        src={image.src}
        alt={image.title}
        width={image.w}
        height={image.h}
        sizes={sizes}
        className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="font-nyghtSerif text-lg italic text-white">
          {image.title}
        </span>
        <span className="block font-plusJakartaSans text-[11px] text-white/70">
          {image.description}
        </span>
      </span>
    </button>
  );
}

function CategoryCollageModal({
  category,
  images,
  onClose,
  onImageClick,
  lightboxOpen,
}: {
  category: string;
  images: GalleryImage[];
  onClose: () => void;
  onImageClick: (index: number) => void;
  lightboxOpen: boolean;
}) {
  const reduced = useReducedMotion();
  const title = category === "All" ? "Every Moment" : category;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    // Only close on Escape when the focused-image popup isn't on top.
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !lightboxOpen) onClose();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [onClose, lightboxOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} collage`}
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#1a1a1a]/85 backdrop-blur-md sm:items-center sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={reduced ? { opacity: 0 } : { y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { y: 48, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl shadow-2xl sm:max-h-[88vh] sm:rounded-3xl"
        style={{ backgroundColor: CREAM }}
      >
        {/* sticky header */}
        <div
          className="flex items-center justify-between gap-4 border-b px-5 py-4 sm:px-7"
          style={{ borderColor: `${INK}14` }}
        >
          <div>
            <p
              className="font-nyghtSerif text-xs italic"
              style={{ color: `${INK}80` }}
            >
              {categoryTagline[category] ?? "Every chapter"}
            </p>
            <h3
              className="font-morganite text-4xl font-bold uppercase leading-[0.85] tracking-[0.04em] sm:text-5xl"
              style={{ color: INK }}
            >
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="hidden font-plusJakartaSans text-xs uppercase tracking-[0.18em] sm:inline"
              style={{ color: `${INK}66` }}
            >
              {images.length} {images.length === 1 ? "frame" : "frames"}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close collage"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-[#1a1a1a] hover:text-[#FFF6E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212]"
              style={{ borderColor: `${INK}33`, color: INK }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* scrollable masonry collage */}
        <div className="overflow-y-auto px-5 py-6 sm:px-7">
          <div className="columns-2 gap-4 [&>*]:mb-4 lg:columns-3">
            {images.map((image, index) => (
              <div key={image.id} className="break-inside-avoid">
                <CollageTile
                  image={image}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 28vw"
                  onClick={() => onImageClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox — frameless focused view with caption + category scroll    */
/* ------------------------------------------------------------------ */

function Lightbox({
  images,
  currentIndex,
  onSelect,
  onClose,
  onPrevious,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!isAutoplay || isInteracting) return;
    const interval = window.setInterval(onNext, 3000);
    return () => window.clearInterval(interval);
  }, [isAutoplay, isInteracting, onNext]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrevious();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onPrevious, onNext, onClose]);

  const image = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1a1a1a]/96 backdrop-blur-md"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={() => setIsInteracting(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Wedding gallery images"
        className="contents"
      >
        <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between">
          <span className="rounded-full bg-white/10 px-4 py-2 font-morganite text-xl tracking-[0.15em] text-[#FFF6E5]">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={isAutoplay ? "Pause slideshow" : "Play slideshow"}
              onClick={() => setIsAutoplay((p) => !p)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#FFF6E5] transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {isAutoplay ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close lightbox"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#FFF6E5] transition-colors hover:bg-[#8a1212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <motion.figure
          key={currentIndex}
          initial={reduced ? { opacity: 0 } : { scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative mx-4 flex max-h-[82vh] max-w-4xl flex-col items-center"
          drag={reduced ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, { offset, velocity }) => {
            if (offset.x > 100 || velocity.x > 500) onPrevious();
            else if (offset.x < -100 || velocity.x < -500) onNext();
          }}
        >
          <Image
            src={image.src}
            alt={image.title}
            width={image.w}
            height={image.h}
            sizes="(max-width: 768px) 92vw, 70vw"
            className="max-h-[68vh] w-auto rounded-md object-contain shadow-2xl"
            priority
          />
          <figcaption className="mt-4 max-w-xl text-center">
            <span
              className="rounded-sm px-2 py-0.5 font-plusJakartaSans text-[10px] font-bold uppercase tracking-[0.2em] text-white"
              style={{ backgroundColor: RED }}
            >
              {image.category}
            </span>
            <span className="mt-2 block font-nyghtSerif text-2xl italic text-[#FFF6E5]">
              {image.title}
            </span>
            <span className="mt-1 block font-plusJakartaSans text-sm text-[#FFF6E5]/65">
              {image.description}
            </span>
          </figcaption>
        </motion.figure>

        <button
          type="button"
          aria-label="Previous image"
          onClick={onPrevious}
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[#FFF6E5] transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:flex md:left-8"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={onNext}
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-[#FFF6E5] transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:flex md:right-8"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1">
          {images.map((img, index) => (
            <button
              type="button"
              key={img.id}
              aria-label={`View image ${index + 1}: ${img.title}`}
              aria-current={index === currentIndex ? "true" : undefined}
              onClick={() => onSelect(index)}
              className="flex h-10 w-7 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <span
                className="h-2.5 w-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    index === currentIndex ? RED : "rgba(255,246,229,0.35)",
                  transform: index === currentIndex ? "scale(1.35)" : undefined,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function GalleryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // null = showing the category cards; a category = showing its collage
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    setSelectedCategory(
      urlCategory && categories.includes(urlCategory) ? urlCategory : null,
    );
  }, [searchParams]);

  const collageImages = useMemo(
    () => (selectedCategory ? imagesIn(selectedCategory) : []),
    [selectedCategory],
  );

  useEffect(() => {
    if (currentImageIndex >= collageImages.length) setCurrentImageIndex(0);
  }, [currentImageIndex, collageImages.length]);

  const setCategoryParam = (category: string | null) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (category) nextParams.set("category", category);
    else nextParams.delete("category");
    const q = nextParams.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const openCategory = (category: string) => {
    setSelectedCategory(category);
    setCategoryParam(category);
  };

  const backToCards = () => {
    setSelectedCategory(null);
    setCategoryParam(null);
  };

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : collageImages.length - 1,
    );
  }, [collageImages.length]);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev < collageImages.length - 1 ? prev + 1 : 0,
    );
  }, [collageImages.length]);

  return (
    <main
      id="main-content"
      className="min-h-screen overflow-x-hidden bg-[#FFF6E5] font-plusJakartaSans text-[#1a1a1a]"
    >
      <PillNavbar />

      <GalleryHero onJump={openCategory} />

      <CategoryCards onSelect={openCategory} />

      <FilmsSection />

      <InstaReels />

      {/* closing CTA */}
      <section className="relative z-10 px-5 pb-24 pt-4 text-center md:pb-32">
        <p
          className="font-nyghtSerif text-lg italic md:text-xl"
          style={{ color: `${INK}99` }}
        >
          Your turn
        </p>
        <h2
          className="font-morganite font-bold uppercase leading-[0.85] tracking-[0.04em] text-[15vw] md:text-8xl"
          style={{ color: INK }}
        >
          Your story belongs here
        </h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full px-8 py-4 font-plusJakartaSans text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto"
            style={{ backgroundColor: RED }}
          >
            Book your date
          </a>
          <Link
            href="/packages"
            className="w-full rounded-full border px-8 py-4 font-plusJakartaSans text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-[#1a1a1a] hover:text-[#FFF6E5] focus-visible:outline-none focus-visible:ring-2 sm:w-auto"
            style={{ borderColor: `${INK}66`, color: INK }}
          >
            View packages
          </Link>
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {selectedCategory && (
          <CategoryCollageModal
            key="collage"
            category={selectedCategory}
            images={collageImages}
            lightboxOpen={lightboxOpen}
            onClose={backToCards}
            onImageClick={(index) => {
              setCurrentImageIndex(index);
              setLightboxOpen(true);
            }}
          />
        )}
        {lightboxOpen && collageImages.length > 0 && (
          <Lightbox
            key="lightbox"
            images={collageImages}
            currentIndex={Math.min(currentImageIndex, collageImages.length - 1)}
            onSelect={setCurrentImageIndex}
            onClose={() => setLightboxOpen(false)}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center font-nyghtSerif italic text-xl"
          style={{ backgroundColor: CREAM, color: INK }}
        >
          Loading the gallery…
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}

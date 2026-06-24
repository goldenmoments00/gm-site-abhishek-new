"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  BOOKING_URL,
  CELEBRATIONS,
  formatINR,
  priceFrom,
  totalPackages,
} from "@/data/packages";

const INK = "#1a1a1a";
const RED = "#8a1212";

const FAN_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=520&h=650&fit=crop&crop=faces",
    caption: "golden hour",
    rotate: -10,
    z: 1,
    offset: "left-0 top-10",
  },
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=520&h=650&fit=crop&crop=faces",
    caption: "the vows",
    rotate: -1,
    z: 2,
    offset: "left-[24%] top-0",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=520&h=650&fit=crop&crop=faces",
    caption: "first dance",
    rotate: 9,
    z: 3,
    offset: "left-[48%] top-12",
  },
];

const RIBBON_ITEMS = CELEBRATIONS.map((c) => c.name.toUpperCase());

function Ribbon() {
  const segment = RIBBON_ITEMS.map((name) => `${name} ✦ `).join("");
  const track = Array.from({ length: 6 }, () => segment).join("");
  return (
    <div
      aria-hidden="true"
      className="relative z-[5] mt-12 w-[104%] -translate-x-[2%] -rotate-1 overflow-hidden py-2.5 shadow-[0_10px_30px_rgba(138,18,18,0.25)] md:mt-16"
      style={{ backgroundColor: RED }}
    >
      <div className="marquee-track-left flex w-max">
        <span className="whitespace-nowrap font-morganite text-xl font-bold uppercase tracking-[0.3em] text-[#FFF6E5] md:text-2xl">
          {track}
        </span>
        <span className="whitespace-nowrap font-morganite text-xl font-bold uppercase tracking-[0.3em] text-[#FFF6E5] md:text-2xl">
          {track}
        </span>
      </div>
    </div>
  );
}

interface PackagesHeroProps {
  onSelectEvent: (id: string) => void;
  onCompare: () => void;
}

export default function PackagesHero({
  onSelectEvent,
  onCompare,
}: PackagesHeroProps) {
  const reduced = useReducedMotion();
  const minPrice = Math.min(
    ...CELEBRATIONS.flatMap((c) => c.packages.map((p) => p.price)),
  );

  const fadeUp = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-6 pt-2">
      {/* paper grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      {/* mobile corner polaroid accent */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-7 top-24 w-32 rotate-12 lg:hidden"
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="bg-white p-1.5 pb-5 shadow-[0_14px_34px_rgba(26,26,26,0.18)]">
          <Image
            src={FAN_PHOTOS[1].src}
            alt=""
            width={220}
            height={275}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-6">
        {/* ----- left: editorial headline + stub navigation ----- */}
        <div className="pt-4 lg:pt-0">
          <motion.p
            {...fadeUp(0.05)}
            className="flex items-center gap-3 font-plusJakartaSans text-[11px] font-bold uppercase tracking-[0.32em]"
            style={{ color: RED }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-px w-10"
              style={{ backgroundColor: RED }}
            />
            Golden Moment · Collections &amp; pricing
          </motion.p>

          <h1 className="mt-5" style={{ color: INK }}>
            <motion.span
              {...fadeUp(0.15)}
              className="block font-nyghtSerif text-2xl italic md:text-[2rem]"
              style={{ color: `${INK}b3` }}
            >
              every love story,
            </motion.span>
            <motion.span
              {...fadeUp(0.28)}
              className="block font-morganite font-bold uppercase leading-[0.82] tracking-[0.02em] text-[clamp(4.6rem,17vw,10.5rem)]"
            >
              Packaged
            </motion.span>
            <motion.span
              {...fadeUp(0.41)}
              className="text-outline-ink block font-morganite font-bold uppercase leading-[0.82] tracking-[0.02em] text-[clamp(4.6rem,17vw,10.5rem)]"
            >
              Beautifully
            </motion.span>
          </h1>

          <motion.p
            {...fadeUp(0.55)}
            className="mt-5 max-w-md font-plusJakartaSans text-sm leading-relaxed md:text-base"
            style={{ color: `${INK}99` }}
          >
            {CELEBRATIONS.length} celebrations, {totalPackages()} collections,
            starting at {formatINR(minPrice)}. Pick yours below — the page
            takes you straight there.
          </motion.p>

          {/* celebration ticket stubs — the hero IS the navigation */}
          <motion.div
            {...fadeUp(0.68)}
            className="mt-7 grid grid-cols-2 gap-3 sm:max-w-xl"
          >
            {CELEBRATIONS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectEvent(c.id)}
                className="group relative overflow-hidden rounded-sm border-l-4 bg-white py-3 pl-4 pr-3 text-left shadow-[0_8px_26px_rgba(26,26,26,0.08)] transition-all duration-300 hover:-translate-y-1 hover:rotate-[-0.6deg] hover:shadow-[0_16px_36px_rgba(138,18,18,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212]"
                style={{ borderColor: RED }}
              >
                <span
                  className="font-plusJakartaSans text-[9px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: `${INK}59` }}
                >
                  N° {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="block font-morganite text-2xl font-bold uppercase leading-none tracking-[0.05em] transition-colors group-hover:text-[#8a1212] md:text-[1.7rem]"
                  style={{ color: INK }}
                >
                  {c.name}
                </span>
                <span
                  className="mt-1 block font-plusJakartaSans text-[11px]"
                  style={{ color: `${INK}80` }}
                >
                  from {formatINR(priceFrom(c))}
                </span>
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="absolute right-2.5 top-2.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: RED }}
                />
              </button>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.8)}
            className="mt-7 flex flex-wrap items-center gap-5"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-7 py-3.5 font-plusJakartaSans text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ backgroundColor: RED }}
            >
              Book a consultation
            </a>
            <button
              type="button"
              onClick={onCompare}
              className="group inline-flex items-center gap-2 font-plusJakartaSans text-xs font-bold uppercase tracking-[0.18em] underline decoration-[#8a1212] decoration-2 underline-offset-[6px] transition-colors hover:text-[#8a1212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212] rounded"
              style={{ color: INK }}
            >
              Compare side by side
              <ArrowDown
                size={13}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </button>
          </motion.div>
        </div>

        {/* ----- right: fanned polaroids + hanging price tag ----- */}
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          aria-hidden="true"
          className="relative block h-[300px] sm:h-[400px] lg:h-[460px] select-none xl:h-[500px] w-full max-w-md mx-auto lg:max-w-none mt-12 lg:mt-0"
        >
          {FAN_PHOTOS.map((photo, i) => (
            <motion.figure
              key={photo.src}
              className={`absolute ${photo.offset} w-[46%]`}
              style={{ rotate: photo.rotate, zIndex: photo.z }}
              animate={reduced ? undefined : { y: [0, -10, 0] }}
              transition={
                reduced
                  ? undefined
                  : {
                      duration: 6 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.6,
                    }
              }
              whileHover={reduced ? undefined : { scale: 1.04, zIndex: 10 }}
            >
              <div className="bg-white p-2 pb-8 shadow-[0_22px_50px_rgba(26,26,26,0.2)]">
                {/* masking tape */}
                <span
                  className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 opacity-80 shadow-sm"
                  style={{ backgroundColor: "#FFF6E5" }}
                />
                <Image
                  src={photo.src}
                  alt=""
                  width={260}
                  height={325}
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="mt-2 text-center font-nyghtSerif text-xs italic text-[#1a1a1a]/60">
                  {photo.caption}
                </figcaption>
              </div>
            </motion.figure>
          ))}

          {/* hanging price tag */}
          <motion.div
            className="absolute bottom-2 left-[30%] origin-top"
            animate={reduced ? undefined : { rotate: [4, -3, 4] }}
            transition={
              reduced
                ? undefined
                : { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div
              className="mx-auto h-8 w-px"
              style={{ backgroundColor: `${INK}4d` }}
            />
            <div
              className="relative rounded-sm px-5 py-3 text-center shadow-[0_14px_34px_rgba(138,18,18,0.3)]"
              style={{ backgroundColor: RED }}
            >
              <span
                className="absolute left-1/2 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: "#FFF6E5" }}
              />
              <p className="pt-1 font-plusJakartaSans text-[9px] font-bold uppercase tracking-[0.25em] text-white/70">
                Wedding packages
              </p>
              <p className="font-morganite text-3xl font-bold leading-none text-white">
                ₹94,999
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* red marquee ribbon — full bleed, slightly rotated */}
      <Ribbon />
    </section>
  );
}

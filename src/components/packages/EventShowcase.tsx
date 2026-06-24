"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Heart, Scale } from "lucide-react";
import {
  BOOKING_URL,
  CELEBRATIONS,
  Celebration,
  CelebrationPackage,
  formatINR,
  priceFrom,
} from "@/data/packages";
import { TORN_OVERLAP } from "@/components/TornBanner";

const INK = "#1a1a1a";
const RED = "#8a1212";
const CREAM = "#FFF6E5";

interface EventShowcaseProps {
  activeId: string;
  onChange: (id: string) => void;
  onCompare: (packageId: string) => void;
}

export default function EventShowcase({
  activeId,
  onChange,
  onCompare,
}: EventShowcaseProps) {
  const reduced = useReducedMotion();
  const active = CELEBRATIONS.find((c) => c.id === activeId) ?? CELEBRATIONS[0];

  return (
    <section className={`${TORN_OVERLAP} px-5 pb-20 md:pb-28`}>
      <div className="mx-auto max-w-[1500px]">
        {/* Celebration selector */}
        <div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5"
          role="tablist"
          aria-label="Choose a celebration"
        >
          {CELEBRATIONS.map((celebration) => {
            const selected = celebration.id === active.id;
            return (
              <motion.button
                key={celebration.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onChange(celebration.id)}
                whileTap={{ scale: 0.97 }}
                className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8a1212]/70 ${
                  selected
                    ? "border-[#8a1212] bg-white"
                    : "border-[#1a1a1a]1a bg-white/60 hover:bg-white"
                }`}
                style={
                  selected
                    ? { boxShadow: `0 0 0 1px ${RED}, 0 12px 30px rgba(26,26,26,0.06)` }
                    : { borderColor: `${INK}26` }
                }
              >
                {selected && (
                  <motion.span
                    initial={reduced ? false : { scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: 6 }}
                    className="absolute right-3 top-3 rounded-sm px-2 py-1 font-plusJakartaSans text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                    style={{ backgroundColor: RED }}
                  >
                    Selected
                  </motion.span>
                )}
                <div className="pr-10 transition-transform duration-500 ease-out group-hover:translate-x-6 md:group-hover:translate-x-10">
                  <h3
                    className="font-morganite text-3xl font-bold uppercase tracking-[0.06em] transition-colors md:text-4xl"
                    style={{ color: selected ? INK : `${INK}99` }}
                  >
                    {celebration.name}
                  </h3>
                  <p
                    className="mt-0.5 font-plusJakartaSans text-xs transition-colors"
                    style={{ color: selected ? `${INK}cc` : `${INK}66` }}
                  >
                    {celebration.packages.length}{" "}
                    {celebration.packages.length === 1
                      ? "collection"
                      : "collections"}{" "}
                    · from {formatINR(priceFrom(celebration))}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Celebration intro line */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active.id}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-10 max-w-2xl text-center font-nyghtSerif text-xl italic md:mt-14 md:text-2xl"
            style={{ color: `${INK}b3` }}
          >
            &ldquo;{active.quote}&rdquo;
          </motion.p>
        </AnimatePresence>

        {/* Package tickets */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 scrollbar-hide md:mt-10 md:flex-wrap md:justify-center md:snap-none md:overflow-visible md:pb-0"
          >
            {active.packages.map((pkg, i) => (
              <PackageTicket
                key={pkg.id}
                pkg={pkg}
                celebration={active}
                index={i}
                onCompare={onCompare}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <p
          className="mt-2 text-center font-plusJakartaSans text-xs md:hidden"
          style={{ color: `${INK}66` }}
        >
          Swipe to explore collections →
        </p>
      </div>
    </section>
  );
}

function PackageTicket({
  pkg,
  celebration,
  index,
  onCompare,
}: {
  pkg: CelebrationPackage;
  celebration: Celebration;
  index: number;
  onCompare: (packageId: string) => void;
}) {
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const preview = pkg.details.slice(0, 4);
  const rest = pkg.details.slice(4);

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      whileHover={reduced ? undefined : { y: -6 }}
      className="relative flex min-w-[82vw] snap-center flex-col overflow-hidden rounded-xl border bg-white shadow-[0_14px_44px_rgba(26,26,26,0.09)] sm:min-w-[420px] md:min-w-[320px] md:max-w-[350px] md:flex-1"
      style={{
        borderColor: pkg.popular ? RED : `${INK}1a`,
        borderWidth: pkg.popular ? 2 : 1,
      }}
    >
      {pkg.popular && (
        <span
          className="absolute right-5 top-5 z-10 flex rotate-3 items-center gap-1 rounded-sm px-3 py-1 font-plusJakartaSans text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-md"
          style={{ backgroundColor: RED }}
        >
          <Heart size={11} fill="currentColor" /> Most loved
        </span>
      )}

      {/* ticket header */}
      <div className="px-6 pb-5 pt-7 md:px-7">
        <p
          className="font-plusJakartaSans text-[11px] font-semibold uppercase tracking-[0.25em]"
          style={{ color: `${INK}66` }}
        >
          {celebration.name} · {pkg.tag}
        </p>
        <h3
          className="mt-1 font-morganite text-5xl font-bold uppercase leading-none tracking-[0.04em]"
          style={{ color: INK }}
        >
          {pkg.name}
        </h3>
        <p
          className="mt-2 font-nyghtSerif text-sm italic leading-snug"
          style={{ color: `${INK}99` }}
        >
          {pkg.blurb}
        </p>
        <p
          className="mt-4 font-morganite text-4xl font-bold tracking-[0.02em]"
          style={{ color: RED }}
        >
          {formatINR(pkg.price)}
        </p>
      </div>

      {/* perforated ticket divider */}
      <div className="relative" aria-hidden="true">
        <div
          className="mx-6 border-t-2 border-dashed md:mx-7"
          style={{ borderColor: `${INK}26` }}
        />
        <span
          className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: CREAM }}
        />
        <span
          className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: CREAM }}
        />
      </div>

      {/* inclusions */}
      <div className="flex flex-1 flex-col px-6 py-5 md:px-7">
        <ul className="space-y-2.5">
          {preview.map((detail) => (
            <li key={detail} className="flex items-start gap-2.5">
              <Check
                size={15}
                className="mt-0.5 flex-shrink-0"
                style={{ color: RED }}
                aria-hidden="true"
              />
              <span
                className="font-plusJakartaSans text-sm leading-snug"
                style={{ color: `${INK}cc` }}
              >
                {detail}
              </span>
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-2.5 space-y-2.5">
                {rest.map((detail) => (
                  <li key={detail} className="flex items-start gap-2.5">
                    <Check
                      size={15}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: RED }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-plusJakartaSans text-sm leading-snug"
                      style={{ color: `${INK}cc` }}
                    >
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
              {pkg.addOns && pkg.addOns.length > 0 && (
                <div
                  className="mt-4 rounded-lg p-3"
                  style={{ backgroundColor: `${RED}0d` }}
                >
                  <p
                    className="font-plusJakartaSans text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: RED }}
                  >
                    Add-ons
                  </p>
                  {pkg.addOns.map((addOn) => (
                    <p
                      key={addOn.name}
                      className="mt-1.5 flex items-baseline justify-between gap-3 font-plusJakartaSans text-xs"
                      style={{ color: `${INK}b3` }}
                    >
                      <span>{addOn.name}</span>
                      <span className="whitespace-nowrap font-semibold">
                        +{formatINR(addOn.price)}
                      </span>
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {(rest.length > 0 || (pkg.addOns && pkg.addOns.length > 0)) && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-3 flex items-center gap-1 self-start font-plusJakartaSans text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:text-[#8a1212] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212] rounded"
            style={{ color: `${INK}80` }}
          >
            {expanded
              ? "Show less"
              : `Everything included${rest.length ? ` (+${rest.length})` : ""}`}
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        )}

        {/* actions */}
        <div className="mt-auto flex items-center gap-3 pt-6">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full py-3 text-center font-plusJakartaSans text-xs font-bold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: RED }}
          >
            Book {pkg.name.toLowerCase()}
          </a>
          {celebration.packages.length > 1 && (
            <button
              type="button"
              onClick={() => onCompare(pkg.id)}
              aria-label={`Compare ${pkg.name} with another collection`}
              title="Compare"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-colors hover:bg-[#1a1a1a] hover:text-[#FFF6E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212]"
              style={{ borderColor: `${INK}40`, color: INK }}
            >
              <Scale size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import {
  BOOKING_URL,
  Celebration,
  formatINR,
  SPEC_ROWS,
} from "@/data/packages";
import { TORN_OVERLAP } from "@/components/TornBanner";

const INK = "#1a1a1a";
const RED = "#8a1212";

interface PackageComparisonProps {
  celebration: Celebration;
  pair: [string, string];
  onPairChange: (pair: [string, string]) => void;
}

export default function PackageComparison({
  celebration,
  pair,
  onPairChange,
}: PackageComparisonProps) {
  const reduced = useReducedMotion();
  const packages = celebration.packages;

  const a = packages.find((p) => p.id === pair[0]) ?? packages[0];
  const b =
    packages.find((p) => p.id === pair[1]) ?? packages[1] ?? packages[0];

  const toggle = (id: string) => {
    if (id === a.id || id === b.id) return; // always keep exactly two
    onPairChange([b.id, id]); // replace the older selection
  };

  if (packages.length < 2) {
    const only = packages[0];
    return (
      <section className={`${TORN_OVERLAP} px-5 pb-20 md:pb-28`}>
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="font-nyghtSerif text-xl italic"
            style={{ color: `${INK}99` }}
          >
            {celebration.name} has a single, complete collection — nothing to
            compare, everything included.
          </p>
          <div
            className="mt-8 rounded-xl border bg-white p-8 text-left shadow-[0_14px_44px_rgba(26,26,26,0.09)]"
            style={{ borderColor: `${INK}1a` }}
          >
            <h3
              className="font-morganite text-5xl font-bold uppercase"
              style={{ color: INK }}
            >
              {only.name}
            </h3>
            <p
              className="mt-1 font-morganite text-3xl font-bold"
              style={{ color: RED }}
            >
              {formatINR(only.price)}
            </p>
            <ul className="mt-5 space-y-2.5">
              {only.details.map((d) => (
                <li key={d} className="flex items-start gap-2.5">
                  <Check
                    size={15}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: RED }}
                  />
                  <span
                    className="font-plusJakartaSans text-sm"
                    style={{ color: `${INK}cc` }}
                  >
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  const cheaper = a.price <= b.price ? a : b;
  const pricier = a.price <= b.price ? b : a;
  const priceGap = pricier.price - cheaper.price;
  const gains = SPEC_ROWS.filter(
    (row) =>
      pricier.specs[row.key] !== cheaper.specs[row.key] &&
      pricier.specs[row.key],
  );

  return (
    <section className={`${TORN_OVERLAP} px-5 pb-20 md:pb-28`}>
      <div className="mx-auto max-w-5xl">
        <p
          className="mx-auto max-w-xl text-center font-plusJakartaSans text-sm leading-relaxed md:text-base"
          style={{ color: `${INK}99` }}
        >
          Pick any two {celebration.name.toLowerCase()} collections and see
          exactly where your money goes.
        </p>

        {/* package picker chips */}
        <div
          className="mt-8 flex flex-wrap justify-center gap-2.5"
          role="group"
          aria-label="Select two collections to compare"
        >
          {packages.map((pkg) => {
            const slot = pkg.id === a.id ? 1 : pkg.id === b.id ? 2 : 0;
            return (
              <button
                key={pkg.id}
                type="button"
                aria-pressed={slot > 0}
                onClick={() => toggle(pkg.id)}
                className="flex items-center gap-2 rounded-full border px-4 py-2.5 font-plusJakartaSans text-xs font-semibold uppercase tracking-[0.12em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a1212]"
                style={
                  slot > 0
                    ? {
                        backgroundColor: RED,
                        borderColor: RED,
                        color: "#fff",
                      }
                    : { borderColor: `${INK}33`, color: `${INK}b3` }
                }
              >
                {slot > 0 && (
                  <span
                    aria-hidden="true"
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-white font-bold text-[10px]"
                    style={{ color: RED }}
                  >
                    {slot}
                  </span>
                )}
                {pkg.name}
                <span className="opacity-70">{formatINR(pkg.price)}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${a.id}-${b.id}`}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {/* verdict: what the extra money buys */}
            {priceGap > 0 && gains.length > 0 && (
              <div
                className="mx-auto mt-10 max-w-3xl rounded-xl p-6 text-white md:p-8"
                style={{
                  backgroundColor: RED,
                  backgroundImage:
                    "url('/webflow/pictlens/images/paper-red.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="font-plusJakartaSans text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
                  The verdict
                </p>
                <p className="mt-2 font-nyghtSerif text-xl italic leading-snug md:text-2xl">
                  {pricier.name} costs {formatINR(priceGap)} more than{" "}
                  {cheaper.name} — here&rsquo;s what that buys:
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {gains.map((row) => (
                    <li
                      key={row.key}
                      className="flex items-start gap-2 font-plusJakartaSans text-sm text-white/90"
                    >
                      <ArrowUpRight
                        size={15}
                        className="mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="font-semibold">{row.label}:</span>{" "}
                        {pricier.specs[row.key]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* comparison table */}
            <div
              className="mt-10 overflow-hidden rounded-xl border bg-white shadow-[0_14px_44px_rgba(26,26,26,0.09)]"
              style={{ borderColor: `${INK}1a` }}
            >
              {/* column headers */}
              <div
                className="grid grid-cols-2 gap-px md:grid-cols-[1.1fr_1fr_1fr]"
                style={{ backgroundColor: `${INK}14` }}
              >
                <div className="hidden bg-white p-5 md:block" />
                {[a, b].map((pkg, i) => (
                  <div
                    key={pkg.id}
                    className="relative bg-white p-4 text-center md:p-6"
                  >
                    {pkg.popular && (
                      <span
                        className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-sm px-2 py-0.5 font-plusJakartaSans text-[9px] font-bold uppercase tracking-[0.2em] text-white"
                        style={{ backgroundColor: RED }}
                      >
                        Most loved
                      </span>
                    )}
                    <p
                      className="font-plusJakartaSans text-[10px] font-bold uppercase tracking-[0.25em]"
                      style={{ color: `${INK}59` }}
                    >
                      {i === 0 ? "Option one" : "Option two"}
                    </p>
                    <h3
                      className="mt-1 font-morganite text-3xl font-bold uppercase leading-none md:text-4xl"
                      style={{ color: INK }}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className="mt-1 font-morganite text-2xl font-bold md:text-3xl"
                      style={{ color: RED }}
                    >
                      {formatINR(pkg.price)}
                    </p>
                  </div>
                ))}
              </div>

              {/* spec rows */}
              {SPEC_ROWS.map((row) => {
                const valA = a.specs[row.key];
                const valB = b.specs[row.key];
                const differs = valA !== valB;
                return (
                  <div
                    key={row.key}
                    className="grid grid-cols-2 border-t md:grid-cols-[1.1fr_1fr_1fr]"
                    style={{
                      borderColor: `${INK}14`,
                      backgroundColor: differs ? `${RED}08` : undefined,
                    }}
                  >
                    <div
                      className="col-span-2 flex items-center gap-2 px-5 pt-3 md:col-span-1 md:py-4"
                      style={
                        differs
                          ? { boxShadow: `inset 3px 0 0 ${RED}` }
                          : undefined
                      }
                    >
                      <span
                        className="font-plusJakartaSans text-[11px] font-bold uppercase tracking-[0.2em] md:text-xs"
                        style={{ color: differs ? RED : `${INK}80` }}
                      >
                        {row.label}
                      </span>
                    </div>
                    {[valA, valB].map((val, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center px-3 py-3 text-center md:py-4"
                      >
                        {val ? (
                          <span
                            className={`font-plusJakartaSans text-sm leading-snug ${
                              differs ? "font-semibold" : ""
                            }`}
                            style={{ color: differs ? INK : `${INK}99` }}
                          >
                            {val}
                          </span>
                        ) : (
                          <Minus
                            size={15}
                            style={{ color: `${INK}40` }}
                            aria-label="Not included"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* CTA row */}
              <div
                className="grid grid-cols-2 gap-px border-t md:grid-cols-[1.1fr_1fr_1fr]"
                style={{ borderColor: `${INK}14` }}
              >
                <div className="hidden items-center px-5 md:flex">
                  <span
                    className="font-plusJakartaSans text-xs"
                    style={{ color: `${INK}66` }}
                  >
                    Ready when you are.
                  </span>
                </div>
                {[a, b].map((pkg) => (
                  <div key={pkg.id} className="p-4 text-center md:p-5">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full rounded-full px-4 py-3 font-plusJakartaSans text-xs font-bold uppercase tracking-[0.15em] text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{ backgroundColor: pkg.popular ? RED : INK }}
                    >
                      Book {pkg.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

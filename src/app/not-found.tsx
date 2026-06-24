"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Camera } from "lucide-react";
import ThroughNavbar from "@/components/ThroughNavbar";

const INK = "#1a1a1a";
const RED = "#8a1212";

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-svh flex-col overflow-hidden"
      style={{ backgroundColor: "#FFF6E5", color: INK }}
    >
      <ThroughNavbar />

      {/* paper grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-3 font-plusJakartaSans text-[10px] font-bold uppercase tracking-[0.3em] sm:text-[11px] sm:tracking-[0.32em]"
          style={{ color: RED }}
        >
          <span aria-hidden="true" className="inline-block h-px w-8 sm:w-10" style={{ backgroundColor: RED }} />
          Out of frame
          <span aria-hidden="true" className="inline-block h-px w-8 sm:w-10" style={{ backgroundColor: RED }} />
        </motion.p>

        {/* 4 0 4 — the 0 is an aperture/lens */}
        <div className="mt-3 flex items-center justify-center gap-1 sm:gap-3">
          {["4", "0", "4"].map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "0.3em", filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className={`font-morganite font-bold leading-[0.8] text-[clamp(7rem,30vw,18rem)] ${
                ch === "0" ? "text-outline-ink" : ""
              }`}
              style={{ color: INK }}
              aria-hidden="true"
            >
              {ch === "0" ? (
                <span className="relative inline-flex items-center justify-center">
                  0
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  >
                    <Camera
                      className="h-[0.22em] w-[0.22em] opacity-80"
                      style={{ color: RED }}
                    />
                  </motion.span>
                </span>
              ) : (
                ch
              )}
            </motion.span>
          ))}
        </div>
        <span className="sr-only">404 — page not found</span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="-mt-2 font-nyghtSerif text-2xl italic sm:text-3xl md:text-4xl"
          style={{ color: INK }}
        >
          This frame got away
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mx-auto mt-4 max-w-md font-plusJakartaSans text-sm leading-relaxed md:text-base"
          style={{ color: `${INK}99` }}
        >
          The page you&rsquo;re looking for has wandered off the wall. Let&rsquo;s
          get you back to the moments that matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.74 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-plusJakartaSans text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto"
            style={{ backgroundColor: RED }}
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to home
          </Link>
          <Link
            href="/gallery"
            className="w-full rounded-full border px-8 py-4 font-plusJakartaSans text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-[#1a1a1a] hover:text-[#FFF6E5] focus-visible:outline-none focus-visible:ring-2 sm:w-auto"
            style={{ borderColor: `${INK}66`, color: INK }}
          >
            Browse the gallery
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

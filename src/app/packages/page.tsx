"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import PillNavbar from "@/components/PillNavbar";
import Footer from "@/components/Footer";
import TornBanner from "@/components/TornBanner";
import LoveNotes from "@/components/LoveNotes";
import PackagesHero from "@/components/packages/PackagesHero";
import EventShowcase from "@/components/packages/EventShowcase";
import PackageComparison from "@/components/packages/PackageComparison";
import StickyBookBar from "@/components/packages/StickyBookBar";
import { BOOKING_URL, CELEBRATIONS } from "@/data/packages";

const INK = "#1a1a1a";
const RED = "#8a1212";

const defaultPair = (celebrationId: string): [string, string] => {
  const c = CELEBRATIONS.find((x) => x.id === celebrationId) ?? CELEBRATIONS[0];
  const popular = c.packages.find((p) => p.popular) ?? c.packages[0];
  const other =
    c.packages.find((p) => p.id !== popular.id) ?? c.packages[0];
  return [other.id, popular.id];
};

export default function PackagesPage() {
  const [activeEventId, setActiveEventId] = useState(CELEBRATIONS[0].id);
  const [pair, setPair] = useState<[string, string]>(() =>
    defaultPair(CELEBRATIONS[0].id),
  );

  const celebration =
    CELEBRATIONS.find((c) => c.id === activeEventId) ?? CELEBRATIONS[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = "smooth";
    }
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEventChange = useCallback((id: string) => {
    setActiveEventId(id);
    setPair(defaultPair(id));
  }, []);

  const handleCompare = useCallback(
    (packageId: string) => {
      const others = celebration.packages.filter((p) => p.id !== packageId);
      const partner =
        others.find((p) => p.popular) ?? others[0] ?? celebration.packages[0];
      setPair([packageId, partner.id]);
      scrollTo("comparison");
    },
    [celebration],
  );

  return (
    <main
      id="main-content"
      className="min-h-screen overflow-x-clip"
      style={{ backgroundColor: "#FFF6E5", color: INK }}
    >
      <PillNavbar />

      <PackagesHero
        onSelectEvent={(id) => {
          handleEventChange(id);
          scrollTo("celebrations");
        }}
        onCompare={() => scrollTo("comparison")}
      />

      <TornBanner id="celebrations" lead="Pick your" title="CELEBRATION" />
      <EventShowcase
        activeId={activeEventId}
        onChange={handleEventChange}
        onCompare={handleCompare}
      />

      <TornBanner id="comparison" lead="Side by" title="SIDE" />
      <PackageComparison
        celebration={celebration}
        pair={pair}
        onPairChange={setPair}
      />

      <LoveNotes lead="Happy" title="COUPLES" />

      {/* closing CTA */}
      <section className="relative z-10 px-5 pb-24 pt-4 text-center md:pb-32">
        <p
          className="font-nyghtSerif text-lg italic md:text-xl"
          style={{ color: `${INK}99` }}
        >
          Still deciding?
        </p>
        <h2
          className="font-morganite font-bold uppercase leading-[0.85] tracking-[0.04em] text-[15vw] md:text-8xl"
          style={{ color: INK }}
        >
          Let&rsquo;s talk it through
        </h2>
        <p
          className="mx-auto mt-4 max-w-md font-plusJakartaSans text-sm leading-relaxed md:text-base"
          style={{ color: `${INK}99` }}
        >
          A 15-minute consultation and we&rsquo;ll match your celebration to
          the right collection — no pressure, just planning.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-full px-8 py-4 font-plusJakartaSans text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:w-auto"
            style={{ backgroundColor: RED }}
          >
            Book a consultation
          </a>
          <Link
            href="/contact"
            className="w-full rounded-full border px-8 py-4 font-plusJakartaSans text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-[#1a1a1a] hover:text-[#FFF6E5] focus-visible:outline-none focus-visible:ring-2 sm:w-auto"
            style={{ borderColor: `${INK}66`, color: INK }}
          >
            Contact us
          </Link>
        </div>
      </section>

      <Footer />
      <StickyBookBar celebration={celebration} />
    </main>
  );
}

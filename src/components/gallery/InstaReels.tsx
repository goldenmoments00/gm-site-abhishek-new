"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Heart, MessageCircle, Send, MoreHorizontal, Music, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { BEHIND_THE_LENS_REELS } from "@/data/films";

const INK = "#1a1a1a";
const RED = "#8a1212";

const IG_PATH =
  "M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z";

declare global {
  interface Window {
    instgrm?: any;
  }
}

function InstagramNativeEmbed({ shortcode }: { shortcode: string }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.instgrm) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "//www.instagram.com/embed.js";
        script.onload = () => window.instgrm?.Embeds?.process();
        document.body.appendChild(script);
      } else {
        window.instgrm?.Embeds?.process();
      }
    }
  }, [shortcode]);

  return (
    <div className="absolute inset-0 bg-white overflow-hidden flex items-start justify-center pt-[-2px]">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={`https://www.instagram.com/reel/${shortcode}/?utm_source=ig_embed&amp;utm_campaign=loading`}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          margin: "0",
          padding: "0",
          width: "100%",
          minWidth: "100%",
          maxWidth: "100%",
        }}
      ></blockquote>
    </div>
  );
}

function ReelCard({
  shortcode,
  caption,
  thumbnail,
  videoUrl,
  index,
}: {
  shortcode: string;
  caption: string;
  thumbnail?: string;
  videoUrl?: string;
  index: number;
}) {
  const reduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.35) }}
      className="w-[82vw] flex-shrink-0 snap-center sm:w-[326px]"
    >
      <div className="block relative aspect-[9/16] overflow-hidden rounded-md border border-[#FFF6E5]/15 bg-black group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 shadow-2xl">
        
        {loaded ? (
          videoUrl ? (
            <video 
              src={videoUrl}
              autoPlay 
              controls 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover bg-black"
            />
          ) : (
            <InstagramNativeEmbed shortcode={shortcode} />
          )
        ) : (
          <button 
            onClick={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full text-left"
            aria-label={`Play Instagram Reel ${index + 1}`}
          >
            {thumbnail ? (
              <img 
                src={thumbnail}
                alt={caption}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ background: `linear-gradient(150deg, ${RED} 0%, #5e0c0c 100%)` }}
              />
            )}
            
            {/* Subtle dark gradient overlay to ensure text/buttons are readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.3)] border border-white/30">
                <Play size={20} fill="currentColor" className="ml-0.5 drop-shadow-md" />
              </span>
              <span className="flex items-center gap-1.5 font-plusJakartaSans text-[10px] font-bold uppercase tracking-[0.15em] text-white drop-shadow-md">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                  <path d={IG_PATH} />
                </svg>
                Watch Reel
              </span>
            </div>
          </button>
        )}
      </div>
      <figcaption className="mt-2.5 flex items-baseline justify-between px-0.5 font-plusJakartaSans text-[10px] uppercase tracking-[0.2em] text-[#FFF6E5]/55">
        <span>{caption}</span>
        <span style={{ color: "#e0726b" }}>{String(index + 1).padStart(2, "0")}A</span>
      </figcaption>
    </motion.figure>
  );
}

export default function InstaReels() {
  const holes = Array.from({ length: 100 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative z-10 overflow-hidden py-16 md:py-24"
      aria-label="Behind the lens"
    >
      <div className="mx-auto mb-10 max-w-6xl px-5 text-center md:mb-12">
        <p
          className="font-plusJakartaSans text-xs font-bold uppercase tracking-[0.35em]"
          style={{ color: RED }}
        >
          Reel 03 · Off camera
        </p>
        <h2
          className="mt-2 font-morganite text-6xl font-bold uppercase leading-[0.85] tracking-[0.04em] md:text-8xl"
          style={{ color: INK }}
        >
          Behind the lens
        </h2>
        <p
          className="mx-auto mt-3 max-w-md font-plusJakartaSans text-sm"
          style={{ color: `${INK}99` }}
        >
          The frames you never see — our crew at work, straight from the gram.
        </p>
      </div>

      {/* film-tape band laid on the cream paper */}
      <div className="w-full relative group">
        
        {/* Scroll Arrows */}
        <button 
          onClick={() => scroll("left")}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-black/40 md:bg-white/10 hover:bg-black/60 md:hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-xl"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 md:w-8 md:h-8 mr-0.5 md:mr-1" />
        </button>

        <button 
          onClick={() => scroll("right")}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-black/40 md:bg-white/10 hover:bg-black/60 md:hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-xl"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 md:w-8 md:h-8 ml-0.5 md:ml-1" />
        </button>

        <div
          className="overflow-hidden py-4 shadow-[0_22px_50px_rgba(26,26,26,0.18)]"
          style={{ backgroundColor: INK }}
        >
          {/* sprocket holes — top */}
          <div className="flex justify-center gap-4 overflow-hidden px-2" aria-hidden="true">
            {holes.map((_, i) => (
              <span key={i} className="film-hole" />
            ))}
          </div>

          {/* reel strip */}
          <div 
            ref={scrollRef}
            className="my-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide md:gap-5 md:px-8 scroll-smooth"
          >
            {BEHIND_THE_LENS_REELS.map((reel, i) => (
              <ReelCard
                key={reel.id}
                shortcode={reel.shortcode}
                caption={reel.caption}
                thumbnail={reel.thumbnail}
                videoUrl={reel.videoUrl}
                index={i}
              />
            ))}
          </div>

          {/* sprocket holes — bottom */}
          <div className="flex justify-center gap-4 overflow-hidden px-2" aria-hidden="true">
            {holes.map((_, i) => (
              <span key={i} className="film-hole" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

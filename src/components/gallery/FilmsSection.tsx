"use client";

import { useState } from "react";
import { Play, X, ArrowRight } from "lucide-react";
import { FILMS, Film, youTubeEmbed, youTubeThumb } from "@/data/films";
import { motion } from "framer-motion";

function VideoCard({
  film,
  onSelect,
}: {
  film: Film;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Play film: ${film.couple}`}
      className="group relative flex flex-col items-start w-full focus-visible:outline-none text-left"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-10px_rgba(138,18,18,0.2)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={youTubeThumb(film.youTubeId)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10 opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
        
        {/* Play Button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:bg-[#8a1212]/90 group-hover:border-[#8a1212]">
            <Play size={24} fill="currentColor" className="ml-1.5" />
            
            {/* Subtle pulse ring */}
            <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-20" />
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col gap-1 w-full px-2">
        <span className="font-plusJakartaSans text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8a1212]">
          {film.date}{film.location ? ` \u00A0·\u00A0 ${film.location}` : ""}
        </span>
        <span className="font-morganite text-3xl sm:text-4xl uppercase tracking-[0.05em] text-[#1a1a1a] mt-1 transition-colors duration-300 group-hover:text-[#8a1212]">
          {film.couple}
        </span>
      </div>
    </button>
  );
}

function CategoryRow({ 
  title, 
  category, 
  onPlay 
}: { 
  title: string; 
  category: string;
  onPlay: (film: Film) => void;
}) {
  const categoryFilms = FILMS.filter(f => f.category === category);
  
  if (categoryFilms.length === 0) return null;

  return (
    <div className="mb-10 lg:mb-14 last:mb-0">
      <div className="flex items-end justify-between mb-5 lg:mb-6 px-5 lg:px-0">
        <div className="flex flex-col">
          <div className="w-12 h-0.5 bg-[#8a1212] mb-2" />
          <h2 className="text-3xl md:text-5xl font-morganite uppercase tracking-[0.05em] text-[#1a1a1a]">
            {title}
          </h2>
        </div>
        
        <a 
          href="https://youtube.com/@goldenmoment.in.?si=U7GHtt6RKt14bUM_" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-6 py-3 bg-transparent border border-[#1a1a1a]/20 text-[#1a1a1a] rounded-full text-xs sm:text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all duration-500"
        >
          <span>view all</span>
          <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
        </a>
      </div>
      
      {/* Horizontal slider, 3 items per view on PC */}
      <motion.div 
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 px-5 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
        {categoryFilms.map((film) => (
          <motion.div 
            key={film.id} 
            className="snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-[calc(33.333%-1.33rem)]"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
            }}
          >
            <VideoCard film={film} onSelect={() => onPlay(film)} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function FilmsSection() {
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);

  return (
    <section className="relative py-12 md:py-16" aria-label="Wedding films portfolio">
      <div className="mx-auto max-w-[1400px]">
        {/* header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center md:mb-12 lg:mb-16"
        >
          <p
            className="font-plusJakartaSans text-[10px] md:text-xs font-bold uppercase tracking-[0.35em]"
            style={{ color: "#8a1212" }}
          >
            Reel 02 · Press play
          </p>
          <h2
            className="mt-4 font-morganite text-7xl font-bold uppercase leading-[0.85] tracking-[0.04em] md:text-9xl"
            style={{ color: "#1a1a1a" }}
          >
            Our Films
          </h2>
          <p
            className="mx-auto mt-6 max-w-md font-plusJakartaSans text-sm md:text-base leading-relaxed"
            style={{ color: "#1a1a1a99" }}
          >
            Love stories in motion — tap any film to watch the cinema reel.
          </p>
        </motion.div>

        <CategoryRow title="Wedding Films" category="Wedding" onPlay={setActiveFilm} />
        <CategoryRow title="Pre Wedding Films" category="Pre Wedding" onPlay={setActiveFilm} />
      </div>

      {/* Video Modal */}
      {activeFilm && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in zoom-in-95 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          onClick={() => setActiveFilm(null)}
        >
          <button 
            onClick={() => setActiveFilm(null)} 
            className="absolute top-4 right-4 lg:top-8 lg:right-8 z-50 text-white/70 hover:text-white hover:rotate-90 transition-all duration-500 p-4 cursor-pointer"
            aria-label="Close video player"
          >
            <X size={36} strokeWidth={1.5} />
          </button>
          
          <div 
            className="relative z-10 w-full max-w-7xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              src={youTubeEmbed(activeFilm.youTubeId, false)} 
              title={`Playing: ${activeFilm.couple}`}
              className="w-full h-full" 
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen 
            />
          </div>
        </div>
      )}
    </section>
  );
}

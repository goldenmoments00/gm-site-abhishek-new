"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Search } from "lucide-react";
import { HallOfLovePhoto } from "@/data/hallOfLoveData";
import PhotoLightbox from "./PhotoLightbox";

interface HallOfLoveClientProps {
  initialPhotos: HallOfLovePhoto[];
}

const stats = [
  { label: "Families Served", value: "1000+" },
  { label: "Years of Storytelling", value: "8+" },
  { label: "Team Members", value: "25+" },
  { label: "Across", value: "India" },
];

export default function HallOfLoveClient({ initialPhotos }: HallOfLoveClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10); // Default to mobile, updated on mount
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { margin: "200px" });

  // Adjust initial visible count based on screen size
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setVisibleCount(20);
    }
  }, []);

  // Filter photos based on search
  const filteredPhotos = useMemo(() => {
    return initialPhotos.filter((photo) =>
      photo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialPhotos, searchTerm]);

  // Photos to display (lazy load slice)
  const displayPhotos = filteredPhotos.slice(0, visibleCount);

  // Infinite Scroll / Load More logic
  const handleLoadMore = useCallback(() => {
    const increment = typeof window !== "undefined" && window.innerWidth >= 768 ? 20 : 10;
    setVisibleCount((prev) => Math.min(prev + increment, filteredPhotos.length));
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (isInView && visibleCount < filteredPhotos.length) {
      handleLoadMore();
    }
  }, [isInView, visibleCount, filteredPhotos.length, handleLoadMore]);

  // Open Lightbox
  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  // Close Lightbox
  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  // Lightbox Navigation
  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) =>
        prev === filteredPhotos.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) =>
        prev === 0 ? filteredPhotos.length - 1 : (prev as number) - 1
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF6E5]">
      {/* Hero Section */}
      <section className="relative px-6 pb-12 pt-28 md:px-12 md:pt-32 lg:px-24">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-morganite text-7xl uppercase text-[#8a1212] md:text-9xl leading-none"
          >
            Hall of Love
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-2 font-nyghtSerif text-2xl text-zinc-800 md:text-4xl leading-tight"
          >
            More than 1000 smiles, countless memories, and one beautiful family.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-2 font-plusJakartaSans text-base text-zinc-600 md:text-lg"
          >
            Every photo here represents a relationship, a celebration, and a story we were
            honored to be part of.
          </motion.p>

          {/* Animated Statistics */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <span className="font-morganite text-5xl text-[#8a1212] md:text-7xl">
                  {stat.value}
                </span>
                <span className="font-plusJakartaSans text-sm tracking-wider text-zinc-500 uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-6 py-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-md">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-zinc-400" size={20} />
            <input
              type="text"
              placeholder="Search your name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                const initialCount = typeof window !== "undefined" && window.innerWidth >= 768 ? 20 : 10;
                setVisibleCount(initialCount); // Reset count on search based on device
              }}
              className="w-full rounded-full border border-zinc-200 bg-white/50 py-4 pl-12 pr-6 font-plusJakartaSans text-base text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-zinc-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-zinc-200/50"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12">
        {displayPhotos.length === 0 ? (
          <div className="py-20 text-center font-plusJakartaSans text-zinc-400">
            No memories found matching "{searchTerm}".
          </div>
        ) : (
          <div className="columns-2 gap-0 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6">
            {displayPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 10) * 0.05 }}
                className="group relative mb-0 cursor-pointer overflow-hidden bg-[#FFF6E5] break-inside-avoid border border-[#FFF6E5]"
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <img
                  src={photo.thumbnail_url}
                  alt={`Memory ${photo.id}`}
                  loading="lazy"
                  className="block w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Premium Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Intersection Observer Target */}
        {visibleCount < filteredPhotos.length && (
          <div ref={loadMoreRef} className="mt-16 flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-800" />
          </div>
        )}
      </section>

      {/* Lightbox Overlay */}
      <PhotoLightbox
        photo={selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null}
        onClose={closeLightbox}
        onNext={nextPhoto}
        onPrev={prevPhoto}
      />
    </main>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cormorantGaramond, libreBaskerville, allura, specialElite, brittanySignature, rye } from "@/lib/fonts";
import { Camera, Medal, MapPin, Heart } from "lucide-react";

const WordChunk = ({ chunk, start, end, scrollYProgress }: { chunk: string, start: number, end: number, scrollYProgress: any }) => {
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["rgba(45, 36, 28, 0.3)", "rgba(138, 18, 18, 1)"]
  );
  return (
    <motion.span style={{ color }} className="transition-colors duration-100">
      {chunk}{" "}
    </motion.span>
  );
};

const ScrollHighlightText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 55%"],
  });

  const words = text.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += 2) {
    chunks.push(words.slice(i, i + 2).join(" "));
  }

  return (
    <p ref={containerRef}>
      {chunks.map((chunk, i) => {
        const start = i / chunks.length;
        const end = start + 1 / chunks.length;
        return (
          <WordChunk
            key={i}
            chunk={chunk}
            start={start}
            end={end}
            scrollYProgress={scrollYProgress}
          />
        );
      })}
    </p>
  );
};

export default function FounderIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end start"],
  });



  return (
    <div ref={sectionRef} className="relative w-full text-[#2D241C] pt-12 md:pt-16 pb-24 sm:pb-32">

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Centered Section Label */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
          <div className="h-[1px] w-12 bg-[#B78B4E]/50" />
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium text-[#B78B4E]">
            Meet The Founder
          </span>
          <div className="h-[1px] w-12 bg-[#B78B4E]/50" />
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-20">
          
          {/* LEFT SIDE - Portrait (45%) */}
          <motion.div
            className="w-full lg:w-[45%] relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Organic/Irregular Frame Wrapper */}
            <div className="relative w-full aspect-[4/5] sm:max-w-md mx-auto lg:max-w-none">
              
              {/* Background Building Texture behind Abhishek */}
              <div className="absolute inset-0 z-[-1] pointer-events-none mix-blend-multiply opacity-15 scale-[1.3] md:scale-[1.5] translate-y-[15%] lg:hidden">
                <Image
                  src="/about-building3.png"
                  alt="Historic Building Texture"
                  fill
                  className="object-contain contrast-150 brightness-90 saturate-50"
                />
              </div>

              <div className="relative w-full h-full">
                <Image
                  src="/founder image.png"
                  alt="Abhishek Majumder"
                  fill
                  className="object-contain scale-[1.2] sepia-[0.3] contrast-[1.1] brightness-95"
                />
              </div>

              {/* Top-Left Split Decoration */}
              <motion.div
                className="absolute -top-12 -left-12 w-48 h-48 md:w-64 md:h-64 opacity-90 pointer-events-none z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/split.png"
                  alt="Split decoration"
                  fill
                  className="object-contain"
                  style={{ transform: "rotate(-10deg)" }}
                />
              </motion.div>

              {/* Bottom-Right Split Decoration */}
              <motion.div
                className="absolute -bottom-12 -right-12 w-48 h-48 md:w-64 md:h-64 opacity-90 pointer-events-none z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/split.png"
                  alt="Split decoration"
                  fill
                  className="object-contain"
                  style={{ transform: "rotate(170deg)" }}
                />
              </motion.div>
            </div>

            {/* Signature & Location */}
            <div className="-mt-[38px] text-center sm:max-w-md mx-auto lg:max-w-none flex flex-col items-center">
              <span
                className={`${brittanySignature.className} text-3xl sm:text-4xl md:text-5xl text-[#2D241C]/80 inline-block origin-center`}
                style={{ transform: "scale(0.7) rotate(-2deg)" }}
              >
                Abhishek M.
              </span>
              <div className="-mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#2D241C]/50">
                <MapPin className="w-3 h-3" />
                <span>Based in Agartala, Tripura, India</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Content (55%) */}
          <motion.div
            className="w-full lg:w-[55%] flex flex-col justify-center pt-8 lg:pt-12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Name & Subheading */}
            <h2
              className={`${rye.className} text-4xl sm:text-5xl lg:text-6xl leading-none mb-6 text-[#2D241C] whitespace-nowrap`}
            >
              Abhishek <span className="text-[#B78B4E]">Majumder</span>
            </h2>

            {/* Elegant Quote */}
            <p
              className={`${libreBaskerville.className} italic text-sm sm:text-2xl text-[#2D241C]/80 leading-snug sm:leading-relaxed mb-6 sm:mb-8 border-l-[3px] border-[#B78B4E] pl-4 sm:pl-6`}
            >
              &quot;I capture real emotions that become timeless memories.&quot;
            </p>

            {/* Biography */}
            <div
              className={`${specialElite.className} text-[13px] sm:text-lg leading-[1.7] sm:leading-loose space-y-4 sm:space-y-6 max-w-2xl tracking-normal sm:tracking-wide`}
            >
              <ScrollHighlightText text="My photography journey began in 2015 with my first DSLR camera, a Nikon D5300. What started as curiosity soon became my greatest passion." />
              <ScrollHighlightText text="Today, I document weddings, celebrations, portraits, and real stories while continuing to inspire and learn through the photography community." />
            </div>

              {/* Achievement Strip */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-[#B78B4E]/20 overflow-hidden">
                
                {/* Desktop Grid */}
                <div className="hidden sm:grid sm:grid-cols-4 sm:gap-6">
                  {[
                    { icon: Camera, text: "Started 2015" },
                    { icon: Medal, text: "Nikon Influencer" },
                    { icon: MapPin, text: "Agartala, Tripura" },
                    { icon: Heart, text: "Storyteller" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex flex-col items-center justify-center text-center gap-3 shrink-0"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#EFE5D5] flex items-center justify-center text-[#B78B4E] shrink-0">
                        <item.icon className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <span className="text-xs uppercase tracking-widest text-[#2D241C]/80 font-medium leading-tight">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mobile Infinite Marquee */}
                <div className="flex sm:hidden w-full relative">
                  {/* Subtle fade edges */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF5ED] to-transparent z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FAF5ED] to-transparent z-10" />
                  
                  <motion.div 
                    className="flex flex-row gap-6 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                  >
                    {[
                      { icon: Camera, text: "Started 2015" },
                      { icon: Medal, text: "Nikon Influencer" },
                      { icon: MapPin, text: "Agartala, Tripura" },
                      { icon: Heart, text: "Storyteller" },
                      // Duplicated for seamless loop
                      { icon: Camera, text: "Started 2015" },
                      { icon: Medal, text: "Nikon Influencer" },
                      { icon: MapPin, text: "Agartala, Tripura" },
                      { icon: Heart, text: "Storyteller" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className="flex flex-row items-center justify-start text-left gap-2 shrink-0"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#EFE5D5] flex items-center justify-center text-[#B78B4E] shrink-0">
                          <item.icon className="w-3.5 h-3.5 stroke-[1.5]" />
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-[#2D241C]/80 font-medium leading-tight whitespace-nowrap">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
          </motion.div>




        </div>
      </div>
    </div>
  );
}

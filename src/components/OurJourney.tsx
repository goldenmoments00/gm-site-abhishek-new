"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cormorantGaramond, libreBaskerville, scriptin, rye, laStoria, specialElite } from "@/lib/fonts";
import FounderIntro from "./FounderIntro";

// ─── Timeline Data ───────────────────────────────────────────────
const timelineData = [
  {
    year: "2015",
    title: "The Beginning",
    tagline: "One camera. One dream. Endless passion.",
    description:
      "My journey into wedding photography began with my very first assignment under the name Abhishek Photography.\n\nWhat started as a simple photography project soon became something much deeper. Through every wedding, I discovered the power of storytelling—the emotions behind every smile, every tear, and every fleeting moment.\n\nThis was where I learned that great wedding photography is not just about pictures; it's about preserving feelings that last a lifetime.",
    mobileDescription:
      "My journey into wedding photography began with my very first assignment under the name Abhishek Photography.\n\nWhat started as a simple photography project soon became something much deeper. Through every wedding, I discovered the power of storytelling—the emotions behind every smile, every tear, and every fleeting moment.",
    photoSide: "left" as const,
  },
  {
    year: "2018",
    title: "When a Dream Found Its Team",
    tagline: "Together, we created Golden Moment",
    description:
      "With a shared passion for storytelling, I teamed up with my college friend Ranajoy and videographer Shubham.\n\nWhat began as a simple idea between friends quickly evolved into a vision.\n\nCountless conversations, plans, and dreams laid the foundation for something bigger than ourselves.\n\nThat year, the first chapter of Golden Moments was written.",
    photoSide: "right" as const,
  },
  {
    year: "2019",
    title: "The First Office",
    tagline: "Where stories found their storytellers.",
    description:
      "What began as an idea finally found a home.\n\nWe opened our first office, transforming Golden Moments from a dream into a real creative studio.\n\nAs our work reached more couples and families, talented photographers, videographers, and editors joined our journey, bringing fresh energy and new perspectives.\n\nGolden Moments was no longer just a name—it was becoming a team, a culture, and a shared vision dedicated to preserving life's most meaningful moments.",
    photoSide: "left" as const,
  },
  {
    year: "2026",
    title: "A Legacy in the Making",
    tagline: "25+ storytellers. 1000+ celebrations. One shared purpose.",
    description:
      "From a small dream to a growing legacy.\n\nWhat began with a single camera and a vision has grown into a passionate team of more than 25 photographers, filmmakers, editors, and creatives dedicated to preserving life's most meaningful moments.\n\nSince moving into our larger office in 2022, Golden Moments has continued to expand, serving couples across different states and capturing over 1,000 weddings and celebrations.\n\nToday, Golden Moments stands as a trusted name in wedding storytelling, built on creativity, teamwork, and an unwavering commitment to excellence.\n\nWhile our journey continues to evolve, our purpose remains unchanged—to preserve emotions, celebrate love, and turn moments into memories that last forever.",
    photoSide: "right" as const,
  },
];

// ─── Inline SVG brush-stroke shapes (4 variations) ──────────────
// Very rough, organic watercolor paint edges with many irregular points
const brushPaths = [
  // Shape 1
  "M20,10 C50,-5 150,20 200,5 C300,-10 400,20 450,15 C490,10 500,40 480,80 C460,120 490,200 480,250 C470,300 450,310 400,315 C300,320 200,300 100,310 C50,315 10,280 20,240 C30,200 10,100 20,10 Z",
  "M10,20 C80,-10 200,30 300,10 C400,-10 480,10 500,50 C520,90 490,250 500,290 C510,330 400,310 300,320 C200,330 50,300 20,280 C-10,260 0,150 10,20 Z",
  "M30,30 C100,10 250,-10 350,20 C450,50 490,10 500,60 C510,110 490,200 480,260 C470,320 350,310 250,300 C150,290 50,320 20,280 C-10,240 10,100 30,30 Z",
  "M15,15 C80,-5 180,25 280,15 C380,5 480,-5 510,40 C540,85 490,200 480,250 C470,300 380,315 280,305 C180,295 80,320 30,280 C-20,240 0,100 15,15 Z",
];

// ─── Typewriter Text Component ──────────────────────────────────
const TypewriterText = ({ 
  text, 
  className, 
  style, 
  delay = 0 
}: { 
  text: string; 
  className?: string; 
  style?: React.CSSProperties; 
  delay?: number 
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  
  const chars = Array.from(text);
  
  return (
    <motion.p
      ref={ref}
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.015, delayChildren: delay }
        }
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

// ─── Photo Placeholder Component ────────────────────────────────
const BrushPhotoPlaceholder = ({ index }: { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const clipId = `brush-clip-${index}`;
  const pathData = brushPaths[index % brushPaths.length];

  return (
    <motion.div
      ref={ref}
      className="relative w-full flex justify-center items-center"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path
              d={pathData}
              transform="scale(0.001923, 0.003125)"
            />
          </clipPath>
          {/* Rough edge filter - displacement for painterly feel */}
          <filter id={`roughEdge${index}`} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" seed={index * 42 + 7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Conditional Rendering: Real PNGs for index 0 and 1, SVG Placeholder for others */}
      {index === 0 ? (
        <div className="relative w-full flex justify-center items-center px-0 lg:px-4">
          <img 
            src="/story 1.png?v=2" 
            alt="The Beginning" 
            className="w-full max-w-[820px] object-contain scale-110 lg:scale-100"
            style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15)) sepia(0.85) brightness(0.75) contrast(1.1)" }}
          />
        </div>
      ) : index === 1 ? (
        <div className="relative w-full flex justify-center items-center px-0 lg:px-4">
          <img 
            src="/story 2.png?v=2" 
            alt="The Next Chapter" 
            className="w-full max-w-[820px] object-contain scale-110 lg:scale-100"
            style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15)) sepia(0.85) brightness(0.75) contrast(1.1)" }}
          />
        </div>
      ) : index === 2 ? (
        <div className="relative w-full flex justify-center items-center px-0 lg:px-4">
          <img 
            src="/story 3.png?v=2" 
            alt="The Journey Continues" 
            className="w-full max-w-[820px] object-contain scale-110 lg:scale-100"
            style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15)) sepia(0.85) brightness(0.75) contrast(1.1)" }}
          />
        </div>
      ) : index === 3 ? (
        <div className="relative w-full flex justify-center items-center px-0 lg:px-4">
          <img 
            src="/story 4.png?v=2" 
            alt="A growing legacy" 
            className="w-full max-w-[820px] object-contain scale-110 lg:scale-100"
            style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15)) sepia(0.85) brightness(0.75) contrast(1.1)" }}
          />
        </div>
      ) : (
        <div style={{ aspectRatio: "520 / 320", width: "100%" }}>
          {/* Shadow layer underneath */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `url(#${clipId})`,
              background: "rgba(120,100,70,0.12)",
              transform: "translate(4px, 6px)",
              filter: "blur(8px)",
            }}
          />

          {/* Main brush stroke shape - with rough edge filter */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `url(#${clipId})`,
              filter: `url(#roughEdge${index})`,
            }}
          >
            {/* Base watercolor fill — multi-layer gradient for realism */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(${135 + index * 20}deg, 
                    #DED4C4 0%, #D5C9B7 20%, #CDBFAD 40%, 
                    #D8CFC0 60%, #E0D6C8 80%, #D3C7B5 100%)
                `,
              }}
            />

            {/* Watercolor blotch variations */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at ${20 + index * 15}% ${30 + index * 10}%, rgba(200,185,160,0.6) 0%, transparent 50%),
                  radial-gradient(ellipse at ${70 - index * 10}% ${60 + index * 5}%, rgba(190,170,140,0.4) 0%, transparent 45%),
                  radial-gradient(ellipse at 50% 50%, rgba(210,195,170,0.3) 0%, transparent 60%)
                `,
              }}
            />

            {/* Edge darkening for painterly effect */}
            <div
              className="absolute inset-0"
              style={{
                boxShadow: `
                  inset 0 0 40px rgba(160,140,110,0.25),
                  inset 0 0 80px rgba(140,120,90,0.1)
                `,
              }}
            />

            {/* Paper grain noise texture */}
            <div
              className="absolute inset-0 opacity-20 mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
              }}
            />

            {/* Horizontal brush stroke streaks */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                background: `
                  repeating-linear-gradient(
                    ${index % 2 === 0 ? "2deg" : "-1deg"},
                    transparent,
                    transparent 4px,
                    rgba(130,110,80,0.4) 4px,
                    rgba(130,110,80,0.4) 5px,
                    transparent 5px,
                    transparent 12px
                  )
                `,
              }}
            />

            {/* Camera icon and PHOTO HERE text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9E8E76"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-35"
              >
                <rect x="2" y="6" width="20" height="14" rx="2" />
                <circle cx="12" cy="13" r="4" />
                <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
              </svg>
              <span
                className={`${libreBaskerville.className} text-[10px] tracking-[0.25em] uppercase opacity-35`}
                style={{ color: "#9E8E76" }}
              >
                PHOTO HERE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Dried Flower Tape Decoration (photo-f.png) overlapping bottom-left - ONLY on first photo */}
      {index === 0 && (
          <img 
            src="/images/photo-f.png" 
            alt="Vintage floral tape" 
            className="hidden lg:block absolute -bottom-6 left-0 md:-bottom-12 md:-left-12 w-28 md:w-40 pointer-events-none z-10"
            style={{ 
              filter: "drop-shadow(2px 6px 8px rgba(0,0,0,0.15))",
              transform: "rotate(-8deg)"
            }} 
          />
        )}

        {/* Dried Flower Decoration (photo-f2.png) overlapping top-right - ONLY on second photo */}
        {index === 1 && (
          <img 
            src="/images/photo-f2.png" 
            alt="Vintage flower" 
            className="hidden lg:block absolute -top-6 right-0 md:-top-10 md:-right-10 w-24 md:w-32 pointer-events-none z-10"
            style={{ 
              filter: "drop-shadow(-2px 4px 6px rgba(0,0,0,0.12))",
              transform: "rotate(15deg)"
            }} 
          />
        )}
    </motion.div>
  );
};

// ─── Year Label ────────────────────────────────────────────────────
const YearLabel = ({ year }: { year: string }) => (
  <div
    className="relative inline-block"
  >
    <span
      className={`${rye.className} text-[1.6rem] md:text-[2.2rem] tracking-wider leading-none`}
      style={{ color: "#B68A35" }}
    >
      {year}
    </span>
  </div>
);



// ─── Timeline Block ──────────────────────────────────────────────
const TimelineBlock = ({
  data,
  index,
}: {
  data: (typeof timelineData)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isPhotoLeft = data.photoSide === "left";

  // Photo element
  const photoEl = (
    <div className={`w-full lg:w-1/2 lg:shrink-0 flex justify-center ${isPhotoLeft ? 'lg:justify-end lg:pr-4 xl:pr-12' : 'lg:justify-start lg:pl-4 xl:pl-12'}`}>
      <div className="w-full max-w-[820px]">
        <BrushPhotoPlaceholder index={index} />
      </div>
    </div>
  );

  // Text content element
  const textEl = (
    <motion.div
      className={`relative w-full flex flex-col justify-center items-center text-center lg:items-stretch lg:w-1/2 lg:shrink-0 ${isPhotoLeft ? 'lg:pl-4 xl:pl-12 lg:text-left' : 'lg:pr-4 xl:pr-12 lg:text-right'}`}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
    >
      {/* Decorative Building Image for The First Studio */}
      {index === 1 && (
        <div 
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-[-1] mix-blend-multiply scale-50 md:scale-100 opacity-20 md:opacity-100"
          style={{
            left: "-25vw",
            width: "70vw",
            height: "70vw",
            maxWidth: "1120px",
            maxHeight: "1120px",
          }}
        >
          <Image
            src="/about-building2.png"
            alt="The First Studio Building"
            fill
            className="object-contain object-left contrast-[1.1] brightness-95 sepia saturate-150"
          />
        </div>
      )}

      {/* Year + Title column */}
      <div className={`flex flex-col gap-2 mb-3 items-center ${isPhotoLeft ? 'lg:items-start' : 'lg:items-end'}`}>
        <YearLabel year={data.year} />
        <h3
          className={`${rye.className} text-2xl md:text-3xl lg:text-[2.2rem] text-[#2C241D] tracking-wide leading-tight`}
        >
          {data.title}
        </h3>
      </div>

      {/* Tagline */}
      <p
        className={`${rye.className} text-base md:text-[1.1rem] leading-relaxed mb-4 whitespace-pre-line text-center ${isPhotoLeft ? 'lg:text-left' : 'lg:text-right'}`}
        style={{ color: "#B68A35", letterSpacing: "0.02em" }}
      >
        {data.tagline}
      </p>

      {/* Body description */}
      <TypewriterText
        text={data.description}
        className={`${specialElite.className} text-[1.1rem] md:text-[1.2rem] leading-[1.8] tracking-[0.01em] whitespace-pre-line text-center ${isPhotoLeft ? 'lg:text-left' : 'lg:text-right'}`}
        style={{ color: "rgba(44,36,29,0.85)" }}
        delay={0.6}
      />
    </motion.div>
  );

  return (
    <div ref={ref} className="relative">
      {/* DESKTOP LAYOUT (Original) */}
      <div className={`hidden lg:flex gap-0 items-stretch w-full ${isPhotoLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {photoEl}
        {textEl}
      </div>

      {/* MOBILE LAYOUT (Redesigned from reference) */}
      <motion.div 
        className="flex lg:hidden flex-col gap-6 w-full"
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        {/* Top row: Photo + Header */}
        <div className="flex flex-row items-center gap-2 w-full">
          {/* Left side: Photo */}
          <div className="w-[55%] shrink-0">
            <BrushPhotoPlaceholder index={index} />
          </div>
          
          {/* Right side: Year, Title, Tagline */}
          <div className="w-[45%] flex flex-col justify-center items-start text-left gap-1">
            <YearLabel year={data.year} />
            <h3 className={`${rye.className} text-[1.4rem] leading-tight text-[#2C241D] mt-1`}>
              {data.title}
            </h3>
            <p className={`${rye.className} text-[11px] leading-snug mt-1`} style={{ color: "#B68A35" }}>
              {data.tagline}
            </p>
          </div>
        </div>

        {/* Bottom row: Description */}
        <TypewriterText
          text={'mobileDescription' in data && data.mobileDescription ? data.mobileDescription : data.description}
          className={`${specialElite.className} text-[12px] sm:text-[14px] leading-relaxed text-center px-2`}
          style={{ color: "rgba(44,36,29,0.85)" }}
          delay={0.4}
        />
      </motion.div>
    </div>
  );
};

// ─── Timeline Dot ────────────────────────────────────────────────
const TimelineDot = ({ delay }: { delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      {/* Glow */}
      <motion.div
        className="absolute w-6 h-6 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(201,168,106,0.3) 0%, transparent 70%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: [0, 1.8, 1.3], opacity: [0, 0.5, 0.25] } : {}}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
      {/* Dot */}
      <motion.div
        className="w-2.5 h-2.5 rounded-full relative z-10"
        style={{
          background: "#C9A86A",
          border: "2px solid #F8F2E8",
          boxShadow: "0 0 0 1px #C9A86A",
        }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.15, type: "spring", stiffness: 250 }}
      />
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────
export default function OurJourney() {
  const [, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for the background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -800]); 
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 200]); 
  const y3 = useTransform(scrollYProgress, [0, 1], [350, -300]); 
  const y4 = useTransform(scrollYProgress, [0, 1], [400, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32 z-0"
      style={{ background: "#F8F2E8" }}
    >
      {/* ═══════════ Background Textures ═══════════ */}

      {/* Parchment grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Subtle warm radial gradient to enhance depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(182,138,53,0.035) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 70%, rgba(198,178,148,0.04) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 90%, rgba(182,138,53,0.025) 0%, transparent 40%)
          `,
        }}
      />

      {/* ═══════════ Decorative Elements ═══════════ */}


      {/* Decorative Building Image 3 — top left area */}
      <motion.div
        className="absolute pointer-events-none z-0 mix-blend-multiply opacity-20 lg:opacity-100 scale-[2] lg:scale-100 left-[calc(-50vw+50%+15vw)] lg:left-[calc(-50vw+50%-4rem)]"
        style={{ 
          top: "280px",
          width: "50vw", 
          height: "50vw",
          maxWidth: "800px",
          maxHeight: "800px",
          y: y1
        }}
      >
        <div
          style={{ width: "100%", height: "100%", position: "relative", opacity: 0.35 }}
        >
          <Image
            src="/about-building3.png"
            alt="Historic Building Overlay"
            fill
            className="object-contain object-left contrast-150 brightness-90 saturate-50"
          />
        </div>
      </motion.div>

      {/* ═══════════ Founder Intro ═══════════ */}
      <FounderIntro />

      {/* ═══════════ Section Header ═══════════ */}
      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Decorative Building Image (Top Right of Our Story) */}
        <motion.div
          className="absolute top-[80px] xl:top-[-5rem] right-[calc(-50vw+50%+15vw)] xl:right-[-30rem] pointer-events-none z-0 mix-blend-multiply opacity-80 xl:opacity-100 scale-[1.5] xl:scale-100 origin-right"
          style={{ 
            width: "55vw", 
            height: "55vw",
            maxWidth: "1000px",
            maxHeight: "1000px",
            y: y2
          }}
        >
          <div
            style={{ width: "100%", height: "100%", position: "relative", opacity: 0.85 }}
          >
            <Image
              src="/about-building.png"
              alt="Historic Building"
              fill
              className="object-contain object-right contrast-150 brightness-90 saturate-50"
            />
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Small label */}
          <motion.p
            className={`${cormorantGaramond.className} text-[15px] md:text-[17px] tracking-[0.25em] uppercase mb-4 font-bold`}
            style={{ color: "#8A6D3B", transform: "translateY(12px)" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our Journey
          </motion.p>

          {/* Top Decorative Line */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-[1px] w-16 md:w-24" style={{ background: "linear-gradient(90deg, transparent, #8A6D3B)" }} />
            {/* Vintage flourish/diamond */}
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L14.5 4.5L24 6L14.5 7.5L12 12L9.5 7.5L0 6L9.5 4.5L12 0Z" fill="#8A6D3B"/>
              <path d="M12 2L13.5 5L18 6L13.5 7L12 10L10.5 7L6 6L10.5 5L12 2Z" fill="#F8F2E8"/>
              <circle cx="5" cy="6" r="1.5" fill="#8A6D3B"/>
              <circle cx="19" cy="6" r="1.5" fill="#8A6D3B"/>
            </svg>
            <div className="h-[1px] w-16 md:w-24" style={{ background: "linear-gradient(270deg, transparent, #8A6D3B)" }} />
          </motion.div>

          {/* Main title: "Our" in serif + "Story" in script */}
          <motion.div
            className="flex items-baseline justify-center gap-[4px] mb-12"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2
              className={`${rye.className} text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] leading-none tracking-tight`}
              style={{ color: "#2E2419" }}
            >
              Our
            </h2>
            <h2
              className={`${laStoria.className} text-3xl sm:text-4xl md:text-[3rem] lg:text-[3.5rem] leading-none`}
              style={{ color: "#957538", transform: "translateY(-15px)" }}
            >
              Story
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className={`${cormorantGaramond.className} text-[14px] md:text-[16px] tracking-[0.25em] uppercase mt-2 mb-6 font-semibold`}
            style={{ color: "#2E2419", transform: "translateY(16px)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A Decade of Preserving Golden Moments
          </motion.p>

          {/* Bottom Decorative Line */}
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="h-[1px] w-16 md:w-24" style={{ background: "linear-gradient(90deg, transparent, #8A6D3B)" }} />
            {/* Vintage flourish/diamond */}
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L14.5 4.5L24 6L14.5 7.5L12 12L9.5 7.5L0 6L9.5 4.5L12 0Z" fill="#8A6D3B"/>
              <path d="M12 2L13.5 5L18 6L13.5 7L12 10L10.5 7L6 6L10.5 5L12 2Z" fill="#F8F2E8"/>
              <circle cx="5" cy="6" r="1.5" fill="#8A6D3B"/>
              <circle cx="19" cy="6" r="1.5" fill="#8A6D3B"/>
            </svg>
            <div className="h-[1px] w-16 md:w-24" style={{ background: "linear-gradient(270deg, transparent, #8A6D3B)" }} />
          </motion.div>
        </motion.div>

        {/* Decorative Building Image 3 (Lower Right of Timeline) */}
        <motion.div
          className="absolute bottom-[25%] right-[calc(-50vw+50%+15vw)] xl:right-[calc(-50vw+50%-8rem)] pointer-events-none z-0 mix-blend-multiply opacity-30 xl:opacity-100 scale-[1.5] xl:scale-100 origin-left"
          style={{ 
            width: "55vw", 
            height: "55vw",
            maxWidth: "1000px",
            maxHeight: "1000px"
          }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 0.45, x: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/about-building3.png"
            alt="Historic Building Overlay"
            fill
            className="object-contain object-right contrast-150 brightness-90 saturate-50"
          />
        </motion.div>

        {/* ═══════════ Timeline ═══════════ */}
        <div className="relative">
          {/* Central vertical timeline line — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2" style={{ width: "1px" }}>
            <motion.div
              className="w-full h-full"
              style={{
                background: "linear-gradient(180deg, transparent 0%, #C9A86A 8%, #C9A86A 92%, transparent 100%)",
              }}
              initial={{ scaleY: 0, transformOrigin: "top" }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>

          {/* Timeline blocks with dots */}
          <div className="space-y-12 md:space-y-16 lg:space-y-20">
            {timelineData.map((item, index) => (
              <div key={item.year} className="relative">
                {/* Desktop dot — on center line */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                  <TimelineDot delay={index * 0.12} />
                </div>

                {/* Content spanning full width on mobile */}
                <div className="pl-0">
                  <TimelineBlock data={item} index={index} />
                </div>

                {/* Decorative Hourglass for 2019 block (Growing Beyond Borders) */}
                {index === 2 && (
                  <motion.div
                    className="absolute right-0 top-[250px] md:right-[-10%] lg:right-[2%] md:top-[400px] w-64 md:w-[28rem] lg:w-[36rem] mix-blend-multiply pointer-events-none z-[-1] opacity-60 md:opacity-100"
                    style={{ y: y3 }}
                  >
                    <div
                      style={{ width: "100%", height: "100%", position: "relative", opacity: 0.15 }}
                    >
                      <Image
                        src="/about-building4.png"
                        alt="Hourglass Sketch"
                        width={700}
                        height={700}
                        className="object-contain contrast-125 brightness-95 saturate-50"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Decorative Camera/Building for 2026 block (1000+ Weddings) */}
                {index === 3 && (
                  <>
                    {/* New Building 6 overlay */}
                    <motion.div
                      className="absolute left-[-1rem] top-[50px] md:left-[calc(-10%-200px)] lg:left-[-200px] md:top-[calc(10%-200px)] w-[12rem] md:w-[14rem] lg:w-[18rem] mix-blend-multiply pointer-events-none z-[-1] opacity-60 md:opacity-100"
                      style={{ y: y3 }} // Reusing y3 for nice parallax
                    >
                      <div
                        style={{ width: "100%", height: "100%", position: "relative", opacity: 0.2 }}
                      >
                        <Image
                          src="/about-building6.png"
                          alt="Vintage Sketch"
                          width={700}
                          height={700}
                          className="object-contain contrast-125 brightness-95 saturate-50"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute pointer-events-none z-[-1] mix-blend-multiply bottom-[30%] lg:bottom-[-25%] scale-[1.5] lg:scale-100"
                      style={{ 
                        left: "calc(-50vw + 50% - 4rem)", // Bleeds off the left edge of the screen
                        width: "65vw", 
                        height: "65vw",
                        maxWidth: "1200px",
                        maxHeight: "1200px",
                        y: y4
                      }}
                    >
                    <div
                      style={{ width: "100%", height: "100%", position: "relative", opacity: 0.25 }}
                    >
                      <Image
                        src="/about-building5.png"
                        alt="Vintage Camera Sketch"
                        fill
                        className="object-contain object-left contrast-125 brightness-95 saturate-50"
                      />
                    </div>
                  </motion.div>
                  </>
                )}

                {/* Small spacer dot between sections (not after last) */}
                {index < timelineData.length - 1 && (
                  <>
                    <div className="hidden lg:flex justify-center mt-10">
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ background: "rgba(201,168,106,0.35)" }}
                      />
                    </div>
                    {/* Mobile small spacer dot (Removed) */}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

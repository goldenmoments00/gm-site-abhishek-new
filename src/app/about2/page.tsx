"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { morganite, nyghtSerif } from "@/lib/fonts";
import Navbar from "@/components/Navbar";

// Founding members data (using first 4 from your constants)
const foundingMembers = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Creative Director",
    specialty: "Fashion & Portrait",
    image: "/images/team/1.png",
    instagram: "@elena.shoots",
    email: "elena@agency.com",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Lead Photographer",
    specialty: "Wedding & Events",
    image: "/images/team/1.png",
    instagram: "@marcus.lens",
    email: "marcus@agency.com",
  },
  {
    id: 3,
    name: "Sophia Mitchell",
    role: "Senior Photographer",
    specialty: "Commercial & Brand",
    image: "/images/team/1.png",
    instagram: "@sophia.frames",
    email: "sophia@agency.com",
  },
  {
    id: 4,
    name: "James Anderson",
    role: "Photographer",
    specialty: "Nature & Landscape",
    image: "/images/team/1.png",
    instagram: "@james.wild",
    email: "james@agency.com",
  },
];

// Extended team members data - all photographers
const allTeamMembers = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Creative Director",
    specialty: "Fashion & Portrait",
    image: "/images/team/2.png",
    instagram: "@elena.shoots",
    email: "elena@agency.com",
    experience: "8 years",
    awards: "International Fashion Photo Award 2023",
    bio: "Elena brings a unique vision to fashion and portrait photography, combining classical techniques with modern storytelling.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Lead Photographer",
    specialty: "Wedding & Events",
    image: "/images/team/2.png",
    instagram: "@marcus.lens",
    email: "marcus@agency.com",
    experience: "10 years",
    awards: "Wedding Photography Excellence 2022",
    bio: "Marcus specializes in capturing the raw emotions and intimate moments that make each wedding uniquely beautiful.",
  },
  {
    id: 3,
    name: "Sophia Mitchell",
    role: "Senior Photographer",
    specialty: "Commercial & Brand",
    image: "/images/team/2.png",
    instagram: "@sophia.frames",
    email: "sophia@agency.com",
    experience: "7 years",
    awards: "Commercial Photography Innovation 2023",
    bio: "Sophia creates compelling visual narratives for brands, translating business stories into captivating imagery.",
  },
  {
    id: 4,
    name: "James Anderson",
    role: "Photographer",
    specialty: "Nature & Landscape",
    image: "/images/team/2.png",
    instagram: "@james.wild",
    email: "james@agency.com",
    experience: "6 years",
    awards: "Nature Photography Society Merit 2022",
    bio: "James captures the untamed beauty of nature, bringing outdoor magic to wedding and portrait sessions.",
  },
  {
    id: 5,
    name: "Isabella Chen",
    role: "Senior Photographer",
    specialty: "Lifestyle & Documentary",
    image: "/images/team/2.png",
    instagram: "@isabella.moments",
    email: "isabella@agency.com",
    experience: "9 years",
    awards: "Documentary Photography Award 2023",
    bio: "Isabella specializes in candid lifestyle photography, capturing authentic moments and genuine human connections.",
  },
  {
    id: 6,
    name: "David Park",
    role: "Photographer",
    specialty: "Fine Art & Creative",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    instagram: "@david.creates",
    email: "david@agency.com",
    experience: "5 years",
    awards: "Fine Art Photography Emerging Artist 2022",
    bio: "David pushes creative boundaries, blending traditional photography with innovative artistic techniques.",
  },
  {
    id: 7,
    name: "Maya Patel",
    role: "Associate Photographer",
    specialty: "Cultural & Celebration",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    instagram: "@maya.cultures",
    email: "maya@agency.com",
    experience: "4 years",
    awards: "Cultural Photography Recognition 2023",
    bio: "Maya specializes in multicultural celebrations, bringing deep understanding to diverse wedding traditions.",
  },
  {
    id: 8,
    name: "Alex Thompson",
    role: "Associate Photographer",
    specialty: "Destination & Travel",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
    instagram: "@alex.travels",
    email: "alex@agency.com",
    experience: "4 years",
    awards: "Travel Photography Excellence 2022",
    bio: "Alex brings wanderlust to wedding photography, specializing in destination weddings and adventure sessions.",
  },
];

// Journey timeline data with multiple images for each milestone
const journeyMilestones = [
  {
    year: "2018",
    title: "The Beginning",
    description:
      "Four passionate photographers came together with a shared vision to capture life's most precious moments.",
    images: [
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
    ],
  },
  {
    year: "2019",
    title: "First Studio",
    description:
      "Opened our first studio in the heart of the city, creating a space where creativity could flourish.",
    images: [
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
    ],
  },
  {
    year: "2020",
    title: "Digital Innovation",
    description:
      "Adapted to the digital world, pioneering virtual shoots and remote consultations during challenging times.",
    images: [
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
    ],
  },
  {
    year: "2022",
    title: "Award Recognition",
    description:
      "Received the prestigious Photography Excellence Award, recognizing our commitment to artistic vision.",
    images: [
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
    ],
  },
  {
    year: "2024",
    title: "Global Expansion",
    description:
      "Expanded our services internationally, bringing our unique storytelling approach to couples worldwide.",
    images: [
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
      "/images/team/2.png",
    ],
  },
];

// Camera Shutter Image Switcher Component
const CameraShutterImageSwitcher = ({
  images,
  title,
  index,
}: {
  images: string[];
  title: string;
  index: number;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShutterOpen, setIsShutterOpen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Close shutter
      setIsShutterOpen(false);

      // Change image after shutter closes
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        // Open shutter with new image
        setIsShutterOpen(true);
      }, 300); // Half of shutter animation duration
    }, 4000); // Switch every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      className="relative group"
      whileInView={{ scale: [0.8, 1] }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {/* Camera frame - photography themed border */}
      <div className="absolute -inset-4 bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600 shadow-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
      <div className="absolute -inset-3 bg-stone-200 transform -rotate-0.5 group-hover:rotate-0 transition-transform duration-500"></div>

      {/* Film strip notches */}
      <div className="absolute -left-2 top-8 bottom-8 w-1 bg-stone-400 opacity-30">
        <div className="absolute top-0 -left-1 w-3 h-3 bg-stone-400"></div>
        <div className="absolute top-8 -left-1 w-3 h-3 bg-stone-400"></div>
        <div className="absolute top-16 -left-1 w-3 h-3 bg-stone-400"></div>
        <div className="absolute bottom-16 -left-1 w-3 h-3 bg-stone-400"></div>
        <div className="absolute bottom-8 -left-1 w-3 h-3 bg-stone-400"></div>
        <div className="absolute bottom-0 -left-1 w-3 h-3 bg-stone-400"></div>
      </div>

      {/* Main image container */}
      <motion.div
        className="relative overflow-hidden aspect-[4/3] shadow-2xl h-80 bg-white"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Multiple images layered */}
        {images.map((imageSrc, imgIndex) => (
          <motion.div
            key={imgIndex}
            className="absolute inset-0"
            animate={{
              opacity: imgIndex === currentImageIndex ? 1 : 0,
              scale: imgIndex === currentImageIndex ? 1 : 1.1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Image
              src={imageSrc}
              alt={`${title} - ${imgIndex + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}

        {/* Camera shutter effect - 8 blades closing/opening */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, bladeIndex) => (
            <motion.div
              key={bladeIndex}
              className="absolute bg-black origin-center"
              style={{
                width: "200%",
                height: "200%",
                left: "50%",
                top: "50%",
                transformOrigin: "50% 50%",
                transform: `translate(-50%, -50%) rotate(${
                  bladeIndex * 45
                }deg)`,
              }}
              animate={{
                scaleY: isShutterOpen ? 0 : 1,
              }}
              transition={{
                duration: 0.6,
                delay: bladeIndex * 0.02,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent"></div>

        {/* Flash effect on image change */}
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          animate={{
            opacity: !isShutterOpen ? [0, 0.8, 0] : 0,
          }}
          transition={{ duration: 0.2, times: [0, 0.5, 1] }}
        />

        {/* Camera info display - updates with image changes */}
        <motion.div
          className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 font-mono opacity-70"
          animate={{
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          f/{(2.8 + currentImageIndex * 0.2).toFixed(1)} • 1/
          {60 + index * 30 + currentImageIndex * 15}s • ISO
          {200 + index * 100 + currentImageIndex * 50}
        </motion.div>

        {/* Image counter indicator */}
        <div className="absolute top-3 right-3 flex space-x-1">
          {images.map((_, imgIndex) => (
            <motion.div
              key={imgIndex}
              className="w-2 h-2 rounded-full border border-white/60"
              animate={{
                backgroundColor:
                  imgIndex === currentImageIndex
                    ? "#ffffff"
                    : "rgba(255,255,255,0.3)",
                scale: imgIndex === currentImageIndex ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Vintage photo corners */}
        <div className="absolute top-0 left-0 w-6 h-6">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-stone-300"></div>
          <div className="absolute top-0 left-0 w-0.5 h-full bg-stone-300"></div>
        </div>
        <div className="absolute top-0 right-0 w-6 h-6">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-stone-300"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-stone-300"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-6 h-6">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-300"></div>
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-stone-300"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6">
          <div className="absolute bottom-0 right-0 w-full h-0.5 bg-stone-300"></div>
          <div className="absolute bottom-0 right-0 w-0.5 h-full bg-stone-300"></div>
        </div>

        {/* Shutter sound visual indicator */}
        <motion.div
          className="absolute top-3 left-3 text-white/60 text-xs font-mono"
          animate={{
            opacity: !isShutterOpen ? [0, 1, 0] : 0,
          }}
          transition={{ duration: 0.1, times: [0, 0.5, 1] }}
        >
          ●
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform values for flowing images that dissolve away
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, 800]); // Flow down and disappear - faster
  const y2 = useTransform(scrollYProgress, [0, 0.2], [0, 800]);
  const y3 = useTransform(scrollYProgress, [0, 0.2], [0, 600]); // Bottom images don't travel as far
  const y4 = useTransform(scrollYProgress, [0, 0.2], [0, 600]);

  // X transforms - slight movement toward center as they flow
  const x1 = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const x2 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const x3 = useTransform(scrollYProgress, [0, 0.2], [0, 50]);
  const x4 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Rotation - maintain tilt as they flow
  const rotate1 = useTransform(scrollYProgress, [0, 0.2], [15, 25]);
  const rotate2 = useTransform(scrollYProgress, [0, 0.2], [-12, -20]);
  const rotate3 = useTransform(scrollYProgress, [0, 0.2], [18, 30]);
  const rotate4 = useTransform(scrollYProgress, [0, 0.2], [-15, -25]);

  // Scale and opacity - dissolve as they flow down
  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);
  const scale2 = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);
  const scale3 = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);
  const scale4 = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);

  // Flowing images opacity - fade out as they flow (reveal founders sooner)
  const flowingOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0]);

  // Static founder images opacity - fade in much sooner after flowing images disappear
  const staticFoundersOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.18],
    [0, 1]
  );
  const staticFoundersY = useTransform(scrollYProgress, [0.1, 0.18], [30, 0]);

  // Team content opacity - appears sooner after static images are revealed
  const teamContentOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.25],
    [0, 1]
  );
  const teamContentY = useTransform(scrollYProgress, [0.15, 0.25], [30, 0]);

  return (
    <>
      <Navbar />
      <div
        ref={containerRef}
        className="relative min-h-[250vh] sm:min-h-[300vh] bg-gradient-to-b from-stone-200 via-stone-100 to-stone-50"
      >
        {/* Flowing Founder Images - flow down and dissolve - Responsive */}
        <motion.div
          className="fixed top-10 sm:top-16 lg:top-20 left-4 sm:left-10 lg:left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 z-40"
          style={{
            y: y1,
            x: x1,
            rotate: rotate1,
            scale: scale1,
            opacity: flowingOpacity,
          }}
        >
          <motion.div
            className="relative w-full h-full overflow-hidden transform hover:scale-105 transition-transform duration-300 group"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            {/* Main image container */}
            <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-none">
              <Image
                src={foundingMembers[0].image}
                alt={foundingMembers[0].name}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="fixed top-10 sm:top-16 lg:top-20 right-4 sm:right-10 lg:right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 z-40"
          style={{
            y: y2,
            x: x2,
            rotate: rotate2,
            scale: scale2,
            opacity: flowingOpacity,
          }}
        >
          <motion.div
            className="relative w-full h-full overflow-hidden transform hover:scale-105 transition-transform duration-300 group"
            whileHover={{ rotate: -5, scale: 1.1 }}
          >
            {/* Main image container */}
            <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-none">
              <Image
                src={foundingMembers[1].image}
                alt={foundingMembers[1].name}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="fixed bottom-10 sm:bottom-16 lg:bottom-20 left-4 sm:left-10 lg:left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 z-40"
          style={{
            y: y3,
            x: x3,
            rotate: rotate3,
            scale: scale3,
            opacity: flowingOpacity,
          }}
        >
          <motion.div
            className="relative w-full h-full overflow-hidden transform hover:scale-105 transition-transform duration-300 group"
            whileHover={{ rotate: 8, scale: 1.1 }}
          >
            {/* Main image container */}
            <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-none">
              <Image
                src={foundingMembers[2].image}
                alt={foundingMembers[2].name}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="fixed bottom-10 sm:bottom-16 lg:bottom-20 right-4 sm:right-10 lg:right-20 w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 z-40"
          style={{
            y: y4,
            x: x4,
            rotate: rotate4,
            scale: scale4,
            opacity: flowingOpacity,
          }}
        >
          <motion.div
            className="relative w-full h-full overflow-hidden transform hover:scale-105 transition-transform duration-300 group"
            whileHover={{ rotate: -8, scale: 1.1 }}
          >
            {/* Main image container */}
            <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-none">
              <Image
                src={foundingMembers[3].image}
                alt={foundingMembers[3].name}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
        {/* Hero Section - Fully Responsive */}
        <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200">
          {/* Background Pattern - Responsive */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#8b5a3c_1px,_transparent_1px)] bg-[length:30px_30px] sm:bg-[length:40px_40px] md:bg-[length:60px_60px]"></div>
          </div>

          {/* Mobile Revealing Layers Effect - Optimized */}
          <div className="absolute inset-0 sm:hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-stone-200/60 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-stone-300/40 to-transparent"
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Hero Text - Mobile-First Responsive */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8">
            <motion.h1
              className={`${morganite.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-stone-800 mb-4 sm:mb-6 leading-tight max-w-5xl`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Our Story
            </motion.h1>
            <motion.p
              className={`${nyghtSerif.className} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-stone-600 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl leading-relaxed px-2`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Four visionaries united by passion, creativity, and the art of
              capturing
              <span className="italic text-stone-700">
                {" "}
                life&apos;s golden moments
              </span>
            </motion.p>
          </div>

          {/* Scroll Indicator - Responsive */}
          <motion.div
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-stone-400 rounded-full flex justify-center">
              <motion.div
                className="w-0.5 sm:w-1 h-2 sm:h-3 bg-stone-600 rounded-full mt-1.5 sm:mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Team Section - Mobile-First Responsive Design */}
        <section className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-transparent relative overflow-visible min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl py-6 sm:py-8 lg:py-12 xl:py-16 px-4 sm:px-6 lg:px-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2
                className={`${morganite.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-stone-800 mb-3 sm:mb-4 lg:mb-6`}
              >
                The Founders
              </h2>
              <p
                className={`${nyghtSerif.className} text-sm sm:text-base lg:text-lg xl:text-xl text-stone-600 max-w-xs sm:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0`}
              >
                Meet the creative minds behind Golden Moments, each bringing
                their unique perspective and expertise
              </p>
            </motion.div>

            {/* Static Founder Images - Mobile-Optimized Responsive Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 max-w-6xl mx-auto px-2 sm:px-0"
              style={{ opacity: staticFoundersOpacity, y: staticFoundersY }}
            >
              {foundingMembers.map((member, index) => (
                <motion.div
                  key={`static-${member.id}`}
                  className="relative w-full h-72 sm:h-80 lg:h-80 mx-auto group max-w-sm sm:max-w-none"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Mobile Revealing Effect - Refined */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-stone-200/70 via-stone-100/50 to-transparent sm:hidden z-10"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "100%" }}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.15,
                      ease: "easeInOut",
                    }}
                    viewport={{ once: true }}
                  />

                  <motion.div
                    className="relative w-full h-full overflow-hidden transform transition-all duration-500"
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    {/* Name overlay on image - Mobile-Optimized */}
                    <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6">
                      <h3
                        className={`${morganite.className} text-white text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-1 tracking-wide drop-shadow-lg`}
                      >
                        {member.name}
                      </h3>
                      <p
                        className={`${nyghtSerif.className} text-white/95 text-xs sm:text-sm lg:text-base italic font-medium drop-shadow-md`}
                      >
                        {member.role}
                      </p>
                    </div>

                    {/* Sharp accent line - Mobile-Responsive */}
                    <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-stone-600 via-stone-400 to-stone-600"></div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Team member details - Mobile-First Responsive Layout */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-2 sm:px-0"
              style={{ opacity: teamContentOpacity, y: teamContentY }}
            >
              {foundingMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="text-center group max-w-sm mx-auto sm:max-w-none"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white p-4 sm:p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2">
                    <p
                      className={`${nyghtSerif.className} text-stone-700 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed font-medium`}
                    >
                      {member.specialty}
                    </p>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-stone-500">
                      <p className={`${nyghtSerif.className} font-medium`}>
                        {member.instagram}
                      </p>
                      <p className={`${nyghtSerif.className} font-medium`}>
                        {member.email}
                      </p>
                    </div>

                    {/* Sharp accent line at bottom - Mobile-Responsive */}
                    <div className="mt-3 sm:mt-4 lg:mt-6 w-full h-0.5 bg-gradient-to-r from-transparent via-stone-400 to-transparent group-hover:via-stone-600 transition-colors duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-32 bg-gradient-to-br from-stone-50 to-stone-100 relative overflow-hidden">
          {/* Camera viewfinder grid overlay - subtle */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
                backgroundSize: "80px 80px",
              }}
            ></div>
          </div>

          {/* Aperture corners - photography themed */}
          <div className="absolute top-20 left-20 w-12 h-12 opacity-10">
            <div className="w-full h-full border-l-2 border-t-2 border-stone-600"></div>
          </div>
          <div className="absolute top-20 right-20 w-12 h-12 opacity-10">
            <div className="w-full h-full border-r-2 border-t-2 border-stone-600"></div>
          </div>
          <div className="absolute bottom-20 left-20 w-12 h-12 opacity-10">
            <div className="w-full h-full border-l-2 border-b-2 border-stone-600"></div>
          </div>
          <div className="absolute bottom-20 right-20 w-12 h-12 opacity-10">
            <div className="w-full h-full border-r-2 border-b-2 border-stone-600"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              className="text-center mb-32"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2
                className={`${morganite.className} text-6xl md:text-7xl font-bold text-stone-800 mb-6`}
              >
                Our Journey
              </h2>
              <p
                className={`${nyghtSerif.className} text-xl text-stone-600 max-w-3xl mx-auto`}
              >
                From humble beginnings to international recognition, discover
                the milestones that shaped our story
              </p>
            </motion.div>

            <div className="relative">
              {journeyMilestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center mb-32 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Content Side */}
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-20" : "pl-20"}`}
                  >
                    <div
                      className={`${
                        index % 2 === 0 ? "text-right" : "text-left"
                      }`}
                    >
                      <motion.div
                        className={`inline-block ${morganite.className} text-8xl md:text-9xl font-bold text-stone-300 mb-4`}
                        whileInView={{ scale: [0.8, 1] }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {milestone.year}
                      </motion.div>
                      <h3
                        className={`${morganite.className} text-4xl font-bold text-stone-800 mb-6`}
                      >
                        {milestone.title}
                      </h3>
                      <p
                        className={`${
                          nyghtSerif.className
                        } text-lg text-stone-600 leading-relaxed max-w-md ${
                          index % 2 === 0 ? "ml-auto" : ""
                        }`}
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Connecting Line with Arrow */}
                  <div className="relative flex-shrink-0">
                    {/* Aperture-inspired connector */}
                    <div className="relative w-48 h-24 flex items-center justify-center">
                      {/* Shutter blades effect - scroll responsive */}
                      <motion.div
                        className="absolute w-20 h-20 rounded-full border-4 border-stone-400"
                        initial={{ rotate: 0, scale: 0.8 }}
                        whileInView={{
                          rotate: 360,
                          scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.5,
                          rotate: { duration: 3, ease: "easeInOut" },
                          scale: {
                            duration: 1,
                            repeat: 1,
                            repeatType: "reverse",
                          },
                        }}
                        viewport={{ once: false, margin: "-100px" }}
                      >
                        {/* Aperture blades - scroll responsive */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-8 bg-stone-400 origin-bottom"
                            style={{
                              left: "50%",
                              bottom: "50%",
                              transform: `translateX(-50%) rotate(${
                                i * 45
                              }deg)`,
                            }}
                            initial={{ scale: 1 }}
                            whileInView={{
                              scale: [1, 0.7, 1],
                            }}
                            transition={{
                              duration: 0.8,
                              delay: 0.7 + i * 0.1,
                              repeat: 1,
                              repeatType: "reverse",
                            }}
                            viewport={{ once: false, margin: "-100px" }}
                          />
                        ))}
                      </motion.div>

                      {/* Central lens element - scroll responsive */}
                      <motion.div
                        className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-stone-600 to-stone-400 shadow-lg"
                        initial={{
                          scale: 0,
                          boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                        }}
                        whileInView={{
                          scale: [0, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(0,0,0,0)",
                            "0 0 20px 5px rgba(139,90,60,0.3)",
                            "0 0 0 0 rgba(0,0,0,0)",
                          ],
                        }}
                        transition={{
                          duration: 1,
                          delay: 1.2,
                          boxShadow: { duration: 0.5, delay: 1.5 },
                        }}
                        viewport={{ once: false, margin: "-100px" }}
                      />

                      {/* Rough, curly connecting line */}
                      <svg
                        width="200"
                        height="100"
                        className={`absolute ${
                          index % 2 === 0 ? "" : "scale-x-[-1]"
                        }`}
                        viewBox="0 0 200 100"
                      >
                        {/* Rough, organic path with multiple curves and points */}
                        <motion.path
                          d="M20,50 C35,25 45,70 65,45 C85,20 95,75 120,40 C140,15 150,65 165,45 C175,35 185,55 180,50"
                          stroke="#8b5a3c"
                          strokeWidth="2.5"
                          fill="none"
                          strokeDasharray="6,3,2,3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{
                            pathLength: 1,
                            opacity: 1,
                            strokeDasharray: ["6,3,2,3", "8,2,4,2", "6,3,2,3"],
                          }}
                          transition={{
                            duration: 2,
                            delay: 0.6,
                            strokeDasharray: {
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            },
                          }}
                          viewport={{ once: false, margin: "-100px" }}
                        />

                        {/* Secondary jagged line for roughness */}
                        <motion.path
                          d="M25,55 L35,48 L42,58 L55,45 L68,52 L75,42 L88,55 L102,38 L115,48 L128,35 L145,50 L158,42 L172,52 L175,48"
                          stroke="#a67c52"
                          strokeWidth="1"
                          fill="none"
                          strokeLinecap="round"
                          opacity="0.6"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 1.8, delay: 0.8 }}
                          viewport={{ once: false, margin: "-100px" }}
                        />

                        {/* Sharp pointed arrow */}
                        <motion.polygon
                          points="175,45 185,50 175,55 180,50"
                          fill="#8b5a3c"
                          initial={{ scale: 0, rotate: 0 }}
                          whileInView={{
                            scale: 1,
                            rotate: [0, 10, -5, 0],
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 2.2,
                            rotate: { duration: 0.8, delay: 2.5 },
                          }}
                          viewport={{ once: false, margin: "-100px" }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pl-20" : "pr-20"}`}
                  >
                    <CameraShutterImageSwitcher
                      images={milestone.images}
                      title={milestone.title}
                      index={index}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative Elements - Photography themed */}
          <div className="absolute top-1/4 left-10 w-32 h-32 opacity-15">
            {/* Lens bokeh effect */}
            <div className="w-full h-full rounded-full bg-gradient-radial from-stone-300/40 via-stone-200/20 to-transparent blur-xl"></div>
            <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white/30 blur-sm"></div>
            <div className="absolute bottom-8 right-6 w-4 h-4 rounded-full bg-white/20 blur-sm"></div>
          </div>

          <div className="absolute bottom-1/4 right-10 w-48 h-48 opacity-10">
            {/* Camera iris effect */}
            <div className="relative w-full h-full">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-20 bg-stone-400 origin-bottom blur-sm"
                  style={{
                    left: "50%",
                    bottom: "50%",
                    transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  }}
                />
              ))}
              <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-stone-300/40 to-transparent blur-xl"></div>
            </div>
          </div>

          {/* Film strip decoration */}
          <div className="absolute left-0 top-1/3 w-8 h-64 bg-stone-600/10 opacity-30">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1 w-6 h-6 bg-stone-600/20"
                style={{ top: `${i * 32}px` }}
              />
            ))}
          </div>

          <div className="absolute right-0 bottom-1/3 w-8 h-64 bg-stone-600/10 opacity-30">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute left-1 w-6 h-6 bg-stone-600/20"
                style={{ top: `${i * 32}px` }}
              />
            ))}
          </div>
        </section>

        {/* Team Showcase Section - Enhanced Responsive & Spacious */}
        <section className="py-20 sm:py-28 lg:py-40 bg-gradient-to-b from-stone-100 via-stone-50 to-white relative overflow-hidden">
          {/* Artistic background elements - Responsive */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-radial from-stone-400/30 via-stone-300/20 to-transparent blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-radial from-stone-500/25 via-stone-400/15 to-transparent blur-3xl"></div>
          </div>

          {/* Camera aperture pattern overlay - Responsive */}
          <div className="absolute inset-0 opacity-3">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                radial-gradient(circle at center, transparent 40%, rgba(139,90,60,0.1) 45%, transparent 50%),
                radial-gradient(circle at center, transparent 70%, rgba(139,90,60,0.05) 75%, transparent 80%)
              `,
                backgroundSize: "80px 80px, 160px 160px",
                backgroundPosition: "0 0, 40px 40px",
              }}
            ></div>
          </div>

          {/* Mobile Revealing Layers */}
          <div className="absolute inset-0 lg:hidden overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-stone-200/60 via-transparent to-stone-300/40"
              initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              whileInView={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header - Enhanced Responsive */}
            <motion.div
              className="text-center mb-16 sm:mb-20 lg:mb-32"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className={`${morganite.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 mb-4 sm:mb-6 lg:mb-8`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our Creative Team
              </motion.h2>
              <motion.p
                className={`${nyghtSerif.className} text-base sm:text-lg lg:text-xl text-stone-600 max-w-sm sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-2`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Meet the passionate artists who bring your golden moments to
                life, each with their unique style and expertise
              </motion.p>
            </motion.div>

            {/* Team Grid - Enhanced Responsive & More Spacious */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
              {allTeamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Mobile Staggered Reveal */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-stone-300/70 to-transparent lg:hidden z-10"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "100%" }}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    viewport={{ once: true }}
                  />

                  {/* Photography-inspired frame with multiple layers - Responsive */}
                  <div className="relative">
                    {/* Outer shadow frame - Responsive */}
                    <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600 transform rotate-1 group-hover:rotate-0 transition-transform duration-500 shadow-2xl"></div>

                    {/* Middle frame layer - Responsive */}
                    <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-stone-100 via-white to-stone-50 transform -rotate-0.5 group-hover:rotate-0 transition-transform duration-500"></div>

                    {/* Inner accent frame - Responsive */}
                    <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-br from-stone-700 to-stone-500 transform rotate-0.25 group-hover:rotate-0 transition-transform duration-500"></div>

                    {/* Main content container - Enhanced */}
                    <motion.div
                      className="relative bg-white overflow-hidden shadow-xl transform transition-all duration-500 hover:shadow-3xl"
                      whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Photo Container - Responsive Height */}
                      <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />

                        {/* Enhanced Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

                        {/* Role tag - Responsive */}
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/85 backdrop-blur-sm text-white text-xs px-2 sm:px-3 py-1 font-mono tracking-wider transform group-hover:scale-105 transition-transform duration-300">
                          {member.role.toUpperCase()}
                        </div>

                        {/* Experience badge - Responsive */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm text-stone-800 text-xs px-2 py-1 font-mono transform group-hover:scale-105 transition-transform duration-300">
                          {member.experience}
                        </div>

                        {/* Photo corners - technical look - Responsive */}
                        <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-l-2 border-t-2 border-white/60 group-hover:border-white/80 transition-colors duration-300"></div>
                        <div className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-r-2 border-t-2 border-white/60 group-hover:border-white/80 transition-colors duration-300"></div>
                        <div className="absolute bottom-0 left-0 w-5 h-5 sm:w-6 sm:h-6 border-l-2 border-b-2 border-white/60 group-hover:border-white/80 transition-colors duration-300"></div>
                        <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 border-r-2 border-b-2 border-white/60 group-hover:border-white/80 transition-colors duration-300"></div>

                        {/* Name overlay - Responsive */}
                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                          <h3
                            className={`${morganite.className} text-white text-lg sm:text-xl font-bold mb-1 tracking-wide transform group-hover:scale-105 transition-transform duration-300`}
                          >
                            {member.name}
                          </h3>
                          <p
                            className={`${nyghtSerif.className} text-white/95 text-sm italic transform group-hover:text-white transition-colors duration-300`}
                          >
                            {member.specialty}
                          </p>
                        </div>
                      </div>

                      {/* Info Panel - Hidden by default, shown on hover */}
                      <motion.div
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                      >
                        <div className="text-center">
                          <h3
                            className={`${morganite.className} text-stone-800 text-2xl font-bold mb-2`}
                          >
                            {member.name}
                          </h3>
                          <p
                            className={`${nyghtSerif.className} text-stone-600 text-sm mb-4 font-medium`}
                          >
                            {member.specialty}
                          </p>

                          {/* Bio */}
                          <p
                            className={`${nyghtSerif.className} text-stone-700 text-sm leading-relaxed mb-4`}
                          >
                            {member.bio}
                          </p>

                          {/* Awards */}
                          <div className="mb-4">
                            <p
                              className={`${nyghtSerif.className} text-stone-800 font-semibold text-xs mb-1`}
                            >
                              RECOGNITION
                            </p>
                            <p
                              className={`${nyghtSerif.className} text-stone-600 text-xs italic`}
                            >
                              {member.awards}
                            </p>
                          </div>

                          {/* Contact info */}
                          <div className="space-y-1">
                            <p
                              className={`${nyghtSerif.className} text-stone-600 text-xs`}
                            >
                              {member.instagram}
                            </p>
                            <p
                              className={`${nyghtSerif.className} text-stone-600 text-xs`}
                            >
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-stone-600 via-stone-400 to-stone-600"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              className="text-center mt-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-stone-800 to-stone-600 text-white py-16 px-12 max-w-4xl mx-auto relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#ffffff_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
                </div>

                <div className="relative z-10">
                  <h3
                    className={`${morganite.className} text-4xl font-bold mb-6`}
                  >
                    Ready to Work With Us?
                  </h3>
                  <p
                    className={`${nyghtSerif.className} text-xl mb-8 leading-relaxed max-w-2xl mx-auto`}
                  >
                    Let our talented team capture your most precious moments
                    with artistry, passion, and professional excellence.
                  </p>
                  <motion.button
                    className="bg-white text-stone-800 px-8 py-3 font-semibold tracking-wide hover:bg-stone-100 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </motion.button>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white/30"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-white/30"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-white/30"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/30"></div>
              </div>
            </motion.div>
          </div>

          {/* Decorative elements - Enhanced Responsive */}
          <div className="absolute top-8 sm:top-10 left-6 sm:left-10 w-6 h-6 sm:w-8 sm:h-8 opacity-20 group">
            <div className="w-full h-full border-2 border-stone-400 rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
          </div>
          <div className="absolute top-16 sm:top-20 right-12 sm:right-16 w-8 h-8 sm:w-12 sm:h-12 opacity-15 group">
            <div className="w-full h-full rounded-full border-2 border-stone-400 group-hover:scale-110 transition-transform duration-500"></div>
          </div>
          <div className="absolute bottom-16 sm:bottom-20 left-16 sm:left-20 w-4 h-4 sm:w-6 sm:h-6 opacity-25 group">
            <div className="w-full h-full bg-stone-400 rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
          </div>
          <div className="absolute bottom-12 sm:bottom-16 right-8 sm:right-12 w-6 h-6 sm:w-10 sm:h-10 opacity-20 group">
            <div className="w-full h-full border-2 border-stone-400 rotate-12 group-hover:rotate-45 transition-transform duration-500"></div>
          </div>
        </section>
      </div>
    </>
  );
}

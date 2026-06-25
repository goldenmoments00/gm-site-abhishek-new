"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    coupleName: "Aarav & Meera",
    location: "Jaipur Palace Wedding",
    year: "2025",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=200&h=200&fit=crop",
    review:
      "Golden Moment didn't just capture our wedding—they preserved every emotion forever. Every frame takes us back to the happiest day of our lives.",
  },
  {
    id: 2,
    coupleName: "Sarah & Bennett",
    location: "Udaipur Destination",
    year: "2024",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=200&h=200&fit=crop",
    review:
      "Their attention to detail and cinematic storytelling is unparalleled. We felt like movie stars and the final video is an absolute masterpiece we'll cherish forever.",
  },
  {
    id: 3,
    coupleName: "Priya & Rohan",
    location: "Goa Beachfront",
    year: "2024",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    review:
      "From the intimate moments to the grand celebrations, they captured the soul of our wedding. The team was invisible yet everywhere at once.",
  },
  {
    id: 4,
    coupleName: "Emily & James",
    location: "Lake Como, Italy",
    year: "2023",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&h=200&fit=crop",
    review:
      "Words cannot describe how beautiful our wedding film is. Golden Moment has an incredible gift for finding the magic in split seconds.",
  },
  {
    id: 5,
    coupleName: "Neha & Vikram",
    location: "Delhi Heritage",
    year: "2023",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200&h=200&fit=crop",
    review:
      "We were incredibly nervous about being on camera, but the team made us feel so comfortable. The results are breathtaking and so authentic.",
  },
  {
    id: 6,
    coupleName: "Sophia & Liam",
    location: "Tuscany Vineyards",
    year: "2025",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=200&h=200&fit=crop",
    review:
      "The cinematic quality and emotional depth of their work is unmatched. They perfectly encapsulated the romance and joy of our celebration.",
  },
  {
    id: 7,
    coupleName: "Ananya & Kartik",
    location: "Kerala Backwaters",
    year: "2024",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop",
    review:
      "A truly premium experience from start to finish. The final film felt like a high-end documentary of our love story.",
  },
  {
    id: 8,
    coupleName: "Jessica & Michael",
    location: "Santorini Cliffside",
    year: "2023",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=200&h=200&fit=crop",
    review:
      "They caught the tears, the laughter, and the silent looks. Golden Moment gave us a time capsule of our most precious day.",
  },
  {
    id: 9,
    coupleName: "Kavya & Arjun",
    location: "Mumbai City",
    year: "2024",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=200&h=200&fit=crop",
    review:
      "We watched our film five times in a row the day we received it. Their storytelling ability is pure genius.",
  },
  {
    id: 10,
    coupleName: "Olivia & Daniel",
    location: "Bali Resort",
    year: "2025",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=200&h=200&fit=crop",
    review:
      "Professional, invisible, and incredibly talented. Choosing Golden Moment was the best decision we made for our wedding.",
  },
];

export default function PremiumTimelineTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = testimonials.length;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const avatar = target.closest('[data-index]');
      if (avatar) {
        const index = parseInt(avatar.getAttribute('data-index') || '0', 10);
        setActiveIndex(index);
      }
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('click', handleClick);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, total]);

  const getRelativeIndex = (index: number) => {
    let diff = index - activeIndex;
    if (diff < -total / 2) diff += total;
    if (diff > total / 2) diff -= total;
    return diff;
  };

  // Avatar positions for the curved timeline
  const getAvatarProps = (relativeIndex: number) => {
    if (relativeIndex === 0) {
      return {
        top: "50%",
        y: "-50%",
        x: 30,
        scale: 1.6,
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 30,
        grayscale: "0%",
      };
    } else if (relativeIndex === -1) {
      return {
        top: "25%",
        y: "-50%",
        x: 14,
        scale: 0.8,
        opacity: 0.6,
        filter: "blur(1px)",
        zIndex: 20,
        grayscale: "50%",
      };
    } else if (relativeIndex === 1) {
      return {
        top: "75%",
        y: "-50%",
        x: 14,
        scale: 0.8,
        opacity: 0.6,
        filter: "blur(1px)",
        zIndex: 20,
        grayscale: "50%",
      };
    } else if (relativeIndex === -2) {
      return {
        top: "5%",
        y: "-50%",
        x: -23,
        scale: 0.5,
        opacity: 0.3,
        filter: "blur(2px)",
        zIndex: 10,
        grayscale: "80%",
      };
    } else if (relativeIndex === 2) {
      return {
        top: "95%",
        y: "-50%",
        x: -23,
        scale: 0.5,
        opacity: 0.3,
        filter: "blur(2px)",
        zIndex: 10,
        grayscale: "80%",
      };
    } else if (relativeIndex < -2) {
      return {
        top: "-10%",
        y: "-50%",
        x: -64,
        scale: 0.3,
        opacity: 0,
        filter: "blur(5px)",
        zIndex: 0,
        grayscale: "100%",
      };
    } else {
      return {
        top: "110%",
        y: "-50%",
        x: -64,
        scale: 0.3,
        opacity: 0,
        filter: "blur(5px)",
        zIndex: 0,
        grayscale: "100%",
      };
    }
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section 
      className="bg-[#FFF6E5] text-[#111111] overflow-hidden py-[60px] md:py-[90px] lg:py-[120px] relative"
      style={{ backgroundColor: "#FFF6E5", position: "relative", zIndex: 50 }}
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,245,245,1)_0%,_rgba(255,255,255,0)_70%)] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-[#D90429] uppercase tracking-[4px] text-xs font-semibold mb-4">
            REAL STORIES
          </p>
          <h2 className="font-nyght-serif font-serif text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight mb-6">
            Every Wedding Leaves a Story Worth Remembering
          </h2>
          <p className="font-plus-jakarta-sans font-sans text-gray-500 max-w-[650px] mx-auto text-lg leading-relaxed">
            &quot;The greatest compliment we receive is becoming a part of our
            couples&#39; memories.&quot;
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Column: Timeline */}
          <div className="w-full lg:w-[35%] relative h-[400px] lg:h-[500px] flex justify-center lg:justify-start lg:pl-10">
            {/* SVG Curve */}
            <svg
              className="absolute left-1/2 lg:left-10 top-0 w-[150px] h-full -ml-[75px] lg:ml-0 pointer-events-none"
              viewBox="0 0 150 500"
              preserveAspectRatio="none"
            >
              <path
                d="M 10 0 Q 140 250 10 500"
                fill="none"
                stroke="#EAEAEA"
                strokeWidth="1.5"
              />
            </svg>

            {/* Avatars */}
            <div
              ref={containerRef}
              className="relative w-full h-full"
            >
              {testimonials.map((testimonial, index) => {
                const relativeIndex = getRelativeIndex(index);
                const props = getAvatarProps(relativeIndex);

                return (
                  <motion.div
                    key={testimonial.id}
                    data-index={index}
                    className="absolute left-1/2 lg:left-10 cursor-pointer -ml-[75px] lg:ml-0 flex items-center gap-3"
                    animate={{
                      top: props.top,
                      y: props.y,
                      x: props.x,
                      scale: props.scale,
                      opacity: props.opacity,
                      filter: props.filter,
                      zIndex: props.zIndex,
                    }}
                    initial={false}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    style={{ width: "max-content" }}
                  >
                    <motion.div
                      className="w-[90px] h-[90px] shrink-0 rounded-full overflow-hidden border-2 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative"
                      animate={{
                        filter: `grayscale(${props.grayscale})`,
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.coupleName}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </motion.div>

                    {/* Client Name and Rating */}
                    <div className="flex flex-col">
                      <div className="font-plus-jakarta-sans font-bold text-[12px] text-[#111111] whitespace-nowrap">
                        {testimonial.coupleName}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <svg className="w-3 h-3 text-[#34A853] fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-[9px] text-gray-500 font-plus-jakarta-sans whitespace-nowrap">
                          {testimonial.rating}.0 • {testimonial.location}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Testimonial */}
          <div className="w-full lg:w-[65%] lg:pr-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                {/* Gold Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Quote Mark */}
                <div className="text-[#D90429] text-7xl font-serif leading-none h-12 mb-4 opacity-20">
                  &ldquo;
                </div>

                {/* Review */}
                <p className="font-nyght-serif font-serif text-[26px] leading-[1.8] text-gray-800 mb-10 max-w-2xl">
                  {activeTestimonial.review}
                </p>

                {/* Author Info */}
                <div className="flex flex-col gap-1">
                  <h4 className="font-plus-jakarta-sans font-sans font-bold text-lg tracking-wide text-[#111111]">
                    {activeTestimonial.coupleName}
                  </h4>
                  <div className="flex items-center gap-3 text-sm font-plus-jakarta-sans font-sans text-gray-500 uppercase tracking-widest justify-center lg:justify-start">
                    <span>{activeTestimonial.location}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{activeTestimonial.year}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

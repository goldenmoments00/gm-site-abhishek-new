"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { brittanySignature } from "@/lib/fonts";

const testimonials = [
  {
    id: 1,
    coupleName: "AMIT & BIJOYSREE",
    platform: "google",
    location: "Traditional Bengali Wedding",
    year: "2024",
    rating: 5,
    photo:
      "/images/bijoysree-wedding.jpg",
    review:
      "With so many events happening back-to-back (including Ashirbad) on my marriage day, I could barely manage any time for proper photoshoots. Even with very little time and limited content, they managed to create the most beautiful memories with video and photoalbum. Honestly, Your work truly exceeded all our expectations. Thank you so much for going above and beyond. ❤️ ✨ Totally recommending everyone to choose Golden moments for their special day! ✨ 📸",
  },
  {
    id: 2,
    coupleName: "DEB & SUSHMITA",
    platform: "google",
    location: "Wedding Ceremony",
    year: "2025",
    rating: 5,
    photo:
      "/images/deb-sushmita.png",
    review:
      "Really glad to choose Abhishek nd his team to capture the best moments of our special day. Some Amazing photography and highly professionalism which is hard to find out in today market. Great job guys and Keep up this humbleness and dedication to your work. Thank you once again for giving us some great memories. ❤️❤️",
  },
  {
    id: 3,
    coupleName: "SHIBAJYOTI & JAGRITI",
    platform: "google",
    location: "Wedding Ceremony",
    year: "2025",
    rating: 5,
    photo:
      "/images/shibajyoti-jagriti.jpg",
    review:
      "First and foremost, I want to express my sincere gratitude to everyone who worked so hard on our wedding ceremony. Their impressive abilities are evident in the work they conduct. Good behaviours and communication, Creative concepts, Timely and flexible to accommodate our (clients') schedules and Choosing songs. Your work has greatly satisfied both of our families. Many thanks. I hope to see you at our next event.",
  },
  {
    id: 4,
    coupleName: "DIPANWITA & BISWARUP",
    platform: "facebook",
    location: "Wedding Ceremony",
    year: "2025",
    rating: 5,
    photo:
      "/images/dipanwita-biswarup.png",
    review:
      "Golden Moments has got an excellent team of photographers and is the best in town. Very much cooperative and attentive towards their clinets which is one of the plus factor. I got so many compliments on my wedding album and videos. Happy that I chose Golden Moments for my big day.",
  },
  {
    id: 5,
    coupleName: "NABIN & BAISHALI",
    platform: "facebook",
    location: "Wedding Photography",
    year: "2025",
    rating: 5,
    photo:
      "/images/nabin-baishali.jpg",
    review:
      "Abhisek and his team are very much cooperative, specially Subham, Sagar, Gopal and souven are making our wedding photography and videos memorable.",
  },
  {
    id: 6,
    coupleName: "BISHAL & PRIYA",
    platform: "facebook",
    location: "Wedding Photography",
    year: "2023",
    rating: 5,
    photo:
      "/images/bishal-priya.jpg",
    review:
      "It's awesome when we find just the right person with the right talent at the right time. That's what Golden Moments is. The team has created memories for us which will last for our lifetime. The talent pool of Golden Moments is best at their craft.The shoot, the edit and the presentation are on mark and best in the market. Thank you for capturing our Golden Moments of life 💐💐....",
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
        x: 13.75,
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
        x: 13.75,
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
        x: -22.65,
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
        x: -22.65,
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

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Heading */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="font-nyght-serif font-serif text-[#111111] uppercase flex flex-col items-center">

            <div className="text-3xl md:text-5xl lg:text-[4.5rem] tracking-[0.3em] leading-[1.1] mb-1 ml-[0.3em]">
              EVERY
            </div>

            <div className="text-4xl md:text-6xl lg:text-[5.5rem] tracking-[0.35em] leading-[1.1] mb-8 lg:mb-10 ml-[0.35em]">
              WEDDING
            </div>

            <div className="text-sm md:text-base lg:text-xl tracking-[0.6em] leading-none mb-0 ml-[0.6em] top-[-30px] relative z-20">
              LEAVES A
            </div>

            <div
              className={`${brittanySignature.className} text-[#8A1212] lowercase tracking-normal text-7xl md:text-8xl lg:text-[11rem] leading-none my-4 lg:my-8 ml-[25px] relative z-10`}
              style={{ transform: "rotate(-3deg)" }}
            >
              story
            </div>

            <div className="flex items-center justify-center gap-4 lg:gap-6 text-sm md:text-base lg:text-xl tracking-[0.6em] mb-10 lg:mb-12 ml-[0.6em] w-full">
              <span className="w-12 md:w-16 lg:w-20 h-[1px] bg-[#111111]/30"></span>
              WORTH
              <span className="w-12 md:w-16 lg:w-20 h-[1px] bg-[#111111]/30 ml-[-0.6em]"></span>
            </div>

            <div className="text-3xl md:text-5xl lg:text-[4rem] tracking-[0.3em] leading-[1.1] ml-[0.3em]">
              REMEMBERING
            </div>

          </div>

          <div className="flex items-center justify-center gap-4 mt-12 mb-8">
            <span className="w-12 h-[1px] bg-[#8A1212]/40"></span>
            <div className="w-2 h-2 bg-[#8A1212] rotate-45"></div>
            <span className="w-12 h-[1px] bg-[#8A1212]/40"></span>
          </div>

          <p className="font-plus-jakarta-sans font-sans text-gray-500 max-w-[500px] mx-auto text-xs md:text-sm tracking-[0.15em] leading-[2.2] uppercase">
            &quot;The greatest compliment we receive<br />
            is becoming a part of our couples&#39;<br />
            memories.&quot;
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Column: Timeline */}
          <div className="w-full lg:w-[250px] shrink-0 relative h-[400px] lg:h-[500px] flex justify-center lg:justify-start lg:pl-4">
            {/* Avatars Container */}
            <div
              ref={containerRef}
              className="relative w-full h-full"
            >
              {/* SVG Curve */}
              <svg
                className="absolute left-1/2 lg:left-10 top-0 w-[150px] h-full -ml-[75px] lg:ml-0 pointer-events-none"
                viewBox="0 0 150 500"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="timeline-fade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8a1212" stopOpacity="0" />
                    <stop offset="20%" stopColor="#8a1212" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#8a1212" stopOpacity="1" />
                    <stop offset="80%" stopColor="#8a1212" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8a1212" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10 0 Q 140 250 10 500"
                  fill="none"
                  stroke="url(#timeline-fade)"
                  strokeWidth="2.5"
                />
              </svg>

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
                      zIndex: props.zIndex,
                    }}
                    initial={false}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: "max-content",
                    }}
                  >
                    <motion.div
                      className="shrink-0 relative w-[90px] h-[90px]"
                      animate={{
                        scale: props.scale,
                        filter: props.filter,
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {/* Backer circle to block the SVG line. It matches the page background. */}
                      <div className="absolute inset-0 rounded-full bg-[#FDFBF7]" />

                      <motion.div
                        className="absolute inset-0 rounded-full overflow-hidden border-2 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                        animate={{
                          opacity: props.opacity,
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
                    </motion.div>

                    {/* Client Name and Rating */}
                    <motion.div
                      className="flex flex-col"
                      animate={{
                        scale: props.scale,
                        opacity: props.opacity,
                        filter: props.filter,
                        x: (90 * props.scale - 90) / 2,
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      style={{ originX: 0 }}
                    >
                      <div className="font-plus-jakarta-sans font-bold text-[12px] text-[#111111] whitespace-nowrap flex items-center gap-1.5">
                        {testimonial.coupleName}
                        {testimonial.platform === 'google' && (
                          <a href="https://g.page/r/CUxboF1luRZVEAE/review" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:scale-110 transition-transform flex items-center">
                            <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                          </a>
                        )}
                        {testimonial.platform === 'facebook' && (
                          <a href="https://www.facebook.com/goldenmoment.in/reviews" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="hover:scale-110 transition-transform flex items-center">
                            <svg className="w-3 h-3 shrink-0 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <svg className="w-3 h-3 text-[#34A853] fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="text-[9px] text-gray-500 font-plus-jakarta-sans whitespace-nowrap">
                          {testimonial.rating}.0 • {testimonial.location}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Testimonial */}
          <div className="w-full flex-1 lg:pl-[230px] lg:pr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                {/* Review Elements Removed as Requested */}

                {/* Review */}
                <p className="font-mono text-[19px] leading-[1.9] text-gray-800 mb-10 max-w-[1070px]">
                  {activeTestimonial.review}
                </p>

                {/* Author Info */}
                <div className="flex flex-col gap-1">
                  <h4 className="font-plus-jakarta-sans font-sans font-bold text-lg tracking-wide text-[#111111] flex items-center gap-2 justify-center lg:justify-start">
                    {activeTestimonial.coupleName}
                    {activeTestimonial.platform === 'google' && (
                      <a href="https://g.page/r/CUxboF1luRZVEAE/review" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform flex items-center">
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      </a>
                    )}
                    {activeTestimonial.platform === 'facebook' && (
                      <a href="https://www.facebook.com/goldenmoment.in/reviews" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform flex items-center">
                        <svg className="w-4 h-4 shrink-0 text-[#1877F2] fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    )}
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

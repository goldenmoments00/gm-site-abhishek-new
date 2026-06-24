"use client";

import React, { useState, useEffect } from "react";

const LandingHero2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animatingImage, setAnimatingImage] = useState<number | null>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  // Sample images - replace with your actual photography portfolio
  const images = [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=500&fit=crop&crop=center",
  ];

  useEffect(() => {
    // Fade in title after component mounts
    const titleTimer = setTimeout(() => {
      setTitleVisible(true);
    }, 500);

    // Start image animation cycle
    const imageTimer = setInterval(() => {
      setAnimatingImage(currentImageIndex);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);

      // Reset animation after it completes
      setTimeout(() => {
        setAnimatingImage(null);
      }, 4000);
    }, 5000);

    return () => {
      clearTimeout(titleTimer);
      clearInterval(imageTimer);
    };
  }, [currentImageIndex, images.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 ">
      {/* Background Agency Name */}
      <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
        <h1
          className="text-8xl md:text-9xl lg:text-[12rem] font-light text-white/5 select-none relative"
          style={{ fontFamily: "Georgia, serif" }}
        >
          <span className="relative inline-block">
            MOMENTS
            <div
              className={`absolute inset-0 bg-slate-900 transition-transform duration-2000 ease-out ${
                titleVisible
                  ? "transform translate-x-full"
                  : "transform translate-x-0"
              }`}
            ></div>
          </span>
        </h1>
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/20 z-20"></div>

      {/* Main Content */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full px-8">
        <div className="text-center mb-12">
          <h2
            className={`text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-6 transition-all duration-2000 ease-out delay-1000 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "Georgia, serif" }}
          >
            GOLDEN MOMENTS
          </h2>
          <p
            className={`text-xl md:text-2xl text-white/80 font-light max-w-2xl transition-all duration-2000 ease-out delay-1500 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Capturing moments that define eternity
          </p>
        </div>

        <button
          className={`px-12 py-4 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 text-lg font-light tracking-wider backdrop-blur-sm ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "2000ms" }}
        >
          VIEW PORTFOLIO
        </button>
      </div>

      {/* Animated Images */}
      <div className="absolute inset-0 pointer-events-none">
        {images.map((image, index) => {
          const baseLeft = 15 + index * 12;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${baseLeft}%`,
                bottom: "0",
                zIndex: animatingImage === index ? 25 : 20,
                pointerEvents: "none",
                perspective: "1500px",
              }}
            >
              <div
                className={`${
                  animatingImage === index ? "animate-arc-jump" : ""
                } ${animatingImage === index ? "opacity-100" : "opacity-0"}`}
                style={{
                  transform:
                    animatingImage === index ? "" : "translateY(100vh)",
                  transition:
                    animatingImage === index
                      ? "none"
                      : "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                  transformStyle: "preserve-3d",
                  ...({
                    ["--start-x"]: `${baseLeft}%`,
                    ["--peak-x"]: `${baseLeft + 20}%`,
                    ["--end-x"]: `${baseLeft + 40}%`,
                  } as Record<string, string>),
                }}
              >
                <div className="relative group">
                  {/* Elegant Frame */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl"></div>
                  <div className="absolute -inset-2 bg-white/10 backdrop-blur-sm"></div>

                  {/* Image */}
                  <img
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    className="relative w-48 h-64 md:w-56 md:h-72 object-cover shadow-2xl filter brightness-90 contrast-110"
                    style={{
                      filter: "brightness(0.9) contrast(1.1) saturate(1.1)",
                    }}
                  />

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Animation Styles */}
      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes arc-jump {
          0% {
            transform: translateY(0vh) translateX(0vw) rotate(0deg) scale(1);
          }
          20% {
            transform: translateY(-35vh) translateX(12vw) rotate(180deg)
              scale(1.06);
          }
          40% {
            transform: translateY(-58vh) translateX(22vw) rotate(360deg)
              scale(1.12);
          }
          50% {
            transform: translateY(-65vh) translateX(27vw) rotate(450deg)
              scale(1.15);
          }
          60% {
            transform: translateY(-58vh) translateX(32vw) rotate(540deg)
              scale(1.12);
          }
          80% {
            transform: translateY(-25vh) translateX(42vw) rotate(720deg)
              scale(1.06);
          }
          100% {
            transform: translateY(0vh) translateX(50vw) rotate(900deg) scale(1);
          }
        }

        @keyframes subtle-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes frame-shadow {
          0% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 60px 80px rgba(0, 0, 0, 0.6);
          }
          100% {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
        }

        .animate-arc-jump {
          animation: arc-jump 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          transform-origin: center center;
          will-change: transform;
        }

        .animate-arc-jump img {
          animation: frame-shadow 4s ease-out forwards;
        }

        .animate-arc-jump::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          opacity: 0;
          animation: shine 4s ease-out forwards;
          pointer-events: none;
        }

        @keyframes shine {
          20%,
          80% {
            opacity: 1;
          }
          0%,
          100% {
            opacity: 0;
          }
        }

        /* Subtle floating animation for non-animating frames */
        .frame-float {
          animation: subtle-bounce 6s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default LandingHero2;

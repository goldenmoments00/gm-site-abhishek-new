"use client";

import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";

interface Photo {
  id: number;
  src: string;
  alt: string;
}

const LandingHero: React.FC = () => {
  // Beautiful wedding photos from Unsplash with better framing
  const photos: Photo[] = useMemo(
    () => [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop&crop=faces",
        alt: "Bride and groom dancing",
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=800&fit=crop&crop=center",
        alt: "Wedding rings on flowers",
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop&crop=faces",
        alt: "Bride walking down aisle",
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=800&fit=crop&crop=center",
        alt: "Wedding bouquet toss",
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=800&fit=crop&crop=faces",
        alt: "First kiss as married couple",
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=800&fit=crop&crop=center",
        alt: "Wedding cake cutting",
      },
      {
        id: 7,
        src: "https://images.unsplash.com/photo-1594736797933-d0301ba94be4?w=600&h=800&fit=crop&crop=faces",
        alt: "Bride getting ready",
      },
      {
        id: 8,
        src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=800&fit=crop&crop=faces",
        alt: "Wedding ceremony moment",
      },
    ],
    []
  );

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start the first animation immediately
    setIsAnimating(true);

    // Change photo halfway through the first animation
    const firstPhotoTimeout = setTimeout(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 4000);

    // End the first animation
    const firstAnimationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 8000);

    // Set up the recurring interval for subsequent animations
    const interval = setInterval(() => {
      setIsAnimating(true);

      // Change photo halfway through the animation
      setTimeout(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
      }, 4000);

      setTimeout(() => {
        setIsAnimating(false);
      }, 8000);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstPhotoTimeout);
      clearTimeout(firstAnimationTimeout);
    };
  }, [photos.length]);

  return (
    <div className="relative h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col justify-center items-center overflow-hidden px-4 md:px-8">
      {/* Hero Content */}
      <div className="text-center z-10 mb-16 md:mb-20">
        <h1 className="font-morganite text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 mb-6 md:mb-8 animate-shimmer leading-tight">
          Golden Moment
        </h1>
        <p className="font-serif text-lg sm:text-xl md:text-2xl text-slate-700 mb-8 tracking-wide">
          Capturing Love Stories That Last Forever
        </p>
      </div>

      {/* Horizon Line */}

      {/* Single Photo Frame Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none z-1 overflow-visible">
        <div
          className={`absolute z-2 w-48 h-64 sm:w-56 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-108 xl:w-96 xl:h-120 ${
            isAnimating ? "animate-single-frame-arc" : "opacity-0"
          }`}
          style={{
            left: "-20%",
            bottom: "-5%",
          }}
        >
          <Image
            key={photos[currentPhotoIndex].id}
            width={600}
            height={800}
            src={photos[currentPhotoIndex].src}
            alt={photos[currentPhotoIndex].alt}
            className="w-full h-full object-cover rounded-lg shadow-2xl border-8 border-white transition-all duration-500"
            loading="lazy"
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
            }}
          />
        </div>
      </div>
      <div className="absolute bottom-1/5 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent z-5"></div>

      {/* Custom Styles */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400&family=Playfair+Display:wght@400;600;700&display=swap");

        .font-script {
          font-family: "Great Vibes", cursive;
        }

        .font-serif {
          font-family: "Playfair Display", serif;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes single-frame-arc {
          0% {
            transform: translateX(0) translateY(100px) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            transform: translateX(12vw) translateY(-100px) rotate(72deg)
              scale(0.9);
            opacity: 1;
          }
          20% {
            transform: translateX(24vw) translateY(-300px) rotate(144deg)
              scale(1);
            opacity: 1;
          }
          30% {
            transform: translateX(36vw) translateY(-500px) rotate(216deg)
              scale(1.05);
            opacity: 1;
          }
          40% {
            transform: translateX(48vw) translateY(-700px) rotate(288deg)
              scale(1.1);
            opacity: 1;
          }
          50% {
            transform: translateX(60vw) translateY(-900px) rotate(360deg)
              scale(1.15);
            opacity: 1;
          }
          60% {
            transform: translateX(72vw) translateY(-700px) rotate(432deg)
              scale(1.1);
            opacity: 1;
          }
          70% {
            transform: translateX(84vw) translateY(-500px) rotate(504deg)
              scale(1.05);
            opacity: 1;
          }
          80% {
            transform: translateX(96vw) translateY(-300px) rotate(576deg)
              scale(1);
            opacity: 0.9;
          }
          90% {
            transform: translateX(108vw) translateY(-100px) rotate(648deg)
              scale(0.9);
            opacity: 0.6;
          }
          100% {
            transform: translateX(120vw) translateY(100px) rotate(720deg)
              scale(0.8);
            opacity: 0;
          }
        }

        .animate-single-frame-arc {
          animation: single-frame-arc 8s linear forwards;
        }

        .border-8 {
          border-width: 8px;
        }

        .h-108 {
          height: 27rem;
        }

        .h-120 {
          height: 30rem;
        }

        .overflow-visible {
          overflow: visible;
        }
      `}</style>
    </div>
  );
};

export default LandingHero;

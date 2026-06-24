import React, { useState, useEffect, useRef } from "react";
import {
  Award,
  Globe,
  Heart,
  Sparkles,
  Crown,
  Flower,
  Gift,
} from "lucide-react";
import Image from "next/image";

const FounderJourney = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  const journeyData = [
    {
      id: 1,
      year: "2018",
      title: "The First 'I Do'",
      description:
        "It all began with capturing my first wedding - a simple ceremony in a local garden. The raw emotion in that first kiss as husband and wife ignited my passion for wedding photography.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=300&fit=crop",
      icon: Heart,
    },
    {
      id: 2,
      year: "2019",
      title: "Wedding Bells Recognition",
      description:
        "Won 'Best Wedding Photography' at the Regional Bridal Awards. Couples began choosing us for our ability to capture not just moments, but the soul of their love story.",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=300&fit=crop",
      icon: Award,
    },
    {
      id: 3,
      year: "2020",
      title: "Love Finds a Way",
      description:
        "Despite pandemic challenges, we adapted to intimate ceremonies and elopements. Created virtual wedding experiences, proving that love always finds a way to celebrate.",
      image:
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&h=300&fit=crop",
      icon: Sparkles,
    },
    {
      id: 4,
      year: "2021",
      title: "Destination Dream Weddings",
      description:
        "Expanded to destination weddings across the globe. From Tuscan vineyards to Bali beaches, we began capturing love stories in the world's most romantic locations.",
      image:
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&h=300&fit=crop",
      icon: Globe,
    },
    {
      id: 5,
      year: "2022",
      title: "Luxury Wedding Specialists",
      description:
        "Became the preferred photographers for luxury weddings and celebrity ceremonies. Featured in top bridal magazines and wedding publications worldwide.",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba5fdae?w=500&h=300&fit=crop",
      icon: Crown,
    },
    {
      id: 6,
      year: "2024",
      title: "Forever Memories Legacy",
      description:
        "Launched our signature wedding collection with AI-enhanced albums and virtual reality experiences. Now preserving over 1000 love stories annually across continents.",
      image:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&h=300&fit=crop",
      icon: Gift,
    },
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = parseInt(
            (entry.target as HTMLElement).dataset.sectionId!
          );
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, sectionId]));
          } else {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.delete(sectionId);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section && observerRef.current) observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const setSectionRef = (el: HTMLDivElement | null, index: number): void => {
    sectionsRef.current[index] = el;
  };

  // Elegant curved arrow components
  const CurvedArrowLeft = ({ isVisible }: { isVisible: boolean }) => {
    const pathLength = 280;

    return (
      <svg
        width="200"
        height="120"
        viewBox="0 0 200 120"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8"
      >
        <defs>
          <style>
            {`
              .arrow-path-left {
                stroke-dasharray: ${pathLength};
                stroke-dashoffset: ${pathLength};
                transition: stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .arrow-path-left.visible {
                stroke-dashoffset: 0;
              }
              .arrow-head-left {
                opacity: 0;
                transition: opacity 0.5s ease-out 1.8s;
              }
              .arrow-head-left.visible {
                opacity: 1;
              }
            `}
          </style>
        </defs>
        <path
          d="M20 60 Q100 20 160 60"
          stroke="#8B7355"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          className={`arrow-path-left ${isVisible ? "visible" : ""}`}
          style={{
            filter: "drop-shadow(0 0 8px rgba(139, 115, 85, 0.3))",
          }}
        />
        <path
          d="M155 55 L160 60 L155 65 M150 58 L160 60 L150 62"
          stroke="#8B7355"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`arrow-head-left ${isVisible ? "visible" : ""}`}
        />
      </svg>
    );
  };

  const CurvedArrowRight = ({ isVisible }: { isVisible: boolean }) => {
    const pathLength = 280;

    return (
      <svg
        width="200"
        height="120"
        viewBox="0 0 200 120"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8"
      >
        <defs>
          <style>
            {`
              .arrow-path-right {
                stroke-dasharray: ${pathLength};
                stroke-dashoffset: ${pathLength};
                transition: stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .arrow-path-right.visible {
                stroke-dashoffset: 0;
              }
              .arrow-head-right {
                opacity: 0;
                transition: opacity 0.5s ease-out 1.8s;
              }
              .arrow-head-right.visible {
                opacity: 1;
              }
            `}
          </style>
        </defs>
        <path
          d="M180 60 Q100 20 40 60"
          stroke="#8B7355"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          className={`arrow-path-right ${isVisible ? "visible" : ""}`}
          style={{
            filter: "drop-shadow(0 0 8px rgba(139, 115, 85, 0.3))",
          }}
        />
        <path
          d="M45 55 L40 60 L45 65 M50 58 L40 60 L50 62"
          stroke="#8B7355"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`arrow-head-right ${isVisible ? "visible" : ""}`}
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-neutral-50 to-amber-50/30 relative overflow-hidden">
      {/* Add Wedding-Centric Fonts and Custom Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Allura&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap");

        .font-playfair {
          font-family: "Playfair Display", serif;
        }
        .font-dancing {
          font-family: "Dancing Script", cursive;
        }
        .font-great-vibes {
          font-family: "Great Vibes", cursive;
        }
        .font-cinzel {
          font-family: "Cinzel", serif;
        }
        .font-cormorant {
          font-family: "Cormorant Garamond", serif;
        }
        .font-satisfy {
          font-family: "Satisfy", cursive;
        }
        .font-alex-brush {
          font-family: "Alex Brush", cursive;
        }
        .font-tangerine {
          font-family: "Tangerine", cursive;
        }
        .font-allura {
          font-family: "Allura", cursive;
        }
        .font-pinyon {
          font-family: "Pinyon Script", cursive;
        }

        .text-elegant-gold {
          background: linear-gradient(
            135deg,
            #d4af37 0%,
            #f7ef8a 30%,
            #d4af37 60%,
            #aa8734 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
        }

        .text-wedding-cream {
          background: linear-gradient(
            135deg,
            #f5f5dc 0%,
            #deb887 50%,
            #d2b48c 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.1));
        }

        .text-romantic-gradient {
          background: linear-gradient(
            45deg,
            #8b4513,
            #cd853f,
            #daa520,
            #8b4513
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: romantic-flow 4s ease-in-out infinite;
        }

        .text-vintage-brown {
          background: linear-gradient(
            135deg,
            #6b4423 0%,
            #8b4513 30%,
            #a0522d 60%,
            #6b4423 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
        }

        .text-champagne-bubble {
          background: linear-gradient(
            45deg,
            #f7e98e 0%,
            #fffacd 30%,
            #f0e68c 60%,
            #daa520 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: champagne-bubble 3s ease-in-out infinite;
        }

        .text-shadow-elegant {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
            0 0 10px rgba(212, 175, 55, 0.4);
        }

        .hover-elegant-float:hover {
          animation: elegant-float 1s ease-in-out infinite;
        }

        .hover-gentle-sway:hover {
          animation: gentle-sway 1.5s ease-in-out infinite;
        }

        .hover-romantic-glow:hover {
          animation: romantic-glow 2s ease-in-out infinite;
        }

        .hover-vintage-lift:hover {
          animation: vintage-lift 0.8s ease-in-out;
        }

        @keyframes romantic-flow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes champagne-bubble {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes elegant-float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(1deg);
          }
        }

        @keyframes gentle-sway {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }

        @keyframes romantic-glow {
          0%,
          100% {
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
              0 0 10px rgba(212, 175, 55, 0.4);
          }
          50% {
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(212, 175, 55, 0.8);
          }
        }

        @keyframes vintage-lift {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
        }

        .petal-float {
          position: absolute;
          animation: petal-floating 6s ease-in-out infinite;
        }

        @keyframes petal-floating {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) rotate(270deg);
          }
        }
      `}</style>

      {/* Minimal Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle floating petals - very minimal */}
        <div className="petal-float top-20 left-20 text-stone-300/20 opacity-20">
          <Flower size={20} />
        </div>
        <div
          className="petal-float top-40 right-32 text-amber-200/20 opacity-20"
          style={{ animationDelay: "3s" }}
        >
          <Flower size={16} />
        </div>
        <div
          className="petal-float bottom-40 left-40 text-stone-200/20 opacity-20"
          style={{ animationDelay: "6s" }}
        >
          <Flower size={18} />
        </div>

        {/* Very subtle gradient orbs for depth */}
        <div className="absolute -top-60 -right-60 w-96 h-96 bg-gradient-to-br from-amber-50/20 to-stone-50/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-60 -left-60 w-96 h-96 bg-gradient-to-br from-stone-50/20 to-neutral-50/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-great-vibes text-8xl md:text-9xl text-elegant-gold mb-6 relative hover-elegant-float cursor-pointer">
            <span className="relative inline-block">
              Our Love Story
              <div className="absolute -bottom-4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent rounded-full"></div>
            </span>
          </h1>
          <p className="font-cormorant text-2xl md:text-3xl text-vintage-brown font-medium max-w-3xl mx-auto leading-relaxed hover-gentle-sway cursor-pointer italic">
            &ldquo;Every wedding tells a story, and we&apos;ve been blessed to
            write ours through capturing yours&rdquo;
          </p>
          <div className="mt-8">
            <div className="font-dancing text-xl text-champagne-bubble hover-romantic-glow cursor-pointer inline-block">
              ✨ A Journey of Love & Light ✨
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        {/* Central timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-stone-300/60 via-amber-300/60 to-stone-300/60 opacity-40"></div>

        {journeyData.map((item, index) => {
          const isVisible = visibleSections.has(item.id);
          const isEven = index % 2 === 0;
          const Icon = item.icon;

          // Wedding-centric elegant fonts for each section
          const yearFonts = [
            "font-cinzel text-elegant-gold",
            "font-playfair text-vintage-brown",
            "font-cormorant text-wedding-cream",
            "font-cinzel text-romantic-gradient",
            "font-playfair text-elegant-gold",
            "font-cormorant text-vintage-brown",
          ];

          const titleFonts = [
            "font-great-vibes text-champagne-bubble",
            "font-dancing text-romantic-gradient",
            "font-allura text-vintage-brown",
            "font-pinyon text-elegant-gold",
            "font-tangerine text-wedding-cream",
            "font-alex-brush text-champagne-bubble",
          ];

          return (
            <div
              key={item.id}
              ref={(el) => setSectionRef(el, index)}
              data-section-id={item.id}
              className="relative mb-40"
            >
              {/* Year marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-20">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br from-white/95 via-stone-50/95 to-amber-50/95 backdrop-blur-sm flex items-center justify-center border-2 border-white/80 shadow-lg transition-all duration-1000 hover-elegant-float cursor-pointer ${
                    isVisible ? "scale-100 rotate-0" : "scale-0 rotate-180"
                  }`}
                  style={{
                    boxShadow:
                      "0 8px 25px rgba(0,0,0,0.08), 0 0 15px rgba(212, 175, 55, 0.15)",
                  }}
                >
                  <Icon className="w-8 h-8 text-amber-600" />
                </div>
              </div>

              {/* Content layout */}
              <div
                className={`flex items-center ${
                  isEven ? "flex-row" : "flex-row-reverse"
                } gap-12 pt-12`}
              >
                {/* Text content */}
                <div
                  className={`flex-1 relative ${
                    isEven ? "text-right pr-12" : "text-left pl-12"
                  }`}
                >
                  <div
                    className={`transform transition-all duration-1000 delay-300 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-12 opacity-0"
                    }`}
                  >
                    <div className="relative inline-block mb-6">
                      <span
                        className={`text-6xl md:text-7xl ${yearFonts[index]} hover-vintage-lift cursor-pointer font-bold`}
                      >
                        {item.year}
                      </span>
                      <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent rounded-full"></div>
                    </div>
                    <h3
                      className={`text-4xl md:text-5xl ${titleFonts[index]} mb-6 leading-tight hover-gentle-sway cursor-pointer`}
                    >
                      {item.title}
                    </h3>
                    <div className="prose prose-lg max-w-md">
                      <p className="font-cormorant text-lg leading-relaxed font-medium text-stone-700 hover-romantic-glow cursor-pointer">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Curved arrow */}
                  {isEven ? (
                    <CurvedArrowLeft isVisible={isVisible} />
                  ) : (
                    <CurvedArrowRight isVisible={isVisible} />
                  )}
                </div>

                {/* Image */}
                <div className="flex-1 relative">
                  <div
                    className={`transform transition-all duration-1200 delay-700 ${
                      isVisible
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-16 opacity-0 scale-90"
                    }`}
                  >
                    <div className="relative group">
                      {/* Clean, minimal frame effects */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-white/80 to-stone-50/80 rounded-lg shadow-md transform rotate-0.5 group-hover:rotate-1 transition-transform duration-300"></div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-amber-50/60 to-white/60 rounded-lg shadow-sm transform -rotate-0.5 group-hover:-rotate-1 transition-transform duration-300"></div>

                      {/* Main image */}
                      <div className="relative">
                        <Image
                          width={500}
                          height={300}
                          src={item.image}
                          alt={item.title}
                          className="relative w-full h-64 md:h-80 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-500 filter sepia-[0.15] saturate-[0.85] brightness-[1.05]"
                        />

                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-amber-900/10 rounded-lg"></div>

                        {/* Minimal corner decorations */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-amber-300/60 rounded-tl-sm"></div>
                        <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-amber-300/60 rounded-tr-sm"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-amber-300/60 rounded-bl-sm"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-amber-300/60 rounded-br-sm"></div>

                        {/* Subtle heart decoration */}
                        <div className="absolute bottom-3 right-3 text-amber-400/50 opacity-40">
                          <Heart size={14} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Minimal scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <div className="w-6 h-12 border border-amber-300/60 rounded-full flex justify-center mb-2 bg-white/70 backdrop-blur-sm">
            <div className="w-0.5 h-3 bg-gradient-to-b from-amber-400/80 to-stone-400/80 rounded-full mt-1.5 animate-bounce"></div>
          </div>
          <p className="font-dancing text-vintage-brown text-sm hover-gentle-sway cursor-pointer opacity-80">
            Continue Our Story
          </p>
        </div>
      </div>

      {/* Romantic quote at bottom */}
      <div className="relative z-10 text-center pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <blockquote className="font-pinyon text-3xl md:text-4xl text-elegant-gold italic hover-romantic-glow cursor-pointer">
            &ldquo;Love is not just about finding the right person, but creating
            the right relationship. We capture both.&rdquo;
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default FounderJourney;

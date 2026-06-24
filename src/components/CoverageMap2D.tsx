"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Star, MapPin, Heart, Calendar, Users } from "lucide-react";

// Pre-defined coordinates mapping perfectly matched to the 1:1 SVG map projection
const LOCATIONS = [
  { id: "delhi", name: "Delhi NCR", city: "Delhi", weddings: "200+", year: "2016", pos: { top: "37.6%", left: "38.4%" } },
  { id: "patna", name: "Bihar", city: "Patna", weddings: "120+", year: "2016", pos: { top: "45.0%", left: "55.7%" } },
  { id: "kolkata", name: "West Bengal", city: "Kolkata", weddings: "300+", year: "2015", pos: { top: "52.4%", left: "62.7%" } },
  { id: "guwahati", name: "Assam", city: "Guwahati", weddings: "150+", year: "2017", pos: { top: "43.8%", left: "70.1%" } },
  { id: "shillong", name: "Meghalaya", city: "Shillong", weddings: "100+", year: "2018", pos: { top: "45.2%", left: "70.3%" } },
  { id: "agartala", name: "Tripura (HQ)", city: "Agartala", weddings: "250+", year: "2015", pos: { top: "49.3%", left: "69.0%" } },
  { id: "odisha", name: "Odisha", city: "Bhubaneswar", weddings: "180+", year: "2018", pos: { top: "57.5%", left: "57.2%" } },
  { id: "telangana", name: "Telangana", city: "Hyderabad", weddings: "220+", year: "2019", pos: { top: "64.2%", left: "41.3%" } },
];

function AnimatedNumber({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        // easeOutQuart easing function
        const easeOut = 1 - Math.pow(1 - progress / duration, 4);
        setCount(Math.floor(end * easeOut));
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    // Small delay to let the page fade-in first
    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

export default function CoverageMap2D() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMapHovered, setIsMapHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate relative mouse position (-1 to 1)
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const activeData = LOCATIONS.find(l => l.id === activeLocation);

  return (
    <section 
      className="w-full min-h-screen bg-[#fff6e5] relative overflow-hidden flex items-center py-16"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4 max-w-[1400px] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        
        {/* Left Column - Content */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          <div className="flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div 
              className="flex items-center gap-3 italic text-2xl lg:text-[2rem] text-gray-800 mb-[-1rem] pl-2 z-10" 
              style={{ fontFamily: 'var(--font-nyght-serif)' }}
            >
              <span>Capturing</span>
              <motion.span 
                className="text-[#D90429] text-4xl lg:text-6xl mt-1 lg:mt-2 inline-block origin-center" 
                style={{ fontFamily: "'Alex Brush', cursive", fontStyle: "normal" }}
                animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              >
                Love
              </motion.span>
              <span>Across</span>
            </div>
            <h2 
              className="text-[#1a1a1a] text-[8rem] lg:text-[14rem] font-bold tracking-normal leading-[0.85] uppercase" 
              style={{ fontFamily: 'var(--font-morganite)' }}
            >
              India
            </h2>
            
            <p className="mt-8 text-gray-500 text-sm leading-relaxed max-w-sm">
              From the north to the east, we capture timeless emotions in the most beautiful stories across India.
            </p>
          </div>

          {/* Stats Cards */}
          <motion.div 
            className="flex flex-col gap-4 max-w-[320px] mt-4 perspective-[1000px]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, rotateX: -90, y: -20 },
                show: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
              }}
              style={{ transformOrigin: "top center" }}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(217,4,41,0.08)] transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#D90429]/10 flex items-center justify-center shrink-0 text-[#D90429]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900"><AnimatedNumber end={800} suffix="+" /></h3>
                <p className="text-xs text-gray-500">Weddings Captured</p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, rotateX: -90, y: -20 },
                show: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
              }}
              style={{ transformOrigin: "top center" }}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(217,4,41,0.08)] transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#D90429]/10 flex items-center justify-center shrink-0 text-[#D90429]">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900"><AnimatedNumber end={10} suffix="+" /></h3>
                <p className="text-xs text-gray-500">Years Experience</p>
              </div>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, rotateX: -90, y: -20 },
                show: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
              }}
              style={{ transformOrigin: "top center" }}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(217,4,41,0.08)] transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#D90429]/10 flex items-center justify-center shrink-0 text-[#D90429]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900"><AnimatedNumber end={10} /></h3>
                <p className="text-xs text-gray-500">Major Coverage Regions</p>
              </div>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, rotateX: -90, y: -20 },
                show: { opacity: 1, rotateX: 0, y: 0, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
              }}
              style={{ transformOrigin: "top center" }}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(217,4,41,0.08)] transition-shadow cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#D90429]/10 flex items-center justify-center shrink-0 text-[#D90429]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900"><AnimatedNumber end={1500} suffix="+" /></h3>
                <p className="text-xs text-gray-500">Happy Clients</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Map UI */}
        <div 
          className="lg:col-span-7 relative h-[600px] md:h-[800px] w-full flex items-center justify-center pt-10"
          onMouseEnter={() => setIsMapHovered(true)}
          onMouseLeave={() => setIsMapHovered(false)}
        >
          
          <div 
            className="relative w-full max-w-[1000px] aspect-square transform lg:translate-x-12"
            style={{
              transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) scale(${isMapHovered ? 1.3 : 1.25})`,
              transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            }}
          >
            {/* The India Map Image with State Borders */}
            <img 
              src="/india-states-styled.svg?v=4" 
              alt="India Coverage Map"
              className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(217,4,41,0.15)] filter"
              style={{
                filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15)) drop-shadow(0 -5px 15px rgb(217 4 41 / 0.1))'
              }}
            />

            {/* Interactive Markers */}
            {LOCATIONS.map((loc) => (
              <div 
                key={loc.id}
                className="absolute group z-10"
                style={{ top: loc.pos.top, left: loc.pos.left, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setActiveLocation(loc.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                {/* Ping Animation */}
                <div className="absolute inset-0 rounded-full bg-[#D90429] animate-ping opacity-30 scale-[2] pointer-events-none"></div>
                
                {/* Glowing Aura */}
                <div className="absolute inset-0 rounded-full bg-[#D90429] blur-md opacity-20 scale-[3] pointer-events-none"></div>

                {/* Marker Pin - Just the Heart now */}
                <div className={`relative bg-[#D90429] rounded-full p-1 shadow-md cursor-pointer transition-all duration-300 ${activeLocation === loc.id ? 'scale-150 rotate-12 shadow-red-500/50' : 'hover:scale-150'} z-10`}>
                  <Heart className="w-1.5 h-1.5 md:w-2 md:h-2 text-white fill-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Floating Detail Card */}
          {activeData && (
            <div 
              className="absolute z-20 w-48 md:w-60 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-red-50 overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-75 origin-bottom-left"
              style={{
                top: `calc(${activeData.pos.top} - 10px)`,
                left: `calc(${activeData.pos.left} + 20px)`,
                transform: 'translate(0, -100%)'
              }}
            >
              <div className="p-4 bg-gradient-to-br from-white to-red-50/30">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-100 rounded-lg">
                    <MapPin className="w-4 h-4 text-[#D90429]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{activeData.city}</h4>
                    <p className="text-[10px] font-medium text-[#D90429] tracking-wider uppercase">{activeData.name}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

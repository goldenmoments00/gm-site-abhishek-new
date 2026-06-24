"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cormorantGaramond, morganite, nyghtSerif } from "@/lib/fonts";

const TeamCard = ({ member, onClick }: { member: any; onClick: () => void }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative rounded-lg sm:rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] transition-shadow duration-300 flex flex-col bg-[#e0e0e0] overflow-hidden aspect-[3/4] sm:aspect-auto sm:h-[30rem] cursor-pointer"
    >
      {/* Full-Card Photo Area */}
      <Image 
        src={member.image} 
        alt={member.name} 
        fill 
        className="object-cover transition-transform duration-700 group-hover:scale-105 z-0" 
      />
        
      {/* Moving Glossy Shine (Static by default, sweeps off on hover) */}
      <div className="absolute inset-0 z-20 pointer-events-none transition-transform duration-[1000ms] ease-in-out transform translate-x-0 group-hover:translate-x-[150%] group-active:translate-x-[150%]">
        <div
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
        <div
          className="absolute top-[-10%] bottom-[-10%] left-[50%] w-[1px] bg-white/30 transform -translate-x-1/2 rotate-[34deg] transform-origin-center shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        />
      </div>

      {/* Bottom Info Section (Frosted Glass Effect) */}
      <div className="absolute bottom-0 left-0 right-0 pt-2 pb-2 px-1 sm:pt-6 sm:pb-6 sm:px-5 text-white z-30 text-center bg-white/10 backdrop-blur-[12px] border-t border-white/20 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] transition-colors duration-300 group-hover:bg-white/20">
        <h3 
          className="text-[10px] leading-tight sm:text-2xl font-bold uppercase tracking-wider sm:tracking-wide mb-0.5 sm:mb-1 font-sans text-white drop-shadow-md" 
        >
          {member.name}
        </h3>
        <p 
          className={`${cormorantGaramond.className} italic text-[9px] leading-tight sm:text-base text-white/90 drop-shadow-sm`}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
};

const TeamGrid = () => {
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: "Subham Saha",
      role: "Senior Cinematographer",
      years: "10 Years",
      image: "/images/team/Subham Saha-Senior Cenematographer-10.jpg",
    },
    {
      id: 2,
      name: "Vishal Tahasildar",
      role: "Senior Photographer",
      years: "8 Years",
      image: "/images/team/Vishal Tahasildar-Senior Photographer-8.jpg",
    },
    {
      id: 3,
      name: "Gopal Bhowmik",
      role: "Senior Cinematographer",
      years: "6 Years",
      image: "/images/team/Gopal Bhowmik-senior Cenematographer-6.jpg",
    },
    {
      id: 4,
      name: "Sagar Malakar",
      role: "Senior Photographer",
      years: "5 Years",
      image: "/images/team/Sagar Malakar-Senior Photographer-5.jpg",
    },
    {
      id: 5,
      name: "Rahul Debnath",
      role: "Senior Photographer",
      years: "7 Years",
      image: "/images/team/Rahul Debnath-Senior Photographer-7.jpg",
    },
    {
      id: 6,
      name: "Suban Dey",
      role: "Senior Photographer",
      years: "4 Years",
      image: "/images/team/Suban Dey-Senior Photographer-4.jpg",
    },
    {
      id: 7,
      name: "Arsad Mia",
      role: "Senior Photographer",
      years: "4 Years",
      image: "/images/team/Arsad Mia-Senior Photographer-4.jpg",
    },
    {
      id: 8,
      name: "Sourav Sib",
      role: "Photographer",
      years: "4 Years",
      image: "/images/team/Sourav Sib-Photographer-4.jpg",
    },
    {
      id: 9,
      name: "Subham Saha",
      role: "Cinematographer",
      years: "3 Years",
      image: "/images/team/Subham Saha-Cenematographer-3.jpg",
    },
    {
      id: 10,
      name: "Sourav Basak",
      role: "Photographer",
      years: "3 Years",
      image: "/images/team/Sourav Basak-Photographer-3.jpg",
    },
    {
      id: 11,
      name: "Subrata Chakraborty",
      role: "Photographer",
      years: "3 Years",
      image: "/images/team/Subrata Chakraborty-Photographer-3.jpg",
    },
    {
      id: 12,
      name: "Sushil R.Paul",
      role: "Cinematographer",
      years: "3 Years",
      image: "/images/team/Sushil R.Paul-Cinematographer-3.jpg",
    },
    {
      id: 13,
      name: "Arup Paul",
      role: "Cinematographer",
      years: "2 Years",
      image: "/images/team/Arup Paul-Cinematographer-2.jpg",
    },
    {
      id: 14,
      name: "Bappa Ghosh",
      role: "Photographer",
      years: "2 Years",
      image: "/images/team/Bappa Ghosh-Photographer-2.jpg",
    },
    {
      id: 15,
      name: "Akash Nama",
      role: "Cinematographer",
      years: "2 Years",
      image: "/images/team/Akash Nama-Cinematographer-2.jpg",
    },
  ].map(m => ({
    ...m,
    bio: "I believe that every photograph is a frozen moment of magic. Through my lens, I strive to capture not just how a moment looked, but exactly how it felt. My journey in visual storytelling has been driven by a passion to preserve your most precious memories in their purest, most beautiful form. From the subtle, quiet glances to the grand celebrations, I am dedicated to crafting a timeless narrative of your unique story."
  }));

  return (
    <div className="relative pb-20 pt-2 md:pt-6 px-4 md:px-8">
      {/* Grid Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-x-8 sm:gap-y-12">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
          ))}
        </div>
      </div>

      {/* Detail Modal / Popup */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-[#151515] rounded-[2rem] shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] border border-white/5"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/40 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-full transition-all text-white hover:rotate-90 duration-300"
              >
                <X size={24} strokeWidth={1.5} />
              </button>

              {/* Modal Image - Takes up almost half */}
              <div className="w-full md:w-5/12 h-80 md:h-auto relative shrink-0">
                <Image 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  fill 
                  className="object-cover"
                />
                {/* Subtle fade to dark on the right edge of the image to blend into the text area */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#151515] md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#151515] pointer-events-none" />
              </div>

              {/* Modal Text Content */}
              <div className="w-full md:w-7/12 p-8 md:p-14 lg:p-20 overflow-y-auto overflow-x-hidden flex flex-col justify-center relative">
                
                {/* Decorative subtle background text (Watermark of first name) */}
                <div className={`${morganite.className} absolute -top-10 -right-10 text-[250px] leading-none text-white/[0.02] pointer-events-none select-none z-0`}>
                  {selectedMember.name.split(' ')[0]}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] w-12 bg-[#D4AF37]/60" />
                    <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#D4AF37]">
                      {selectedMember.years} Experience
                    </span>
                  </div>
                  
                  <h2 className={`${morganite.className} text-[80px] md:text-[100px] lg:text-[130px] leading-[0.85] uppercase tracking-normal mb-4 text-[#F8F2E8]`}>
                    {selectedMember.name}
                  </h2>
                  
                  <h3 className={`${nyghtSerif.className} text-3xl md:text-4xl italic text-[#D4AF37]/90 mb-10`}>
                    {selectedMember.role}
                  </h3>
                  
                  <p className={`${nyghtSerif.className} text-[#A0A0A0] leading-relaxed text-xl md:text-2xl font-light`}>
                    &quot;{selectedMember.bio}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamGrid;

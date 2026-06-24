import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { crewMembers } from "@/data/constants";

interface CrewMember {
  name: string;
  role: string;
  image: string;
  delay: number;
}

const teamContacts = [
  {
    id: 1,
    name: "Rahul Sharma",
    designation: "Lead Photographer | +91 98765 43210",
    image: "/team/rahul-contact.jpg",
  },
  {
    id: 2,
    name: "Priya Gupta",
    designation: "Creative Director | +91 98765 43211",
    image: "/team/priya-contact.jpg",
  },
  {
    id: 3,
    name: "Arjun Singh",
    designation: "Cinematographer | +91 98765 43212",
    image: "/team/arjun-contact.jpg",
  },
  {
    id: 4,
    name: "Kavya Mehta",
    designation: "Client Relations | +91 98765 43213",
    image: "/team/kavya-contact.jpg",
  },
];

const WeddingCrewHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Trigger animation when user scrolls down
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate scroll progress (0 to 1)
  const scrollProgress = Math.min(scrollY / 400, 1);

  return (
    <>
      {/* Add Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 py-20">
          {/* Main Hero Section with Title and Floating Images */}
          <div className="relative flex flex-col items-center justify-center min-h-[80vh] w-full">
            {/* Agency Title */}
            <div className="text-center z-20 relative">
              <h1
                className="text-4xl sm:text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight"
                style={{ fontFamily: "'Annie Use Your Telescope', cursive" }}
              >
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Golden
                </span>
                <br />
                <span className="text-gray-700">Moments</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                Capturing your love story with artistry and passion
              </p>
            </div>

            {/* Floating Crew Images around the title */}
            <div className="absolute inset-0 flex items-center justify-center">
              {crewMembers.map((member: CrewMember, index: number) => {
                // Define positions closer to the text
                const positions = [
                  {
                    // Top left - closer to text
                    mobile: { top: "25%", left: "15%", rotation: -15 },
                    desktop: { top: "30%", left: "20%", rotation: -15 },
                  },
                  {
                    // Top right - closer to text
                    mobile: { top: "25%", right: "15%", rotation: 15 },
                    desktop: { top: "30%", right: "20%", rotation: 15 },
                  },
                  {
                    // Bottom left - closer to text
                    mobile: { bottom: "25%", left: "15%", rotation: 12 },
                    desktop: { bottom: "30%", left: "20%", rotation: 12 },
                  },
                  {
                    // Bottom right - closer to text
                    mobile: { bottom: "25%", right: "15%", rotation: -12 },
                    desktop: { bottom: "30%", right: "20%", rotation: -12 },
                  },
                ];

                const currentPosition = positions[index];

                // Calculate transform based on scroll progress
                const floatingOffset = (1 - scrollProgress) * 100; // Move up as we scroll down
                const rotationOffset =
                  (1 - scrollProgress) * currentPosition.desktop.rotation;
                const opacity = Math.max(0, 1 - scrollProgress * 1.5);

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-300 ease-out group cursor-pointer"
                    style={{
                      // Use mobile positions on small screens, desktop on larger
                      top: currentPosition.mobile.top,
                      left: currentPosition.mobile.left,
                      right: currentPosition.mobile.right,
                      bottom: currentPosition.mobile.bottom,
                      transform: `translateY(${floatingOffset}px) rotate(${rotationOffset}deg)`,
                      opacity: opacity,
                      zIndex: 10,
                    }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-0">
                      <Image
                        width={400}
                        height={400}
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Hover overlay with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Name and role on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1">
                          {member.name}
                        </h3>
                        <p className="text-rose-200 font-medium text-xs sm:text-sm md:text-base">
                          {member.role}
                        </p>
                      </div>

                      {/* Ripple effect on hover */}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop positioning for larger screens */}
            <style jsx>{`
              @media (min-width: 768px) {
                .floating-image-0 {
                  top: 30% !important;
                  left: 20% !important;
                }
                .floating-image-1 {
                  top: 30% !important;
                  right: 20% !important;
                }
                .floating-image-2 {
                  bottom: 30% !important;
                  left: 20% !important;
                }
                .floating-image-3 {
                  bottom: 30% !important;
                  right: 20% !important;
                }
              }
            `}</style>
          </div>

          {/* Crew Grid Section (appears on scroll) */}
          <div
            className={`transition-all duration-1000 ease-out w-full ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <div className="text-center mb-12 ">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Meet Our Crew
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
            </div>

            <section className="py-10 bg-white">
              <div className="text-center mb-16">
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                  Connect directly with our team members
                </p>
              </div>
              <div className="flex justify-center">
                <AnimatedTooltip items={teamContacts} />
              </div>
            </section>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-none px-4 sm:px-8">
              {crewMembers.map((member, index) => (
                <div
                  key={index}
                  className={`relative group transition-all duration-1000 ease-out ${
                    isVisible
                      ? "transform translate-y-0 rotate-0 opacity-100"
                      : "transform translate-y-20 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${member.delay + 0.2}s`,
                  }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105">
                    <Image
                      width={400}
                      height={400}
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">
                        {member.name}
                      </h3>
                      <p className="text-rose-200 font-medium text-sm sm:text-base">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Static Name and Role */}
                  <div className="text-center mt-4 sm:mt-6 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-rose-600 font-medium text-base sm:text-lg">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="text-center mt-16 sm:mt-20 w-full px-4">
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our talented team brings together years of experience, creativity,
              and passion to make your special day unforgettable. Each member
              specializes in capturing the unique essence of your love story.
            </p>
            <button className="mt-6 sm:mt-8 bg-gradient-to-r from-rose-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-rose-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Book Your Session
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
      </div>
    </>
  );
};

export default WeddingCrewHero;

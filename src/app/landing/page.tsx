"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { morganite, nyghtSerif, plusJakartaSans } from "@/lib/fonts";
import "./animations.css";
import Navbar from "@/components/Navbar";
import LandingHero2 from "@/components/LandingHero2";

export default function PictlensLanding() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentStoryImage, setCurrentStoryImage] = useState(0);

  // Auto-rotate testimonials every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 4); // Hard-coded to 4 testimonials
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate story images with shutter effect
  useEffect(() => {
    const storyImages = [
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop",
    ];

    const interval = setInterval(() => {
      setCurrentStoryImage((prev) => (prev + 1) % storyImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const storyImages = [
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop",
  ];

  const testimonials = [
    {
      text: "Working with Pictlens transformed our brand's visual identity. Their attention to detail and creative vision exceeded our expectations in every way.",
      name: "Sarah Bennett",
      role: "Real Estate Agent",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b7c6?w=120&h=120&fit=crop&crop=face",
    },
    {
      text: "The team's professionalism and artistic eye captured our product launch perfectly. The images drove incredible engagement across all our marketing channels.",
      name: "James Clark",
      role: "Marketing Manager",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    },
    {
      text: "From concept to final delivery, Pictlens made the entire process seamless. Their creative direction elevated our fashion campaign to new heights.",
      name: "Erika Arnold",
      role: "Fashion Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    },
    {
      text: "The portfolio shots they created for our agency became the cornerstone of our rebranding. Exceptional quality and artistic vision throughout.",
      name: "Daniel Lee",
      role: "Creative Director",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    },
  ];

  const portfolioItems = [
    {
      title: "Isabella & Marcus",
      year: "2025",
      category: "Wedding",
      type: "Photography",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=920&h=920&fit=crop",
      hoverImage:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=920&h=920&fit=crop",
    },
    {
      title: "Corporate Gala",
      year: "2024",
      category: "Event",
      type: "Photography",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=920&h=920&fit=crop",
      hoverImage:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=920&h=920&fit=crop",
    },
    {
      title: "Sarah & David",
      year: "2024",
      category: "Engagement",
      type: "Photography",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=920&h=920&fit=crop&crop=face",
      hoverImage:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=920&h=920&fit=crop&crop=face",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-white text-gray-900 ${morganite.variable} ${nyghtSerif.variable} ${plusJakartaSans.variable}`}
    >
      {/* Navigation */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <Navbar />
      </div>

      {/* Hero Section */}
      <LandingHero2 />

      {/* Visual Stories Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-200 mb-12 md:mb-16"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center min-h-[60vh] lg:min-h-[80vh]">
            {/* Left: Visual Stories Title */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="font-nyght-serif italic text-base md:text-lg text-gray-600 mb-4">
                  Visual
                </div>
                <h2 className="font-morganite font-bold text-4xl md:text-6xl lg:text-7xl mb-6 lg:mb-8">
                  <span className="inline-block">S</span>
                  <span className="inline-block">t</span>
                  <span className="inline-block">o</span>
                  <span className="inline-block">r</span>
                  <span className="inline-block">i</span>
                  <span className="inline-block">e</span>
                  <span className="inline-block">s</span>
                </h2>
              </div>
            </div>

            {/* Center: Camera Shutter Animation */}
            <div className="flex items-center justify-center order-first lg:order-none">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Camera Frame */}
                <div className="absolute inset-0 rounded-full border-4 md:border-8 border-black bg-black overflow-hidden">
                  {/* Shutter Blades */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-full h-full origin-center animate-shutter-blade"
                        style={{
                          transform: `rotate(${i * 45}deg)`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      >
                        <div className="w-1/2 h-full bg-gray-800 transform-gpu transition-transform duration-500"></div>
                      </div>
                    ))}
                  </div>

                  {/* Image Container */}
                  <div className="absolute inset-2 md:inset-4 rounded-full overflow-hidden">
                    {storyImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === currentStoryImage
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Story ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}

                    {/* Shutter Flash Effect */}
                    <div className="absolute inset-0 bg-white animate-flash pointer-events-none"></div>
                  </div>

                  {/* Camera Lens Reflection */}
                  <div className="absolute inset-4 md:inset-8 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Camera Body Details */}
                <div className="absolute -top-2 md:-top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-8 md:h-8 bg-gray-600 rounded"></div>
                <div className="absolute -bottom-2 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-3 md:w-12 md:h-6 bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Right: About Text and Social Links */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="max-w-md text-center lg:text-left">
                <p className="font-plus-jakarta-sans text-base md:text-lg leading-relaxed text-gray-600 mb-6 md:mb-8">
                  We don&apos;t just take pictures — we craft visual stories
                  that speak louder than words. From compelling commercial
                  shoots to authentic editorial moments, our lens is focused on
                  bringing your vision to life.
                </p>

                <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8 justify-center lg:justify-start">
                  <a
                    href="https://instagram.com"
                    className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 2H1L9.26086 13.0145L1.44995 21.9999H4.09998L10.4883 14.651L16 22H23L14.3917 10.5223L21.8001 2H19.1501L13.1643 8.88578L8 2ZM17 20L5 4H7L19 20H17Z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z" />
                    </svg>
                  </a>
                  <a
                    href="https://unsplash.com"
                    className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 rounded-sm flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.50098 11V16H15.501V11H21.001V21H3.00098V11H8.50098ZM15.501 3V8H8.50098V3H15.501Z" />
                    </svg>
                  </a>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center bg-black text-white px-6 md:px-8 py-3 md:py-4 font-plus-jakarta-sans text-sm hover:bg-gray-800 transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative">
        {/* Header Section */}
        <div className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="border-t border-gray-200 mb-16"></div>

            <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
              <div>
                <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                  Our
                </div>
                <h2 className="font-morganite font-bold text-6xl lg:text-7xl">
                  <span className="inline-block">S</span>
                  <span className="inline-block">e</span>
                  <span className="inline-block">r</span>
                  <span className="inline-block">v</span>
                  <span className="inline-block">i</span>
                  <span className="inline-block">c</span>
                  <span className="inline-block">e</span>
                  <span className="inline-block">s</span>
                </h2>
              </div>
              <Link
                href="/services"
                className="mt-8 lg:mt-0 bg-black text-white px-8 py-4 font-plus-jakarta-sans text-sm hover:bg-gray-800 transition-colors"
              >
                All Services
              </Link>
            </div>
          </div>
        </div>

        {/* Layered Service Cards */}
        <div className="relative">
          {/* Portrait Photography */}
          <div className="sticky top-0 z-10 bg-white">
            <div className="py-20 px-6 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                      Defining Personal Identity
                    </div>
                    <h3 className="font-morganite font-bold text-4xl mb-6">
                      Portrait Photography
                    </h3>
                    <p className="font-plus-jakarta-sans text-lg text-gray-600 mb-6">
                      Studio or location portraits that reflect personality,
                      professionalism, or lifestyle.
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="font-plus-jakarta-sans">
                        • Natural lighting & studio options
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Retouching and skin tone accuracy
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Ideal for branding & social profiles
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Multiple background choices
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Expression coaching
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face"
                      alt="Portrait Photography"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Photography */}
          <div className="sticky top-0 z-20 bg-gray-50">
            <div className="py-20 px-6 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="lg:order-2">
                    <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                      Moments That Matter
                    </div>
                    <h3 className="font-morganite font-bold text-4xl mb-6">
                      Event Photography
                    </h3>
                    <p className="font-plus-jakarta-sans text-lg text-gray-600 mb-6">
                      Comprehensive visual coverage of corporate, cultural, or
                      private events with a documentary style.
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="font-plus-jakarta-sans">
                        • Candid & posed shots
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Multi-camera setup available
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Real-time photo delivery options
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Discreet, professional presence
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Photo albums & recap services
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-lg lg:order-1">
                    <Image
                      src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=600&fit=crop"
                      alt="Event Photography"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commercial Photography */}
          <div className="sticky top-0 z-30 bg-white">
            <div className="py-20 px-6 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                      Visuals That Sell
                    </div>
                    <h3 className="font-morganite font-bold text-4xl mb-6">
                      Commercial Photography
                    </h3>
                    <p className="font-plus-jakarta-sans text-lg text-gray-600 mb-6">
                      High-impact imagery designed to elevate brand identity,
                      drive engagement, and boost conversions.
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="font-plus-jakarta-sans">
                        • Brand-aligned compositions
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Studio & on-location flexibility
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Product and lifestyle shots
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Art direction included
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Optimized for web and print
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=600&fit=crop"
                      alt="Commercial Photography"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Photography */}
          <div className="sticky top-0 z-40 bg-gray-50">
            <div className="py-20 px-6 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="lg:order-2">
                    <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                      Precision in details
                    </div>
                    <h3 className="font-morganite font-bold text-4xl mb-6">
                      Product Photography
                    </h3>
                    <p className="font-plus-jakarta-sans text-lg text-gray-600 mb-6">
                      Clean, high-resolution product images designed to boost
                      e-commerce and marketing
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="font-plus-jakarta-sans">
                        • White background or lifestyle setups
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Consistent angles & lighting
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Macro photography available
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Shadow & reflection control
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Web-optimized formats
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-lg lg:order-1">
                    <Image
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"
                      alt="Product Photography"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Layered Sticky Cards */}
      <section className="relative bg-gray-50">
        {/* Header */}
        <div className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="border-t border-gray-200 mb-16"></div>

            <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
              <div>
                <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                  Featured
                </div>
                <h2 className="font-morganite font-bold text-6xl lg:text-7xl">
                  <span className="inline-block">P</span>
                  <span className="inline-block">o</span>
                  <span className="inline-block">r</span>
                  <span className="inline-block">t</span>
                  <span className="inline-block">f</span>
                  <span className="inline-block">o</span>
                  <span className="inline-block">l</span>
                  <span className="inline-block">i</span>
                  <span className="inline-block">o</span>
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="mt-8 lg:mt-0 bg-black text-white px-8 py-4 font-plus-jakarta-sans text-sm hover:bg-gray-800 transition-colors"
              >
                View All Work
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Portfolio */}
        <div className="block lg:hidden px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-12">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="font-plus-jakarta-sans text-sm opacity-80 mb-2">
                        {item.year}
                      </div>
                      <h3 className="font-morganite font-bold text-2xl mb-2">
                        {item.title}
                      </h3>
                      <div className="flex space-x-2 text-sm">
                        <span className="font-plus-jakarta-sans">
                          {item.category}
                        </span>
                        <span className="font-plus-jakarta-sans opacity-60">
                          •
                        </span>
                        <span className="font-plus-jakarta-sans">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Portfolio - Manual Sticky Cards (like services) */}
        <div className="hidden lg:block relative">
          {/* Project 1: Isabella & Marcus */}
          <div className="sticky top-0 z-10 bg-white">
            <div className="py-20 px-6 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                      Project 01 — 2025
                    </div>
                    <h3 className="font-morganite font-bold text-5xl xl:text-6xl mb-6 leading-tight">
                      Isabella & Marcus
                    </h3>
                    <p className="font-plus-jakarta-sans text-lg text-gray-600 mb-8 max-w-lg">
                      A romantic wedding celebration captured through intimate
                      moments and grand gestures. Every detail meticulously
                      documented to tell their unique love story.
                    </p>
                    <ul className="space-y-3 text-gray-600 mb-8">
                      <li className="font-plus-jakarta-sans">
                        • Wedding Photography
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Creative Direction & Styling
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Post-Production & Retouching
                      </li>
                    </ul>
                    <Link
                      href="/portfolio/isabella-marcus"
                      className="inline-flex items-center group"
                    >
                      <span className="font-plus-jakarta-sans text-sm mr-3">
                        View Project
                      </span>
                      <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=920&h=920&fit=crop"
                      alt="Isabella & Marcus Wedding"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2: Corporate Gala */}
          <div className="sticky top-0 z-20 bg-gray-50">
            <div className="py-20 px-6 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="lg:order-2">
                    <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                      Project 02 — 2024
                    </div>
                    <h3 className="font-morganite font-bold text-5xl xl:text-6xl mb-6 leading-tight">
                      Corporate Gala
                    </h3>
                    <p className="font-plus-jakarta-sans text-lg text-gray-600 mb-8 max-w-lg">
                      An elegant corporate event showcasing industry leadership.
                      Professional photography that captures the energy,
                      networking, and milestone achievements.
                    </p>
                    <ul className="space-y-3 text-gray-600 mb-8">
                      <li className="font-plus-jakarta-sans">
                        • Event Photography
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Creative Direction & Styling
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Post-Production & Retouching
                      </li>
                    </ul>
                    <Link
                      href="/portfolio/corporate-gala"
                      className="inline-flex items-center group"
                    >
                      <span className="font-plus-jakarta-sans text-sm mr-3">
                        View Project
                      </span>
                      <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-lg lg:order-1">
                    <Image
                      src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=920&h=920&fit=crop"
                      alt="Corporate Gala Event"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3: Sarah & David */}
          <div className="sticky top-0 z-30 bg-white">
            <div className="py-20 px-6 min-h-screen flex items-center">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                      Project 03 — 2024
                    </div>
                    <h3 className="font-morganite font-bold text-5xl xl:text-6xl mb-6 leading-tight">
                      Sarah & David
                    </h3>
                    <p className="font-plus-jakarta-sans text-lg text-gray-600 mb-8 max-w-lg">
                      An intimate engagement session celebrating the beginning
                      of forever. Natural, candid moments that reflect their
                      genuine connection and joy.
                    </p>
                    <ul className="space-y-3 text-gray-600 mb-8">
                      <li className="font-plus-jakarta-sans">
                        • Engagement Photography
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Creative Direction & Styling
                      </li>
                      <li className="font-plus-jakarta-sans">
                        • Post-Production & Retouching
                      </li>
                    </ul>
                    <Link
                      href="/portfolio/sarah-david"
                      className="inline-flex items-center group"
                    >
                      <span className="font-plus-jakarta-sans text-sm mr-3">
                        View Project
                      </span>
                      <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=920&h=920&fit=crop&crop=face"
                      alt="Sarah & David Engagement"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-200 mb-16"></div>

          <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
            <div>
              <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                Happy
              </div>
              <h2 className="font-morganite font-bold text-6xl lg:text-7xl">
                <span className="inline-block">C</span>
                <span className="inline-block">l</span>
                <span className="inline-block">i</span>
                <span className="inline-block">e</span>
                <span className="inline-block">n</span>
                <span className="inline-block">t</span>
                <span className="inline-block">s</span>
              </h2>
            </div>
            <Link
              href="/contact"
              className="mt-8 lg:mt-0 bg-black text-white px-8 py-4 font-plus-jakarta-sans text-sm hover:bg-gray-800 transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 mx-auto mb-8">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-full h-full text-gray-400"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="font-plus-jakarta-sans text-xl leading-relaxed text-gray-700 mb-12 max-w-2xl mx-auto">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-plus-jakarta-sans font-semibold">
                          {testimonial.name}
                        </div>
                        <div className="font-plus-jakarta-sans text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-nyght-serif italic text-lg text-gray-600 mb-4">
                Book a
              </div>
              <h2 className="font-morganite font-bold text-6xl lg:text-7xl mb-8">
                <span className="inline-block">S</span>
                <span className="inline-block">e</span>
                <span className="inline-block">s</span>
                <span className="inline-block">s</span>
                <span className="inline-block">i</span>
                <span className="inline-block">o</span>
                <span className="inline-block">n</span>
              </h2>
              <p className="font-plus-jakarta-sans text-lg text-gray-600 mb-8 max-w-lg">
                Ready to bring your vision to life?
                <br />
                Whether you need a full-scale shoot or a creative collaboration,
                we&apos;re here to capture it with purpose and style.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-black text-white px-8 py-4 font-plus-jakarta-sans text-sm hover:bg-gray-800 transition-colors"
              >
                Get in Touch
              </Link>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square relative overflow-hidden rounded-lg transform rotate-3">
                  <Image
                    src="https://images.unsplash.com/photo-1606721977440-21ac4b4a4147?w=300&h=300&fit=crop"
                    alt="Session preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg transform -rotate-2 mt-8">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop"
                    alt="Session preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg transform rotate-1 -mt-4">
                  <Image
                    src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop"
                    alt="Session preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg transform -rotate-1">
                  <Image
                    src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop"
                    alt="Session preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-black font-morganite font-bold text-xl">
                    P
                  </span>
                </div>
              </Link>
              <p className="text-gray-400 text-sm mb-6">
                Crafting stories through every frame.
              </p>
              <p className="font-plus-jakarta-sans text-sm leading-relaxed max-w-md">
                We&apos;re a photography agency capturing bold visuals,
                authentic moments, and brand-defining imagery.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-plus-jakarta-sans font-semibold text-sm mb-6 tracking-widest uppercase">
                Pages
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors font-plus-jakarta-sans text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors font-plus-jakarta-sans text-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-gray-400 hover:text-white transition-colors font-plus-jakarta-sans text-sm"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white transition-colors font-plus-jakarta-sans text-sm"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors font-plus-jakarta-sans text-sm"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors font-plus-jakarta-sans text-sm"
                  >
                    Blog
                  </Link>
                </li>
              </ul>

              <div className="mt-8">
                <div className="flex space-x-4 mb-6">
                  <a
                    href="https://instagram.com"
                    className="w-10 h-10 border border-gray-600 rounded-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    className="w-10 h-10 border border-gray-600 rounded-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 2H1L9.26086 13.0145L1.44995 21.9999H4.09998L10.4883 14.651L16 22H23L14.3917 10.5223L21.8001 2H19.1501L13.1643 8.88578L8 2ZM17 20L5 4H7L19 20H17Z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="w-10 h-10 border border-gray-600 rounded-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z" />
                    </svg>
                  </a>
                  <a
                    href="https://unsplash.com"
                    className="w-10 h-10 border border-gray-600 rounded-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.50098 11V16H15.501V11H21.001V21H3.00098V11H8.50098ZM15.501 3V8H8.50098V3H15.501Z" />
                    </svg>
                  </a>
                </div>

                <div className="font-plus-jakarta-sans text-sm text-gray-400 mb-2">
                  +1 (212) 555-5555
                </div>
                <div className="font-plus-jakarta-sans text-xs text-gray-400">
                  Haradhan Sangha Rd, near Tripura State Co-operative Bank,
                  Krishna Nagar
                  <br />
                  Agartala, Tripura 799001
                </div>
              </div>
            </div>

            {/* Credits & Links */}
            <div>
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-plus-jakarta-sans text-xs text-gray-400">
                    Created by
                  </span>
                  <a
                    href="https://bikramitnath.com"
                    className="font-plus-jakarta-sans text-xs text-white hover:text-gray-300 transition-colors"
                  >
                    Bikramit Nath
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-plus-jakarta-sans text-xs text-gray-400">
                    Powered by
                  </span>
                  <a
                    href="https://digital.ortusfinance.in"
                    className="font-plus-jakarta-sans text-xs text-white hover:text-gray-300 transition-colors"
                  >
                    Ortus Digital
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href="/style-guide"
                  className="block font-plus-jakarta-sans text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Style Guide
                </a>
                <a
                  href="/licenses"
                  className="block font-plus-jakarta-sans text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Licenses
                </a>
                <a
                  href="/changelog"
                  className="block font-plus-jakarta-sans text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Changelog
                </a>
              </div>

              <div className="mt-8 text-right">
                <div className="font-plus-jakarta-sans text-xs text-gray-400 tracking-widest uppercase mb-2">
                  Back To Top
                </div>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="inline-flex items-center justify-center w-10 h-10 border border-gray-600 rounded-sm hover:bg-white hover:text-black transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

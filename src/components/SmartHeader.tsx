"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

export default function SmartHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fallback for native window scrolling (if not in iframe)
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Listener for iframe scrolling
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "iframe-scroll") {
        const { scrollY, direction } = event.data;
        if (direction === "down" && scrollY > 150) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "Gallery", href: "/gallery", hasDropdown: false },
    { name: "Packages", href: "/packages", hasDropdown: false },
    { name: "About", href: "/through", hasDropdown: false },
    { name: "Contact", href: "/contact", hasDropdown: false },
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: -120 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="w-full max-w-6xl pointer-events-auto">
          {/* Glassmorphic Pill */}
          <div className="flex items-center justify-between px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-black/5 shadow-lg text-[#8a1212]">
            
            {/* Logo area */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <img 
                  src="/images/logo.png" 
                  alt="Golden Moment Logo" 
                  className="h-8 w-auto group-hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-bold text-[#8a1212] hover:text-[#d90429] transition-colors"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-70" />}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full text-white font-semibold text-sm transition-transform hover:scale-105 active:scale-95 shadow-md"
                style={{ backgroundColor: "#D90429" }}
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-[#8a1212]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Dropdown (simplified) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-lg flex flex-col items-center justify-center pt-20">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-2xl font-semibold text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 px-8 py-3 rounded-full text-white font-semibold text-lg"
              style={{ backgroundColor: "#D90429" }}
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

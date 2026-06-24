"use client";

import Link from "next/link";
import React, { useState } from "react";
import { X } from "lucide-react";

interface NavLinkProps {
  href: string;
  text: string;
}

const AnimatedNavLink: React.FC<NavLinkProps> = ({ href, text }) => {
  const letters = text.split("");

  return (
    <Link
      href={href}
      className="nav-link-container group relative inline-block overflow-hidden h-6"
    >
      {/* Normal text */}
      <div className="flex">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block transition-transform duration-300 group-hover:-translate-y-full"
            style={{
              transitionDelay: `${index * 30}ms`,
              fontFamily: "var(--font-morganite), 'Anton', sans-serif",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
      {/* Hover text (italic) */}
      <div className="flex absolute top-0 left-0">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 italic"
            style={{
              transitionDelay: `${index * 30}ms`,
              fontFamily:
                "var(--font-nyght-serif), 'Annie Use Your Telescope', cursive",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </Link>
  );
};

interface ThroughNavbarProps {
  brandName?: string;
}

const ThroughNavbar: React.FC<ThroughNavbarProps> = ({
  brandName = "GOLDEN MOMENT",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "HOME", href: "/" },
    { name: "GALLERY", href: "/gallery" },
    { name: "PACKAGES", href: "/packages" },
    { name: "ABOUT", href: "/through" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: "transparent" }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 md:py-7">
          {/* Brand */}
          <Link href="/" className="brand-text group">
            <span
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.2em] transition-all duration-300 group-hover:text-amber-700"
              style={{
                color: "#1a1a1a",
                fontFamily: "var(--font-morganite), 'Anton', sans-serif",
              }}
            >
              {brandName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden lg:flex items-center"
            style={{ color: "#1a1a1a" }}
          >
            <nav className="flex items-center gap-10 xl:gap-12 text-base uppercase tracking-[0.15em]">
              {navigationItems.map((item) => (
                <AnimatedNavLink
                  key={item.name}
                  href={item.href}
                  text={item.name}
                />
              ))}
            </nav>
          </div>

          {/* Menu Button - visible on all screens */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-base uppercase tracking-[0.15em] hover:text-amber-700 transition-colors"
            style={{
              color: "#1a1a1a",
              fontFamily: "var(--font-morganite), 'Anton', sans-serif",
            }}
          >
            {isMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "#FFF6E5" }}
      >
        <div className="h-full flex flex-col items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 md:right-12 hover:opacity-70 transition-opacity"
            style={{ color: "#1a1a1a" }}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Menu Links */}
          <nav className="flex flex-col items-center gap-6 md:gap-8">
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-4xl md:text-6xl font-bold uppercase tracking-wider hover:opacity-60 transition-all duration-300 transform ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  color: "#1a1a1a",
                  transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms",
                  fontFamily: "var(--font-morganite), 'Anton', sans-serif",
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Decorative Line */}
          <div
            className={`mt-12 w-24 h-px transition-all duration-500 ${
              isMenuOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
            style={{
              backgroundColor: "rgba(26, 26, 26, 0.3)",
              transitionDelay: isMenuOpen ? "500ms" : "0ms",
            }}
          />

          {/* Footer Text */}
          <p
            className={`mt-6 text-sm tracking-widest transition-all duration-500 ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
            style={{
              color: "rgba(26, 26, 26, 0.55)",
              transitionDelay: isMenuOpen ? "600ms" : "0ms",
              fontFamily: "var(--font-plusJakartaSans), sans-serif",
            }}
          >
            WEDDING PHOTOGRAPHY • AGARTALA, TRIPURA
          </p>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-24" />
    </>
  );
};

export default ThroughNavbar;

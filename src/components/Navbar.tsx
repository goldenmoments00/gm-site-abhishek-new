"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Home,
  User,
  Settings,
  Camera,
  Phone,
  X,
  Menu,
  Sparkles,
  Heart,
  Star,
} from "lucide-react";

interface NavbarProps {
  logo?: string;
  orgName?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo = "/images/logo.png",
  orgName = "Golden Moment",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: User },
    { name: "Services", href: "/packages", icon: Settings },
    { name: "Gallery", href: "/gallery", icon: Camera },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsMobileMenuOpen(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    }
  };

  const handleOverlayClick = () => {
    toggleMobileMenu();
  };

  return (
    <>
      {/* Desktop Navbar - Premium Black & White Design */}
      <nav className="fixed top-6 left-6 right-6 bg-black/95 backdrop-blur-xl border border-white/10 z-50 hidden md:block rounded-2xl shadow-2xl shadow-black/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 h-20">
          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-black shadow-lg border border-gray-200 group-hover:scale-105 transition-transform duration-300">
                <Image
                  width={48}
                  height={48}
                  src={logo}
                  alt={orgName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/20 to-gray-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-wide font-morganite">
                {orgName}
              </span>
              <span className="text-white/60 text-xs font-light tracking-widest uppercase font-plusJakartaSans">
                Photography Studio
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative px-6 py-3 text-white/80 font-medium text-sm transition-all duration-300 hover:text-white rounded-xl overflow-hidden"
                >
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl border border-white/10"></div>

                  {/* Content */}
                  <div className="relative flex items-center gap-2 z-10">
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-plusJakartaSans">{item.name}</span>
                  </div>

                  {/* Hover Line */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </Link>
              );
            })}

            {/* CTA Button */}
            <div className="ml-4 pl-4 border-l border-white/20">
              <Link
                href="/contact"
                className="group relative bg-white text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-lg font-plusJakartaSans overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Heart className="w-4 h-4 group-hover:fill-red-500 group-hover:text-red-500 transition-colors duration-300" />
                  <span>Book Now</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Border Glow */}
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </nav>

      {/* Mobile Bottom Navigation with Subtle Bulging Logo */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="relative bg-white/95 backdrop-blur-md border border-black/10 rounded-full shadow-lg h-16">
          {/* Subtle Bulging Logo Container - bigger logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-4">
            <button
              onClick={toggleMobileMenu}
              className="relative bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg shadow-yellow-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-yellow-600/30 border-2 border-white group"
              aria-label="Toggle menu"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-black shadow-sm">
                <Image
                  width={48}
                  height={48}
                  src={logo}
                  alt={orgName}
                  className="w-full h-full object-contain animate-spin"
                  style={{ animationDuration: "10s" }}
                />
              </div>

              {/* Menu Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Menu className="w-5 h-5 text-white" />
              </div>

              {/* Subtle ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex justify-around items-center py-3 px-4 h-16">
            <div className="flex-1 flex justify-center">
              <Link
                href="/"
                className="flex flex-col items-center text-gray-600 p-2 transition-all duration-300 hover:text-yellow-600 hover:scale-110 group"
              >
                <Home className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Home</span>
              </Link>
            </div>

            <div className="flex-1 flex justify-center">
              <Link
                href="/gallery"
                className="flex flex-col items-center text-gray-600 p-2 transition-all duration-300 hover:text-yellow-600 hover:scale-110 group"
              >
                <Camera className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Gallery</span>
              </Link>
            </div>

            {/* Space for bulging logo - increased size */}
            <div className="flex-none w-16"></div>

            <div className="flex-1 flex justify-center">
              <Link
                href="/about"
                className="flex flex-col items-center text-gray-600 p-2 transition-all duration-300 hover:text-yellow-600 hover:scale-110 group"
              >
                <User className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">About</span>
              </Link>
            </div>

            <div className="flex-1 flex justify-center">
              <Link
                href="/contact"
                className="flex flex-col items-center text-gray-600 p-2 transition-all duration-300 hover:text-yellow-600 hover:scale-110 group"
              >
                <Phone className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Popup - Circular Design */}
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
            isAnimating ? "bg-black/50" : "bg-black/0"
          }`}
          onClick={handleOverlayClick}
        >
          <div
            className={`fixed bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-black/10 rounded-3xl shadow-2xl transition-all duration-300 ease-out ${
              isAnimating
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-full opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with logo and close button */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-black shadow-sm">
                  <Image
                    width={40}
                    height={40}
                    src={logo}
                    alt={orgName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg">{orgName}</h3>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="text-white p-2 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation items with circular design */}
            <div className="px-6 py-4 max-h-80 overflow-y-auto">
              <div className="grid grid-cols-1 gap-2">
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-6 py-4 text-gray-700 font-medium text-base transition-all duration-300 hover:bg-yellow-50 hover:text-yellow-600 hover:scale-105 rounded-2xl border border-transparent hover:border-yellow-200 transform group ${
                        isAnimating
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isAnimating
                          ? `${index * 50}ms`
                          : "0ms",
                      }}
                      onClick={toggleMobileMenu}
                    >
                      <span className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-200 transition-colors duration-300">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-plusJakartaSans">
                          {item.name}
                        </span>
                      </span>
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-sm group-hover:bg-yellow-200 group-hover:scale-110 transition-all duration-300">
                        <Star className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Decorative bottom spacing */}
              <div className="pb-6 pt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-1 bg-yellow-300 rounded-full"></div>
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <div className="w-8 h-1 bg-yellow-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

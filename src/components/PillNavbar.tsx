"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Home, Film, Box, Info, ArrowUpRight, Menu, X, BookOpen, Phone, MapPin } from "lucide-react";
import { nyghtSerif } from "@/lib/fonts";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Gallery", href: "/gallery", icon: Film },
  { label: "Packages", href: "/packages", icon: Box },
  { label: "Journal", href: "/blog", icon: BookOpen },
  { label: "About", href: "/about", icon: Info },
];

export default function PillNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[100] flex justify-center px-2 md:px-6 transition-all duration-500 ${
          isScrolled ? "py-2 md:py-4" : "py-3 md:py-6 lg:py-8"
        } ${hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <div 
          className={`flex w-full max-w-[1600px] items-center justify-between rounded-full px-4 md:px-8 transition-all duration-500 backdrop-blur-md ${
            isScrolled 
              ? "bg-white/60 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-1.5 md:py-2" 
              : "bg-white/20 border border-white/30 shadow-sm py-2 md:py-3"
          }`}
        >
          
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 px-2">
            <Image 
              src="/images/logo.png" 
              alt="Golden Moment Logo" 
              width={140} 
              height={40} 
              className="object-contain h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Nav Links - Scrollable on Mobile */}
          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pr-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  className={`group flex items-center justify-center rounded-full transition-all shrink-0 
                    h-10 w-10 md:h-auto md:w-auto md:px-3 md:py-2 md:gap-2
                    ${
                      isActive
                        ? "bg-white text-[#8a1212] shadow-sm md:shadow-md"
                        : "bg-white/40 md:bg-transparent text-[#8a1212] hover:bg-white/80 md:hover:bg-white/40"
                    }`}
                >
                  <div
                    className={`flex items-center justify-center rounded-full transition-colors 
                      h-full w-full md:h-8 md:w-8 
                      ${
                        isActive 
                          ? "bg-transparent md:bg-red-50 text-[#8a1212]" 
                          : "bg-transparent text-[#8a1212] md:group-hover:bg-white/60"
                      }`}
                  >
                    <Icon size={20} className="md:w-4 md:h-4" />
                  </div>
                  <span className="hidden md:block pr-1 font-bold text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="https://booking.goldenmoment.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#8a1212] px-6 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105"
            >
              Book Now
            </Link>
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0px 0px 0px 0px rgba(26, 26, 26, 0)", 
                  "0px 0px 15px 2px rgba(37, 211, 102, 0.5)", 
                  "0px 0px 0px 0px rgba(26, 26, 26, 0)"
                ] 
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full"
            >
              <Link
                href="https://wa.me/917005526410"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white border border-white/40 transition-transform hover:scale-105"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} className="text-[#1a1a1a]" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "10%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-[200] flex flex-col bg-white/10 backdrop-blur-md px-6 pt-6 pb-12 rounded-b-[40px] shadow-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between gap-2 w-full max-w-sm mx-auto mb-2"
            >
              {/* BOOK NOW Button */}
              <Link
                href="https://booking.goldenmoment.in/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-[1.5] group relative bg-[#8a1212] hover:bg-[#6a0e0e] text-white flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-[2rem] transition-colors"
                style={{ boxShadow: "0 4px 0 0 #5a0c0c" }}
              >
                <span className="font-morganite font-bold tracking-wider text-4xl leading-none pt-1">BOOK NOW</span>
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <ArrowUpRight className="w-6 h-6 text-[#8a1212]" strokeWidth={2.5} />
                </div>
              </Link>

              {/* Phone Button */}
              <Link
                href="tel:+917005526410"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-6 h-6 text-[#8a1212]" fill="currentColor" strokeWidth={0} />
              </Link>

              {/* WhatsApp Button */}
              <Link
                href="https://wa.me/917005526410"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-white shadow-md border-[3px] border-[#25D366] hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </Link>

              {/* Close Button */}
              <button
                className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6 text-[#1a1a1a]" strokeWidth={2} />
              </button>
            </motion.div>

            <nav className="mt-4 flex flex-col w-full max-w-sm mx-auto bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl rounded-[32px] p-2 gap-1">
              {NAV_ITEMS.map((item, i) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex w-full items-center gap-4 rounded-[24px] p-2 transition-all ${
                        isActive 
                          ? "bg-white/80 shadow-sm" 
                          : "bg-transparent hover:bg-white/50"
                      }`}
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors shrink-0 ${
                        isActive ? "bg-[#8a1212] text-white shadow-md" : "bg-white/60 shadow-sm text-[#8a1212]"
                      }`}>
                        <Icon size={22} />
                      </div>
                      <span className={`font-plusJakartaSans text-lg font-bold pr-4 ${isActive ? "text-[#8a1212]" : "text-gray-700"}`}>
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

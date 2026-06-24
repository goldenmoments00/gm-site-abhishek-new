"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Instagram,
  Facebook,
  Youtube,
  MessageCircle as Whatsapp,
} from "lucide-react";

const MagneticButton = ({
  children,
  onClick,
  onDoubleClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  onDoubleClick?: () => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPos = (mouseX - width / 2) * 0.4;
    const yPos = (mouseY - height / 2) * 0.4;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-8 py-3 rounded-full border border-white/30 text-[#FFF6E5] font-medium text-sm lg:text-base tracking-wide overflow-hidden group w-full sm:w-auto"
    >
      <div className="absolute inset-0 bg-[#FFF6E5] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></div>
      <span className="relative z-10 transition-colors duration-500 group-hover:text-[#8a1212]">
        {children}
      </span>
    </motion.button>
  );
};

const MagneticLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPos = (mouseX - width / 2) * 0.4;
    const yPos = (mouseY - height / 2) * 0.4;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-8 py-3 rounded-full border border-white/30 text-[#FFF6E5] font-medium text-sm lg:text-base tracking-wide overflow-hidden group w-full sm:w-auto text-center block"
    >
      <div className="absolute inset-0 bg-[#FFF6E5] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></div>
      <span className="relative z-10 transition-colors duration-500 group-hover:text-[#8a1212]">
        {children}
      </span>
    </motion.a>
  );
};

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("hello@goldenmoment.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailDoubleClick = () => {
    window.location.href = "mailto:hello@goldenmoment.in";
  };

  const socialLinks = [
    { icon: <Instagram size={24} />, href: "https://instagram.com" },
    { icon: <Facebook size={24} />, href: "https://facebook.com" },
    { icon: <Youtube size={24} />, href: "https://youtube.com" },
    { icon: <Whatsapp size={24} />, href: "https://whatsapp.com" },
  ];

  return (
    <footer 
      className="relative w-full text-[#FFF6E5] overflow-hidden pt-36 pb-8 lg:pt-48 lg:pb-12 flex flex-col items-center justify-center bg-transparent"
      style={{
        backgroundImage: "url('/webflow/pictlens/images/footer-bg-pc.png')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center w-full"
      >
        {/* Headings */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#FFF6E5] mb-4 leading-tight">
          Let&apos;s Create Something Beautiful Together
        </h2>
        <p className="text-sm md:text-base text-[#FFF6E5]/80 max-w-2xl mb-8 leading-relaxed">
          Planning your wedding? We&apos;d love to hear your story and craft timeless memories that last forever.
        </p>

        {/* CTA Buttons */}
        <div className="mb-8 w-full flex flex-col items-center">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto justify-center">
            <MagneticLink href="https://booking.goldenmoment.in/">
              Book Us
            </MagneticLink>
            
            <MagneticButton
              onClick={handleEmailClick}
              onDoubleClick={handleEmailDoubleClick}
            >
              {copied ? "Copied!" : "Mail Us"}
            </MagneticButton>
          </div>
          
          <p className="text-[10px] sm:text-xs text-[#FFF6E5]/60 mt-4 uppercase tracking-widest text-center">
            Click Mail Us to copy • Double click to open mail client
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mb-10">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full border border-white/30 text-[#FFF6E5] flex items-center justify-center shadow-lg transition-all hover:bg-[#FFF6E5] hover:text-[#8a1212] hover:shadow-white/30"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 text-[10px] sm:text-xs text-[#FFF6E5]/60 uppercase tracking-widest font-medium">
          <p>© 2026 Golden Moments. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Journal
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import PillNavbar from "@/components/PillNavbar";
import PremiumTimelineTestimonials from "@/components/PremiumTimelineTestimonials";

export default function PictlensPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeDoc, setIframeDoc] = useState<Document | null>(null);

  useEffect(() => {
    const handleLoad = () => {
      try {
        if (iframeRef.current?.contentDocument) {
          const doc = iframeRef.current.contentDocument;
          setIframeDoc(doc);

          // Inject Tailwind CDN if not present so React components render correctly inside iframe
          if (!doc.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
            const script = doc.createElement('script');
            script.src = "https://cdn.tailwindcss.com";
            doc.head.appendChild(script);
          }

          // Inject Next.js styles so fonts and Tailwind work
          const parentStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
          parentStyles.forEach((style) => {
            const clone = style.cloneNode(true);
            doc.head.appendChild(clone);
          });
        }
      } catch (e) {
        console.error("Cannot access iframe content", e);
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", handleLoad);
      // In case it's already loaded
      if (
        iframe.contentDocument &&
        iframe.contentDocument.readyState === "complete"
      ) {
        handleLoad();
      }
    }
    return () => {
      if (iframe) iframe.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFF6E5",
        overflow: "hidden",
      }}
    >
      {/* Transparent navbar overlays the hero so it reads as part of it */}
      <PillNavbar />
      <iframe
        ref={iframeRef}
        src="/pictlens.html?v=83"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          border: "none",
          display: "block",
          backgroundColor: "#FFF6E5",
        }}
        title="Pictlens"
      />
      {iframeDoc &&
        iframeDoc.getElementById("premium-testimonials-root") &&
        createPortal(
          <div className={`${document.documentElement.className} antialiased`}>
            <PremiumTimelineTestimonials />
          </div>,
          iframeDoc.getElementById("premium-testimonials-root")!
        )}
    </div>
  );
}

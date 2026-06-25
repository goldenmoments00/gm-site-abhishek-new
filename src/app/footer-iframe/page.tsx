"use client";

import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";

export default function FooterIframe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reportHeight = () => {
      if (containerRef.current) {
        // Get the actual height of the container content.
        // We do not add a +5 buffer here because adding it to the iframe height
        // causes the document height to expand on the next check, leading to an
        // infinite loop of increasing height (which reveals the black body background).
        const height = containerRef.current.scrollHeight;
        window.parent.postMessage({ type: 'footerHeight', height }, '*');
      }
    };
    
    reportHeight();
    window.addEventListener('resize', reportHeight);
    
    // Report height periodically for the first few seconds to account for images/fonts loading
    const interval = setInterval(reportHeight, 200);
    setTimeout(() => clearInterval(interval), 2000);
    
    return () => {
      window.removeEventListener('resize', reportHeight);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `body { background: transparent !important; }` }} />
      <div ref={containerRef} style={{ backgroundColor: 'transparent', overflow: 'hidden', margin: 0, padding: 0 }}>
        <Footer />
      </div>
    </>
  );
}

"use client";

import PillNavbar from "@/components/PillNavbar";

export default function PictlensPage() {
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
        src="/pictlens.html"
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
    </div>
  );
}

"use client";

import ThroughNavbar from "@/components/ThroughNavbar";

export default function PictlensPage() {
  return (
    <div className="min-h-screen bg-black">
      <ThroughNavbar />
      <iframe
        src="/pictlens.html"
        style={{
          width: "100%",
          height: "calc(100vh - 80px)",
          border: "none",
          display: "block",
        }}
        title="Pictlens"
      />
    </div>
  );
}

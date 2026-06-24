"use client";

import ThroughNavbar from "@/components/ThroughNavbar";

export default function UpdatedAboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0e0e0e",
        overflow: "hidden",
      }}
    >
      <ThroughNavbar />
      <iframe
        src="/updated-about.html"
        style={{
          position: "fixed",
          top: "80px",
          left: 0,
          width: "100%",
          height: "calc(100vh - 80px)",
          border: "none",
          display: "block",
        }}
        title="Our Story"
      />
    </div>
  );
}

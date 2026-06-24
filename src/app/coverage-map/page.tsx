import React from "react";
import CoverageMap2D from "@/components/CoverageMap2D";
import PillNavbar from "@/components/PillNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coverage Map | Golden Moment",
};

export default async function CoverageMapPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';
  return (
    <main className="w-full h-screen m-0 p-0 overflow-x-hidden bg-white">
      {!isEmbed && <PillNavbar />}
      <CoverageMap2D />
    </main>
  );
}

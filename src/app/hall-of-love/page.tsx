import React from "react";
import { Metadata } from "next";
import PillNavbar from "@/components/PillNavbar";
import HallOfLoveClient from "@/components/hall-of-love/HallOfLoveClient";
import { hallOfLovePhotos } from "@/data/hallOfLoveData";

export const metadata: Metadata = {
  title: "Hall of Love | Golden Moments",
  description: "More than 1000 smiles, countless memories, and one beautiful family.",
};

export default function HallOfLovePage() {
  return (
    <>
      <PillNavbar />
      <HallOfLoveClient initialPhotos={hallOfLovePhotos} />
    </>
  );
}

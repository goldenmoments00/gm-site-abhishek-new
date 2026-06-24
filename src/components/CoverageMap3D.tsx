"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, QuadraticBezierLine, Environment, PresentationControls, Float } from "@react-three/drei";
import { Heart } from "lucide-react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const LOCATIONS = [
  { id: "agartala", name: "Agartala", state: "Tripura", weddings: "250+", pos: [2.1, -0.1, 0.5] },
  { id: "guwahati", name: "Guwahati", state: "Assam", weddings: "150+", pos: [2.2, 0.5, 0.5] },
  { id: "shillong", name: "Shillong", state: "Meghalaya", weddings: "100+", pos: [2.0, 0.3, 0.5] },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", weddings: "300+", pos: [1.2, -0.6, 0.5] },
  { id: "patna", name: "Patna", state: "Bihar", weddings: "120+", pos: [0.7, 0.2, 0.5] },
  { id: "deoghar", name: "Deoghar", state: "Jharkhand", weddings: "80+", pos: [1.0, -0.1, 0.5] },
  { id: "delhi", name: "Delhi NCR", state: "Delhi", weddings: "200+", pos: [-0.6, 1.4, 0.5] },
];

const MapPlane = () => {
  const texture = useTexture("/india-map.svg");
  
  return (
    <group position={[0, 0, 0]}>
      {/* Floating 2D Map */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshPhysicalMaterial 
          map={texture}
          transparent={true}
          opacity={0.9}
          roughness={0.2}
          transmission={0.5} /* Glassmorphism effect */
          thickness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Soft Drop Shadow for the Floating effect */}
      <mesh position={[0.3, -0.3, -0.5]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial 
          map={texture}
          transparent={true}
          color="#000000"
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

const Marker = ({ data, isSource, delay }: { data: any; isSource?: boolean; delay: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={data.pos}>
      <Html center zIndexRange={[100, 0]}>
        <div 
          className="relative group cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Strong Glowing pulse behind */}
          <div 
            className="absolute inset-0 bg-[#D90429] rounded-full blur-[8px] opacity-80 w-full h-full scale-150"
            style={{ animation: `pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite ${delay}s` }}
          ></div>
          
          <Heart 
            className={`w-6 h-6 sm:w-8 sm:h-8 text-[#fff] fill-[#D90429] relative z-10 transition-transform duration-300 ${hovered ? 'scale-125' : 'scale-100'}`} 
            style={{ animation: `pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite ${delay}s` }}
          />

          {/* Hover Card */}
          <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-48 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl p-3 text-left transition-all duration-300 pointer-events-none ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <h3 className="font-bold text-lg text-gray-900 mb-1">{data.name}</h3>
            <p className="text-sm text-gray-600">{data.state}</p>
            <div className="mt-2 text-xs font-semibold text-[#D90429] bg-[#D90429]/10 py-1 px-2 rounded-md inline-block">
              {data.weddings} Weddings
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

const Routes = () => {
  const source = LOCATIONS.find(l => l.id === "agartala")!;
  
  return (
    <group>
      {LOCATIONS.filter(l => l.id !== "agartala").map((dest) => (
        <QuadraticBezierLine
          key={dest.id}
          start={source.pos as any}
          end={dest.pos as any}
          mid={[(source.pos[0] + dest.pos[0]) / 2, (source.pos[1] + dest.pos[1]) / 2 + 1, 1]}
          color="#D90429"
          lineWidth={3}
          transparent
          opacity={0.8}
          dashed={true}
          dashScale={10}
          dashSize={2}
          dashOffset={0}
        />
      ))}
    </group>
  );
};

const AnimatedScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Cinematic slow rotation of the entire map
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float rotationIntensity={0.1} floatIntensity={0.2} speed={1.5}>
        <MapPlane />
        <Routes />
        {LOCATIONS.map((loc, index) => (
          <Marker key={loc.id} data={loc} isSource={loc.id === "agartala"} delay={index * 0.2} />
        ))}
      </Float>
    </group>
  );
};

export default function CoverageMap3D() {
  return (
    <div className="w-full h-screen bg-[#fff6e5] relative overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,4,41,0.02)_0%,rgba(255,246,229,1)_70%)] pointer-events-none"></div>

      {/* Header Overlay */}
      <div className="absolute top-10 left-0 w-full text-center z-10 pointer-events-none">
        <h2 className="text-[#1a1a1a] text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-wide mb-4 drop-shadow-sm" style={{ fontFamily: "'Roslindale Testing', serif" }}>
          Capturing Love Across <span className="text-[#D90429]">India</span>
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl font-light tracking-wider max-w-2xl mx-auto px-4">
          1000+ Weddings • 10+ Years • Multi-State Coverage
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, -1, 8], fov: 45 }} className="w-full h-full">
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#D90429" />

        <PresentationControls 
          global 
          rotation={[0.4, -0.1, 0]} 
          polar={[-0.2, 0.2]} 
          azimuth={[-0.2, 0.2]} 
          snap={true}
        >
          <AnimatedScene />
        </PresentationControls>
      </Canvas>

      {/* Stats Bottom Overlay */}
      <div className="absolute bottom-10 w-full flex justify-center z-10 pointer-events-none">
        <div className="flex gap-4 sm:gap-12 flex-wrap justify-center px-4">
          {[
            { value: "1000+", label: "Weddings Captured" },
            { value: "10+", label: "Years Experience" },
            { value: "7", label: "Major Regions" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl px-6 py-4 text-center min-w-[140px]">
              <div className="text-3xl font-bold text-[#1a1a1a] mb-1">{stat.value}</div>
              <div className="text-xs text-[#D90429] uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

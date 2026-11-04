"use client";

import React, { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

interface PlanetLabelProps {
  name: string;
  color: string;
  yOffset: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export function PlanetLabel({ name, color, yOffset, isSelected, onClick }: PlanetLabelProps) {
  const { gl } = useThree();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (gl?.domElement?.parentElement) {
      setReady(true);
    }
  }, [gl]);

  if (!ready || !gl?.domElement?.parentElement) {
    return null;
  }

  return (
    <Html
      position={[0, yOffset, 0]}
      center
      distanceFactor={32}
      className="pointer-events-none select-none"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        className={`pointer-events-auto cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono tracking-wider transition-all duration-200 backdrop-blur-md whitespace-nowrap ${
          isSelected
            ? "border-cyan-400 bg-[#061e2d] text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.6)] scale-110"
            : "border-cyan-500/30 bg-black/85 text-slate-100 hover:border-cyan-400 hover:text-cyan-300 shadow-[0_0_10px_rgba(0,0,0,0.6)]"
        }`}
      >
        <span
          className="w-2 h-2 rounded-full inline-block shrink-0 animate-pulse"
          style={{ backgroundColor: color }}
        />
        <span>{name}</span>
      </button>
    </Html>
  );
}

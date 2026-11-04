"use client";

import React from "react";
import { Html } from "@react-three/drei";

interface PlanetLabelProps {
  name: string;
  color: string;
  yOffset: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export function PlanetLabel({ name, color, yOffset, isSelected, onClick }: PlanetLabelProps) {
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
            : "border-[var(--border)] bg-[#090D16]/90 text-[var(--foreground)] hover:border-violet-500 hover:text-violet-300 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
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

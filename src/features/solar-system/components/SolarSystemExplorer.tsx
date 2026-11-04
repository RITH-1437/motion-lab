"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Maximize2, Minimize2, Orbit } from "lucide-react";
import { SolarSystemScene } from "./SolarSystemScene";
import { CelestialNavList } from "./CelestialNavList";
import { PlanetInfoPanel } from "./PlanetInfoPanel";
import { SimulationControls } from "./SimulationControls";
import { useSolarSimulation } from "../hooks/useSolarSimulation";
import { PLANETS_DATA } from "../config/planets";

export function SolarSystemExplorer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { config } = useSolarSimulation();
  const { selectedPlanetId } = config;

  const currentPlanet =
    PLANETS_DATA.find((p) => p.id === selectedPlanetId) || PLANETS_DATA[0];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full h-[85vh] rounded-2xl border border-[var(--border)] bg-[#030712] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
          Initializing Orbital Mechanics Engine...
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[88vh] min-h-[640px] rounded-3xl border border-[var(--border)] bg-[#030712] overflow-hidden select-none flex flex-col shadow-2xl ${
        isFullscreen ? "fixed inset-0 z-50 h-screen rounded-none" : ""
      }`}
    >
      {/* Top Futuristic Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface-elevated)]/90 backdrop-blur-md pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl border border-cyan-400/50 bg-cyan-950/60 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
            <Orbit className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                MOTION LAB
              </span>
              <span className="text-[10px] font-mono text-[var(--muted)]">/</span>
              <span className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                SOLAR SYSTEM EXPLORER
              </span>
            </div>
            <p className="text-[10px] text-[var(--muted)] hidden sm:block">
              Photorealistic 3D Planetary Simulator &amp; Earth Atmosphere Lab
            </p>
          </div>
        </div>

        {/* Target Body Status & Fullscreen Toggle */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl border border-[var(--border)] bg-[var(--card)]/80 text-xs font-mono">
            <span className="text-[var(--muted)]">FOCUS:</span>
            <span
              className="font-bold flex items-center gap-1.5"
              style={{ color: currentPlanet.color }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block animate-pulse"
                style={{ backgroundColor: currentPlanet.color }}
              />
              {currentPlanet.name}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-cyan-400 hover:text-cyan-400 transition-colors shadow-sm"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main 3D Canvas Viewport */}
      <div className="relative w-full h-full flex-1">
        <Canvas
          camera={{ position: [0, 45, 65], fov: 45, near: 0.1, far: 1200 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <color attach="background" args={["#030712"]} />
          <Suspense fallback={null}>
            <SolarSystemScene />
          </Suspense>
        </Canvas>

        {/* UI Overlay: Left Sidebar Navigation */}
        <div className="absolute top-16 bottom-20 left-4 z-20 pointer-events-none flex items-stretch">
          <CelestialNavList />
        </div>

        {/* UI Overlay: Right Sidebar Info Panel */}
        <div className="absolute top-16 bottom-20 right-4 z-20 pointer-events-none flex items-stretch">
          <PlanetInfoPanel />
        </div>

        {/* UI Overlay: Bottom Playback & Simulation Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex justify-center">
          <SimulationControls />
        </div>
      </div>
    </div>
  );
}

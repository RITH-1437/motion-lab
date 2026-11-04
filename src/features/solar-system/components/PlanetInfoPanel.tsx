"use client";

import React, { useState } from "react";
import {
  Info,
  ChevronRight,
  ChevronLeft,
  Compass,
  Thermometer,
  Layers,
  RotateCw,
  Orbit,
  Sparkles,
  Globe,
} from "lucide-react";
import { useSolarSimulation } from "../hooks/useSolarSimulation";
import { PLANETS_DATA } from "../config/planets";

interface PlanetInfoPanelProps {
  className?: string;
}

export function PlanetInfoPanel({ className = "" }: PlanetInfoPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { config, selectPlanet, updateConfig } = useSolarSimulation();
  const { selectedPlanetId, showClouds, showAtmosphere, showMoons } = config;

  const currentPlanet =
    PLANETS_DATA.find((p) => p.id === selectedPlanetId) || PLANETS_DATA[0];

  const isEarth = currentPlanet.id === "earth";

  return (
    <aside
      className={`relative z-20 flex flex-col transition-all duration-300 pointer-events-auto ${
        isCollapsed ? "w-12" : "w-80 md:w-96"
      } ${className}`}
    >
      <div className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-3.5 border-b border-[var(--border)] bg-[var(--muted)]/5">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            title={isCollapsed ? "Expand planet info" : "Collapse panel"}
            aria-label={isCollapsed ? "Expand planet info" : "Collapse panel"}
          >
            {isCollapsed ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px]"
                style={{
                  backgroundColor: currentPlanet.color,
                  boxShadow: `0 0 10px ${currentPlanet.color}`,
                }}
              />
              <span className="text-xs font-mono font-bold tracking-widest text-[var(--foreground)] uppercase">
                Planetary Intelligence
              </span>
            </div>
          )}

          {!isCollapsed && (
            <div className="w-6" /> // spacer
          )}
        </div>

        {/* Content Body */}
        {isCollapsed ? (
          <div className="flex-1 flex flex-col items-center justify-center p-2">
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-cyan-400 hover:border-cyan-400 transition-colors"
              title="Open Planet Details"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {/* Title & Badge */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                  {currentPlanet.name}
                </h3>
                <span className="text-xs font-mono text-cyan-400 tracking-wider">
                  {currentPlanet.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => selectPlanet(currentPlanet.id)}
                className="px-2.5 py-1 text-xs font-mono rounded-lg border border-cyan-400 bg-cyan-950/80 text-cyan-300 hover:bg-cyan-900/80 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.2)]"
              >
                Focus Target
              </button>
            </div>

            {/* Earth Explorer Special Features Panel */}
            {isEarth && (
              <div className="p-3 rounded-xl border border-cyan-500/40 bg-cyan-950/20 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold font-mono tracking-wider">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>EARTH EXPLORER CONTROLS</span>
                </div>
                <p className="text-[11px] text-[var(--muted)]">
                  Standalone high-detail mode featuring Rayleigh atmospheric scattering, live cloud dynamics, and day/night city lights.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => updateConfig({ showClouds: !showClouds })}
                    className={`px-2 py-1.5 rounded-lg border text-[11px] font-mono font-medium transition-all ${
                      showClouds
                        ? "border-cyan-400 bg-cyan-950/90 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                        : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:border-cyan-400"
                    }`}
                  >
                    Clouds {showClouds ? "ON" : "OFF"}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateConfig({ showAtmosphere: !showAtmosphere })}
                    className={`px-2 py-1.5 rounded-lg border text-[11px] font-mono font-medium transition-all ${
                      showAtmosphere
                        ? "border-cyan-400 bg-cyan-950/90 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                        : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:border-cyan-400"
                    }`}
                  >
                    Aura {showAtmosphere ? "ON" : "OFF"}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateConfig({ showMoons: !showMoons })}
                    className={`px-2 py-1.5 rounded-lg border text-[11px] font-mono font-medium transition-all ${
                      showMoons
                        ? "border-cyan-400 bg-cyan-950/90 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                        : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:border-cyan-400"
                    }`}
                  >
                    Moon {showMoons ? "ON" : "OFF"}
                  </button>
                </div>
              </div>
            )}

            {/* Scientific Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/90 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--muted)]">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-mono uppercase">Diameter</span>
                </div>
                <p className="font-mono font-semibold text-[var(--foreground)]">
                  {currentPlanet.diameterKm.toLocaleString()} km
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/90 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--muted)]">
                  <Orbit className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-[10px] font-mono uppercase">Distance</span>
                </div>
                <p className="font-mono font-semibold text-[var(--foreground)]">
                  {currentPlanet.realDistanceMillionKm === 0
                    ? "Center"
                    : `${currentPlanet.realDistanceMillionKm.toLocaleString()}M km`}
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/90 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--muted)]">
                  <RotateCw className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-[10px] font-mono uppercase">Day Length</span>
                </div>
                <p className="font-mono font-semibold text-[var(--foreground)]">
                  {Math.abs(currentPlanet.rotationPeriodHours)} hrs
                  {currentPlanet.rotationPeriodHours < 0 ? " (Retrograde)" : ""}
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/90 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--muted)]">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-mono uppercase">Orbital Period</span>
                </div>
                <p className="font-mono font-semibold text-[var(--foreground)]">
                  {currentPlanet.orbitalPeriodDays === 0
                    ? "N/A"
                    : `${currentPlanet.orbitalPeriodDays.toLocaleString()} days`}
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/90 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--muted)]">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-[10px] font-mono uppercase">Avg Temp</span>
                </div>
                <p className="font-mono font-semibold text-[var(--foreground)]">
                  {currentPlanet.avgTempC > 0 ? `+${currentPlanet.avgTempC}` : currentPlanet.avgTempC}°C
                </p>
              </div>

              <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/90 space-y-1">
                <div className="flex items-center gap-1.5 text-[var(--muted)]">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-mono uppercase">Known Moons</span>
                </div>
                <p className="font-mono font-semibold text-[var(--foreground)]">
                  {currentPlanet.moonsCount} moons
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-mono uppercase text-[var(--muted)] font-medium">
                Overview
              </h4>
              <p className="text-xs text-[var(--foreground)]/90 leading-relaxed">
                {currentPlanet.description}
              </p>
            </div>

            {/* Fun Facts */}
            {currentPlanet.funFacts && currentPlanet.funFacts.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                <h4 className="text-[11px] font-mono uppercase text-[var(--muted)] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Astronomical Discoveries
                </h4>
                <ul className="space-y-2">
                  {currentPlanet.funFacts.map((fact, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-[var(--foreground)]/80 flex items-start gap-2 bg-[var(--muted)]/5 p-2 rounded-lg border border-[var(--border)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                      <span className="leading-snug">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Bottom Bar */}
        {!isCollapsed && (
          <div className="p-3 border-t border-[var(--border)] bg-[var(--muted)]/5 flex gap-2">
            <button
              type="button"
              onClick={() => selectPlanet("sun")}
              className="flex-1 py-2 text-xs font-mono font-semibold rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-violet-500 hover:text-violet-400 transition-colors"
            >
              Return to Sun
            </button>
            <button
              type="button"
              onClick={() => selectPlanet("earth")}
              className="flex-1 py-2 text-xs font-mono font-semibold rounded-xl border border-cyan-400 bg-cyan-950/80 text-cyan-300 hover:bg-cyan-900/80 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.2)]"
            >
              Explore Earth
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

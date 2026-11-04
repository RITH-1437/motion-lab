"use client";

import React, { useState } from "react";
import {
  Sun,
  Globe,
  Orbit,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PLANETS_DATA } from "../config/planets";
import { CelestialId } from "../types";
import { useSolarSimulation } from "../hooks/useSolarSimulation";

interface CelestialNavListProps {
  className?: string;
}

export function CelestialNavList({ className = "" }: CelestialNavListProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { config, selectPlanet } = useSolarSimulation();
  const { selectedPlanetId } = config;

  const getIcon = (id: CelestialId) => {
    switch (id) {
      case "sun":
        return <Sun className="w-4 h-4 text-amber-400 shrink-0" />;
      case "earth":
        return <Globe className="w-4 h-4 text-cyan-400 shrink-0" />;
      case "asteroids":
        return <Sparkles className="w-4 h-4 text-zinc-400 shrink-0" />;
      default:
        return <Orbit className="w-4 h-4 text-violet-400 shrink-0" />;
    }
  };

  return (
    <aside
      className={`relative z-20 flex flex-col transition-all duration-300 pointer-events-auto ${
        isCollapsed ? "w-12" : "w-64"
      } ${className}`}
    >
      <div className="flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-3 border-b border-[var(--border)] bg-[var(--muted)]/5">
          {!isCollapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
              <span className="text-xs font-mono font-bold tracking-widest text-[var(--foreground)] uppercase">
                Celestial Bodies
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            title={isCollapsed ? "Expand celestial list" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand celestial list" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Celestial Items List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {PLANETS_DATA.map((planet) => {
            const isSelected = selectedPlanetId === planet.id;

            return (
              <button
                key={planet.id}
                type="button"
                onClick={() => selectPlanet(planet.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all duration-150 ${
                  isSelected
                    ? "border border-cyan-400 bg-cyan-500/10 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                    : "border border-transparent text-[var(--foreground)] hover:border-[var(--border)] hover:bg-[var(--muted)]/10"
                }`}
                title={planet.name}
              >
                {/* Visual Accent Dot / Icon */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-[var(--border)] bg-[#090D16]"
                  style={{
                    borderColor: isSelected ? "#22D3EE" : undefined,
                  }}
                >
                  {getIcon(planet.id)}
                </div>

                {/* Body Details */}
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium truncate">{planet.name}</p>
                      {planet.id === "earth" && (
                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border border-cyan-400 bg-cyan-950/80 text-cyan-300">
                          Priority
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[var(--muted)] truncate">
                      {planet.category}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Quick Status */}
        {!isCollapsed && (
          <div className="p-3 border-t border-[var(--border)] bg-[var(--muted)]/5 text-[10px] font-mono text-[var(--muted)] flex items-center justify-between">
            <span>9 ORBITS</span>
            <span className="text-cyan-400 font-bold">SOL SYSTEM</span>
          </div>
        )}
      </div>
    </aside>
  );
}

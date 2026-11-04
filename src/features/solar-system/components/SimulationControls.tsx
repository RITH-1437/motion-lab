"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
} from "lucide-react";
import { useSolarSimulation } from "../hooks/useSolarSimulation";
import { SimulationConfig } from "../types";

interface SimulationControlsProps {
  className?: string;
}

export function SimulationControls({ className = "" }: SimulationControlsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { config, setPlaying, setSpeed, updateConfig, resetSimulation, applyPreset } =
    useSolarSimulation();

  const {
    isPlaying,
    simulationSpeed,
    orbitSpacing,
    planetScale,
    showOrbits,
    showLabels,
    showStars,
    showAsteroidBelt,
    showAtmosphere,
    showRings,
    viewPreset,
  } = config;

  const presets: { id: SimulationConfig["viewPreset"]; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "🌌" },
    { id: "cinematic", label: "Cinematic", icon: "🎬" },
    { id: "earth", label: "Earth Detail", icon: "🌍" },
    { id: "inner", label: "Inner System", icon: "☀️" },
    { id: "outer", label: "Outer Giants", icon: "🪐" },
  ];

  return (
    <div
      className={`relative z-20 flex flex-col items-center w-full max-w-4xl mx-auto pointer-events-auto transition-all duration-300 ${className}`}
    >
      <div className="w-full flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)]/85 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Advanced Slider Trays & Visual Toggles (Expandable) */}
        {showAdvanced && (
          <div className="p-4 border-b border-[var(--border)] bg-[var(--muted)]/5 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Speed Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--muted)]">Sim Speed</span>
                  <span className="text-cyan-400 font-semibold">{simulationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={simulationSpeed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-[#1F2937] rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--muted)]">
                  <button
                    type="button"
                    onClick={() => setSpeed(0.5)}
                    className="hover:text-cyan-400"
                  >
                    0.5x
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpeed(1.0)}
                    className="hover:text-cyan-400 font-bold text-cyan-300"
                  >
                    1.0x
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpeed(2.0)}
                    className="hover:text-cyan-400"
                  >
                    2.0x
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpeed(4.0)}
                    className="hover:text-cyan-400"
                  >
                    4.0x
                  </button>
                </div>
              </div>

              {/* Orbit Spacing Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--muted)]">Orbit Spacing</span>
                  <span className="text-violet-400 font-semibold">{orbitSpacing.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.8"
                  step="0.05"
                  value={orbitSpacing}
                  onChange={(e) => updateConfig({ orbitSpacing: parseFloat(e.target.value) })}
                  className="w-full accent-violet-400 cursor-pointer h-1.5 bg-[#1F2937] rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--muted)]">
                  <span>Dense</span>
                  <span>Expanded</span>
                </div>
              </div>

              {/* Planet Visual Scale */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--muted)]">Body Scale</span>
                  <span className="text-pink-400 font-semibold">{planetScale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.2"
                  step="0.1"
                  value={planetScale}
                  onChange={(e) => updateConfig({ planetScale: parseFloat(e.target.value) })}
                  className="w-full accent-pink-400 cursor-pointer h-1.5 bg-[#1F2937] rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--muted)]">
                  <span>Compact</span>
                  <span>Enlarged</span>
                </div>
              </div>
            </div>

            {/* Extra Visual Toggles */}
            <div className="pt-2 border-t border-[var(--border)] flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[var(--muted)] text-[11px] uppercase mr-1">Toggles:</span>
              <button
                type="button"
                onClick={() => updateConfig({ showStars: !showStars })}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  showStars
                    ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300"
                    : "border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                Stars: {showStars ? "ON" : "OFF"}
              </button>
              <button
                type="button"
                onClick={() => updateConfig({ showAtmosphere: !showAtmosphere })}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  showAtmosphere
                    ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300"
                    : "border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                Atmosphere: {showAtmosphere ? "ON" : "OFF"}
              </button>
              <button
                type="button"
                onClick={() => updateConfig({ showRings: !showRings })}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  showRings
                    ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300"
                    : "border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                Rings: {showRings ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        )}

        {/* Primary Controls Row */}
        <div className="p-2.5 md:p-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPlaying(!isPlaying)}
              className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
                isPlaying
                  ? "border-cyan-400 bg-cyan-600 text-white dark:bg-cyan-950/80 dark:text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-cyan-400"
              }`}
              title={isPlaying ? "Pause Simulation" : "Play Simulation"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={resetSimulation}
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:border-rose-400 hover:text-rose-400 transition-colors"
              title="Reset Simulation & Camera"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Quick Speed Pills */}
            <div className="hidden sm:flex items-center gap-1 bg-[var(--muted)]/5 p-1 rounded-xl border border-[var(--border)] text-[11px] font-mono">
              {[0.5, 1.0, 2.0].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-0.5 rounded-lg transition-colors ${
                    simulationSpeed === s
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Center: Presets */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {presets.map((preset) => {
              const active = viewPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-150 ${
                    active
                      ? "border border-cyan-400 bg-cyan-600 text-white dark:bg-cyan-950/80 dark:text-cyan-300 font-semibold shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                      : "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-cyan-400/50"
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span className="hidden md:inline">{preset.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Quick Toggles & Expand Tray */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => updateConfig({ showOrbits: !showOrbits })}
              className={`p-1.5 rounded-lg border text-[11px] font-mono transition-colors ${
                showOrbits
                  ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300"
                  : "border-[var(--border)] text-[var(--muted)]"
              }`}
              title="Toggle Orbit Lines"
            >
              Orbits
            </button>

            <button
              type="button"
              onClick={() => updateConfig({ showLabels: !showLabels })}
              className={`p-1.5 rounded-lg border text-[11px] font-mono transition-colors ${
                showLabels
                  ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300"
                  : "border-[var(--border)] text-[var(--muted)]"
              }`}
              title="Toggle Planet Labels"
            >
              Labels
            </button>

            <button
              type="button"
              onClick={() => updateConfig({ showAsteroidBelt: !showAsteroidBelt })}
              className={`p-1.5 rounded-lg border text-[11px] font-mono transition-colors ${
                showAsteroidBelt
                  ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300"
                  : "border-[var(--border)] text-[var(--muted)]"
              }`}
              title="Toggle Asteroid Belt"
            >
              Belt
            </button>

            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2 rounded-xl border transition-colors ${
                showAdvanced
                  ? "border-cyan-400 bg-cyan-950/80 text-cyan-300"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:border-cyan-400 hover:text-cyan-300"
              }`}
              title="Toggle Advanced Parameters"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

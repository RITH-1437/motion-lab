"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { usePlaygroundStore, PRESETS } from "@/store/usePlaygroundStore";
import { DynamicSceneCanvas } from "@/engine/three/DynamicCanvas";
import { Badge } from "@/components/ui/Badge";

const DynamicSolarSystemExplorer = dynamic(
  () =>
    import("@/features/solar-system").then((mod) => mod.SolarSystemExplorer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[85vh] rounded-2xl border border-[var(--border)] bg-[#030712] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
          Initializing Orbital Mechanics Engine...
        </p>
      </div>
    ),
  }
);
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  Layers,
  Sparkles,
  Camera,
  Sun,
  Maximize2,
  Minimize2,
  Check,
  Loader2,
} from "lucide-react";

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const presetQuery = searchParams.get("preset");

  const {
    currentPreset,
    config,
    isPlaying,
    setPreset,
    updateConfig,
    resetConfig,
    setIsPlaying,
  } = usePlaygroundStore();

  const [activeTab, setActiveTab] = useState<"geometry" | "particles" | "lighting" | "camera">("geometry");
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync URL query preset if present
  useEffect(() => {
    if (presetQuery) {
      const match = PRESETS.find((p) => p.id === presetQuery);
      if (match) setPreset(match);
    }
  }, [presetQuery, setPreset]);

  const handleExportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      preset: currentPreset.id,
      timestamp: new Date().toISOString(),
      config,
    }, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `motion-lab-${currentPreset.id}-config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`relative w-full ${isFullscreen ? "fixed inset-0 z-50 bg-canvas-dark" : "min-h-[calc(100vh-4rem)]"} flex flex-col`}>
      
      {/* Top Action Control Toolbar */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 z-20">
        
        {/* Preset Selector Dropdown & Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]">
            <button
              type="button"
              onClick={() => {
                const solar = PRESETS.find((p) => p.id === "solar-system");
                if (solar) setPreset(solar);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                currentPreset.id === "solar-system"
                  ? "border border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              🪐 Solar System Explorer
            </button>
            <button
              type="button"
              onClick={() => {
                const torus = PRESETS.find((p) => p.id === "torus-quantum") || PRESETS[1];
                if (torus) setPreset(torus);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                currentPreset.id !== "solar-system"
                  ? "border border-violet-500 bg-violet-950/80 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              🔬 Animation Labs
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="preset-select" className="text-xs font-mono uppercase text-[var(--muted)]">
              Lab:
            </label>
            <select
              id="preset-select"
              value={currentPreset.id}
              onChange={(e) => {
                const selected = PRESETS.find((p) => p.id === e.target.value);
                if (selected) setPreset(selected);
              }}
              className="px-3 py-1.5 rounded-lg glass-panel border border-[var(--border)] text-xs font-mono text-[var(--foreground)] bg-[var(--surface-elevated)] focus:outline-none focus:border-accent-cyan cursor-pointer"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id} className="bg-[var(--surface)] text-[var(--foreground)]">
                  {p.name} ({p.categoryLabel})
                </option>
              ))}
            </select>
            <Badge variant="cyan">{currentPreset.categoryLabel}</Badge>
          </div>
        </div>

        {/* Global Playback & Reset Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-lg glass-button text-xs font-mono text-[var(--foreground)] flex items-center gap-1.5 hover:border-accent-cyan transition-all"
            title={isPlaying ? "Pause simulation" : "Play simulation"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-500" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={resetConfig}
            className="px-3 py-1.5 rounded-lg glass-button text-xs font-mono text-[var(--foreground)] flex items-center gap-1.5"
            title="Reset settings to factory defaults"
          >
            <RotateCcw className="w-3.5 h-3.5 text-accent-pink" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleExportConfig}
            className="px-3 py-1.5 rounded-lg glass-button text-xs font-mono text-[var(--foreground)] flex items-center gap-1.5"
            title="Export JSON Configuration"
          >
            <Download className="w-3.5 h-3.5 text-accent-violet" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleShare}
            className="px-3 py-1.5 rounded-lg glass-button text-xs font-mono text-[var(--foreground)] flex items-center gap-1.5"
            title="Share Configuration Link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg glass-button text-[var(--foreground)]"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Studio Body */}
      {currentPreset.id === "solar-system" ? (
        <div className="flex-1 p-2 sm:p-4 bg-[#030712] flex flex-col">
          <DynamicSolarSystemExplorer />
        </div>
      ) : (
        <div className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
          {/* Center: 3D Viewport Canvas */}
          <div className="flex-1 relative min-h-[450px] lg:min-h-0 bg-canvas-dark flex items-center justify-center">
          
          <DynamicSceneCanvas
            presetId={currentPreset.id}
            config={config}
            isPlaying={isPlaying}
            enableOrbit={true}
            showParticles={true}
            autoRotate={false}
          />

          {/* Floating Viewport HUD stats (bottom left) */}
          <div className="absolute bottom-6 left-6 z-10 pointer-events-none flex flex-col gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-[var(--card-bg)] backdrop-blur-md border border-[var(--border)] text-[var(--foreground)] flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                60 FPS
              </span>
              <span className="text-[var(--muted)]">|</span>
              <span>Points: {config.particleCount}</span>
              <span className="text-[var(--muted)]">|</span>
              <span>Scale: {config.scale.toFixed(1)}x</span>
            </div>

            <div className="px-3 py-1 rounded bg-[var(--card-bg)] backdrop-blur-sm text-[11px] text-[var(--muted)] border border-[var(--border)]">
              {currentPreset.instructions}
            </div>
          </div>
        </div>

        {/* Right Floating Control Inspector Panel */}
        <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl flex flex-col z-20">
          
          {/* Tabs Navigation */}
          <div className="grid grid-cols-4 border-b border-[var(--border)] text-xs font-mono">
            {[
              { id: "geometry", label: "Mesh", icon: Layers },
              { id: "particles", label: "Physics", icon: Sparkles },
              { id: "lighting", label: "Lights", icon: Sun },
              { id: "camera", label: "Scene", icon: Camera },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(
                      tab.id as "geometry" | "particles" | "lighting" | "camera"
                    )
                  }
                  className={`py-3 flex flex-col items-center gap-1 transition-all ${
                    isActive
                      ? "text-accent-cyan border-b-2 border-accent-cyan bg-accent-cyan/10"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-black/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Controls Container */}
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-14rem)] space-y-6 text-xs font-mono">
            
            {/* GEOMETRY & MESH TAB */}
            {activeTab === "geometry" && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Mesh Scale</span>
                    <span className="text-accent-cyan">{config.scale.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.05"
                    value={config.scale}
                    onChange={(e) => updateConfig({ scale: parseFloat(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Rotation Velocity</span>
                    <span className="text-accent-cyan">{config.rotationSpeed.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="3.0"
                    step="0.1"
                    value={config.rotationSpeed}
                    onChange={(e) => updateConfig({ rotationSpeed: parseFloat(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Animation Speed</span>
                    <span className="text-accent-cyan">{config.speed.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3.0"
                    step="0.1"
                    value={config.speed}
                    onChange={(e) => updateConfig({ speed: parseFloat(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />
                </div>

                <div className="pt-2 border-t border-white/5 space-y-4">
                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Roughness</span>
                    <span className="text-accent-cyan">{config.roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.02"
                    value={config.roughness}
                    onChange={(e) => updateConfig({ roughness: parseFloat(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />

                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Metalness</span>
                    <span className="text-accent-cyan">{config.metalness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.02"
                    value={config.metalness}
                    onChange={(e) => updateConfig({ metalness: parseFloat(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[var(--foreground)]">Wireframe Mesh</span>
                    <button
                      onClick={() => updateConfig({ wireframe: !config.wireframe })}
                      className={`px-3 py-1 rounded text-xs transition-colors ${
                        config.wireframe
                          ? "bg-accent-violet text-white font-bold"
                          : "bg-[var(--surface-elevated)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
                      }`}
                    >
                      {config.wireframe ? "ENABLED" : "DISABLED"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PARTICLES & PHYSICS TAB */}
            {activeTab === "particles" && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Particle Density</span>
                    <span className="text-accent-cyan">{config.particleCount}</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="4000"
                    step="100"
                    value={config.particleCount}
                    onChange={(e) => updateConfig({ particleCount: parseInt(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Harmonic Distortion</span>
                    <span className="text-accent-cyan">{config.distortion.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="2.0"
                    step="0.05"
                    value={config.distortion}
                    onChange={(e) => updateConfig({ distortion: parseFloat(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Force Intensity</span>
                    <span className="text-accent-cyan">{config.intensity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={config.intensity}
                    onChange={(e) => updateConfig({ intensity: parseFloat(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* LIGHTING & PALETTE TAB */}
            {activeTab === "lighting" && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Lighting Brightness</span>
                    <span className="text-accent-cyan">{config.lightIntensity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.5"
                    step="0.1"
                    value={config.lightIntensity}
                    onChange={(e) => updateConfig({ lightIntensity: parseFloat(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />
                </div>

                <div className="pt-2 border-t border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--foreground)]">Primary Color</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                        className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-400">{config.primaryColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[var(--foreground)]">Secondary Accent</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.secondaryColor}
                        onChange={(e) => updateConfig({ secondaryColor: e.target.value })}
                        className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-400">{config.secondaryColor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[var(--foreground)]">Highlight Tint</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.accentColor}
                        onChange={(e) => updateConfig({ accentColor: e.target.value })}
                        className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-400">{config.accentColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CAMERA & SCENE TAB */}
            {activeTab === "camera" && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-[var(--foreground)] mb-1.5">
                    <span>Field of View (FOV)</span>
                    <span className="text-accent-cyan">{config.cameraFov}°</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="90"
                    step="1"
                    value={config.cameraFov}
                    onChange={(e) => updateConfig({ cameraFov: parseInt(e.target.value) })}
                    className="w-full accent-accent-cyan cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] space-y-2 text-[var(--muted)]">
                  <p className="font-semibold text-[var(--foreground)]">Camera Shortcuts:</p>
                  <p>• Left-click drag to orbit camera around target</p>
                  <p>• Scroll wheel to zoom in / out</p>
                  <p>• Double-click to reset angle</p>
                </div>
              </div>
            )}

          </div>
        </aside>

      </div>
      )}
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-3 bg-canvas-dark text-slate-400 font-mono text-xs">
          <Loader2 className="w-6 h-6 text-accent-cyan animate-spin" />
          <span>Loading Motion Lab Playground...</span>
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}

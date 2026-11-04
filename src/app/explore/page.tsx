"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PRESETS } from "@/store/usePlaygroundStore";
import { DynamicSceneCanvas } from "@/engine/three/DynamicCanvas";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  Sliders,
  Code2,
  Sparkles,
  HelpCircle,
  Eye,
  Filter,
} from "lucide-react";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewPresetId, setPreviewPresetId] = useState<string | null>(null);

  const filteredPresets = useMemo(() => {
    return PRESETS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activePreviewPreset = useMemo(
    () => PRESETS.find((p) => p.id === previewPresetId) || null,
    [previewPresetId]
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-12 space-y-4">
        <Badge variant="cyan">Interactive Gallery</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-mono uppercase tracking-tight text-white">
          Explore Animation Labs
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          A curated taxonomy of spatial 3D meshes, particle physics, liquid shaders, and kinetic typography.
          Click any experiment to inspect in the live 3D playground or edit code in Monaco.
        </p>

        {/* Search & Category Filter Bar */}
        <div className="pt-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search experiments, tags (e.g. GLSL, R3F, Physics)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel border border-white/10 text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-accent-cyan/50"
            />
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-accent-violet" />
            <span>Showing {filteredPresets.length} of {PRESETS.length} Experiments</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              selectedCategory === "all"
                ? "bg-accent-cyan text-canvas-dark font-bold shadow-glow-cyan"
                : "glass-button text-slate-400 hover:text-white"
            }`}
          >
            All Labs
          </button>
          {siteConfig.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? "bg-accent-violet text-white font-bold shadow-glow"
                  : "glass-button text-slate-400 hover:text-white"
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Experiments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPresets.map((preset, idx) => (
          <GlassCard
            key={preset.id}
            glow={idx % 2 === 0 ? "cyan" : "violet"}
            className="flex flex-col justify-between group"
          >
            <div>
              {/* Card Thumbnail / Mini Viewport */}
              <div className="h-44 rounded-xl bg-canvas-dark/60 border border-white/5 relative overflow-hidden mb-5">
                <DynamicSceneCanvas
                  presetId={preset.id}
                  config={preset.config}
                  isPlaying={true}
                  enableOrbit={false}
                  showParticles={true}
                  autoRotate={true}
                />
                <div className="absolute top-2.5 right-2.5">
                  <Badge variant="cyan">{preset.categoryLabel}</Badge>
                </div>
                <button
                  onClick={() => setPreviewPresetId(preset.id)}
                  className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-slate-300 hover:text-white backdrop-blur-md border border-white/10 text-xs font-mono flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-accent-cyan" />
                  <span>Preview</span>
                </button>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold font-mono text-white group-hover:text-accent-cyan transition-colors mb-2">
                {preset.name}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {preset.description}
              </p>

              {/* Interaction instructions */}
              <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-mono text-slate-400 flex items-start gap-2 mb-4">
                <HelpCircle className="w-3.5 h-3.5 text-accent-cyan flex-shrink-0 mt-0.5" />
                <span>{preset.instructions}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {preset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
              <Link
                href={`/playground?preset=${preset.id}`}
                className="flex-1 py-2 rounded-lg text-center font-mono text-xs uppercase tracking-wider font-semibold bg-accent-violet text-white border border-accent-cyan/40 shadow-glow hover:bg-accent-violet/90 hover:shadow-[0_0_18px_rgba(139,92,246,0.6)] transition-all flex items-center justify-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Playground</span>
              </Link>

              <Link
                href={`/editor?preset=${preset.id}`}
                className="py-2 px-3 rounded-lg font-mono text-xs uppercase tracking-wider glass-button text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-accent-pink" />
                <span>Editor</span>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredPresets.length === 0 && (
        <div className="text-center py-24 glass-panel rounded-3xl border border-white/10 max-w-md mx-auto">
          <Sparkles className="w-10 h-10 text-accent-cyan mx-auto mb-3 animate-pulse" />
          <h3 className="font-mono text-lg font-bold text-white mb-1">No experiments found</h3>
          <p className="text-slate-400 text-xs font-mono">
            Try adjusting your query or resetting category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-1.5 rounded-lg font-mono text-xs bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Quick Preview Modal */}
      {activePreviewPreset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full rounded-2xl glass-panel border border-white/20 overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-mono text-lg font-bold text-white">
                  {activePreviewPreset.name}
                </h3>
                <span className="font-mono text-xs text-accent-cyan">
                  {activePreviewPreset.categoryLabel}
                </span>
              </div>
              <button
                onClick={() => setPreviewPresetId(null)}
                className="text-slate-400 hover:text-white font-mono text-sm px-3 py-1 rounded-lg glass-button"
              >
                Close ✕
              </button>
            </div>

            <div className="h-96 w-full relative bg-canvas-dark">
              <DynamicSceneCanvas
                presetId={activePreviewPreset.id}
                config={activePreviewPreset.config}
                isPlaying={true}
                enableOrbit={true}
                showParticles={true}
                autoRotate={true}
              />
            </div>

            <div className="p-6 border-t border-white/10 flex items-center justify-between bg-black/40">
              <p className="text-xs font-mono text-slate-400 max-w-md">
                {activePreviewPreset.instructions}
              </p>
              <Link
                href={`/playground?preset=${activePreviewPreset.id}`}
                className="px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-accent-cyan text-canvas-dark shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:bg-cyan-300 transition-all"
              >
                Open in Full Playground →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

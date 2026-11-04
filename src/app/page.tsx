"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DynamicSceneCanvas } from "@/engine/three/DynamicCanvas";
import { PRESETS } from "@/store/usePlaygroundStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowRight,
  Code2,
  Sliders,
  Sparkles,
  Orbit,
  Flame,
  Palette,
} from "lucide-react";

export default function HomePage() {
  const [heroSpeed, setHeroSpeed] = useState(1.0);
  const [heroWireframe, setHeroWireframe] = useState(false);
  const [heroColorIndex, setHeroColorIndex] = useState(0);

  const colorPalettes = [
    { primary: "#8B5CF6", secondary: "#22D3EE", name: "Cyber Violet" },
    { primary: "#EC4899", secondary: "#8B5CF6", name: "Neon Rose" },
    { primary: "#06B6D4", secondary: "#10B981", name: "Emerald Glaze" },
    { primary: "#F59E0B", secondary: "#EC4899", name: "Solar Flare" },
  ];

  const currentPalette = colorPalettes[heroColorIndex];

  const heroConfig = {
    ...PRESETS[0].config,
    speed: heroSpeed,
    wireframe: heroWireframe,
    primaryColor: currentPalette.primary,
    secondaryColor: currentPalette.secondary,
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background ambient light orbs */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-accent-violet/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-80 right-10 w-[500px] h-[500px] bg-accent-cyan/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[1200px] left-10 w-[600px] h-[600px] bg-accent-pink/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none -z-10" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-8 pt-8 pb-16">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-accent-cyan/30 text-xs font-mono text-accent-cyan">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
              <span>NEXT-GEN CREATIVE TECH PLAYGROUND</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight font-mono uppercase leading-[1.08]">
              Sculpting <br />
              <span className="text-accent-cyan neon-text-cyan">
                Kinetic Digital
              </span>{" "}
              Realms.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              An award-winning playground for WebGL shaders, Three.js spatial physics,
              and scroll-driven storytelling. Experiment, edit code live in Monaco, and deploy motion assets.
            </p>

            {/* Main CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/playground"
                className="px-6 py-3.5 rounded-xl text-sm font-mono uppercase tracking-wider font-semibold bg-accent-violet text-white shadow-glow hover:bg-accent-violet/80 hover:shadow-[0_0_28px_6px_rgba(139,92,246,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
              >
                <Sliders className="w-4 h-4" />
                <span>Enter Playground</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href="/editor"
                className="px-6 py-3.5 rounded-xl text-sm font-mono uppercase tracking-wider font-semibold glass-button text-[var(--foreground)] hover:text-accent-cyan flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-accent-pink" />
                <span>Code Editor</span>
              </Link>

              <Link
                href="/explore"
                className="px-5 py-3.5 rounded-xl text-sm font-mono uppercase tracking-wider text-[var(--muted)] hover:text-accent-cyan transition-colors flex items-center gap-1.5"
              >
                <span>Browse 8 Labs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-[var(--border)] grid grid-cols-3 gap-4 font-mono">
              <div>
                <div className="text-2xl font-bold text-[var(--foreground)]">60 FPS</div>
                <div className="text-xs text-[var(--muted)] uppercase">GPU Target</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-cyan">8 Labs</div>
                <div className="text-xs text-[var(--muted)] uppercase">Interactive Modes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-pink">100%</div>
                <div className="text-xs text-[var(--muted)] uppercase">Procedural Shaders</div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero 3D Interactive Viewport */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-6 relative h-[500px] sm:h-[580px] w-full flex items-center justify-center"
          >
            {/* Ambient neon glow halo — solid color blur, no gradient */}
            <div className="absolute inset-4 rounded-3xl bg-accent-violet/15 blur-2xl -z-10" />

            {/* Viewport Frame */}
            <div className="w-full h-full rounded-3xl glass-panel border border-white/10 overflow-hidden relative shadow-2xl flex flex-col">
              
              {/* Top Viewport Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/30 backdrop-blur-md z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-400">
                    viewport // quantum-torus-01
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="cyan">Interactive 3D</Badge>
                </div>
              </div>

              {/* 3D WebGL Canvas */}
              <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
                <DynamicSceneCanvas
                  presetId="torus-quantum"
                  config={heroConfig}
                  isPlaying={true}
                  enableOrbit={true}
                  showParticles={true}
                  autoRotate={true}
                />

                {/* Floating instruction pill */}
                <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-[var(--surface-elevated)]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[var(--border)] text-[11px] font-mono text-[var(--muted)] flex items-center gap-1.5">
                  <Orbit className="w-3.5 h-3.5 text-accent-cyan animate-spin-slow" />
                  <span>Drag to rotate • Scroll to zoom</span>
                </div>
              </div>

              {/* Bottom Quick-Tweak Bar */}
              <div className="px-5 py-3 border-t border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md z-20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                {/* Speed Slider */}
                <div className="flex items-center gap-2">
                  <span className="text-[var(--muted)]">Speed:</span>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={heroSpeed}
                    onChange={(e) => setHeroSpeed(parseFloat(e.target.value))}
                    className="w-20 accent-accent-cyan cursor-pointer"
                  />
                  <span className="text-accent-cyan w-8">{heroSpeed.toFixed(1)}x</span>
                </div>

                {/* Wireframe toggle */}
                <button
                  onClick={() => setHeroWireframe(!heroWireframe)}
                  className={`px-2.5 py-1 rounded-md border transition-all ${
                    heroWireframe
                      ? "bg-accent-violet/30 border-accent-violet text-accent-violet font-semibold"
                      : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Wireframe: {heroWireframe ? "ON" : "OFF"}
                </button>

                {/* Color Scheme Cycle */}
                <button
                  onClick={() =>
                    setHeroColorIndex((prev) => (prev + 1) % colorPalettes.length)
                  }
                  className="px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--foreground)] hover:border-accent-pink flex items-center gap-1.5"
                >
                  <Palette className="w-3.5 h-3.5 text-accent-pink" />
                  <span>{currentPalette.name}</span>
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= EXPLORE CATEGORIES PREVIEW ================= */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <Badge variant="violet" className="mb-3">
              Laboratory Directory
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-mono uppercase tracking-tight text-[var(--foreground)]">
              Explore Specialized Labs
            </h2>
            <p className="text-[var(--muted)] text-sm sm:text-base mt-2 max-w-xl">
              Categorized modules covering spatial 3D, physics particles, fluid shaders, and interactive kinetic elements.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-accent-cyan hover:text-white transition-colors"
          >
            <span>View All Experiments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRESETS.map((preset, index) => (
            <GlassCard
              key={preset.id}
              glow={index % 3 === 0 ? "violet" : index % 3 === 1 ? "cyan" : "pink"}
              className="flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-accent-cyan/80">
                    LAB-0{index + 1}
                  </span>
                  <Badge variant="outline">{preset.categoryLabel}</Badge>
                </div>

                <h3 className="text-lg font-bold font-mono text-[var(--foreground)] group-hover:text-accent-cyan transition-colors mb-2">
                  {preset.name}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-2 mb-4">
                  {preset.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {preset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--surface-elevated)] text-[var(--muted)] border border-[var(--border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <Link
                  href={`/playground?preset=${preset.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent-cyan hover:text-[var(--foreground)] transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </Link>

                <Link
                  href={`/editor?preset=${preset.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--muted)] hover:text-accent-pink transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Inspect Code</span>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ================= ARCHITECTURAL ENGINE BREAKDOWN ================= */}
      <section className="py-20 px-4 sm:px-8 border-y border-white/5 bg-canvas-surface/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="cyan" className="mb-3">
              Engine Topology
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-mono uppercase text-[var(--foreground)]">
              Dedicated Animation Engines
            </h2>
            <p className="text-[var(--muted)] text-sm sm:text-base mt-2">
              Each technology has an isolated, strict responsibility to prevent layout thrashing and maintain 60 FPS fluidity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard glow="violet">
              <div className="w-12 h-12 rounded-xl bg-accent-violet/20 flex items-center justify-center text-accent-violet mb-4">
                <Orbit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-mono text-[var(--foreground)] mb-2">
                Three.js & R3F
              </h3>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                GPU-accelerated spatial meshes, custom GLSL vertex noise shaders, and instanced particle clouds running at hardware refresh rate.
              </p>
              <ul className="space-y-1.5 text-xs font-mono text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                  Procedural geometries
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                  Additive blending particles
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                  Dynamic pointer lights
                </li>
              </ul>
            </GlassCard>

            <GlassCard glow="cyan">
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-mono text-[var(--foreground)] mb-2">
                GSAP & Lenis
              </h3>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Complex timeline sequencing and inertia-driven smooth scrolling. Camera zooms and narrative reveals locked to scroll coordinates.
              </p>
              <ul className="space-y-1.5 text-xs font-mono text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                  ScrollTrigger scrubbers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                  Lenis normalized delta
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                  Zero thread jank
                </li>
              </ul>
            </GlassCard>

            <GlassCard glow="pink">
              <div className="w-12 h-12 rounded-xl bg-accent-pink/20 flex items-center justify-center text-accent-pink mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-mono text-[var(--foreground)] mb-2">
                Framer Motion
              </h3>
              <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Micro-interactions, spring physics cursors, layout animations, and glass panel transitions reacting to user clicks and hovers.
              </p>
              <ul className="space-y-1.5 text-xs font-mono text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-pink" />
                  Spring-damped cursor
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-pink" />
                  Shared layout transitions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-pink" />
                  Respects reduced-motion
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA HERO BANNER ================= */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl glass-panel border border-white/10 p-8 sm:p-14 overflow-hidden text-center shadow-glass">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-violet/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Badge variant="emerald">Instant Sandbox Access</Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-mono uppercase text-[var(--foreground)]">
              Ready to Craft <br />
              <span className="text-accent-pink" style={{ textShadow: "0 0 24px rgba(236,72,153,0.7)" }}>
                Sensory Motion?
              </span>
            </h2>
            <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
              Open the Playground to adjust physics and lighting in real-time, or jump directly into the split-screen Monaco code editor.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/playground"
                className="px-8 py-4 rounded-xl text-sm font-mono uppercase tracking-wider font-semibold bg-accent-violet text-white shadow-glow hover:shadow-[0_0_30px_8px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Launch Playground Now
              </Link>
              <Link
                href="/components"
                className="px-8 py-4 rounded-xl text-sm font-mono uppercase tracking-wider font-semibold glass-button text-[var(--foreground)] hover:text-accent-cyan"
              >
                Browse UI Components
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ComponentItem } from "./types";

// 1. Quantum Orbit Spinner Demo
function QuantumOrbitDemo() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-cyan-400 border-t-transparent shadow-[0_0_12px_#22D3EE]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-violet-400 border-b-transparent shadow-[0_0_8px_#8B5CF6]"
      />
      <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_10px_#EC4899] animate-pulse" />
    </div>
  );
}

// 2. Cyber Radar Scanner Demo
function RadarScannerDemo() {
  return (
    <div className="relative w-14 h-14 rounded-full border border-emerald-500/40 bg-emerald-950/20 overflow-hidden flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_75%,rgba(16,185,129,0.5)_100%)]"
      />
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      <span className="absolute top-2 right-3 w-1 h-1 rounded-full bg-emerald-300" />
    </div>
  );
}

// 3. Liquid Ring Loader Demo
function LiquidRingDemo() {
  return (
    <motion.div
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        rotate: 360,
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-2 border-accent-cyan shadow-glow-cyan"
    />
  );
}

// 4. DNA Helix Spinner Demo
function DnaHelixDemo() {
  return (
    <div className="flex items-center gap-1.5 h-10">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
          className="flex flex-col gap-3 items-center"
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan shadow-glow-cyan" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent-violet shadow-glow" />
        </motion.div>
      ))}
    </div>
  );
}

// 5. Hexagon Matrix Loader Demo
function HexagonMatrixDemo() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          className="w-3.5 h-3.5 rounded bg-cyan-400 shadow-[0_0_8px_#22D3EE]"
        />
      ))}
    </div>
  );
}

// 6. Neon Tube Preloader Demo
function NeonTubeDemo() {
  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-zinc-800"
          strokeWidth="3.5"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <motion.path
          className="text-pink-500"
          strokeWidth="3.5"
          strokeDasharray="100, 100"
          animate={{ strokeDashoffset: [100, 0, -100] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
    </div>
  );
}

// 7. Stepped Glitch Progress Bar Demo
function GlitchBarDemo() {
  return (
    <div className="w-40 space-y-1 font-mono text-[10px]">
      <div className="flex justify-between text-cyan-400">
        <span>DATA_STREAM</span>
        <span className="animate-pulse">78%</span>
      </div>
      <div className="h-2 w-full bg-zinc-900 border border-zinc-700 rounded overflow-hidden flex">
        <motion.div
          animate={{ width: ["10%", "85%", "40%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="h-full bg-cyan-400 shadow-[0_0_10px_#22D3EE]"
        />
      </div>
    </div>
  );
}

// 8. Minimal Dash Ring Demo
function MinimalDashDemo() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className="w-10 h-10 rounded-full border-2 border-dashed border-accent-cyan"
    />
  );
}

// 9. Particle Swarm Orbit Demo
function ParticleSwarmDemo() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            rotate: 360,
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 2 + i * 0.4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 flex items-start justify-center"
        >
          <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#8B5CF6]" />
        </motion.span>
      ))}
    </div>
  );
}

// 10. Geometric Hourglass Flip Demo
function HourglassFlipDemo() {
  return (
    <motion.div
      animate={{ rotate: [0, 180, 180, 360] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-8 h-8 border-2 border-amber-400 rotate-45 flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.4)]"
    >
      <div className="w-3 h-3 bg-amber-400" />
    </motion.div>
  );
}

// 11. Breathing Sonic Orb Demo
function CyberOrbDemo() {
  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <motion.div
        animate={{ scale: [1, 2], opacity: [0.8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        className="absolute inset-0 rounded-full border border-cyan-400 shadow-glow-cyan"
      />
      <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_#22D3EE]" />
    </div>
  );
}

export const LOADER_COMPONENTS: ComponentItem[] = [
  {
    id: "ldr-quantum-orbit",
    title: "Quantum Orbit Spinner",
    category: "Loaders & Spinners",
    description: "Concentric dual-axis rings rotating with glowing central core.",
    tags: ["spinner", "orbit", "quantum", "concentric"],
    code: `<QuantumOrbitLoader />`,
    demo: <QuantumOrbitDemo />,
  },
  {
    id: "ldr-radar-scan",
    title: "Cyber Radar Scanner",
    category: "Loaders & Spinners",
    description: "360-degree sweeping conic radar beam with detected blips.",
    tags: ["radar", "scanner", "conic", "hud"],
    code: `<RadarScanner />`,
    demo: <RadarScannerDemo />,
  },
  {
    id: "ldr-liquid-ring",
    title: "Liquid Fluid Ring",
    category: "Loaders & Spinners",
    description: "Morphing viscous organic ring border continuously deforming shape.",
    tags: ["liquid", "organic", "morphing", "viscous"],
    code: `<LiquidRingLoader />`,
    demo: <LiquidRingDemo />,
  },
  {
    id: "ldr-dna-helix",
    title: "DNA Helix Undulation",
    category: "Loaders & Spinners",
    description: "Dual-layer intertwined harmonic wave nodes traversing sinusoidal phase.",
    tags: ["dna", "helix", "wave", "harmonic"],
    code: `<DnaHelixLoader />`,
    demo: <DnaHelixDemo />,
  },
  {
    id: "ldr-hexagon-matrix",
    title: "Hexagon Grid Pulse",
    category: "Loaders & Spinners",
    description: "Staggered geometric block grid pulsating in wave formation.",
    tags: ["grid", "matrix", "hex", "stagger"],
    code: `<HexagonMatrixLoader />`,
    demo: <HexagonMatrixDemo />,
  },
  {
    id: "ldr-neon-tube",
    title: "Neon Tube Circular Loader",
    category: "Loaders & Spinners",
    description: "SVG path drawing and erasing circular glowing neon tube animation.",
    tags: ["svg", "stroke-dash", "neon", "circular"],
    code: `<NeonTubeLoader />`,
    demo: <NeonTubeDemo />,
  },
  {
    id: "ldr-glitch-bar",
    title: "Stepped Glitch Progress Bar",
    category: "Loaders & Spinners",
    description: "Sci-fi telemetry loading bar with randomized micro-glitch widths.",
    tags: ["progress", "glitch", "telemetry", "bar"],
    code: `<GlitchProgressBar />`,
    demo: <GlitchBarDemo />,
  },
  {
    id: "ldr-minimal-dash",
    title: "Minimal Dashed Ring",
    category: "Loaders & Spinners",
    description: "Crisp architectural dashed line circular spinner.",
    tags: ["minimal", "dashed", "architectural", "ring"],
    code: `<MinimalDashLoader />`,
    demo: <MinimalDashDemo />,
  },
  {
    id: "ldr-particle-swarm",
    title: "Particle Swarm Orbit",
    category: "Loaders & Spinners",
    description: "Cloud of orbital particle satellites revolving around shared axis.",
    tags: ["particles", "swarm", "satellites", "orbit"],
    code: `<ParticleSwarmLoader />`,
    demo: <ParticleSwarmDemo />,
  },
  {
    id: "ldr-hourglass",
    title: "Geometric Hourglass Flip",
    category: "Loaders & Spinners",
    description: "Rotating geometric crystal diamond flipping 180 degrees iteratively.",
    tags: ["geometric", "hourglass", "crystal", "flip"],
    code: `<HourglassLoader />`,
    demo: <HourglassFlipDemo />,
  },
  {
    id: "ldr-cyber-orb",
    title: "Breathing Sonic Orb",
    category: "Loaders & Spinners",
    description: "Pulsing core emitting repeating concentric acoustic shockwaves.",
    tags: ["sonic", "shockwave", "orb", "breathing"],
    code: `<CyberOrbLoader />`,
    demo: <CyberOrbDemo />,
  },
];

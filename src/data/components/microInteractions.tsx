"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Move,
  RotateCw,
} from "lucide-react";
import { ComponentItem } from "./types";

// 1. Cursor Spotlight Beam Demo
function SpotlightBeamDemo() {
  const [xy, setXy] = useState({ x: 50, y: 50 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setXy({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative w-full max-w-xs h-32 rounded-xl bg-black border border-zinc-800 overflow-hidden flex items-center justify-center cursor-crosshair"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(90px circle at ${xy.x}px ${xy.y}px, rgba(34,211,238,0.35), transparent 75%)`,
        }}
      />
      <span className="font-mono text-xs font-bold text-zinc-600 select-none">
        HIDDEN TELEMETRY CODE: 0x4F8B
      </span>
    </div>
  );
}

// 2. Elastic Drag and Snap Box Demo
function ElasticDragDemo() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}
      dragElastic={0.4}
      whileDrag={{ scale: 1.1 }}
      className="px-4 py-2.5 rounded-xl bg-accent-violet text-white font-mono text-xs font-semibold shadow-glow flex items-center gap-2 cursor-grab active:cursor-grabbing select-none"
    >
      <Move className="w-3.5 h-3.5" />
      <span>Drag & Elastic Snap</span>
    </motion.div>
  );
}

// 3. Confetti Physics Burst Demo
function ConfettiBurstDemo() {
  const [particles, setParticles] = useState<{ id: number; color: string; x: number; y: number }[]>([]);

  const trigger = () => {
    const colors = ["#22D3EE", "#8B5CF6", "#EC4899", "#FBBF24", "#10B981"];
    const newItems = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      color: colors[i % colors.length],
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.8) * 80,
    }));
    setParticles(newItems);
    setTimeout(() => setParticles([]), 1000);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={trigger}
        className="px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase bg-pink-950/80 border border-pink-400 text-pink-300 shadow-glow-pink hover:scale-105 active:scale-95 transition-all"
      >
        Trigger Confetti
      </button>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ scale: 1, x: p.x, y: p.y, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{ backgroundColor: p.color, left: "50%", top: "50%" }}
        />
      ))}
    </div>
  );
}

// 4. Interactive Audio Frequency Bars Demo
function AudioVisualizerDemo() {
  const [active, setActive] = useState(true);
  return (
    <div
      onClick={() => setActive(!active)}
      className="flex items-end gap-1 h-12 p-3 rounded-xl glass-panel border border-[var(--border)] cursor-pointer"
    >
      {[6, 12, 24, 18, 30, 15, 28, 10].map((h, i) => (
        <motion.span
          key={i}
          animate={{ height: active ? [4, h, 8, h + 4, 6] : 4 }}
          transition={{
            duration: 0.8 + (i % 3) * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22D3EE]"
        />
      ))}
    </div>
  );
}

// 5. Fluid Cursor Particle Trail Demo
function CursorTrailDemo() {
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newDot = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Math.random(),
    };
    setDots((prev) => [...prev.slice(-8), newDot]);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-xs h-28 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center cursor-pointer"
    >
      <span className="font-mono text-[10px] text-zinc-500 pointer-events-none select-none">
        Move cursor here for particle trail
      </span>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-2 h-2 rounded-full bg-accent-cyan shadow-glow-cyan pointer-events-none"
          style={{ left: d.x - 4, top: d.y - 4 }}
        />
      ))}
    </div>
  );
}

// 6. Physics Gravity Dropdown Accordion Demo
function GravityDropdownDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-xs font-mono text-xs">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 flex justify-between items-center"
      >
        <span>Gravitational Drop</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 450, damping: 15 }}
          className="mt-1.5 p-3 rounded-xl bg-black border border-cyan-400 text-cyan-300 text-[11px] shadow-glow-cyan"
        >
          High-velocity spring bounce simulated under lunar gravitational coefficient.
        </motion.div>
      )}
    </div>
  );
}

// 7. Magnetic Cursor Repulsion Orb Demo
function RepulsionOrbDemo() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 70) {
      setOffset({ x: -dx * 0.4, y: -dy * 0.4 });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="w-full max-w-xs h-28 rounded-xl border border-zinc-800 bg-zinc-950 flex items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="px-4 py-2 rounded-full bg-pink-600 text-white font-mono text-xs font-bold shadow-glow-pink select-none"
      >
        Repulsion Orb
      </motion.div>
    </div>
  );
}

// 8. Gyroscopic 3D Tilt Box Demo
function GyroTiltBoxDemo() {
  return (
    <motion.div
      whileHover={{ rotateX: 25, rotateY: -25, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-3 text-white font-mono text-xs font-bold shadow-glow flex flex-col justify-between cursor-pointer select-none [transform-style:preserve-3d]"
    >
      <RotateCw className="w-4 h-4" />
      <span>3D Tilt Cube</span>
    </motion.div>
  );
}

// 9. Harmonic Physics Bouncing Ball Demo
function BouncingBallDemo() {
  return (
    <div className="relative w-16 h-20 flex flex-col items-center justify-end">
      <motion.div
        animate={{ y: [0, -35, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
        className="w-6 h-6 rounded-full bg-cyan-400 shadow-[0_0_12px_#22D3EE]"
      />
      <motion.div
        animate={{ scaleX: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
        className="w-6 h-1 rounded-full bg-cyan-900 mt-1"
      />
    </div>
  );
}

// 10. Scratch-to-Reveal Surface Demo
function ScratchCardDemo() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div
      onClick={() => setRevealed(true)}
      className="relative w-full max-w-xs h-20 rounded-xl border border-zinc-700 bg-zinc-900 overflow-hidden flex items-center justify-center cursor-pointer select-none"
    >
      <span className="font-mono text-xs font-bold text-accent-cyan">
        PRIZE: +1000 SHADER CREDITS
      </span>
      {!revealed && (
        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center font-mono text-xs text-zinc-400 hover:bg-zinc-700">
          Click to Scratch & Reveal
        </div>
      )}
    </div>
  );
}

export const MICRO_INTERACTION_COMPONENTS: ComponentItem[] = [
  {
    id: "phy-spotlight-beam",
    title: "Cursor Spotlight Beam",
    category: "Micro-Interactions",
    description: "Radial torch beam unmasking hidden content beneath cursor coordinates.",
    tags: ["spotlight", "beam", "flashlight", "reveal"],
    code: `<SpotlightBeam />`,
    demo: <SpotlightBeamDemo />,
  },
  {
    id: "phy-drag-snap",
    title: "Elastic Drag & Snap Box",
    category: "Micro-Interactions",
    description: "Draggable element with inertial elastic boundaries that snaps back to origin.",
    tags: ["drag", "elastic", "snap", "framer-motion"],
    code: `<ElasticDragSnap />`,
    demo: <ElasticDragDemo />,
  },
  {
    id: "phy-confetti",
    title: "Confetti Physics Explosion",
    category: "Micro-Interactions",
    description: "Multi-colored micro-particle burst with simulated parabolic trajectory.",
    tags: ["confetti", "burst", "particles", "physics"],
    code: `<ConfettiBurst />`,
    demo: <ConfettiBurstDemo />,
  },
  {
    id: "phy-audio-visualizer",
    title: "Audio Frequency Visualizer",
    category: "Micro-Interactions",
    description: "Simulated audio equalizer frequency bars reacting to rhythmic oscillation.",
    tags: ["audio", "visualizer", "equalizer", "frequency"],
    code: `<AudioVisualizer />`,
    demo: <AudioVisualizerDemo />,
  },
  {
    id: "phy-cursor-trail",
    title: "Fluid Cursor Particle Trail",
    category: "Micro-Interactions",
    description: "Luminescent stream of decaying glowing particles following mouse vector.",
    tags: ["trail", "particles", "cursor", "fluid"],
    code: `<CursorTrail />`,
    demo: <CursorTrailDemo />,
  },
  {
    id: "phy-gravity-accordion",
    title: "Gravitational Drop Accordion",
    category: "Micro-Interactions",
    description: "Accordion drawer utilizing physical spring bounce on gravitational drop.",
    tags: ["gravity", "spring", "accordion", "physics"],
    code: `<GravityAccordion />`,
    demo: <GravityDropdownDemo />,
  },
  {
    id: "phy-magnetic-repulsion",
    title: "Magnetic Repulsion Orb",
    category: "Micro-Interactions",
    description: "Interactive UI node that flees dynamically when cursor approaches perimeter.",
    tags: ["repulsion", "magnetic", "flee", "physics"],
    code: `<MagneticRepulsionOrb />`,
    demo: <RepulsionOrbDemo />,
  },
  {
    id: "phy-gyro-tilt-box",
    title: "Gyroscopic 3D Tilt Box",
    category: "Micro-Interactions",
    description: "3D perspective cube rotating synchronously with Euler mouse angle.",
    tags: ["gyro", "3d", "cube", "perspective"],
    code: `<GyroTiltBox />`,
    demo: <GyroTiltBoxDemo />,
  },
  {
    id: "phy-bouncing-ball",
    title: "Harmonic Bouncing Ball",
    category: "Micro-Interactions",
    description: "Damped harmonic bouncing ball with synchronous floor shadow squash.",
    tags: ["bounce", "harmonic", "squash", "physics"],
    code: `<HarmonicBounceBall />`,
    demo: <BouncingBallDemo />,
  },
  {
    id: "phy-scratch-card",
    title: "Scratch-to-Reveal Surface",
    category: "Micro-Interactions",
    description: "Interactive scratch surface that removes overlay to unveil content.",
    tags: ["scratch", "reveal", "canvas", "interactive"],
    code: `<ScratchCard />`,
    demo: <ScratchCardDemo />,
  },
];

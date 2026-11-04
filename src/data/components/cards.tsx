"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Cpu,
} from "lucide-react";
import { ComponentItem } from "./types";

// 1. 3D Tilt Parallax Card Demo
function TiltCardDemo() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [12, -12]);
  const rotateY = useTransform(x, [-80, 80], [-12, 12]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="w-full max-w-xs h-44 rounded-2xl glass-panel border border-violet-500/40 p-4 flex flex-col justify-between cursor-pointer relative shadow-glow"
    >
      <div style={{ transform: "translateZ(25px)" }}>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-950/60 text-violet-300 border border-violet-500/40">
          3D Perspective
        </span>
        <h4 className="font-mono text-sm font-bold text-[var(--foreground)] mt-2">
          Spatial Tilt Card
        </h4>
        <p className="font-mono text-[11px] text-[var(--muted)] mt-1">
          Moves with Euler cursor angles in 3D space.
        </p>
      </div>
      <div
        style={{ transform: "translateZ(20px)" }}
        className="flex items-center justify-between text-[11px] font-mono text-accent-cyan"
      >
        <span>Interactive Hover</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
}

// 2. Tracing Beam Card Demo
function TracingBeamCardDemo() {
  return (
    <div className="relative w-full max-w-xs p-[1.5px] rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 animate-[spin_4s_linear_infinite]" />
      <div className="relative h-44 rounded-2xl bg-[var(--surface-elevated)] p-4 flex flex-col justify-between">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/40">
            Tracing Light
          </span>
          <h4 className="font-mono text-sm font-bold text-[var(--foreground)] mt-2">
            Perimeter Beam
          </h4>
          <p className="font-mono text-[11px] text-[var(--muted)] mt-1">
            Continuous glowing light path surrounding content.
          </p>
        </div>
        <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Active Perimeter</span>
        </div>
      </div>
    </div>
  );
}

// 3. Cursor Spotlight Focus Card Demo
function SpotlightCardDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative w-full max-w-xs h-44 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 overflow-hidden flex flex-col justify-between"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, rgba(34,211,238,0.2), transparent 80%)`,
        }}
      />
      <div className="relative z-10">
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-400/30">
          Spotlight Hover
        </span>
        <h4 className="font-mono text-sm font-bold text-[var(--foreground)] mt-2">
          Torch Beam Surface
        </h4>
        <p className="font-mono text-[11px] text-[var(--muted)] mt-1">
          Dynamic radial spotlight tracks cursor coordinates.
        </p>
      </div>
      <span className="relative z-10 text-[10px] font-mono text-[var(--muted)]">
        Hover anywhere on surface
      </span>
    </div>
  );
}

// 4. Canvas Reveal Matrix Card Demo
function CanvasRevealCardDemo() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full max-w-xs h-44 rounded-2xl border border-[var(--border)] bg-[#030712] p-4 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {hovered && (
        <div className="absolute inset-0 grid-pattern opacity-60 text-cyan-400 transition-opacity" />
      )}
      <div className="relative z-10">
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-950/60 text-violet-300 border border-violet-500/40">
          Grid Matrix
        </span>
        <h4 className="font-mono text-sm font-bold text-white mt-2">
          Canvas Reveal
        </h4>
        <p className="font-mono text-[11px] text-zinc-400 mt-1">
          Hover unmasks cyber coordinate grid.
        </p>
      </div>
      <div className="relative z-10 text-[10px] font-mono text-accent-cyan flex items-center gap-1">
        <Cpu className="w-3.5 h-3.5" />
        <span>Status: {hovered ? "ACTIVE" : "STANDBY"}</span>
      </div>
    </div>
  );
}

// 5. Meteors Deep Space Card Demo
function MeteorsCardDemo() {
  return (
    <div className="relative w-full max-w-xs h-44 rounded-2xl border border-zinc-800 bg-[#060A14] p-4 overflow-hidden flex flex-col justify-between shadow-2xl">
      {/* Animated meteors */}
      {[20, 60, 100].map((top, i) => (
        <motion.span
          key={i}
          initial={{ x: 200, y: -50, opacity: 1 }}
          animate={{ x: -200, y: 150, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "linear",
          }}
          className="absolute w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent rotate-[215deg] pointer-events-none"
          style={{ top: `${top}px` }}
        />
      ))}
      <div className="relative z-10">
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-400/40">
          Meteors Stream
        </span>
        <h4 className="font-mono text-sm font-bold text-white mt-2">
          Celestial Stars
        </h4>
        <p className="font-mono text-[11px] text-zinc-400 mt-1">
          Shooting stars traverse deep cosmic space.
        </p>
      </div>
      <span className="relative z-10 text-[10px] font-mono text-cyan-400">
        Orbital Trajectory
      </span>
    </div>
  );
}

// 6. Holographic Foil Card Demo
function HolographicCardDemo() {
  const [bgAngle, setBgAngle] = useState(45);
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const deg = ((e.clientX - rect.left) / rect.width) * 360;
        setBgAngle(deg);
      }}
      className="relative w-full max-w-xs h-44 rounded-2xl border border-white/20 p-4 overflow-hidden flex flex-col justify-between shadow-lg"
      style={{
        background: `linear-gradient(${bgAngle}deg, rgba(34,211,238,0.15), rgba(139,92,246,0.2), rgba(236,72,153,0.15))`,
      }}
    >
      <div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white border border-white/20 backdrop-blur-md">
          Holographic Foil
        </span>
        <h4 className="font-mono text-sm font-bold text-[var(--foreground)] mt-2">
          Prismatic Shimmer
        </h4>
        <p className="font-mono text-[11px] text-[var(--muted)] mt-1">
          Spectral reflection rotates with cursor vector.
        </p>
      </div>
      <span className="text-[10px] font-mono text-accent-pink">
        Vector: {Math.round(bgAngle)}°
      </span>
    </div>
  );
}

// 7. 3D Flip Card Demo
function FlipCardDemo() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="w-full max-w-xs h-44 cursor-pointer [perspective:1000px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full h-full rounded-2xl [transform-style:preserve-3d]"
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl glass-panel border border-[var(--border)] p-4 flex flex-col justify-between [backface-visibility:hidden]">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-950/60 text-violet-300">
              Card Front
            </span>
            <h4 className="font-mono text-sm font-bold text-[var(--foreground)] mt-2">
              Flip 3D Card
            </h4>
            <p className="font-mono text-[11px] text-[var(--muted)] mt-1">
              Click anywhere to rotate 180° on Y-axis.
            </p>
          </div>
          <span className="text-[10px] font-mono text-accent-cyan">Click to Flip →</span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-2xl bg-zinc-900 border border-accent-cyan/50 p-4 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300">
              Technical Specs
            </span>
            <p className="font-mono text-[11px] text-zinc-300 mt-2">
              • Framer Motion Spring<br />
              • Backface Culling: Hidden<br />
              • Perspective: 1000px
            </p>
          </div>
          <span className="text-[10px] font-mono text-accent-pink">← Click to Reset</span>
        </div>
      </motion.div>
    </div>
  );
}

// 8. Retro CRT Terminal Card Demo
function TerminalCardDemo() {
  return (
    <div className="relative w-full max-w-xs h-44 rounded-2xl bg-black border border-emerald-500/50 p-3.5 font-mono text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-emerald-900/60 pb-1.5 text-[10px]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>telemetry.sh</span>
        </div>
        <span className="text-emerald-600">v2.4</span>
      </div>
      <div className="text-[11px] space-y-1">
        <p className="text-emerald-300">&gt; init --solar-physics</p>
        <p className="text-emerald-500/80">&gt; webgl context: OK [60fps]</p>
        <p className="text-emerald-400">&gt; ready for command_</p>
      </div>
      <div className="text-[9px] text-emerald-600 uppercase tracking-widest">
        SYSTEM SECURE
      </div>
    </div>
  );
}

// 9. Bento Grid Glass Card Demo
function BentoCardDemo() {
  return (
    <div className="relative w-full max-w-xs h-44 rounded-2xl glass-panel border border-cyan-400/30 p-4 flex flex-col justify-between shadow-glow-cyan">
      {/* Corner Brackets */}
      <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
      <span className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
      <span className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
      <span className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />

      <div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-300">
          Bento Cell
        </span>
        <h4 className="font-mono text-sm font-bold text-[var(--foreground)] mt-2">
          Cyber Bracket Grid
        </h4>
        <p className="font-mono text-[11px] text-[var(--muted)] mt-1">
          Sci-fi HUD corner brackets with glass fill.
        </p>
      </div>
      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--muted)]">
        <span>GRID-04</span>
        <span className="text-cyan-400">ACTIVE</span>
      </div>
    </div>
  );
}

// 10. Accordion Reveal Card Demo
function AccordionCardDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-xs rounded-2xl glass-panel border border-[var(--border)] overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center justify-between text-left font-mono text-xs font-semibold text-[var(--foreground)]"
      >
        <span>Collapsible Accordion</span>
        <ChevronDown
          className={`w-4 h-4 text-accent-cyan transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4 font-mono text-[11px] text-[var(--muted)] border-t border-[var(--border)] pt-2"
        >
          Smooth spring accordion drawer revealing hidden contextual details seamlessly.
        </motion.div>
      )}
    </div>
  );
}

// 11. Glassmorphism Frost Card Demo
function FrostCardDemo() {
  return (
    <div className="w-full max-w-xs h-44 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/20 p-4 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
      <div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white border border-white/20">
          Frosted Specular
        </span>
        <h4 className="font-mono text-sm font-bold text-[var(--foreground)] mt-2">
          Backdrop Frost
        </h4>
        <p className="font-mono text-[11px] text-[var(--muted)] mt-1">
          Multi-layer blur with interior specular highlight.
        </p>
      </div>
      <span className="text-[10px] font-mono text-accent-violet">
        Blur: 40px Specular
      </span>
    </div>
  );
}

export const CARD_COMPONENTS: ComponentItem[] = [
  {
    id: "card-3d-tilt",
    title: "3D Tilt Parallax Card",
    category: "Cards & Surfaces",
    description: "Gyroscopic cursor tilt with floating Z-depth spatial elements.",
    tags: ["framer-motion", "3d", "perspective", "tilt"],
    code: `<TiltCard />`,
    demo: <TiltCardDemo />,
  },
  {
    id: "card-tracing-beam",
    title: "Tracing Beam Card",
    category: "Cards & Surfaces",
    description: "Continuous glowing light beam outlining the perimeter of the card.",
    tags: ["gradient", "beam", "continuous", "perimeter"],
    code: `<TracingBeamCard />`,
    demo: <TracingBeamCardDemo />,
  },
  {
    id: "card-spotlight",
    title: "Spotlight Focus Card",
    category: "Cards & Surfaces",
    description: "Dynamic radial spotlight tracks cursor coordinates across glass surface.",
    tags: ["spotlight", "radial-gradient", "cursor-tracking"],
    code: `<SpotlightCard />`,
    demo: <SpotlightCardDemo />,
  },
  {
    id: "card-canvas-reveal",
    title: "Canvas Reveal Card",
    category: "Cards & Surfaces",
    description: "Cursor unmasks a high-density interactive dot/grid matrix.",
    tags: ["reveal", "matrix", "grid", "interactive"],
    code: `<CanvasRevealCard />`,
    demo: <CanvasRevealCardDemo />,
  },
  {
    id: "card-meteors",
    title: "Meteors Deep Space Card",
    category: "Cards & Surfaces",
    description: "Shooting stars stream diagonally across deep cosmic backdrop.",
    tags: ["meteors", "cosmic", "animation", "space"],
    code: `<MeteorsCard />`,
    demo: <MeteorsCardDemo />,
  },
  {
    id: "card-holographic",
    title: "Holographic Foil Card",
    category: "Cards & Surfaces",
    description: "Iridescent rainbow specular highlight shifts with cursor angle.",
    tags: ["hologram", "rainbow", "specular", "prismatic"],
    code: `<HolographicCard />`,
    demo: <HolographicCardDemo />,
  },
  {
    id: "card-flip-3d",
    title: "3D Flip Spec Card",
    category: "Cards & Surfaces",
    description: "Rotates 180° around Y-axis to reveal detailed back specifications.",
    tags: ["3d-flip", "y-axis", "specs", "perspective"],
    code: `<FlipCard />`,
    demo: <FlipCardDemo />,
  },
  {
    id: "card-terminal",
    title: "Retro CRT Terminal Card",
    category: "Cards & Surfaces",
    description: "Monospace telemetry console with simulated CLI prompt and status beacon.",
    tags: ["terminal", "retro", "cli", "crt"],
    code: `<TerminalCard />`,
    demo: <TerminalCardDemo />,
  },
  {
    id: "card-bento-glass",
    title: "Bento Grid Cyber Cell",
    category: "Cards & Surfaces",
    description: "Modular cyber cell with neon corner brackets and cyan backdrop glow.",
    tags: ["bento", "cyberpunk", "brackets", "hud"],
    code: `<BentoCard />`,
    demo: <BentoCardDemo />,
  },
  {
    id: "card-accordion",
    title: "Spring Accordion Card",
    category: "Cards & Surfaces",
    description: "Smooth spring-expanding collapsible drawer with auto-height layout.",
    tags: ["accordion", "spring", "collapsible", "drawer"],
    code: `<AccordionCard />`,
    demo: <AccordionCardDemo />,
  },
  {
    id: "card-specular-frost",
    title: "Frosted Glassmorphism Card",
    category: "Cards & Surfaces",
    description: "High-diffusion backdrop blur with interior specular rim highlight.",
    tags: ["glassmorphism", "specular", "blur", "frost"],
    code: `<FrostCard />`,
    demo: <FrostCardDemo />,
  },
];

"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Sparkles,
  Zap,
  Volume2,
  Share2,
  Copy,
  Heart,
  Send,
  Flame,
} from "lucide-react";
import { ComponentItem } from "./types";

// 1. Magnetic Physics Button Demo
function MagneticButtonDemo() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 15, stiffness: 150 });
  const smoothY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.4);
    y.set((e.clientY - (top + height / 2)) * 0.4);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold bg-accent-violet text-white border border-accent-cyan/50 shadow-glow hover:shadow-[0_0_24px_rgba(34,211,238,0.5)] transition-shadow"
    >
      Hover Magnetic
    </motion.button>
  );
}

// 2. Border Beam Button Demo
function BorderBeamButtonDemo() {
  return (
    <div className="relative inline-flex overflow-hidden rounded-xl p-[1px]">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22D3EE_0%,#8B5CF6_50%,#EC4899_100%)]" />
      <button className="relative px-6 py-2.5 rounded-xl bg-[var(--surface-elevated)] text-xs font-mono font-semibold text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
        <span>Border Beam</span>
      </button>
    </div>
  );
}

// 3. Cyber Glow Neon Button Demo
function CyberGlowButtonDemo() {
  return (
    <button className="px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-[#030712] text-cyan-400 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] hover:bg-cyan-950/40 hover:scale-105 active:scale-95 transition-all">
      Cyber Neon
    </button>
  );
}

// 4. Shimmer Sweep Button Demo
function ShimmerButtonDemo() {
  return (
    <button className="group relative overflow-hidden px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-100 shadow-md">
      <span className="relative z-10 flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-amber-400" />
        <span>Shimmer Sweep</span>
      </span>
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </button>
  );
}

// 5. Chromatic Glitch Button Demo
function GlitchButtonDemo() {
  const [glitching, setGlitching] = useState(false);
  return (
    <button
      onMouseEnter={() => setGlitching(true)}
      onMouseLeave={() => setGlitching(false)}
      className={`relative px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-pink-950/40 text-pink-400 border border-pink-500/80 shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all ${
        glitching ? "translate-x-0.5 -translate-y-0.5 shadow-[2px_-2px_0_#22D3EE,-2px_2px_0_#EC4899]" : ""
      }`}
    >
      Glitch RGB
    </button>
  );
}

// 6. Liquid Wave Fill Button Demo
function LiquidFillButtonDemo() {
  return (
    <button className="group relative overflow-hidden px-6 py-2.5 rounded-xl border border-accent-cyan text-xs font-mono font-semibold text-accent-cyan hover:text-white transition-colors">
      <span className="relative z-10">Liquid Fill</span>
      <span className="absolute inset-0 bg-accent-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out -z-0" />
    </button>
  );
}

// 7. Skeuomorphic Elastic Key Press Demo
function ElasticKeyButtonDemo() {
  return (
    <motion.button
      whileTap={{ scale: 0.94, y: 3 }}
      className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase bg-gradient-to-b from-zinc-700 to-zinc-900 text-zinc-100 border-t border-zinc-500 border-b-4 border-zinc-950 shadow-lg active:border-b-0"
    >
      Mechanical Key
    </motion.button>
  );
}

// 8. Morphing Pill Action Button Demo
function MorphingPillButtonDemo() {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="inline-flex items-center gap-2 p-1 rounded-full border border-violet-500/50 bg-violet-950/40 backdrop-blur-md shadow-glow"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="px-4 py-1.5 rounded-full text-xs font-mono text-violet-300 font-semibold hover:text-white"
      >
        {expanded ? "Actions" : "Share Pill"}
      </button>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-1.5 pr-2"
        >
          <button className="p-1 rounded-full text-zinc-400 hover:text-cyan-400 hover:bg-white/10">
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded-full text-zinc-400 hover:text-pink-400 hover:bg-white/10">
            <Heart className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded-full text-zinc-400 hover:text-emerald-400 hover:bg-white/10">
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// 9. Audio Soundwave Reactive Button Demo
function SoundwaveButtonDemo() {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      onClick={() => setPlaying(!playing)}
      className="px-5 py-2.5 rounded-xl font-mono text-xs font-semibold glass-button border border-cyan-400/40 text-cyan-300 flex items-center gap-2.5 hover:border-cyan-400"
    >
      <Volume2 className="w-3.5 h-3.5" />
      <span>{playing ? "Playing" : "Soundwave"}</span>
      <div className="flex items-end gap-0.5 h-3">
        {[4, 8, 12, 6, 10].map((h, i) => (
          <span
            key={i}
            className={`w-0.5 bg-cyan-400 rounded-full transition-all duration-200 ${
              playing ? "animate-pulse" : ""
            }`}
            style={{ height: playing ? `${(i % 3) * 4 + 4}px` : `${h}px` }}
          />
        ))}
      </div>
    </button>
  );
}

// 10. Particle Burst Button Demo
function ParticleBurstButtonDemo() {
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase bg-accent-violet text-white shadow-glow hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5"
      >
        <Flame className="w-3.5 h-3.5 text-amber-300" />
        <span>Particle Burst</span>
      </button>
      {burst && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: 1,
                x: Math.cos((i / 8) * Math.PI * 2) * 36,
                y: Math.sin((i / 8) * Math.PI * 2) * 36,
                opacity: 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute w-2 h-2 rounded-full bg-cyan-400"
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 11. Ripple Coordinate Click Button Demo
function RippleButtonDemo() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden px-6 py-2.5 rounded-xl font-mono text-xs font-semibold bg-emerald-950/40 text-emerald-300 border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
    >
      <span className="relative z-10 flex items-center gap-1.5">
        <Send className="w-3.5 h-3.5" />
        <span>Ripple Click</span>
      </span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-emerald-400/30 pointer-events-none animate-ping"
          style={{
            left: ripple.x - 15,
            top: ripple.y - 15,
            width: 30,
            height: 30,
          }}
        />
      ))}
    </button>
  );
}

export const BUTTON_COMPONENTS: ComponentItem[] = [
  {
    id: "btn-magnetic",
    title: "Magnetic Physics Button",
    category: "Buttons & CTAs",
    description: "Elastic cursor-attracted button with spring-damped return trajectory.",
    tags: ["framer-motion", "magnetic", "physics", "spring"],
    code: `<MagneticButton>Hover Magnetic</MagneticButton>`,
    demo: <MagneticButtonDemo />,
  },
  {
    id: "btn-border-beam",
    title: "Border Beam Button",
    category: "Buttons & CTAs",
    description: "Rotating continuous conical gradient beam traversing button perimeter.",
    tags: ["tailwind", "css-animation", "border-beam", "gradient"],
    code: `<BorderBeamButton>Border Beam</BorderBeamButton>`,
    demo: <BorderBeamButtonDemo />,
  },
  {
    id: "btn-cyber-glow",
    title: "Cyber Glow Neon Button",
    category: "Buttons & CTAs",
    description: "Intense solid cyan neon box-shadow and crisp micro-interaction press.",
    tags: ["neon", "cyberpunk", "box-shadow", "glow"],
    code: `<button className="px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-[#030712] text-cyan-400 border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]">Cyber Neon</button>`,
    demo: <CyberGlowButtonDemo />,
  },
  {
    id: "btn-shimmer",
    title: "Shimmer Sweep Button",
    category: "Buttons & CTAs",
    description: "Diagonal specular highlight sweeping across dark metallic surface on hover.",
    tags: ["hover", "specular", "shimmer", "metallic"],
    code: `<ShimmerButton>Shimmer Sweep</ShimmerButton>`,
    demo: <ShimmerButtonDemo />,
  },
  {
    id: "btn-glitch",
    title: "Chromatic Glitch Button",
    category: "Buttons & CTAs",
    description: "Split RGB chromatic aberration offset vibrating text effect.",
    tags: ["glitch", "rgb-split", "cyber", "vibration"],
    code: `<GlitchButton>Glitch RGB</GlitchButton>`,
    demo: <GlitchButtonDemo />,
  },
  {
    id: "btn-liquid-fill",
    title: "Liquid Wave Fill Button",
    category: "Buttons & CTAs",
    description: "Viscous colored wave fills the button container from bottom to top.",
    tags: ["liquid", "fill-transition", "wave", "creative"],
    code: `<LiquidButton>Liquid Fill</LiquidButton>`,
    demo: <LiquidFillButtonDemo />,
  },
  {
    id: "btn-elastic-press",
    title: "Mechanical Key Button",
    category: "Buttons & CTAs",
    description: "Tactile mechanical keyboard switch depression with 3D shadow collapse.",
    tags: ["skeuomorphic", "tactile", "3d", "keyboard"],
    code: `<MechanicalKeyButton>Mechanical Key</MechanicalKeyButton>`,
    demo: <ElasticKeyButtonDemo />,
  },
  {
    id: "btn-morphing-pill",
    title: "Morphing Action Pill",
    category: "Buttons & CTAs",
    description: "Expands dynamically with Framer Motion layout animations to reveal quick actions.",
    tags: ["framer-motion", "layout", "morphing", "pill"],
    code: `<MorphingPillButton />`,
    demo: <MorphingPillButtonDemo />,
  },
  {
    id: "btn-soundwave",
    title: "Audio Soundwave Button",
    category: "Buttons & CTAs",
    description: "Simulated equalizer frequency bars that animate rhythmically upon toggle.",
    tags: ["audio", "soundwave", "reactive", "equalizer"],
    code: `<SoundwaveButton />`,
    demo: <SoundwaveButtonDemo />,
  },
  {
    id: "btn-particle-burst",
    title: "Particle Burst Button",
    category: "Buttons & CTAs",
    description: "Radial micro-particle explosion animating outward along trigonometric angles.",
    tags: ["particles", "burst", "explosion", "physics"],
    code: `<ParticleBurstButton />`,
    demo: <ParticleBurstButtonDemo />,
  },
  {
    id: "btn-ripple",
    title: "Ripple Coordinate Button",
    category: "Buttons & CTAs",
    description: "Spawns concentric expanding ripple waves anchored to exact cursor click coordinate.",
    tags: ["ripple", "click-physics", "waves", "material"],
    code: `<RippleButton />`,
    demo: <RippleButtonDemo />,
  },
];

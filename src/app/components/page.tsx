"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

// Interactive Magnetic Button Component
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-accent-violet to-accent-cyan text-white shadow-glow hover:shadow-glow-cyan transition-shadow"
    >
      {children}
    </motion.button>
  );
}

// Interactive 3D Tilt Card Component
function TiltCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="w-full h-56 rounded-2xl glass-panel border border-white/10 p-6 flex flex-col justify-between cursor-pointer relative"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <Badge variant="cyan">3D Tilt Physics</Badge>
        <h4 className="font-mono text-base font-bold text-white mt-3">
          Spatial Parallax Card
        </h4>
        <p className="font-mono text-xs text-slate-400 mt-1">
          Moves smoothly based on cursor coordinates with Euler spring transforms.
        </p>
      </div>

      <div
        style={{ transform: "translateZ(20px)" }}
        className="flex items-center justify-between text-xs font-mono text-accent-cyan"
      >
        <span>Hover & tilt angle</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

export default function ComponentsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const componentDemos = [
    {
      title: "Magnetic Physics Button",
      category: "Mouse Interactions",
      description: "Elastic cursor-attracted button with spring-damped return trajectory.",
      code: `<MagneticButton>Magnetic Pull</MagneticButton>`,
      demo: (
        <div className="py-8 flex justify-center">
          <MagneticButton>Hover Near Me</MagneticButton>
        </div>
      ),
    },
    {
      title: "Interactive 3D Tilt Card",
      category: "3D Perspective",
      description: "Gyroscopic mouse tilt with isolated 3D z-depth layering.",
      code: `<TiltCard />`,
      demo: <TiltCard />,
    },
    {
      title: "Neon Pulse Glass Button",
      category: "Micro-Interactions",
      description: "Continuous subtle glow animation with reactive hover border dilation.",
      code: `<button className="glass-button px-6 py-3 rounded-xl border border-accent-pink/40 text-accent-pink shadow-glow-pink">Pulse CTA</button>`,
      demo: (
        <div className="py-8 flex justify-center">
          <button className="px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold glass-button border border-accent-pink/50 text-accent-pink shadow-glow-pink hover:bg-accent-pink/10 transition-all">
            Cyber Neon Button
          </button>
        </div>
      ),
    },
    {
      title: "Kinetic Floating Elements",
      category: "Spatial Motion",
      description: "Perpetual harmonic float with varying phase offsets.",
      code: `<motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 4 }}>Float</motion.div>`,
      demo: (
        <div className="py-8 flex justify-center gap-4">
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl glass-panel border border-accent-violet/40 flex items-center justify-center text-accent-violet font-mono text-xs shadow-glow"
          >
            F1
          </motion.div>
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl glass-panel border border-accent-cyan/40 flex items-center justify-center text-accent-cyan font-mono text-xs shadow-glow-cyan"
          >
            F2
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-12 space-y-4">
        <Badge variant="violet">Design System & Primitives</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-mono uppercase tracking-tight text-white">
          Reusable Motion Components
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Plug-and-play UI components built with Framer Motion, Tailwind CSS, and WebGL principles.
          Copy code directly or test the interactive physics live.
        </p>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {componentDemos.map((item, idx) => (
          <GlassCard key={item.title} glow="violet" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="cyan">{item.category}</Badge>
                <button
                  onClick={() => copyCode(item.code, idx)}
                  className="p-1.5 rounded-lg glass-button text-slate-400 hover:text-white flex items-center gap-1 text-[11px] font-mono"
                  title="Copy Component Code"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSX</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="font-mono text-lg font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-slate-400 mb-6">
                {item.description}
              </p>

              {/* Interactive Showcase Box */}
              <div className="rounded-xl bg-canvas-dark/60 border border-white/5 p-4 mb-4">
                {item.demo}
              </div>
            </div>

            {/* Code Snippet */}
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] text-accent-cyan overflow-x-auto">
              <code>{item.code}</code>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

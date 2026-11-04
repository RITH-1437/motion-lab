import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Zap,
  ShieldCheck,
  Activity,
  ArrowRight,
  Terminal,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 max-w-5xl mx-auto space-y-16">
      
      {/* Hero Intro */}
      <div className="space-y-4">
        <Badge variant="cyan">Manifesto & Architecture</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-mono uppercase tracking-tight text-[var(--foreground)]">
          About Motion Lab
        </h1>
        <p className="text-[var(--foreground)] opacity-90 text-base sm:text-lg leading-relaxed max-w-3xl">
          Motion Lab is an interactive creative technology laboratory engineered to bridge
          the gap between visual art, mathematical physics, and modern web software engineering.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard glow="violet">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent-violet/20 flex items-center justify-center text-accent-violet">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-lg font-bold text-[var(--foreground)]">
              Strict Engine Isolation
            </h3>
          </div>
          <p className="font-mono text-xs text-[var(--muted)] leading-relaxed">
            Never mix animation engines on the same property. Three.js handles GPU WebGL geometry,
            GSAP orchestrates scroll coordinate timelines, and Framer Motion powers UI layout springs.
          </p>
        </GlassCard>

        <GlassCard glow="cyan">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/20 flex items-center justify-center text-accent-cyan">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-lg font-bold text-[var(--foreground)]">
              60 FPS Performance Target
            </h3>
          </div>
          <p className="font-mono text-xs text-[var(--muted)] leading-relaxed">
            GPU-friendly techniques with instanced particle rendering, dynamic device pixel ratio (DPR)
            capping, and automatic resource disposal prevent memory leaks during view transitions.
          </p>
        </GlassCard>

        <GlassCard glow="pink">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent-pink/20 flex items-center justify-center text-accent-pink">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-lg font-bold text-[var(--foreground)]">
              Accessible by Design
            </h3>
          </div>
          <p className="font-mono text-xs text-[var(--muted)] leading-relaxed">
            Full compliance with <code className="text-accent-pink">prefers-reduced-motion</code>. When
            a user requests reduced motion, physics animations and camera dollies automatically damp down.
          </p>
        </GlassCard>

        <GlassCard glow="violet">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-mono text-lg font-bold text-[var(--foreground)]">
              Sandboxed Execution
            </h3>
          </div>
          <p className="font-mono text-xs text-[var(--muted)] leading-relaxed">
            Code entered in the Monaco editor executes inside an isolated iframe sandbox, ensuring
            user experimentation never disrupts application memory or security boundaries.
          </p>
        </GlassCard>
      </div>

      {/* Tech Stack Specs Table */}
      <div className="space-y-4">
        <h2 className="font-mono text-2xl font-bold uppercase text-[var(--foreground)]">
          Technology Specifications
        </h2>
        <div className="overflow-x-auto rounded-xl glass-panel border border-[var(--border)]">
          <table className="w-full text-left font-mono text-xs text-[var(--foreground)]">
            <thead className="bg-[var(--surface-elevated)] text-[var(--muted)] uppercase border-b border-[var(--border)]">
              <tr>
                <th className="py-3 px-4">Layer</th>
                <th className="py-3 px-4">Technology</th>
                <th className="py-3 px-4">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              <tr>
                <td className="py-3 px-4 text-accent-cyan font-bold">Framework</td>
                <td className="py-3 px-4">Next.js 14 (App Router) + TypeScript</td>
                <td className="py-3 px-4 text-[var(--muted)]">Application architecture, streaming, and routing</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-accent-cyan font-bold">3D Rendering</td>
                <td className="py-3 px-4">Three.js + React Three Fiber + Drei</td>
                <td className="py-3 px-4 text-[var(--muted)]">GPU-accelerated WebGL geometry & shaders</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-accent-cyan font-bold">Timelines</td>
                <td className="py-3 px-4">GSAP 3 + Lenis Smooth Scroll</td>
                <td className="py-3 px-4 text-[var(--muted)]">Inertial scrolling and choreography</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-accent-cyan font-bold">UI Physics</td>
                <td className="py-3 px-4">Framer Motion</td>
                <td className="py-3 px-4 text-[var(--muted)]">Magnetic buttons, spring cursors & glass transitions</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-accent-cyan font-bold">Live Editor</td>
                <td className="py-3 px-4">Monaco Editor + Sandboxed Iframe</td>
                <td className="py-3 px-4 text-[var(--muted)]">In-browser code authoring and execution</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-accent-cyan font-bold">State</td>
                <td className="py-3 px-4">Zustand</td>
                <td className="py-3 px-4 text-[var(--muted)]">Global playground parameter store</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Call to Action */}
      <div className="pt-8 flex items-center justify-between border-t border-white/10">
        <Link
          href="/playground"
          className="px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-accent-violet text-white shadow-glow hover:shadow-[0_0_24px_6px_rgba(139,92,246,0.55)] hover:bg-accent-violet/80 flex items-center gap-2 transition-all"
        >
          <span>Launch 3D Playground</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/explore"
          className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] hover:text-accent-cyan transition-colors"
        >
          View Experiments Gallery →
        </Link>
      </div>

    </div>
  );
}

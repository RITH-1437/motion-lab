"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Terminal, Activity, ArrowUpRight, Sparkles } from "lucide-react";

export function Footer() {
  const handleReplayIntro = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("motion-lab:replay-intro"));
    }
  };
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)] backdrop-blur-md pt-16 pb-12 overflow-hidden">
      {/* Neon top-edge line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-accent-violet/40" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Status */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg font-bold tracking-wider uppercase text-[var(--foreground)]">
                MOTION<span className="text-accent-cyan">LAB</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM ONLINE
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed">
              An open-ended digital physics & creative engineering sanctuary.
              Experience high-fidelity 3D meshes, procedural shaders, and fluid scroll-driven choreography.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2">
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-accent-cyan" />
                <span>GPU Acceleration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent-violet" />
                <span>Monaco / WebGL 2.0</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReplayIntro}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-xs font-mono text-[var(--muted)] hover:text-cyan-400 hover:border-cyan-400/60 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                title="Replay Cinematic Website Intro"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Replay Cinematic Intro</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--foreground)] font-semibold">
              Exploration
            </h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-accent-cyan transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Engine Architecture */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--foreground)] font-semibold">
              Core Tech
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Three.js",
                "React Three Fiber",
                "Drei",
                "GSAP 3",
                "Lenis Scroll",
                "Framer Motion",
                "Monaco Editor",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono glass-panel text-[var(--foreground)] border border-[var(--border)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

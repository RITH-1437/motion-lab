"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  GitCommit,
  BatteryCharging,
  Zap,
  Activity,
} from "lucide-react";
import { ComponentItem } from "./types";

// 1. Live Beacon Status Dot Demo
function LiveBeaconDemo() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span>SYSTEM OPERATIONAL</span>
    </div>
  );
}

// 2. Hologram Tech Spec Chip Demo
function HologramChipDemo() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/50 border border-cyan-400/60 text-cyan-300 font-mono text-xs shadow-[0_0_10px_rgba(34,211,238,0.25)]">
      <Zap className="w-3.5 h-3.5 text-cyan-400" />
      <span>GLSL-SHADERS v3.0</span>
    </div>
  );
}

// 3. Rotating Gradient Border Badge Demo
function RotatingBorderBadgeDemo() {
  return (
    <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#EC4899_0%,#8B5CF6_50%,#22D3EE_100%)]" />
      <span className="relative px-3 py-1 rounded-full bg-black text-[11px] font-mono text-white flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
        <span>PREMIUM LAB</span>
      </span>
    </div>
  );
}

// 4. Metric Trend Delta Pill Demo
function DeltaPillDemo() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-xs">
      <TrendingUp className="w-3.5 h-3.5 animate-bounce" />
      <span className="font-bold">+28.4%</span>
      <span className="text-[10px] text-emerald-500/70">FPS GAIN</span>
    </div>
  );
}

// 5. Cyberpunk Hash Tag Demo
function CyberHashDemo() {
  return (
    <span className="px-2.5 py-1 rounded bg-[#090D16] border-l-2 border-r border-t border-b border-l-cyan-400 border-zinc-800 text-xs font-mono text-cyan-400 hover:border-l-pink-400 hover:text-pink-400 transition-colors cursor-pointer">
      #ThreeJS_R3F
    </span>
  );
}

// 6. Notification Counter Badge Demo
function PulsingCounterDemo() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex items-center gap-2">
      <div className="relative p-2 rounded-xl glass-panel border border-[var(--border)]">
        <Activity className="w-4 h-4 text-accent-cyan" />
        <motion.span
          key={count}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-pink-500 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-glow-pink"
        >
          {count}
        </motion.span>
      </div>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="text-[10px] font-mono border border-[var(--border)] px-2 py-0.5 rounded text-[var(--muted)] hover:text-white"
      >
        Ping +1
      </button>
    </div>
  );
}

// 7. Ambient Gradient Shimmer Tag Demo
function ShimmerTagDemo() {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-mono text-white bg-gradient-to-r from-violet-600 to-pink-600 shadow-glow font-semibold">
      WebGL Native
    </span>
  );
}

// 8. Git Commit Hash Badge Demo
function CommitBadgeDemo() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs">
      <GitCommit className="w-3.5 h-3.5 text-accent-cyan" />
      <span className="text-zinc-500">commit:</span>
      <span className="text-accent-cyan">08fbc87</span>
    </div>
  );
}

// 9. Verified Security Shield Badge Demo
function ShieldVerifiedDemo() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-violet-950/40 border border-violet-500/50 text-violet-300 font-mono text-xs shadow-glow">
      <ShieldCheck className="w-4 h-4 text-accent-cyan" />
      <span>AUDITED & VERIFIED</span>
    </div>
  );
}

// 10. Battery Energy Level Pill Demo
function BatteryLevelDemo() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 font-mono text-xs text-zinc-300">
      <BatteryCharging className="w-4 h-4 text-emerald-400" />
      <span>98%</span>
      <div className="w-8 h-2 bg-zinc-800 rounded-full overflow-hidden flex">
        <span className="w-full bg-emerald-400 rounded-full" />
      </div>
    </div>
  );
}

export const BADGE_COMPONENTS: ComponentItem[] = [
  {
    id: "bdg-live-beacon",
    title: "Live Beacon Status Dot",
    category: "Badges & Tags",
    description: "Ping-animated ripple effect marking active telemetry online status.",
    tags: ["beacon", "ping", "live", "status"],
    code: `<LiveBeaconBadge />`,
    demo: <LiveBeaconDemo />,
  },
  {
    id: "bdg-hologram-chip",
    title: "Hologram Tech Spec Chip",
    category: "Badges & Tags",
    description: "Monospace cyan glass pill with subtle ambient box-shadow glow.",
    tags: ["hologram", "chip", "spec", "cyan"],
    code: `<HologramChip />`,
    demo: <HologramChipDemo />,
  },
  {
    id: "bdg-rotating-border",
    title: "Rotating Gradient Badge",
    category: "Badges & Tags",
    description: "Conical multi-color gradient laser orbiting perimeter of pill.",
    tags: ["conic", "gradient", "border", "badge"],
    code: `<RotatingBorderBadge />`,
    demo: <RotatingBorderBadgeDemo />,
  },
  {
    id: "bdg-delta-pill",
    title: "Metric Trend Delta Pill",
    category: "Badges & Tags",
    description: "Positive performance delta badge with animated bouncing trend icon.",
    tags: ["trend", "delta", "metrics", "performance"],
    code: `<DeltaPill />`,
    demo: <DeltaPillDemo />,
  },
  {
    id: "bdg-cyber-hash",
    title: "Cyberpunk Tag Chip",
    category: "Badges & Tags",
    description: "Chamfered monospace tag with dynamic accent left-border.",
    tags: ["cyberpunk", "tag", "chip", "hash"],
    code: `<CyberHashTag />`,
    demo: <CyberHashDemo />,
  },
  {
    id: "bdg-pulsing-counter",
    title: "Notification Counter Badge",
    category: "Badges & Tags",
    description: "Numeric counter bubble that pops and bounces upon count update.",
    tags: ["notification", "counter", "badge", "spring"],
    code: `<PulsingCounter />`,
    demo: <PulsingCounterDemo />,
  },
  {
    id: "bdg-gradient-shimmer",
    title: "Ambient Gradient Shimmer Tag",
    category: "Badges & Tags",
    description: "Sleek dual-color pill badge with violet and pink neon saturation.",
    tags: ["gradient", "shimmer", "tag", "saturation"],
    code: `<GradientShimmerTag />`,
    demo: <ShimmerTagDemo />,
  },
  {
    id: "bdg-terminal-commit",
    title: "Git Commit Hash Badge",
    category: "Badges & Tags",
    description: "Developer tooling pill displaying branch commit telemetry.",
    tags: ["git", "commit", "terminal", "devtools"],
    code: `<CommitBadge />`,
    demo: <CommitBadgeDemo />,
  },
  {
    id: "bdg-shield-verified",
    title: "Verified Security Shield",
    category: "Badges & Tags",
    description: "Security audit compliance pill with glowing checkmark shield.",
    tags: ["security", "verified", "shield", "audit"],
    code: `<ShieldVerifiedBadge />`,
    demo: <ShieldVerifiedDemo />,
  },
  {
    id: "bdg-battery-level",
    title: "Battery Energy Level Pill",
    category: "Badges & Tags",
    description: "Real-time energy capacity indicator with battery bar gauge.",
    tags: ["battery", "energy", "level", "gauge"],
    code: `<BatteryLevelPill />`,
    demo: <BatteryLevelDemo />,
  },
];

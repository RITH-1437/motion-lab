"use client";

import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  Home,
  Sliders,
  Code2,
  Sparkles,
  ChevronRight,
  Plus,
  Compass,
} from "lucide-react";
import { ComponentItem } from "./types";

// 1. macOS Dock Magnification Demo
function DockDemo() {
  const mouseX = useMotionValue(Infinity);
  const items = [
    { icon: Home, label: "Home" },
    { icon: Sliders, label: "Play" },
    { icon: Code2, label: "Code" },
    { icon: Sparkles, label: "Labs" },
  ];

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-[var(--border)] shadow-xl"
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            whileHover={{ scale: 1.35, y: -4 }}
            className="w-9 h-9 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-accent-cyan cursor-pointer transition-colors hover:border-accent-cyan shadow-md"
          >
            <Icon className="w-4 h-4" />
          </motion.div>
        );
      })}
    </div>
  );
}

// 2. Floating Glass Island Navbar Demo
function FloatingIslandDemo() {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-accent-cyan/40 shadow-glow-cyan">
      <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
      <span className="font-mono text-xs font-bold text-[var(--foreground)]">MOTION LAB</span>
      <div className="h-3 w-px bg-[var(--border)]" />
      <span className="font-mono text-[11px] text-[var(--muted)] hover:text-white cursor-pointer">
        Explore
      </span>
      <span className="font-mono text-[11px] text-[var(--muted)] hover:text-white cursor-pointer">
        Presets
      </span>
    </div>
  );
}

// 3. Sliding Active Pill Tabs Demo
function MorphingTabsDemo() {
  const tabs = ["Overview", "Physics", "Shaders"];
  const [active, setActive] = useState("Overview");

  return (
    <div className="flex p-1 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] font-mono text-xs">
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative px-4 py-1.5 rounded-lg transition-colors ${
              isActive ? "text-cyan-300 font-semibold" : "text-[var(--muted)] hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 rounded-lg bg-cyan-950/80 border border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}

// 4. Radial Fan-Out Menu Demo
function RadialMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-28 h-20 flex items-center justify-center">
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-accent-violet text-white shadow-glow flex items-center justify-center z-20 hover:scale-105 active:scale-95 transition-transform"
      >
        <Plus className={`w-4 h-4 transition-transform ${open ? "rotate-45" : ""}`} />
      </button>
      {open && (
        <>
          <motion.button
            initial={{ scale: 0, x: 0 }}
            animate={{ scale: 1, x: -36 }}
            className="absolute z-10 w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-400 flex items-center justify-center shadow-glow-cyan"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </motion.button>
          <motion.button
            initial={{ scale: 0, x: 0 }}
            animate={{ scale: 1, x: 36 }}
            className="absolute z-10 w-8 h-8 rounded-full bg-pink-950 border border-pink-400 text-pink-400 flex items-center justify-center shadow-glow-pink"
          >
            <Code2 className="w-3.5 h-3.5" />
          </motion.button>
        </>
      )}
    </div>
  );
}

// 5. Magnetic Breadcrumb Trail Demo
function BreadcrumbDemo() {
  const paths = ["Playground", "Solar System", "Earth Detail"];
  return (
    <div className="flex items-center gap-1.5 font-mono text-xs">
      {paths.map((p, i) => (
        <React.Fragment key={p}>
          <span
            className={`cursor-pointer hover:text-accent-cyan transition-colors ${
              i === paths.length - 1 ? "text-accent-cyan font-bold" : "text-[var(--muted)]"
            }`}
          >
            {p}
          </span>
          {i < paths.length - 1 && (
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// 6. Segmented Spring Switch Demo
function SegmentedSwitchDemo() {
  const [val, setVal] = useState("2D");
  return (
    <div className="relative flex p-1 rounded-xl bg-zinc-900 border border-zinc-700 font-mono text-xs">
      {["2D", "3D", "VR"].map((opt) => (
        <button
          key={opt}
          onClick={() => setVal(opt)}
          className={`relative px-4 py-1 rounded-lg z-10 transition-colors ${
            val === opt ? "text-white font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          {val === opt && (
            <motion.div
              layoutId="segThumb"
              className="absolute inset-0 bg-accent-violet rounded-lg shadow-glow -z-10"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          {opt}
        </button>
      ))}
    </div>
  );
}

// 7. Morphing Hamburger to Cross Demo
function HamburgerMorphDemo() {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-10 h-10 rounded-xl glass-panel border border-[var(--border)] flex flex-col items-center justify-center gap-1.5 p-2.5"
    >
      <span
        className={`w-5 h-0.5 bg-accent-cyan transition-transform duration-300 ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`w-5 h-0.5 bg-accent-cyan transition-opacity duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`w-5 h-0.5 bg-accent-cyan transition-transform duration-300 ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
}

// 8. Sliding Hover Underline Demo
function UnderlineSliderDemo() {
  const [hovered, setHovered] = useState("Mesh");
  const items = ["Mesh", "Particles", "Lighting"];

  return (
    <div className="flex gap-4 font-mono text-xs">
      {items.map((item) => (
        <div
          key={item}
          onMouseEnter={() => setHovered(item)}
          className="relative py-1 cursor-pointer"
        >
          <span className={hovered === item ? "text-accent-cyan font-bold" : "text-[var(--muted)]"}>
            {item}
          </span>
          {hovered === item && (
            <motion.div
              layoutId="hoverUnderline"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cyan shadow-glow-cyan"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// 9. Expandable Pagination Dots Demo
function PaginationDotsDemo() {
  const [active, setActive] = useState(1);
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((i) => {
        const isActive = active === i;
        return (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            animate={{ width: isActive ? 24 : 8 }}
            className={`h-2 rounded-full transition-colors ${
              isActive
                ? "bg-accent-cyan shadow-glow-cyan"
                : "bg-zinc-700 hover:bg-zinc-500"
            }`}
          />
        );
      })}
    </div>
  );
}

// 10. Sci-Fi Corner Navigation HUD Demo
function CornerHudDemo() {
  return (
    <div className="relative p-3 rounded-xl border border-cyan-500/40 bg-black/60 font-mono text-xs text-cyan-300 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
        <span>SECTOR: 07-ALPHA</span>
      </div>
      <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400 text-[10px] text-cyan-400 shadow-[0_0_8px_#22D3EE]">
        ONLINE
      </span>
    </div>
  );
}

export const NAVIGATION_COMPONENTS: ComponentItem[] = [
  {
    id: "nav-macos-dock",
    title: "macOS Magnification Dock",
    category: "Navigation & Menus",
    description: "Icon magnification spring animation based on cursor proximity curve.",
    tags: ["macos", "dock", "magnification", "spring"],
    code: `<MacOsDock items={items} />`,
    demo: <DockDemo />,
  },
  {
    id: "nav-floating-island",
    title: "Floating Glass Island Navbar",
    category: "Navigation & Menus",
    description: "Detached pill navbar with frosted glass fill and neon border beacon.",
    tags: ["navbar", "island", "glass", "floating"],
    code: `<FloatingIslandNavbar />`,
    demo: <FloatingIslandDemo />,
  },
  {
    id: "nav-morphing-tabs",
    title: "Sliding Active Pill Tabs",
    category: "Navigation & Menus",
    description: "Smooth sliding background indicator tracking active tab selection.",
    tags: ["tabs", "sliding-pill", "framer-motion", "layoutId"],
    code: `<MorphingTabs />`,
    demo: <MorphingTabsDemo />,
  },
  {
    id: "nav-radial-menu",
    title: "Radial Action Fan-Out Menu",
    category: "Navigation & Menus",
    description: "Circular action buttons burst outward in radial geometry when triggered.",
    tags: ["radial", "menu", "burst", "actions"],
    code: `<RadialMenu />`,
    demo: <RadialMenuDemo />,
  },
  {
    id: "nav-magnetic-breadcrumbs",
    title: "Magnetic Breadcrumb Trail",
    category: "Navigation & Menus",
    description: "Hierarchical path navigation with active segment highlighting.",
    tags: ["breadcrumbs", "navigation", "trail", "path"],
    code: `<Breadcrumbs paths={paths} />`,
    demo: <BreadcrumbDemo />,
  },
  {
    id: "nav-segmented-control",
    title: "Segmented Spring Switch",
    category: "Navigation & Menus",
    description: "Tactile multi-option control with spring-damped thumb slider.",
    tags: ["segmented", "switch", "spring", "selector"],
    code: `<SegmentedSwitch />`,
    demo: <SegmentedSwitchDemo />,
  },
  {
    id: "nav-hamburger-morph",
    title: "Morphing Hamburger Icon",
    category: "Navigation & Menus",
    description: "Standard 3-bar hamburger lines morph seamlessly into an X icon.",
    tags: ["hamburger", "morph", "icon", "mobile"],
    code: `<HamburgerMorph />`,
    demo: <HamburgerMorphDemo />,
  },
  {
    id: "nav-underline-slider",
    title: "Sliding Hover Underline",
    category: "Navigation & Menus",
    description: "Active underline indicator glides smoothly beneath hovered item.",
    tags: ["underline", "slider", "glide", "hover"],
    code: `<UnderlineSlider />`,
    demo: <UnderlineSliderDemo />,
  },
  {
    id: "nav-pagination-dots",
    title: "Expandable Pagination Dots",
    category: "Navigation & Menus",
    description: "Dots expand into horizontal pills upon selection with smooth spring ease.",
    tags: ["pagination", "dots", "expandable", "carousel"],
    code: `<PaginationDots />`,
    demo: <PaginationDotsDemo />,
  },
  {
    id: "nav-corner-hud",
    title: "Sci-Fi Corner HUD Navigation",
    category: "Navigation & Menus",
    description: "Futuristic telemetry brackets with live status pill and sector coordinates.",
    tags: ["hud", "sci-fi", "corner", "telemetry"],
    code: `<CornerHud />`,
    demo: <CornerHudDemo />,
  },
];

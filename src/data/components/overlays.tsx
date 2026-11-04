"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  Command,
  HelpCircle,
  AlertTriangle,
  ChevronDown,
  Plus,
  Share2,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { ComponentItem } from "./types";

// 1. Cyber HUD Toast Notification Demo
function ToastDemo() {
  const [show, setShow] = useState(false);

  const trigger = () => {
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={trigger}
        className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-glow-cyan"
      >
        Trigger HUD Toast
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            className="w-56 p-2.5 rounded-xl bg-black/90 border border-cyan-400/80 shadow-2xl font-mono text-xs flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between text-cyan-300">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulation Saved</span>
              </span>
              <X onClick={() => setShow(false)} className="w-3 h-3 cursor-pointer" />
            </div>
            <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-full bg-cyan-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 2. Glass Backdrop Dialog Modal Demo
function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-1.5 rounded-lg font-mono text-xs bg-accent-violet text-white shadow-glow"
      >
        Open Glass Modal
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-2xl glass-panel border border-violet-500/50 p-5 font-mono shadow-2xl space-y-3"
          >
            <div className="flex justify-between items-center text-violet-300 border-b border-white/10 pb-2">
              <h4 className="font-bold">Orbit Physics Engine</h4>
              <X onClick={() => setOpen(false)} className="w-4 h-4 cursor-pointer" />
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Real-time Runge-Kutta 4th order gravitational orbital mechanics initialized.
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-cyan-400 text-black text-xs font-bold"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// 3. Edge Drawer Slide Sheet Demo
function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-1.5 rounded-lg font-mono text-xs border border-zinc-700 bg-zinc-900 text-zinc-200"
      >
        Slide Drawer
      </button>
      {open && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-3 mt-2 rounded-xl border border-cyan-400/50 bg-black/80 font-mono text-xs text-cyan-300 flex items-center gap-3"
        >
          <span>Telemetry Drawer Active</span>
          <X onClick={() => setOpen(false)} className="w-3.5 h-3.5 cursor-pointer" />
        </motion.div>
      )}
    </div>
  );
}

// 4. Spring Arrow Tooltip Bubble Demo
function TooltipDemo() {
  const [hover, setHover] = useState(false);
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="px-3 py-1.5 rounded-lg glass-button text-xs font-mono text-[var(--foreground)] cursor-help flex items-center gap-1.5"
      >
        <HelpCircle className="w-3.5 h-3.5 text-accent-cyan" />
        <span>Hover for Info</span>
      </div>
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-400 text-cyan-300 text-[10px] font-mono whitespace-nowrap shadow-glow-cyan z-30"
          >
            Rayleigh scattering enabled
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-cyan-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 5. CMD+K Command Palette Demo
function CommandPaletteDemo() {
  return (
    <div className="w-full max-w-xs p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 font-mono text-xs space-y-2">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-1.5 text-zinc-400">
        <Command className="w-3.5 h-3.5 text-accent-cyan" />
        <span className="text-zinc-200">Go to planet...</span>
      </div>
      <div className="space-y-1 text-[11px]">
        <div className="p-1 rounded bg-violet-950/60 text-violet-300 font-semibold flex justify-between">
          <span>Earth (Detail Mode)</span>
          <span className="text-zinc-500">↵</span>
        </div>
        <div className="p-1 text-zinc-400 hover:text-white">Jupiter (Great Red Spot)</div>
      </div>
    </div>
  );
}

// 6. Floating Context Menu Demo
function ContextMenuDemo() {
  return (
    <div className="w-40 p-1.5 rounded-xl bg-zinc-900 border border-zinc-700 font-mono text-xs space-y-1 shadow-2xl">
      <div className="px-2 py-1 rounded hover:bg-violet-950 hover:text-violet-300 cursor-pointer flex items-center justify-between">
        <span>Inspect Code</span>
        <Share2 className="w-3 h-3 text-zinc-500" />
      </div>
      <div className="px-2 py-1 rounded hover:bg-pink-950 hover:text-pink-300 cursor-pointer flex items-center justify-between">
        <span>Reset Presets</span>
        <Trash2 className="w-3 h-3 text-zinc-500" />
      </div>
    </div>
  );
}

// 7. Neon Alert Strip Banner Demo
function AlertBannerDemo() {
  return (
    <div className="w-full max-w-xs p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/60 font-mono text-xs text-amber-300 flex items-center gap-2.5 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
      <span className="text-[11px] leading-tight">Solar flare telemetry spike detected on coronal ring.</span>
    </div>
  );
}

// 8. Confirmation Popover Demo
function PopoverDemo() {
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setConfirming(!confirming)}
        className="px-3 py-1.5 rounded-lg font-mono text-xs text-pink-400 border border-pink-500/40 bg-pink-950/40"
      >
        Reset Simulation
      </button>
      {confirming && (
        <div className="mt-2 p-2 rounded-xl bg-black border border-zinc-700 font-mono text-[11px] flex items-center gap-2">
          <span className="text-zinc-300">Confirm?</span>
          <button
            onClick={() => setConfirming(false)}
            className="px-2 py-0.5 rounded bg-pink-600 text-white font-bold"
          >
            Yes
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}

// 9. Cascade Dropdown Menu Demo
function DropdownDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-1.5 rounded-lg glass-button font-mono text-xs flex items-center gap-2 text-[var(--foreground)]"
      >
        <span>View Shaders</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 mt-1.5 w-36 rounded-xl bg-zinc-900 border border-zinc-700 p-1 font-mono text-xs z-30 shadow-xl space-y-0.5"
        >
          <div className="p-1.5 rounded hover:bg-cyan-950 hover:text-cyan-300 cursor-pointer">
            Rayleigh Atmosphere
          </div>
          <div className="p-1.5 rounded hover:bg-violet-950 hover:text-violet-300 cursor-pointer">
            Fluid Vertex Noise
          </div>
        </motion.div>
      )}
    </div>
  );
}

// 10. Speed Dial Floating Action Button Demo
function FabDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-accent-pink text-white shadow-glow-pink flex items-center justify-center"
      >
        <Plus className={`w-4 h-4 transition-transform ${open ? "rotate-45" : ""}`} />
      </button>
      {open && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: -38, opacity: 1 }}
          className="absolute w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-glow"
        >
          <Bell className="w-3.5 h-3.5" />
        </motion.div>
      )}
    </div>
  );
}

export const OVERLAY_COMPONENTS: ComponentItem[] = [
  {
    id: "ovr-toast",
    title: "Cyber HUD Toast Notification",
    category: "Feedback & Overlays",
    description: "Slide-in alert toast with self-draining progress bar timer.",
    tags: ["toast", "notification", "hud", "timer"],
    code: `<HudToast title="Simulation Saved" duration={3000} />`,
    demo: <ToastDemo />,
  },
  {
    id: "ovr-modal-backdrop",
    title: "Glass Backdrop Dialog Modal",
    category: "Feedback & Overlays",
    description: "Scale-up entrance dialog with heavy frosted blur backdrop curtain.",
    tags: ["modal", "dialog", "backdrop", "glass"],
    code: `<GlassModal open={open} onClose={() => setOpen(false)} />`,
    demo: <ModalDemo />,
  },
  {
    id: "ovr-drawer-sheet",
    title: "Edge Drawer Slide Sheet",
    category: "Feedback & Overlays",
    description: "Smooth sliding telemetry panel with spring gesture exit.",
    tags: ["drawer", "sheet", "slide", "edge"],
    code: `<DrawerSheet open={open} />`,
    demo: <DrawerDemo />,
  },
  {
    id: "ovr-tooltip",
    title: "Spring Arrow Tooltip Bubble",
    category: "Feedback & Overlays",
    description: "Floating indicator bubble with spring physics anchored to target element.",
    tags: ["tooltip", "bubble", "spring", "anchor"],
    code: `<Tooltip content="Rayleigh scattering" />`,
    demo: <TooltipDemo />,
  },
  {
    id: "ovr-command-palette",
    title: "CMD+K Command Palette",
    category: "Feedback & Overlays",
    description: "Spotlight keyboard navigation launcher with instant keyword search.",
    tags: ["command-palette", "cmdk", "spotlight", "keyboard"],
    code: `<CommandPalette items={items} />`,
    demo: <CommandPaletteDemo />,
  },
  {
    id: "ovr-context-menu",
    title: "Floating Action Context Menu",
    category: "Feedback & Overlays",
    description: "Contextual actions dropdown appearing on mouse right-click coordinates.",
    tags: ["context-menu", "dropdown", "actions", "coordinates"],
    code: `<ContextMenu options={options} />`,
    demo: <ContextMenuDemo />,
  },
  {
    id: "ovr-alert-banner",
    title: "Neon Alert Strip Banner",
    category: "Feedback & Overlays",
    description: "High-priority warning banner with amber neon glow border.",
    tags: ["alert", "banner", "warning", "strip"],
    code: `<AlertBanner message="Telemetry spike" />`,
    demo: <AlertBannerDemo />,
  },
  {
    id: "ovr-popover",
    title: "Interactive Confirm Popover",
    category: "Feedback & Overlays",
    description: "Compact confirmation bubble preventing accidental destructive triggers.",
    tags: ["popover", "confirm", "action", "prompt"],
    code: `<ConfirmPopover onConfirm={() => reset()} />`,
    demo: <PopoverDemo />,
  },
  {
    id: "ovr-dropdown",
    title: "Cascade Dropdown Menu",
    category: "Feedback & Overlays",
    description: "Smooth vertical cascading menu with micro-interaction hover states.",
    tags: ["dropdown", "cascade", "menu", "select"],
    code: `<CascadeDropdown items={items} />`,
    demo: <DropdownDemo />,
  },
  {
    id: "ovr-fab-menu",
    title: "Speed Dial Floating Action Button",
    category: "Feedback & Overlays",
    description: "Floating action button with animated spring satellite triggers.",
    tags: ["fab", "floating-action", "speed-dial", "spring"],
    code: `<FabSpeedDial actions={actions} />`,
    demo: <FabDemo />,
  },
];

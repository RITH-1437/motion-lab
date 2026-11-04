"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wifi,
} from "lucide-react";
import { ComponentItem } from "./types";

// 1. Radial Speedometer Gauge Demo
function RadialGaugeDemo() {
  const [val, setVal] = useState(78);
  const strokeDashoffset = 251.2 - (251.2 * val) / 100;

  return (
    <div
      onClick={() => setVal((v) => (v >= 90 ? 45 : v + 15))}
      className="flex flex-col items-center cursor-pointer select-none"
      title="Click to adjust GPU load"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#1F2937"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="#22D3EE"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="251.2"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="shadow-[0_0_10px_#22D3EE]"
          />
        </svg>
        <div className="absolute font-mono flex flex-col items-center">
          <span className="text-base font-bold text-white">{val}%</span>
          <span className="text-[8px] text-cyan-400 uppercase">GPU LOAD</span>
        </div>
      </div>
    </div>
  );
}

// 2. Step Milestone Connected Bar Demo
function StepProgressDemo() {
  const [step, setStep] = useState(2);
  const steps = ["Geometry", "Materials", "Physics", "Render"];

  return (
    <div className="w-full max-w-xs font-mono text-xs">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 -z-0" />
        {steps.map((s, i) => (
          <div
            key={s}
            onClick={() => setStep(i)}
            className="flex flex-col items-center gap-1 cursor-pointer z-10"
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                i <= step
                  ? "bg-accent-violet text-white shadow-glow"
                  : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {i + 1}
            </div>
            <span className="text-[9px] text-zinc-400">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Real-Time Server Ping Meter Demo
function ServerPingDemo() {
  return (
    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Wifi className="w-4 h-4 text-emerald-400" />
        <span className="text-zinc-300">tokyo-edge-01</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">14ms</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>
    </div>
  );
}

// 4. Stat Trend Sparkline Card Demo
function SparklineCardDemo() {
  return (
    <div className="p-3 rounded-xl glass-panel border border-[var(--border)] font-mono text-xs space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] text-[var(--muted)]">FRAME RENDER LATENCY</span>
          <h4 className="text-lg font-bold text-accent-cyan">16.6ms</h4>
        </div>
        <span className="text-emerald-400 text-[10px] font-bold">60.2 FPS</span>
      </div>
      <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 30">
        <path
          d="M0,25 Q20,15 40,20 T80,10 T100,5"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="2.5"
          className="shadow-[0_0_10px_#22D3EE]"
        />
      </svg>
    </div>
  );
}

// 5. Monospace Diagnostic Telemetry Grid Demo
function MatrixGridDemo() {
  return (
    <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs">
      <div>
        <span className="text-[10px] text-zinc-500">VERTICES</span>
        <p className="font-bold text-cyan-300">142,800</p>
      </div>
      <div>
        <span className="text-[10px] text-zinc-500">DRAW CALLS</span>
        <p className="font-bold text-pink-400">12 / frame</p>
      </div>
      <div>
        <span className="text-[10px] text-zinc-500">VRAM USAGE</span>
        <p className="font-bold text-violet-300">84.2 MB</p>
      </div>
      <div>
        <span className="text-[10px] text-zinc-500">SHADERS</span>
        <p className="font-bold text-emerald-400">Compiled OK</p>
      </div>
    </div>
  );
}

// 6. Comparison Before/After Split Slider Demo
function ComparisonSliderDemo() {
  const [sliderPos, setSliderPos] = useState(50);
  return (
    <div className="relative w-full max-w-xs h-28 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 flex select-none">
      <div
        className="absolute inset-0 bg-violet-950/60 p-3 font-mono text-xs text-violet-300 flex items-center justify-start"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <span>WIREFRAME MESH</span>
      </div>
      <div
        className="absolute inset-0 bg-cyan-950/60 p-3 font-mono text-xs text-cyan-300 flex items-center justify-end"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <span>PHYSICAL SHADER</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
      />
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none z-10"
        style={{ left: `${sliderPos}%` }}
      />
    </div>
  );
}

// 7. Vertical Timeline Event Node Trail Demo
function TimelineNodeDemo() {
  return (
    <div className="space-y-3 font-mono text-xs pl-2 border-l border-cyan-400/50">
      <div className="relative pl-3">
        <span className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
        <span className="text-cyan-300 font-bold">14:02:18</span> - Coronal Mass Ejection
      </div>
      <div className="relative pl-3">
        <span className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-violet-400" />
        <span className="text-zinc-400">14:00:00</span> - Planetary Alignment
      </div>
    </div>
  );
}

// 8. Animated Fluid Battery Capacity Meter Demo
function FluidBatteryDemo() {
  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <div className="w-16 h-8 rounded-lg border-2 border-cyan-400 p-0.5 flex overflow-hidden shadow-glow-cyan">
        <motion.div
          animate={{ width: ["30%", "85%", "60%", "95%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="h-full bg-cyan-400 rounded"
        />
      </div>
      <span className="text-cyan-300 font-bold">CHARGING 95%</span>
    </div>
  );
}

// 9. Network Packet Activity Stream Demo
function PacketActivityDemo() {
  return (
    <div className="flex items-center gap-1.5 p-3 rounded-xl bg-black border border-zinc-800 font-mono text-xs">
      <span className="text-zinc-500">PACKET:</span>
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className="w-2.5 h-2.5 rounded bg-cyan-400 shadow-[0_0_6px_#22D3EE]"
        />
      ))}
      <span className="text-cyan-400 ml-2 font-bold">1.2 GB/s</span>
    </div>
  );
}

// 10. Segmented Radial Donut Chart Demo
function DonutChartDemo() {
  return (
    <div className="flex items-center gap-4 font-mono text-xs">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="15"
            stroke="#22D3EE"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray="60 40"
          />
          <circle
            cx="18"
            cy="18"
            r="15"
            stroke="#EC4899"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray="25 75"
            strokeDashoffset="-60"
          />
          <circle
            cx="18"
            cy="18"
            r="15"
            stroke="#8B5CF6"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray="15 85"
            strokeDashoffset="-85"
          />
        </svg>
      </div>
      <div className="space-y-0.5 text-[10px]">
        <div className="text-cyan-400">■ Textures 60%</div>
        <div className="text-pink-400">■ Geometries 25%</div>
        <div className="text-violet-400">■ Shaders 15%</div>
      </div>
    </div>
  );
}

export const DATA_DISPLAY_COMPONENTS: ComponentItem[] = [
  {
    id: "dat-circular-gauge",
    title: "Radial Speedometer Gauge",
    category: "Data Displays",
    description: "Animated SVG circular stroke dash-array meter indicating system load.",
    tags: ["radial", "gauge", "speedometer", "svg"],
    code: `<RadialSpeedGauge value={78} label="GPU LOAD" />`,
    demo: <RadialGaugeDemo />,
  },
  {
    id: "dat-step-progress",
    title: "Connected Step Milestone Bar",
    category: "Data Displays",
    description: "Multi-stage pipeline indicator with active milestone transitions.",
    tags: ["milestone", "progress", "steps", "pipeline"],
    code: `<StepProgress steps={steps} active={2} />`,
    demo: <StepProgressDemo />,
  },
  {
    id: "dat-server-ping",
    title: "Real-Time Server Ping Meter",
    category: "Data Displays",
    description: "Low-latency network ping indicator with live pulse beacon.",
    tags: ["ping", "latency", "network", "server"],
    code: `<ServerPingMeter server="tokyo-edge-01" latency={14} />`,
    demo: <ServerPingDemo />,
  },
  {
    id: "dat-sparkline-card",
    title: "Stat Trend Sparkline Card",
    category: "Data Displays",
    description: "High-impact KPI telemetry with integrated smooth SVG sparkline curve.",
    tags: ["sparkline", "chart", "metrics", "kpi"],
    code: `<SparklineCard metric="16.6ms" label="LATENCY" />`,
    demo: <SparklineCardDemo />,
  },
  {
    id: "dat-matrix-grid",
    title: "Monospace Telemetry Grid",
    category: "Data Displays",
    description: "Multi-field diagnostics telemetry dashboard for WebGL render metrics.",
    tags: ["telemetry", "diagnostics", "matrix", "grid"],
    code: `<TelemetryGrid metrics={metrics} />`,
    demo: <MatrixGridDemo />,
  },
  {
    id: "dat-compare-slider",
    title: "Before/After Comparison Slider",
    category: "Data Displays",
    description: "Draggable interactive split view comparing two render shader modes.",
    tags: ["slider", "comparison", "split-view", "before-after"],
    code: `<ComparisonSlider />`,
    demo: <ComparisonSliderDemo />,
  },
  {
    id: "dat-timeline-node",
    title: "Timeline Event Node Trail",
    category: "Data Displays",
    description: "Sequential chronological event nodes connected by glowing path line.",
    tags: ["timeline", "events", "nodes", "trail"],
    code: `<TimelineNodeTrail events={events} />`,
    demo: <TimelineNodeDemo />,
  },
  {
    id: "dat-battery-meter",
    title: "Fluid Battery Capacity Meter",
    category: "Data Displays",
    description: "Animated charging fluid level within chamfered battery container.",
    tags: ["battery", "fluid", "charging", "meter"],
    code: `<FluidBatteryMeter />`,
    demo: <FluidBatteryDemo />,
  },
  {
    id: "dat-network-packet",
    title: "Network Packet Activity Stream",
    category: "Data Displays",
    description: "Simulated packet transmission stream with pulsing status blocks.",
    tags: ["packets", "network", "stream", "activity"],
    code: `<PacketActivityStream speed="1.2 GB/s" />`,
    demo: <PacketActivityDemo />,
  },
  {
    id: "dat-donut-breakdown",
    title: "Segmented Donut Memory Chart",
    category: "Data Displays",
    description: "Multi-color radial donut breakdown showing GPU resource allocation.",
    tags: ["donut", "chart", "breakdown", "memory"],
    code: `<DonutChart breakdown={data} />`,
    demo: <DonutChartDemo />,
  },
];

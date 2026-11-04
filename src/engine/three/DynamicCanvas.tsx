"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Loader2 } from "lucide-react";

export const DynamicSceneCanvas = dynamic(
  () => import("./SceneCanvas").then((mod) => mod.SceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center gap-3 bg-canvas-surface/20 rounded-2xl border border-white/5 backdrop-blur-sm">
        <Loader2 className="w-8 h-8 text-accent-cyan animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
          Initializing WebGL Context...
        </span>
      </div>
    ),
  }
);

"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { usePlaygroundStore, PRESETS } from "@/store/usePlaygroundStore";
import { DynamicSceneCanvas } from "@/engine/three/DynamicCanvas";
import { Badge } from "@/components/ui/Badge";
import {
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Sliders,
  Terminal,
  Laptop,
} from "lucide-react";

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-slate-500 bg-canvas-dark">
      Loading Monaco Editor...
    </div>
  ),
});

export default function EditorPage() {
  const {
    currentPreset,
    config,
    isPlaying,
    setPreset,
    updateConfig,
    setIsPlaying,
    resetConfig,
  } = usePlaygroundStore();

  const [activeCodeTab, setActiveCodeTab] = useState<"js" | "css">("js");
  const [copied, setCopied] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);

  // Editable code state
  const [jsCode, setJsCode] = useState<string>(
    currentPreset.defaultCode?.js || `// Three.js Procedural Mesh
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function Mesh({ speed = 1.0 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.5 * speed;
    ref.current.rotation.y += delta * 0.7 * speed;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshPhysicalMaterial color="#8B5CF6" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}`
  );

  const [cssCode, setCssCode] = useState<string>(
    currentPreset.defaultCode?.css || `.motion-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #080A12;
  border: 1px solid rgba(34, 211, 238, 0.3);
  box-shadow: 0 0 30px rgba(34, 211, 238, 0.15);
}`
  );

  const handleCopy = () => {
    const textToCopy = activeCodeTab === "js" ? jsCode : cssCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    if (currentPreset.defaultCode) {
      setJsCode(currentPreset.defaultCode.js);
      setCssCode(currentPreset.defaultCode.css);
    }
  };

  // Safe Sandboxed HTML iframe for live execution
  const sandboxedSrcDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; overflow: hidden; background: #080A12; color: #fff; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh; }
            ${cssCode}
          </style>
        </head>
        <body>
          <div class="motion-container">
            <div style="text-align: center; padding: 20px;">
              <div style="font-size: 14px; color: #22D3EE; margin-bottom: 8px;">[SANDBOX EXECUTION ENVIRONMENT]</div>
              <div style="font-size: 12px; color: #94A3B8;">Previewing compiled animation container safely</div>
              <div style="margin-top: 16px; width: 80px; height: 80px; border-radius: 50%; background: #8B5CF6; border: 2px solid #22D3EE; box-shadow: 0 0 24px rgba(34, 211, 238, 0.6); animation: spin 4s linear infinite; margin-left: auto; margin-right: auto;"></div>
              <style>
                @keyframes spin { 100% { transform: rotate(360deg); } }
              </style>
            </div>
          </div>
        </body>
      </html>
    `;
  }, [cssCode]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-canvas-dark overflow-hidden font-mono text-xs">
      
      {/* Top Studio Bar */}
      <div className="h-12 border-b border-[var(--border)] bg-[var(--surface)]/80 px-4 sm:px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <Badge variant="pink">Split-Screen Workspace</Badge>
          <span className="text-[var(--muted)] hidden sm:inline">|</span>
          <select
            value={currentPreset.id}
            onChange={(e) => {
              const match = PRESETS.find((p) => p.id === e.target.value);
              if (match) {
                setPreset(match);
                if (match.defaultCode) {
                  setJsCode(match.defaultCode.js);
                  setCssCode(match.defaultCode.css);
                }
              }
            }}
            className="bg-[var(--surface-elevated)] px-2.5 py-1 rounded text-[var(--foreground)] border border-[var(--border)] focus:outline-none focus:border-accent-pink"
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id} className="bg-[var(--surface)] text-[var(--foreground)]">
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSandbox(!showSandbox)}
            className={`px-3 py-1 rounded flex items-center gap-1.5 transition-colors ${
              showSandbox
                ? "bg-accent-violet text-white font-bold"
                : "glass-button text-[var(--foreground)] hover:border-accent-violet"
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>{showSandbox ? "Show 3D View" : "Run Sandboxed Iframe"}</span>
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1 rounded glass-button text-[var(--foreground)] flex items-center gap-1"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-accent-cyan" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-500" />
            )}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
        </div>
      </div>

      {/* 3-Column Split Screen: Left (Settings) | Center (Live 3D View) | Right (Monaco Editor) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* PANEL 1: LEFT CONFIGURATION (W-72) */}
        <div className="w-full lg:w-72 border-r border-[var(--border)] bg-[var(--surface)]/70 p-4 overflow-y-auto space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <span className="font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-accent-cyan" />
              Settings
            </span>
            <button
              onClick={resetConfig}
              className="text-[var(--muted)] hover:text-[var(--foreground)]"
              title="Reset parameters"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[var(--muted)] mb-1">
                <span>Speed</span>
                <span className="text-accent-cyan">{config.speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={config.speed}
                onChange={(e) => updateConfig({ speed: parseFloat(e.target.value) })}
                className="w-full accent-accent-cyan cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[var(--muted)] mb-1">
                <span>Scale</span>
                <span className="text-accent-cyan">{config.scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.2"
                step="0.1"
                value={config.scale}
                onChange={(e) => updateConfig({ scale: parseFloat(e.target.value) })}
                className="w-full accent-accent-cyan cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[var(--muted)] mb-1">
                <span>Distortion</span>
                <span className="text-accent-cyan">{config.distortion.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.5"
                step="0.05"
                value={config.distortion}
                onChange={(e) => updateConfig({ distortion: parseFloat(e.target.value) })}
                className="w-full accent-accent-cyan cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-[var(--border)] space-y-2">
              <div className="flex justify-between items-center text-[var(--foreground)]">
                <span>Wireframe</span>
                <button
                  onClick={() => updateConfig({ wireframe: !config.wireframe })}
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    config.wireframe ? "bg-accent-pink text-white font-bold" : "bg-[var(--surface-elevated)] text-[var(--muted)] border border-[var(--border)]"
                  }`}
                >
                  {config.wireframe ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: CENTER VIEWPORT */}
        <div className="flex-1 relative bg-canvas-dark flex items-center justify-center min-h-[350px]">
          {showSandbox ? (
            <div className="w-full h-full p-4 flex flex-col">
              <div className="px-3 py-1.5 rounded-t-lg bg-canvas-elevated border border-white/10 flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
                  sandboxed-iframe://runtime-env
                </span>
                <span className="text-emerald-400">Sandbox Isolation Active</span>
              </div>
              <iframe
                title="Sandboxed code runner"
                srcDoc={sandboxedSrcDoc}
                sandbox="allow-scripts"
                className="w-full flex-1 rounded-b-lg border border-t-0 border-white/10 bg-canvas-dark"
              />
            </div>
          ) : (
            <div className="w-full h-full relative">
              <DynamicSceneCanvas
                presetId={currentPreset.id}
                config={config}
                isPlaying={isPlaying}
                enableOrbit={true}
                showParticles={true}
                autoRotate={false}
              />
              <div className="absolute top-4 left-4 pointer-events-none px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-slate-400">
                Live 3D Canvas • Drag to Orbit
              </div>
            </div>
          )}
        </div>

        {/* PANEL 3: RIGHT CODE EDITOR (MONACO) */}
        <div className="w-full lg:w-[480px] border-t lg:border-t-0 lg:border-l border-[var(--border)] flex flex-col bg-canvas-dark">
          
          {/* Editor Header & Tabs */}
          <div className="h-10 border-b border-[var(--border)] bg-[var(--surface)]/90 px-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveCodeTab("js")}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  activeCodeTab === "js"
                    ? "bg-accent-cyan/15 text-accent-cyan font-bold"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                JavaScript / R3F
              </button>
              <button
                onClick={() => setActiveCodeTab("css")}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  activeCodeTab === "css"
                    ? "bg-accent-pink/15 text-accent-pink font-bold"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                CSS / Shaders
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded glass-button text-[var(--foreground)] flex items-center gap-1"
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetCode}
                className="p-1 rounded glass-button text-[var(--muted)] hover:text-[var(--foreground)]"
                title="Reset code to default"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Monaco Editor Component */}
          <div className="flex-1 w-full h-full relative">
            <MonacoEditor
              height="100%"
              language={activeCodeTab === "js" ? "javascript" : "css"}
              theme="vs-dark"
              value={activeCodeTab === "js" ? jsCode : cssCode}
              onChange={(value) => {
                if (value !== undefined) {
                  if (activeCodeTab === "js") setJsCode(value);
                  else setCssCode(value);
                }
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 12,
                fontFamily: "var(--font-geist-mono), monospace",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                lineNumbers: "on",
                padding: { top: 12 },
              }}
            />
          </div>

          {/* Editor Status Bar */}
          <div className="h-7 border-t border-white/10 bg-canvas-elevated px-3 flex items-center justify-between text-[10px] text-slate-500">
            <span>Language: {activeCodeTab === "js" ? "JavaScript (ES6)" : "CSS"}</span>
            <span>UTF-8 • Monaco Editor</span>
          </div>

        </div>

      </div>
    </div>
  );
}

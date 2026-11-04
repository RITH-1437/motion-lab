"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { ProceduralMesh } from "./ProceduralMesh";
import { ParticleSwarm } from "./ParticleSwarm";
import { SceneLighting } from "./SceneLighting";
import { AnimationPresetConfig } from "@/types";

interface SceneCanvasProps {
  presetId?: string;
  config: AnimationPresetConfig;
  isPlaying?: boolean;
  enableOrbit?: boolean;
  showParticles?: boolean;
  autoRotate?: boolean;
  className?: string;
}

export function SceneCanvas({
  presetId = "torus-quantum",
  config,
  isPlaying = true,
  enableOrbit = true,
  showParticles = true,
  autoRotate = false,
  className = "w-full h-full",
}: SceneCanvasProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: config.cameraFov || 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneLighting config={config} />

          <Float
            speed={1.5 * config.speed}
            rotationIntensity={0.6 * config.rotationSpeed}
            floatIntensity={0.8}
          >
            <ProceduralMesh
              type={presetId}
              config={config}
              isPlaying={isPlaying}
            />
          </Float>

          {showParticles && (
            <ParticleSwarm config={config} isPlaying={isPlaying} />
          )}

          {enableOrbit && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate={autoRotate}
              autoRotateSpeed={1.0 * config.rotationSpeed}
              minDistance={2.5}
              maxDistance={8}
              dampingFactor={0.05}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

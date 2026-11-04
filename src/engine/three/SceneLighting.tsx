"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AnimationPresetConfig } from "@/types";

export function SceneLighting({ config }: { config: AnimationPresetConfig }) {
  const pointerLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (pointerLightRef.current && state?.pointer) {
      pointerLightRef.current.position.x = state.pointer.x * 4;
      pointerLightRef.current.position.y = state.pointer.y * 4;
      pointerLightRef.current.position.z = 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5 * config.lightIntensity} />

      {/* Primary key light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2 * config.lightIntensity}
        color={config.primaryColor}
      />

      {/* Secondary rim light */}
      <directionalLight
        position={[-5, -4, -4]}
        intensity={1.5 * config.lightIntensity}
        color={config.secondaryColor}
      />

      {/* Accent backlight */}
      <pointLight
        position={[0, -3, 2]}
        intensity={1.8 * config.lightIntensity}
        color={config.accentColor}
        distance={10}
      />

      {/* Interactive mouse-following light */}
      <pointLight
        ref={pointerLightRef}
        position={[0, 0, 3]}
        intensity={2.0 * config.lightIntensity}
        color={config.secondaryColor}
        distance={8}
      />
    </>
  );
}

"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getSunTexture } from "../textures/proceduralTextures";
import { PlanetLabel } from "./PlanetLabels";

interface SunProps {
  radius?: number;
  isPlaying?: boolean;
  showLabels?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function Sun({
  radius = 3.4,
  isPlaying = true,
  showLabels = true,
  isSelected = false,
  onSelect,
}: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef1 = useRef<THREE.Mesh>(null);
  const coronaRef2 = useRef<THREE.Mesh>(null);

  const sunTexture = useMemo(() => getSunTexture(), []);

  useFrame((state, delta) => {
    if (!isPlaying) return;

    // Slow solar differential rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }

    // Pulsing ethereal coronal halos
    const time = state.clock.elapsedTime;
    if (coronaRef1.current) {
      const scale1 = 1.08 + Math.sin(time * 1.8) * 0.03;
      coronaRef1.current.scale.set(scale1, scale1, scale1);
      coronaRef1.current.rotation.z += delta * 0.04;
    }

    if (coronaRef2.current) {
      const scale2 = 1.25 + Math.cos(time * 1.2) * 0.04;
      coronaRef2.current.scale.set(scale2, scale2, scale2);
      coronaRef2.current.rotation.z -= delta * 0.02;
    }
  });

  return (
    <group name="celestial-sun">
      {/* Sun Label */}
      {showLabels && (
        <PlanetLabel
          name="The Sun"
          color="#FDB813"
          yOffset={radius + 1.2}
          isSelected={isSelected}
          onClick={onSelect}
        />
      )}

      {/* Primary Illuminating Light Source for Entire Solar System */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3.5}
        color="#FFF6D5"
        distance={250}
        decay={1.2}
      />
      <ambientLight intensity={0.15} />

      {/* Core Solar Surface */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          map={sunTexture}
          color="#FFD700"
        />
      </mesh>

      {/* Inner Coronal Atmosphere Glow */}
      <mesh ref={coronaRef1}>
        <sphereGeometry args={[radius * 1.06, 32, 32]} />
        <meshBasicMaterial
          color="#FF8C00"
          transparent
          opacity={0.35}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Ethereal Solar Corona / Plasma Halo */}
      <mesh ref={coronaRef2}>
        <sphereGeometry args={[radius * 1.22, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarFieldProps {
  count?: number;
}

export function StarField({ count = 2800 }: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Large spherical celestial sphere
      const radius = 180 + Math.random() * 250;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Star spectral classes: White, Cyan, Yellow, Red-Orange
      const colorRatio = Math.random();
      if (colorRatio > 0.85) {
        col[i * 3] = 0.6; // Cyan blue
        col[i * 3 + 1] = 0.85;
        col[i * 3 + 2] = 1.0;
      } else if (colorRatio > 0.7) {
        col[i * 3] = 1.0; // Warm amber
        col[i * 3 + 1] = 0.85;
        col[i * 3 + 2] = 0.5;
      } else {
        col[i * 3] = 0.95; // Crisp diamond white
        col[i * 3 + 1] = 0.95;
        col[i * 3 + 2] = 1.0;
      }
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      // Extremely subtle background cosmic drift
      pointsRef.current.rotation.y += delta * 0.002;
    }
  });

  return (
    <points key={count} ref={pointsRef}>
      <bufferGeometry key={count}>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.1}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation={false}
      />
    </points>
  );
}

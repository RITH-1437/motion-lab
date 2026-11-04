"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AnimationPresetConfig } from "@/types";

interface ParticleSwarmProps {
  config: AnimationPresetConfig;
  isPlaying?: boolean;
}

export function ParticleSwarm({ config, isPlaying = true }: ParticleSwarmProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = config.particleCount || 1500;

  // Generate particle positions and base colors
  const [positions, originalPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color(config.primaryColor);
    const color2 = new THREE.Color(config.secondaryColor);
    const color3 = new THREE.Color(config.accentColor);

    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      // Color interpolation
      const mixRatio = Math.random();
      const mixedColor = mixRatio < 0.5 
        ? color1.clone().lerp(color2, mixRatio * 2) 
        : color2.clone().lerp(color3, (mixRatio - 0.5) * 2);

      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }

    return [pos, orig, col];
  }, [count, config.primaryColor, config.secondaryColor, config.accentColor]);

  useFrame((state, delta) => {
    if (!isPlaying || !pointsRef.current) return;

    const time = state.clock.elapsedTime * 0.5 * config.speed;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const currentPos = posAttr.array as Float32Array;

    // Orbit rotation
    pointsRef.current.rotation.y += delta * 0.15 * config.rotationSpeed * config.speed;
    pointsRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;

    // Pointer influence
    const mouseX = state.pointer.x * 2.5;
    const mouseY = state.pointer.y * 2.5;

    for (let i = 0; i < count; i += 3) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      const wave = Math.sin(time * 2 + ox * 0.5 + oz * 0.5) * (0.2 * config.distortion);

      currentPos[idx] = ox + wave + (mouseX - ox) * 0.015;
      currentPos[idx + 1] = oy + Math.cos(time * 1.5 + oy) * 0.15 + (mouseY - oy) * 0.015;
      currentPos[idx + 2] = oz + wave;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points key={count} ref={pointsRef}>
      <bufferGeometry key={count}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038 * config.scale}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

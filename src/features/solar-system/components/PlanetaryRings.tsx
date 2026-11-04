"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { getSaturnRingTexture } from "../textures/proceduralTextures";

interface PlanetaryRingsProps {
  innerRadius: number;
  outerRadius: number;
  color?: string;
  tiltDeg?: number;
}

export function PlanetaryRings({
  innerRadius,
  outerRadius,
  color = "#CDB38B",
  tiltDeg = 26.7,
}: PlanetaryRingsProps) {
  const ringTexture = useMemo(() => getSaturnRingTexture(), []);

  return (
    <group rotation={[THREE.MathUtils.degToRad(tiltDeg), 0, 0]}>
      {/* Ring Mesh with double sided transparent material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshStandardMaterial
          map={ringTexture}
          color={color}
          side={THREE.DoubleSide}
          transparent
          opacity={0.88}
          roughness={0.7}
          metalness={0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

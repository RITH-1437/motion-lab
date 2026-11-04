"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AsteroidBeltProps {
  isPlaying?: boolean;
  speedMultiplier?: number;
  spacingMultiplier?: number;
}

export function AsteroidBelt({
  isPlaying = true,
  speedMultiplier = 1.0,
  spacingMultiplier = 1.0,
}: AsteroidBeltProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 1200;

  // Precompute orbital distances, angles, and scales for each asteroid
  const asteroids = useMemo(() => {
    const data = [];
    const minRadius = 20.0 * spacingMultiplier;
    const maxRadius = 24.5 * spacingMultiplier;

    for (let i = 0; i < count; i++) {
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.15 + Math.random() * 0.1) * (20 / radius);
      const yOffset = (Math.random() - 0.5) * 1.8;
      const scale = 0.04 + Math.random() * 0.08;
      const rotSpeedX = (Math.random() - 0.5) * 1.5;
      const rotSpeedY = (Math.random() - 0.5) * 1.5;

      data.push({
        radius,
        angle,
        speed,
        yOffset,
        scale,
        rotSpeedX,
        rotSpeedY,
      });
    }
    return data;
  }, [count, spacingMultiplier]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize instance matrices once
  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      const ast = asteroids[i];
      const x = Math.cos(ast.angle) * ast.radius;
      const z = Math.sin(ast.angle) * ast.radius;

      dummy.position.set(x, ast.yOffset, z);
      dummy.scale.set(ast.scale, ast.scale, ast.scale);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [asteroids, count, dummy]);

  // Orbit rotation loop
  useFrame((_, delta) => {
    if (!isPlaying || !meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const ast = asteroids[i];
      ast.angle += delta * ast.speed * speedMultiplier * 0.4;
      const x = Math.cos(ast.angle) * ast.radius;
      const z = Math.sin(ast.angle) * ast.radius;

      dummy.position.set(x, ast.yOffset, z);
      dummy.scale.set(ast.scale, ast.scale, ast.scale);
      dummy.rotation.x += delta * ast.rotSpeedX;
      dummy.rotation.y += delta * ast.rotSpeedY;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow
      receiveShadow
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#8C827A"
        roughness={0.9}
        metalness={0.2}
      />
    </instancedMesh>
  );
}

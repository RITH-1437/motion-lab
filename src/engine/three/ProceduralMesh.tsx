"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AnimationPresetConfig } from "@/types";

interface ProceduralMeshProps {
  type: string;
  config: AnimationPresetConfig;
  isPlaying?: boolean;
}

export function ProceduralMesh({ type, config, isPlaying = true }: ProceduralMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);

  // Custom vertex deformation for fluid/liquid wave effect
  const customUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDistortion: { value: config.distortion },
      uSpeed: { value: config.speed },
    }),
    [config.distortion, config.speed]
  );

  useFrame((state, delta) => {
    if (!isPlaying) return;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4 * config.rotationSpeed * config.speed;
      meshRef.current.rotation.y += delta * 0.6 * config.rotationSpeed * config.speed;

      // Gentle floating bob
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5 * config.speed) * 0.15;
    }

    customUniforms.uTime.value = state.clock.elapsedTime;
    customUniforms.uDistortion.value = config.distortion;
    customUniforms.uSpeed.value = config.speed;
  });

  const renderGeometry = () => {
    switch (type) {
      case "particle-nebula":
        return null; // Handled by ParticleSwarm component
      case "fluid-wave":
        return <torusGeometry args={[1.3, 0.45, 64, 128]} />;
      case "icosahedron-crystal":
        return <icosahedronGeometry args={[1.4, 1]} />;
      case "magnetic-cursor-orb":
        return <sphereGeometry args={[1.2, 64, 64]} />;
      case "scroll-choreo":
        return <octahedronGeometry args={[1.5, 2]} />;
      case "svg-morph-shapes":
        return <dodecahedronGeometry args={[1.3, 1]} />;
      case "kinetic-typography":
        return <cylinderGeometry args={[1.1, 1.1, 1.8, 32]} />;
      case "torus-quantum":
      default:
        return <torusKnotGeometry args={[1.0, 0.36, 180, 36, 2, 3]} />;
    }
  };

  if (type === "particle-nebula") return null;

  return (
    <mesh
      ref={meshRef}
      scale={config.scale}
      castShadow
      receiveShadow
    >
      {renderGeometry()}
      <meshPhysicalMaterial
        ref={materialRef}
        color={config.primaryColor}
        emissive={config.secondaryColor}
        emissiveIntensity={0.25 * config.intensity}
        roughness={config.roughness}
        metalness={config.metalness}
        wireframe={config.wireframe}
        clearcoat={0.9}
        clearcoatRoughness={0.1}
        reflectivity={0.9}
      />
    </mesh>
  );
}

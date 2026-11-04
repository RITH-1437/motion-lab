"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PlanetData } from "../types";
import { getPlanetTexture } from "../textures/proceduralTextures";
import { PlanetaryRings } from "./PlanetaryRings";
import { PlanetLabel } from "./PlanetLabels";

interface PlanetProps {
  data: PlanetData;
  isPlaying?: boolean;
  speedMultiplier?: number;
  spacingMultiplier?: number;
  planetScale?: number;
  showRings?: boolean;
  showLabels?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function Planet({
  data,
  isPlaying = true,
  speedMultiplier = 1.0,
  spacingMultiplier = 1.0,
  planetScale = 1.0,
  showRings = true,
  showLabels = true,
  isSelected = false,
  onSelect,
}: PlanetProps) {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => getPlanetTexture(data.id, data.color), [data.id, data.color]);

  const axialTiltRad = THREE.MathUtils.degToRad(data.axialTiltDeg);
  const orbitDist = data.orbitDistance * spacingMultiplier;
  const scaledRadius = data.visualRadius * planetScale;

  useFrame((_, delta) => {
    if (!isPlaying) return;

    // Revolution around the Sun
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y +=
        delta * 0.12 * data.orbitSpeedFactor * speedMultiplier;
    }

    // Axial rotation
    if (planetMeshRef.current) {
      const rotVelocity = (24 / Math.abs(data.rotationPeriodHours || 24)) * 0.4;
      const direction = data.rotationPeriodHours < 0 ? -1 : 1;
      planetMeshRef.current.rotation.y += delta * rotVelocity * speedMultiplier * direction;
    }
  });

  return (
    <group ref={orbitGroupRef}>
      {/* Position at calculated orbital radius with celestial identifier */}
      <group position={[orbitDist, 0, 0]} name={`celestial-${data.id}`}>
        {/* Planet Floating Label */}
        {showLabels && (
          <PlanetLabel
            name={data.name}
            color={data.color}
            yOffset={scaledRadius + 0.6}
            isSelected={isSelected}
            onClick={onSelect}
          />
        )}

        {/* Axial Tilt */}
        <group rotation={[0, 0, -axialTiltRad]}>
          {/* Planet Sphere Mesh */}
          <mesh
            ref={planetMeshRef}
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[scaledRadius, 48, 48]} />
            <meshStandardMaterial
              map={texture}
              color={data.color}
              roughness={0.7}
              metalness={0.15}
            />
          </mesh>

          {/* Planetary Ring System (Saturn, Uranus) */}
          {data.hasRings && showRings && data.ringInnerRadius && data.ringOuterRadius && (
            <PlanetaryRings
              innerRadius={data.ringInnerRadius * planetScale}
              outerRadius={data.ringOuterRadius * planetScale}
              color={data.ringColor}
              tiltDeg={data.axialTiltDeg}
            />
          )}
        </group>
      </group>
    </group>
  );
}

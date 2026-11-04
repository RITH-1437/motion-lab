"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  getEarthDayTexture,
  getEarthNightTexture,
  getEarthCloudsTexture,
  getMoonTexture,
} from "../textures/proceduralTextures";
import { PlanetLabel } from "./PlanetLabels";

interface EarthProps {
  radius?: number;
  orbitDistance?: number;
  orbitSpeedFactor?: number;
  isPlaying?: boolean;
  speedMultiplier?: number;
  showClouds?: boolean;
  showAtmosphere?: boolean;
  showMoon?: boolean;
  showLabels?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function Earth({
  radius = 1.0,
  orbitDistance = 13.5,
  orbitSpeedFactor = 1.0,
  isPlaying = true,
  speedMultiplier = 1.0,
  showClouds = true,
  showAtmosphere = true,
  showMoon = true,
  showLabels = true,
  isSelected = false,
  onSelect,
}: EarthProps) {
  const earthOrbitGroupRef = useRef<THREE.Group>(null);
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const cloudsMeshRef = useRef<THREE.Mesh>(null);
  const moonOrbitGroupRef = useRef<THREE.Group>(null);
  const moonMeshRef = useRef<THREE.Mesh>(null);

  const dayTexture = useMemo(() => getEarthDayTexture(), []);
  const nightTexture = useMemo(() => getEarthNightTexture(), []);
  const cloudsTexture = useMemo(() => getEarthCloudsTexture(), []);
  const moonTexture = useMemo(() => getMoonTexture(), []);

  // Earth axial tilt: 23.44 degrees
  const axialTiltRad = THREE.MathUtils.degToRad(23.44);

  useFrame((_, delta) => {
    if (!isPlaying) return;

    // Orbit around Sun
    if (earthOrbitGroupRef.current) {
      earthOrbitGroupRef.current.rotation.y += delta * 0.12 * orbitSpeedFactor * speedMultiplier;
    }

    // Daily self-rotation (1 full rotation)
    if (earthMeshRef.current) {
      earthMeshRef.current.rotation.y += delta * 0.45 * speedMultiplier;
    }

    // Dynamic swirling cloud layer moving independently
    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.rotation.y += delta * 0.52 * speedMultiplier;
    }

    // Moon revolution around Earth (tidally locked)
    if (moonOrbitGroupRef.current) {
      moonOrbitGroupRef.current.rotation.y += delta * 0.85 * speedMultiplier;
    }
    if (moonMeshRef.current) {
      moonMeshRef.current.rotation.y += delta * 0.85 * speedMultiplier;
    }
  });

  return (
    // Revolution around the Sun
    <group ref={earthOrbitGroupRef}>
      {/* Position at Earth's orbital distance with celestial identifier */}
      <group position={[orbitDistance, 0, 0]} name="celestial-earth">
        {/* Floating Label */}
        {showLabels && (
          <PlanetLabel
            name="Earth"
            color="#2B82C9"
            yOffset={radius + 0.6}
            isSelected={isSelected}
            onClick={onSelect}
          />
        )}

        {/* Tilt on Earth's 23.44 degree axis */}
        <group rotation={[0, 0, -axialTiltRad]}>
          {/* Main Earth Surface Mesh (Day/Night shaders & specular ocean) */}
          <mesh
            ref={earthMeshRef}
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[radius, 64, 64]} />
            <meshStandardMaterial
              map={dayTexture}
              emissiveMap={nightTexture}
              emissive="#FFDD88"
              emissiveIntensity={0.65}
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>

          {/* Animated Atmospheric Cloud Layer */}
          {showClouds && (
            <mesh ref={cloudsMeshRef}>
              <sphereGeometry args={[radius * 1.02, 64, 64]} />
              <meshStandardMaterial
                map={cloudsTexture}
                transparent
                opacity={0.7}
                blending={THREE.NormalBlending}
                depthWrite={false}
              />
            </mesh>
          )}

          {/* Blue Rayleigh Scattering Atmosphere Glow */}
          {showAtmosphere && (
            <mesh>
              <sphereGeometry args={[radius * 1.15, 32, 32]} />
              <meshBasicMaterial
                color="#38BDF8"
                transparent
                opacity={0.18}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}

          {/* Natural Satellite: The Moon */}
          {showMoon && (
            <group ref={moonOrbitGroupRef}>
              <mesh
                ref={moonMeshRef}
                position={[radius * 2.8, 0.2, 0]}
                castShadow
                receiveShadow
              >
                <sphereGeometry args={[radius * 0.27, 32, 32]} />
                <meshStandardMaterial
                  map={moonTexture}
                  roughness={0.9}
                  metalness={0.05}
                />
              </mesh>
            </group>
          )}
        </group>
      </group>
    </group>
  );
}

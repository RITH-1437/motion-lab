"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AnimationPresetConfig } from "@/types";
import {
  getEarthDayTexture,
  getMoonTexture,
} from "@/features/solar-system/textures/proceduralTextures";

interface SolarSystemPreviewProps {
  config: AnimationPresetConfig;
  isPlaying?: boolean;
}

export function SolarSystemPreview({ config, isPlaying = true }: SolarSystemPreviewProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  // Individual orbit group references for smooth orbital revolution
  const mercuryOrbit = useRef<THREE.Group>(null);
  const venusOrbit = useRef<THREE.Group>(null);
  const earthOrbit = useRef<THREE.Group>(null);
  const moonOrbit = useRef<THREE.Group>(null);
  const marsOrbit = useRef<THREE.Group>(null);
  const jupiterOrbit = useRef<THREE.Group>(null);
  const saturnOrbit = useRef<THREE.Group>(null);
  const uranusOrbit = useRef<THREE.Group>(null);
  const neptuneOrbit = useRef<THREE.Group>(null);

  const saturnRingRef = useRef<THREE.Mesh>(null);
  const earthDayTex = useMemo(() => getEarthDayTexture(), []);
  const moonTex = useMemo(() => getMoonTexture(), []);

  // Scaled orbits suited for the preview viewport
  const orbits = useMemo(
    () => ({
      mercury: 1.1,
      venus: 1.55,
      earth: 2.1,
      moon: 0.35,
      mars: 2.65,
      jupiter: 3.35,
      saturn: 4.15,
      uranus: 4.9,
      neptune: 5.6,
    }),
    []
  );

  useFrame((state, delta) => {
    if (!isPlaying) return;
    const spd = config.speed * 0.9;

    // Sun slow axial rotation & pulsing corona
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.3 * spd;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= delta * 0.2 * spd;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.05;
      coronaRef.current.scale.set(pulse, pulse, pulse);
    }

    // Planetary orbital revolutions
    if (mercuryOrbit.current) mercuryOrbit.current.rotation.y += delta * 2.4 * spd;
    if (venusOrbit.current) venusOrbit.current.rotation.y += delta * 1.7 * spd;
    if (earthOrbit.current) earthOrbit.current.rotation.y += delta * 1.3 * spd;
    if (moonOrbit.current) moonOrbit.current.rotation.y += delta * 4.2 * spd;
    if (marsOrbit.current) marsOrbit.current.rotation.y += delta * 0.95 * spd;
    if (jupiterOrbit.current) jupiterOrbit.current.rotation.y += delta * 0.65 * spd;
    if (saturnOrbit.current) saturnOrbit.current.rotation.y += delta * 0.45 * spd;
    if (uranusOrbit.current) uranusOrbit.current.rotation.y += delta * 0.3 * spd;
    if (neptuneOrbit.current) neptuneOrbit.current.rotation.y += delta * 0.22 * spd;

    // Gentle global system tilt
    if (groupRef.current) {
      groupRef.current.rotation.x = 0.35;
      groupRef.current.rotation.z = -0.1;
    }
  });

  // Helper for rendering glowing faint orbit lines
  const renderOrbitPath = (radius: number, color = "#22D3EE") => {
    const points: THREE.Vector3[] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(lineGeo, lineMat);
    return <primitive object={line} key={`orbit-line-${radius}`} />;
  };

  const scale = (config.scale || 1.0) * 0.85;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Central Point Light radiating from Sun */}
      <pointLight color="#FFF2A3" intensity={3.5} distance={25} decay={2} />
      <ambientLight intensity={0.25} />

      {/* Sun Core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#FF9900" />
      </mesh>

      {/* Sun Corona Plasma Glow */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[0.68, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbit Rings */}
      {renderOrbitPath(orbits.mercury, "#94A3B8")}
      {renderOrbitPath(orbits.venus, "#FBBF24")}
      {renderOrbitPath(orbits.earth, "#38BDF8")}
      {renderOrbitPath(orbits.mars, "#F87171")}
      {renderOrbitPath(orbits.jupiter, "#FDE047")}
      {renderOrbitPath(orbits.saturn, "#FCD34D")}
      {renderOrbitPath(orbits.uranus, "#67E8F9")}
      {renderOrbitPath(orbits.neptune, "#60A5FA")}

      {/* Mercury */}
      <group ref={mercuryOrbit}>
        <mesh position={[orbits.mercury, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#A1A1AA" roughness={0.8} />
        </mesh>
      </group>

      {/* Venus */}
      <group ref={venusOrbit}>
        <mesh position={[orbits.venus, 0, 0]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#EAB308" roughness={0.5} />
        </mesh>
      </group>

      {/* Earth + Moon System */}
      <group ref={earthOrbit}>
        <group position={[orbits.earth, 0, 0]}>
          {/* Earth Body with lush green continents & turquoise water */}
          <mesh>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial map={earthDayTex} roughness={0.3} />
          </mesh>
          {/* Atmospheric Halo */}
          <mesh>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
              side={THREE.BackSide}
            />
          </mesh>
          {/* Orbiting Moon with White + Gray Lunar Surface */}
          <group ref={moonOrbit}>
            <mesh position={[orbits.moon, 0.05, 0]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial map={moonTex} color="#FFFFFF" roughness={0.9} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Mars */}
      <group ref={marsOrbit}>
        <mesh position={[orbits.mars, 0, 0]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#DC2626" roughness={0.7} />
        </mesh>
      </group>

      {/* Jupiter */}
      <group ref={jupiterOrbit}>
        <mesh position={[orbits.jupiter, 0, 0]}>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshStandardMaterial color="#D97706" roughness={0.6} />
        </mesh>
      </group>

      {/* Saturn + Ring */}
      <group ref={saturnOrbit}>
        <group position={[orbits.saturn, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.26, 24, 24]} />
            <meshStandardMaterial color="#CA8A04" roughness={0.6} />
          </mesh>
          {/* Planetary Ring */}
          <mesh ref={saturnRingRef} rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[0.34, 0.58, 32]} />
            <meshBasicMaterial
              color="#FDE68A"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      </group>

      {/* Uranus */}
      <group ref={uranusOrbit}>
        <mesh position={[orbits.uranus, 0, 0]}>
          <sphereGeometry args={[0.2, 20, 20]} />
          <meshStandardMaterial color="#06B6D4" roughness={0.4} />
        </mesh>
      </group>

      {/* Neptune */}
      <group ref={neptuneOrbit}>
        <mesh position={[orbits.neptune, 0, 0]}>
          <sphereGeometry args={[0.19, 20, 20]} />
          <meshStandardMaterial color="#1D4ED8" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

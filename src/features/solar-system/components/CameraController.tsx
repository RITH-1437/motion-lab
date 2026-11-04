"use client";

import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { useSolarSimulation } from "../hooks/useSolarSimulation";
import { PLANETS_DATA } from "../config/planets";

export function CameraController() {
  const { camera, scene } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { config, targetPosition, targetLookAt } = useSolarSimulation();
  const { selectedPlanetId } = config;

  const isTransitioningRef = useRef(false);
  const targetCamPos = useRef(new THREE.Vector3(0, 45, 65));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    isTransitioningRef.current = true;
  }, [selectedPlanetId, targetPosition, targetLookAt]);

  const tmpVec = useRef(new THREE.Vector3());
  const planetWorldPos = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;

    if (selectedPlanetId === "sun") {
      targetX = 0;
      targetY = 0;
      targetZ = 0;
      if (isTransitioningRef.current && targetPosition) {
        targetCamPos.current.set(...targetPosition);
      }
    } else {
      const targetObj = scene.getObjectByName(`celestial-${selectedPlanetId}`);
      if (targetObj) {
        targetObj.getWorldPosition(planetWorldPos.current);
        targetX = planetWorldPos.current.x;
        targetY = planetWorldPos.current.y;
        targetZ = planetWorldPos.current.z;

        if (isTransitioningRef.current) {
          const planet = PLANETS_DATA.find((p) => p.id === selectedPlanetId);
          const r = (planet?.visualRadius || 1.0) * config.planetScale;
          const distOffset = selectedPlanetId === "earth" ? r * 3.6 : r * 4.2;
          const heightOffset = selectedPlanetId === "earth" ? r * 0.8 : r * 1.6;

          targetCamPos.current.set(
            targetX,
            targetY + heightOffset,
            targetZ + distOffset
          );
        }
      }
    }

    targetLook.current.set(targetX, targetY, targetZ);

    if (isTransitioningRef.current) {
      const lerpSpeed = Math.min(1.0, delta * 3.5);
      camera.position.lerp(targetCamPos.current, lerpSpeed);
      controlsRef.current.target.lerp(targetLook.current, lerpSpeed);
      controlsRef.current.update();

      const dist = camera.position.distanceTo(targetCamPos.current);
      if (dist < 0.25) {
        isTransitioningRef.current = false;
      }
    } else if (selectedPlanetId !== "sun") {
      const offset = tmpVec.current.copy(controlsRef.current.target).sub(planetWorldPos.current);
      if (offset.length() > 0.01) {
        controlsRef.current.target.lerp(targetLook.current, Math.min(1.0, delta * 8.0));
        controlsRef.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={1.4}
      maxDistance={280}
    />
  );
}

"use client";

import React, { useMemo, useEffect } from "react";
import * as THREE from "three";

interface OrbitPathProps {
  radius: number;
  color?: string;
  opacity?: number;
}

export function OrbitPath({ radius, color = "#22D3EE", opacity = 0.25 }: OrbitPathProps) {
  const lineObject = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      depthWrite: false,
    });
    return new THREE.Line(geometry, material);
  }, [radius, color, opacity]);

  useEffect(() => {
    return () => {
      lineObject.geometry.dispose();
      if (Array.isArray(lineObject.material)) {
        lineObject.material.forEach((m) => m.dispose());
      } else {
        lineObject.material.dispose();
      }
    };
  }, [lineObject]);

  return <primitive object={lineObject} />;
}

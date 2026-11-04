import { create } from "zustand";
import { AnimationPreset, AnimationPresetConfig } from "@/types";

export const DEFAULT_PRESET_CONFIG: AnimationPresetConfig = {
  speed: 1.0,
  scale: 1.2,
  rotationSpeed: 0.8,
  particleCount: 1200,
  primaryColor: "#8B5CF6",
  secondaryColor: "#22D3EE",
  accentColor: "#EC4899",
  wireframe: false,
  roughness: 0.2,
  metalness: 0.85,
  distortion: 0.4,
  intensity: 1.2,
  cameraFov: 45,
  lightIntensity: 1.5,
};

export const PRESETS: AnimationPreset[] = [
  {
    id: "torus-quantum",
    name: "Quantum Torus Knot",
    category: "3d-objects",
    categoryLabel: "3D Objects",
    description: "High-density mathematical knot with specular iridescence and continuous harmonic rotation.",
    instructions: "Drag to orbit camera. Adjust metalness, speed, and wireframe mode.",
    tags: ["Three.js", "R3F", "Geometry", "Metallic"],
    config: {
      ...DEFAULT_PRESET_CONFIG,
      speed: 1.2,
      scale: 1.3,
      rotationSpeed: 0.7,
      roughness: 0.15,
      metalness: 0.9,
      distortion: 0.3,
    },
    defaultCode: {
      js: `// Three.js / R3F Torus Knot Mesh
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function Mesh({ speed = 1.0, wireframe = false }) {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.5 * speed;
    ref.current.rotation.y += delta * 0.7 * speed;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.35, 160, 32]} />
      <meshPhysicalMaterial
        color="#8B5CF6"
        roughness={0.2}
        metalness={0.85}
        wireframe={wireframe}
      />
    </mesh>
  );
}`,
      css: `.canvas-container {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #101421 0%, #080a12 100%);
}`,
    },
  },
  {
    id: "particle-nebula",
    name: "Cosmic Particle Swarm",
    category: "particles",
    categoryLabel: "Particles",
    description: "GPU-accelerated point cloud with sinusoidal velocity waves and mouse gravitational attractor.",
    instructions: "Move mouse across canvas to bend the gravitational field. Dial up particle count in controls.",
    tags: ["Instancing", "Physics", "Attractor", "GLSL"],
    config: {
      ...DEFAULT_PRESET_CONFIG,
      particleCount: 2500,
      speed: 1.5,
      primaryColor: "#22D3EE",
      secondaryColor: "#EC4899",
      intensity: 2.0,
    },
    defaultCode: {
      js: `// GPU Particle Swarm Controller
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleSwarm({ count = 2000 }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      coords[i] = (Math.random() - 0.5) * 8;
      coords[i + 1] = (Math.random() - 0.5) * 8;
      coords[i + 2] = (Math.random() - 0.5) * 8;
    }
    return coords;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#22D3EE" transparent opacity={0.8} />
    </points>
  );
}`,
      css: `.particle-overlay {
  mix-blend-mode: screen;
  filter: drop-shadow(0 0 10px #22D3EE);
}`,
    },
  },
  {
    id: "fluid-wave",
    name: "Liquid Cyber Wave",
    category: "liquid-effects",
    categoryLabel: "Liquid Effects",
    description: "Perlin-inspired vertex displacement plane reacting dynamically with ripple frequencies.",
    instructions: "Change distortion and speed to simulate viscous liquid or turbulence.",
    tags: ["Vertex Shader", "Displacement", "Water", "Perlin"],
    config: {
      ...DEFAULT_PRESET_CONFIG,
      speed: 0.9,
      distortion: 0.8,
      primaryColor: "#06B6D4",
      secondaryColor: "#8B5CF6",
      roughness: 0.1,
      metalness: 0.95,
    },
  },
  {
    id: "icosahedron-crystal",
    name: "Reflective Polyhedron Crystal",
    category: "3d-objects",
    categoryLabel: "3D Objects",
    description: "Facet-rich geometric crystal demonstrating transmission, fresnel reflection, and chromatic dispersion.",
    instructions: "Toggle wireframe or vary roughness to reveal the crystalline lattice.",
    tags: ["Crystal", "Transmission", "Glass", "Geometry"],
    config: {
      ...DEFAULT_PRESET_CONFIG,
      speed: 0.6,
      scale: 1.4,
      primaryColor: "#EC4899",
      secondaryColor: "#8B5CF6",
      metalness: 0.7,
      roughness: 0.1,
    },
  },
  {
    id: "magnetic-cursor-orb",
    name: "Magnetic Mouse Attractor",
    category: "mouse-interactions",
    categoryLabel: "Mouse Interactions",
    description: "Spring-damped physics orb that smoothly tracks, leads, and rebounds towards pointer positions.",
    instructions: "Hover around the viewport. Watch acceleration and spring elasticity dampening.",
    tags: ["Springs", "Euler Integration", "Cursor", "Physics"],
    config: {
      ...DEFAULT_PRESET_CONFIG,
      speed: 1.8,
      scale: 1.1,
      primaryColor: "#10B981",
      secondaryColor: "#22D3EE",
    },
  },
  {
    id: "scroll-choreo",
    name: "Scroll-Driven Perspective Warp",
    category: "scroll-animations",
    categoryLabel: "Scroll Animations",
    description: "Camera dolly-zoom and rotation timeline linked to window scroll percentage using GSAP ScrollTrigger.",
    instructions: "Scroll up and down to observe camera perspective deformation.",
    tags: ["GSAP", "ScrollTrigger", "Camera Dolly", "Cinematic"],
    config: {
      ...DEFAULT_PRESET_CONFIG,
      speed: 1.0,
      cameraFov: 55,
      primaryColor: "#F59E0B",
    },
  },
  {
    id: "svg-morph-shapes",
    name: "Fluid SVG Morph Matrix",
    category: "svg-morphing",
    categoryLabel: "SVG Morphing",
    description: "Bézier curve interpolation morphing smoothly between organic blobs, stars, and geometric rings.",
    instructions: "Click to cycle keyframe targets or set animation duration in the inspector.",
    tags: ["SVG", "Bézier", "Path Interpolation", "Vector"],
    config: {
      ...DEFAULT_PRESET_CONFIG,
      speed: 0.8,
      primaryColor: "#8B5CF6",
      secondaryColor: "#EC4899",
    },
  },
  {
    id: "kinetic-typography",
    name: "Kinetic Velocity Text",
    category: "text-animations",
    categoryLabel: "Text Animations",
    description: "Character-split kinetic typography reacting to scroll velocity and mouse displacement.",
    instructions: "Move mouse vigorously across the text lines to trigger elastic displacement.",
    tags: ["Kinetic", "Typography", "SplitText", "CSS Variables"],
    config: {
      ...DEFAULT_PRESET_CONFIG,
      speed: 1.4,
      primaryColor: "#F8FAFC",
      secondaryColor: "#22D3EE",
    },
  },
];

interface PlaygroundState {
  currentPreset: AnimationPreset;
  config: AnimationPresetConfig;
  isPlaying: boolean;
  activeTab: "controls" | "presets" | "code";
  activeCodeTab: "js" | "css";
  activeCategory: string;
  searchQuery: string;
  setPreset: (preset: AnimationPreset) => void;
  updateConfig: (partial: Partial<AnimationPresetConfig>) => void;
  resetConfig: () => void;
  setIsPlaying: (playing: boolean) => void;
  setActiveTab: (tab: "controls" | "presets" | "code") => void;
  setActiveCodeTab: (tab: "js" | "css") => void;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  currentPreset: PRESETS[0],
  config: { ...PRESETS[0].config },
  isPlaying: true,
  activeTab: "controls",
  activeCodeTab: "js",
  activeCategory: "all",
  searchQuery: "",
  setPreset: (preset) =>
    set({
      currentPreset: preset,
      config: { ...preset.config },
    }),
  updateConfig: (partial) =>
    set((state) => ({
      config: { ...state.config, ...partial },
    })),
  resetConfig: () =>
    set((state) => ({
      config: { ...state.currentPreset.config },
    })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setActiveCodeTab: (activeCodeTab) => set({ activeCodeTab }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

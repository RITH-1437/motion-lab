"use client";

import { create } from "zustand";
import { CelestialId, SimulationConfig } from "../types";
import { PLANETS_DATA } from "../config/planets";

interface SolarSimulationState {
  config: SimulationConfig;
  targetPosition: [number, number, number] | null;
  targetLookAt: [number, number, number] | null;
  setPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: number) => void;
  selectPlanet: (id: CelestialId) => void;
  updateConfig: (partial: Partial<SimulationConfig>) => void;
  resetSimulation: () => void;
  applyPreset: (preset: SimulationConfig["viewPreset"]) => void;
}

const DEFAULT_CONFIG: SimulationConfig = {
  isPlaying: true,
  simulationSpeed: 1.0,
  orbitSpacing: 1.0,
  planetScale: 1.0,
  showOrbits: true,
  showLabels: true,
  showStars: true,
  showAtmosphere: true,
  showRings: true,
  showAsteroidBelt: true,
  showMoons: true,
  earthDetailMode: false,
  showClouds: true,
  selectedPlanetId: "sun",
  viewPreset: "overview",
};

export const useSolarSimulation = create<SolarSimulationState>((set, get) => ({
  config: { ...DEFAULT_CONFIG },
  targetPosition: [0, 45, 65],
  targetLookAt: [0, 0, 0],

  setPlaying: (isPlaying) =>
    set((state) => ({ config: { ...state.config, isPlaying } })),

  setSpeed: (simulationSpeed) =>
    set((state) => ({ config: { ...state.config, simulationSpeed } })),

  updateConfig: (partial) =>
    set((state) => ({ config: { ...state.config, ...partial } })),

  selectPlanet: (id: CelestialId) => {
    const planet = PLANETS_DATA.find((p) => p.id === id);
    if (!planet) return;

    if (id === "sun") {
      set((state) => ({
        config: { ...state.config, selectedPlanetId: "sun", earthDetailMode: false },
        targetPosition: [0, 30, 55],
        targetLookAt: [0, 0, 0],
      }));
      return;
    }

    if (id === "earth") {
      set((state) => ({
        config: { ...state.config, selectedPlanetId: "earth", earthDetailMode: true },
        targetLookAt: [planet.orbitDistance * state.config.orbitSpacing, 0, 0],
        targetPosition: [
          planet.orbitDistance * state.config.orbitSpacing,
          0.8,
          planet.visualRadius * 3.5,
        ],
      }));
      return;
    }

    // Default planet focus
    set((state) => ({
      config: { ...state.config, selectedPlanetId: id, earthDetailMode: false },
      targetLookAt: [planet.orbitDistance * state.config.orbitSpacing, 0, 0],
      targetPosition: [
        planet.orbitDistance * state.config.orbitSpacing,
        planet.visualRadius * 1.5,
        planet.visualRadius * 4.2,
      ],
    }));
  },

  resetSimulation: () =>
    set({
      config: { ...DEFAULT_CONFIG },
      targetPosition: [0, 45, 65],
      targetLookAt: [0, 0, 0],
    }),

  applyPreset: (preset) => {
    switch (preset) {
      case "overview":
        set((state) => ({
          config: {
            ...state.config,
            viewPreset: "overview",
            selectedPlanetId: "sun",
            earthDetailMode: false,
            orbitSpacing: 1.0,
            planetScale: 1.0,
          },
          targetPosition: [0, 50, 70],
          targetLookAt: [0, 0, 0],
        }));
        break;

      case "cinematic":
        set((state) => ({
          config: {
            ...state.config,
            viewPreset: "cinematic",
            simulationSpeed: 0.6,
            showLabels: false,
            showOrbits: true,
          },
          targetPosition: [0, 15, 40],
          targetLookAt: [0, 0, 0],
        }));
        break;

      case "earth":
        get().selectPlanet("earth");
        set((state) => ({
          config: { ...state.config, viewPreset: "earth" },
        }));
        break;

      case "inner":
        set((state) => ({
          config: {
            ...state.config,
            viewPreset: "inner",
            selectedPlanetId: "sun",
            earthDetailMode: false,
            orbitSpacing: 1.2,
          },
          targetPosition: [0, 22, 28],
          targetLookAt: [0, 0, 0],
        }));
        break;

      case "outer":
        set((state) => ({
          config: {
            ...state.config,
            viewPreset: "outer",
            selectedPlanetId: "jupiter",
            earthDetailMode: false,
          },
          targetPosition: [25, 30, 45],
          targetLookAt: [25, 0, 0],
        }));
        break;
    }
  },
}));

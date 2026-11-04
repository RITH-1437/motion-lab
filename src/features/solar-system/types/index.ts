export type CelestialId =
  | "sun"
  | "mercury"
  | "venus"
  | "earth"
  | "moon"
  | "mars"
  | "asteroids"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto";

export interface PlanetData {
  id: CelestialId;
  name: string;
  category: "Star" | "Terrestrial Planet" | "Gas Giant" | "Ice Giant" | "Dwarf Planet" | "Moon" | "Asteroid Belt";
  diameterKm: number;
  realDistanceMillionKm: number;
  orbitalPeriodDays: number;
  rotationPeriodHours: number;
  axialTiltDeg: number;
  moonsCount: number;
  avgTempC: number;
  visualRadius: number;
  orbitDistance: number;
  orbitSpeedFactor: number;
  color: string;
  emissiveColor?: string;
  hasRings?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  ringColor?: string;
  description: string;
  funFacts: string[];
}

export interface SimulationConfig {
  isPlaying: boolean;
  simulationSpeed: number; // 0.1x to 10x
  orbitSpacing: number;    // spacing multiplier
  planetScale: number;     // size multiplier
  showOrbits: boolean;
  showLabels: boolean;
  showStars: boolean;
  showAtmosphere: boolean;
  showRings: boolean;
  showAsteroidBelt: boolean;
  showMoons: boolean;
  earthDetailMode: boolean;
  showClouds: boolean;
  selectedPlanetId: CelestialId;
  viewPreset: "overview" | "cinematic" | "earth" | "inner" | "outer";
}

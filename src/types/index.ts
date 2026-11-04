export type AnimationCategory =
  | "3d-objects"
  | "particles"
  | "liquid-effects"
  | "mouse-interactions"
  | "scroll-animations"
  | "svg-morphing"
  | "text-animations"
  | "background-effects";

export interface AnimationPresetConfig {
  speed: number;
  scale: number;
  rotationSpeed: number;
  particleCount: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  wireframe: boolean;
  roughness: number;
  metalness: number;
  distortion: number;
  intensity: number;
  cameraFov: number;
  lightIntensity: number;
}

export interface AnimationPreset {
  id: string;
  name: string;
  category: AnimationCategory;
  categoryLabel: string;
  description: string;
  instructions: string;
  tags: string[];
  config: AnimationPresetConfig;
  defaultCode?: {
    js: string;
    css: string;
    glsl?: string;
  };
}

export interface NavItem {
  name: string;
  href: string;
  badge?: string;
  description?: string;
}

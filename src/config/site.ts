import { NavItem, AnimationCategory } from "@/types";

export const siteConfig = {
  name: "MOTION LAB",
  tagline: "Interactive Creative Technology & Animation Playground",
  description:
    "An immersive WebGL & creative engineering laboratory for exploring, testing, and fine-tuning modern 3D, physics, and scroll animations.",
  navItems: [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore", badge: "8 Labs" },
    { name: "Playground", href: "/playground" },
    { name: "Editor", href: "/editor", badge: "Live" },
    { name: "Components", href: "/components" },
    { name: "About", href: "/about" },
  ] as NavItem[],
  links: {
    github: "https://github.com",
    docs: "/about",
  },
  categories: [
    { id: "3d-objects", label: "3D Objects", count: 6, icon: "Box" },
    { id: "particles", label: "Particle Systems", count: 4, icon: "Sparkles" },
    { id: "liquid-effects", label: "Liquid & Fluid", count: 3, icon: "Waves" },
    { id: "mouse-interactions", label: "Mouse Physics", count: 4, icon: "MousePointer" },
    { id: "scroll-animations", label: "Scroll Story", count: 4, icon: "Scroll" },
    { id: "svg-morphing", label: "SVG Morph", count: 3, icon: "Shapes" },
    { id: "text-animations", label: "Kinetic Text", count: 5, icon: "Type" },
    { id: "background-effects", label: "Shaders & FX", count: 4, icon: "Flame" },
  ] as { id: AnimationCategory; label: string; count: number; icon: string }[],
};

import { ComponentItem, ComponentCategory } from "./types";
import { BUTTON_COMPONENTS } from "./buttons";
import { CARD_COMPONENTS } from "./cards";
import { TYPOGRAPHY_COMPONENTS } from "./typography";
import { LOADER_COMPONENTS } from "./loaders";
import { NAVIGATION_COMPONENTS } from "./navigation";
import { BADGE_COMPONENTS } from "./badges";
import { FORM_COMPONENTS } from "./forms";
import { OVERLAY_COMPONENTS } from "./overlays";
import { MICRO_INTERACTION_COMPONENTS } from "./microInteractions";
import { DATA_DISPLAY_COMPONENTS } from "./dataDisplays";

export * from "./types";

export const ALL_COMPONENTS: ComponentItem[] = [
  ...BUTTON_COMPONENTS,
  ...CARD_COMPONENTS,
  ...TYPOGRAPHY_COMPONENTS,
  ...LOADER_COMPONENTS,
  ...NAVIGATION_COMPONENTS,
  ...BADGE_COMPONENTS,
  ...FORM_COMPONENTS,
  ...OVERLAY_COMPONENTS,
  ...MICRO_INTERACTION_COMPONENTS,
  ...DATA_DISPLAY_COMPONENTS,
];

export const COMPONENT_CATEGORIES: { id: ComponentCategory | "all"; label: string; icon: string }[] = [
  { id: "all", label: "All Components", icon: "⚡" },
  { id: "Buttons & CTAs", label: "Buttons & CTAs", icon: "🔘" },
  { id: "Cards & Surfaces", label: "Cards & Surfaces", icon: "🎴" },
  { id: "Text & Typography", label: "Text & Typography", icon: "🔤" },
  { id: "Loaders & Spinners", label: "Loaders & Spinners", icon: "⏳" },
  { id: "Navigation & Menus", label: "Navigation & Menus", icon: "🧭" },
  { id: "Badges & Tags", label: "Badges & Tags", icon: "🏷️" },
  { id: "Form Controls", label: "Form Controls", icon: "📝" },
  { id: "Feedback & Overlays", label: "Feedback & Overlays", icon: "💬" },
  { id: "Micro-Interactions", label: "Micro-Interactions", icon: "✨" },
  { id: "Data Displays", label: "Data Displays", icon: "📊" },
];

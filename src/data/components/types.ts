import React from "react";

export type ComponentCategory =
  | "Buttons & CTAs"
  | "Cards & Surfaces"
  | "Text & Typography"
  | "Loaders & Spinners"
  | "Navigation & Menus"
  | "Badges & Tags"
  | "Form Controls"
  | "Feedback & Overlays"
  | "Micro-Interactions"
  | "Data Displays";

export interface ComponentItem {
  id: string;
  title: string;
  category: ComponentCategory;
  description: string;
  tags: string[];
  code: string;
  demo: React.ReactNode;
}

"use client";

import React from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="relative p-2 rounded-full glass-button transition-all duration-300 group"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-yellow-300 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-accent-violet group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}

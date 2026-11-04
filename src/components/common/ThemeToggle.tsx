"use client";

import React, { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    // Sync initial theme
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle visual theme"
      className="relative p-2 rounded-full glass-button text-muted-foreground hover:text-foreground transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-accent-amber transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-accent-violet transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}

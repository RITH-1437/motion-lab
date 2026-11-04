"use client";

import React, { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

/**
 * ThemeProvider
 *
 * Mounts early as a client component to:
 * 1. Read the saved preference from localStorage
 * 2. Apply the correct "dark" / "light" class to <html>
 * 3. Keep Zustand store in sync
 *
 * Must wrap the full app to prevent FOUC (flash-of-unstyled-content).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  // On first mount — restore persisted preference
  useEffect(() => {
    const stored = localStorage.getItem("ml-theme") as "dark" | "light" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = stored ?? (systemDark ? "dark" : "light");
    setTheme(resolved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever theme changes — apply class to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("ml-theme", theme);
  }, [theme]);

  return <>{children}</>;
}

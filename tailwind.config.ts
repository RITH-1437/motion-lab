import type { Config } from "tailwindcss";

const config: Config = {
  // "class" strategy → adds dark: variants when <html class="dark">
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/engine/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic surface colors mapped to CSS vars
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        muted: "var(--muted)",
        border: "var(--border)",

        // Static canvas tokens (used in dark-first components)
        canvas: {
          dark: "#080A12",
          surface: "#101421",
          elevated: "#181D30",
        },

        // Global accent palette
        accent: {
          violet: "#8B5CF6",
          cyan: "#22D3EE",
          pink: "#EC4899",
          emerald: "#10B981",
          amber: "#F59E0B",
        },

        // Glass surface tokens
        glass: {
          stroke: "rgba(255, 255, 255, 0.12)",
          fill: "rgba(255, 255, 255, 0.04)",
          highlight: "rgba(255, 255, 255, 0.2)",
        },
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },

      boxShadow: {
        glow: "0 0 50px -10px rgba(139, 92, 246, 0.35)",
        "glow-cyan": "0 0 50px -10px rgba(34, 211, 238, 0.35)",
        "glow-pink": "0 0 50px -10px rgba(236, 72, 153, 0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },

      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },

      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;

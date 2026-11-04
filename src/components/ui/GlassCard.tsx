import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "violet" | "cyan" | "pink" | "none";
  interactive?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = "none",
  interactive = true,
  ...props
}: GlassCardProps) {
  const glowClasses = {
    violet: "hover:shadow-glow hover:border-accent-violet/40",
    cyan: "hover:shadow-glow-cyan hover:border-accent-cyan/40",
    pink: "hover:shadow-glow-pink hover:border-accent-pink/40",
    none: "hover:border-white/20",
  };

  return (
    <div
      className={cn(
        "rounded-2xl glass-panel p-6 border border-white/10 transition-all duration-300 relative overflow-hidden",
        interactive && "hover:-translate-y-1.5",
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {/* Subtle top edge specular highlight — solid 1px neon line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent-cyan/20 pointer-events-none" />
      {children}
    </div>
  );
}

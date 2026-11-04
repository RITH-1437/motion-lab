import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "violet" | "cyan" | "pink" | "emerald" | "outline";
  className?: string;
}

export function Badge({ children, variant = "violet", className }: BadgeProps) {
  const variantStyles = {
    violet: "bg-accent-violet/15 text-accent-violet border-accent-violet/30",
    cyan: "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/30",
    pink: "bg-accent-pink/15 text-accent-pink border-accent-pink/30",
    emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    outline: "bg-white/5 text-slate-300 border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wide border uppercase font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

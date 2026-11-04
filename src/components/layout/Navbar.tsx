"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Sparkles, Menu, X, ArrowUpRight, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-4 px-4 sm:px-8",
        scrolled
          ? "bg-[var(--navbar-bg)] backdrop-blur-xl border-b border-[var(--border)] py-3 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo — neon border box, no gradient */}
        <Link
          href="/"
          className="flex items-center gap-3 group relative cursor-pointer"
        >
          <div className="relative w-9 h-9 rounded-xl border border-accent-cyan/60 bg-[var(--surface)] flex items-center justify-center transition-all duration-300 group-hover:border-accent-pink group-hover:shadow-[0_0_16px_2px_rgba(236,72,153,0.5)]">
            <Cpu className="w-5 h-5 text-accent-cyan group-hover:text-accent-pink transition-colors duration-300" />
          </div>

          <div className="flex flex-col">
            <span className="font-bold tracking-wider text-base font-mono uppercase text-[var(--foreground)]">
              MOTION<span className="text-accent-cyan neon-text-cyan">LAB</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-accent-violet/80 font-mono -mt-1 font-medium">
              v1.0 • Creative Lab
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-[var(--border)] shadow-glass">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-1.5 rounded-full text-xs font-medium font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5",
                  isActive
                    ? "text-accent-cyan"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-accent-cyan/10 border border-accent-cyan/50 rounded-full shadow-[0_0_12px_1px_rgba(34,211,238,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
                {item.badge && (
                  <span className="relative z-10 px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-accent-violet/20 text-accent-cyan border border-accent-cyan/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/playground"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider bg-accent-violet text-white shadow-glow hover:bg-accent-violet/80 hover:shadow-[0_0_24px_4px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Lab</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl glass-button text-[var(--muted)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-accent-pink" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 mx-2 p-5 rounded-2xl glass-panel border border-[var(--border)] flex flex-col gap-3"
          >
            {siteConfig.navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl font-mono text-sm tracking-wide transition-all",
                    isActive
                      ? "bg-accent-cyan/10 border border-accent-cyan/40 text-accent-cyan"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-black/5"
                  )}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-accent-violet/20 text-accent-cyan border border-accent-cyan/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <Link
              href="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold bg-accent-violet text-white shadow-glow hover:shadow-[0_0_20px_4px_rgba(139,92,246,0.5)] transition-shadow"
            >
              Launch Playground
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

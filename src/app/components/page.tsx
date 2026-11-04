"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  ALL_COMPONENTS,
  COMPONENT_CATEGORIES,
  ComponentCategory,
} from "@/data/components";
import {
  Search,
  Copy,
  Check,
  Code2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCodeId, setExpandedCodeId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredComponents = useMemo(() => {
    return ALL_COMPONENTS.filter((comp) => {
      const matchesCategory =
        selectedCategory === "all" || comp.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        comp.title.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q) ||
        comp.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredComponents.length / itemsPerPage);
  const paginatedComponents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredComponents.slice(start, start + itemsPerPage);
  }, [filteredComponents, currentPage, itemsPerPage]);

  const handleCategoryChange = (cat: ComponentCategory | "all") => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="violet">Design System & Motion Primitives</Badge>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-semibold shadow-[0_0_10px_rgba(34,211,238,0.25)]">
            ⚡ 105+ Production-Ready Components
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-mono uppercase tracking-tight text-[var(--foreground)]">
          Reusable Motion Components
        </h1>
        <p className="text-[var(--muted)] text-sm sm:text-base max-w-3xl leading-relaxed">
          Explore over 100 plug-and-play UI components built with Framer Motion, Tailwind CSS, and WebGL principles.
          Interact with physics live, test states, and copy JSX snippets directly into your projects.
        </p>

        {/* Quick Metrics Bar */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <span className="text-[var(--muted)] block text-[10px] uppercase">TOTAL PRIMITIVES</span>
            <span className="text-xl font-bold text-accent-cyan">105 Demos</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <span className="text-[var(--muted)] block text-[10px] uppercase">TAXONOMY</span>
            <span className="text-xl font-bold text-accent-violet">10 Categories</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <span className="text-[var(--muted)] block text-[10px] uppercase">ANIMATION ENGINE</span>
            <span className="text-xl font-bold text-accent-pink">Framer Motion</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)]">
            <span className="text-[var(--muted)] block text-[10px] uppercase">FRAME TARGET</span>
            <span className="text-xl font-bold text-emerald-400">60 FPS Hardware</span>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="pt-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search 105 components, tags (e.g. spring, tilt, neon)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel border border-[var(--border)] text-sm font-mono text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-accent-cyan"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results count & page size */}
            <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted)]">
              <span>
                Showing {filteredComponents.length} of {ALL_COMPONENTS.length}
              </span>
              <div className="flex items-center gap-1 border border-[var(--border)] rounded-lg p-0.5 bg-[var(--surface-elevated)]">
                {[12, 24, 48, 105].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setItemsPerPage(size);
                      setCurrentPage(1);
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      itemsPerPage === size
                        ? "bg-accent-violet text-white font-bold"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {size === 105 ? "All" : size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {COMPONENT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count =
                cat.id === "all"
                  ? ALL_COMPONENTS.length
                  : ALL_COMPONENTS.filter((c) => c.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id as ComponentCategory | "all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-accent-cyan text-slate-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                      : "glass-button text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-black/20 text-slate-950" : "bg-[var(--surface-elevated)] text-[var(--muted)]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedComponents.map((item) => {
          const isCopied = copiedId === item.id;
          const isCodeExpanded = expandedCodeId === item.id;

          return (
            <GlassCard
              key={item.id}
              glow="violet"
              className="flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header: Category Badge & Actions */}
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="cyan">{item.category}</Badge>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setExpandedCodeId(isCodeExpanded ? null : item.id)
                      }
                      className="p-1.5 rounded-lg glass-button text-[var(--muted)] hover:text-accent-pink transition-colors text-[11px] font-mono flex items-center gap-1"
                      title={isCodeExpanded ? "Hide Code" : "Inspect Code"}
                    >
                      <Code2 className="w-3.5 h-3.5 text-accent-pink" />
                    </button>
                    <button
                      onClick={() => copyCode(item.code, item.id)}
                      className="p-1.5 rounded-lg glass-button text-[var(--muted)] hover:text-[var(--foreground)] flex items-center gap-1 text-[11px] font-mono transition-colors"
                      title="Copy JSX Snippet"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="font-mono text-base font-bold text-[var(--foreground)] group-hover:text-accent-cyan transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[var(--muted)] mb-4 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Interactive Live Demo Surface */}
                <div className="min-h-[140px] rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] p-4 mb-4 flex items-center justify-center relative overflow-hidden">
                  {item.demo}
                </div>
              </div>

              {/* Tags & Code Expand Drawer */}
              <div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/10 dark:bg-white/5 text-[var(--muted)] border border-[var(--border)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {isCodeExpanded && (
                  <div className="mt-2 p-3 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] font-mono text-[11px] text-accent-cyan overflow-x-auto max-h-36">
                    <pre>
                      <code>{item.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredComponents.length === 0 && (
        <div className="text-center py-20 glass-panel rounded-3xl border border-[var(--border)] max-w-md mx-auto space-y-3">
          <Sparkles className="w-10 h-10 text-accent-cyan mx-auto animate-pulse" />
          <h3 className="font-mono text-lg font-bold text-[var(--foreground)]">
            No components match query
          </h3>
          <p className="text-xs font-mono text-[var(--muted)]">
            Try adjusting your search terms or clearing the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-4 py-1.5 rounded-lg font-mono text-xs glass-button text-[var(--foreground)] hover:border-accent-cyan"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[var(--border)] font-mono text-xs">
          <span className="text-[var(--muted)]">
            Page {currentPage} of {totalPages} ({filteredComponents.length} items)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg glass-button text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  currentPage === page
                    ? "bg-accent-violet text-white shadow-glow"
                    : "glass-button text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg glass-button text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

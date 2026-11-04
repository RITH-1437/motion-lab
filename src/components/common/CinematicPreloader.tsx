"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { Sparkles, ArrowUpRight } from "lucide-react";

const STAGE_MESSAGES: { threshold: number; message: string }[] = [
  { threshold: 100, message: "EXPERIENCE READY" },
  { threshold: 95, message: "FINALIZING EXPERIENCE" },
  { threshold: 80, message: "PREPARING 3D EXPERIENCE" },
  { threshold: 60, message: "INITIALIZING ANIMATION ENGINE" },
  { threshold: 40, message: "LOADING VISUAL ASSETS" },
  { threshold: 20, message: "PREPARING ENVIRONMENT" },
  { threshold: 5, message: "INITIALIZING EXPERIENCE" },
];

function getMessageForProgress(progress: number): string {
  for (const item of STAGE_MESSAGES) {
    if (progress >= item.threshold) {
      return item.message;
    }
  }
  return "INITIALIZING EXPERIENCE";
}

export function CinematicPreloader() {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(5); // Starts strictly at 05%
  const [phaseMessage, setPhaseMessage] = useState("INITIALIZING EXPERIENCE");
  const [isComplete, setIsComplete] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const centerLaserRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const progressProxy = useRef({ value: 5 });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isSkippingRef = useRef(false);

  // Check if session has already seen the intro or if ?intro=true requested
  useEffect(() => {
    setIsMounted(true);
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const forceIntro = urlParams.get("intro") === "true" || urlParams.get("replay") === "true";
    const hasSeenIntro = sessionStorage.getItem("motion_lab_intro_seen") === "true";

    // Reduced motion accessibility check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasSeenIntro || forceIntro) {
      if (prefersReducedMotion) {
        // Instant skip for reduced motion users
        sessionStorage.setItem("motion_lab_intro_seen", "true");
        setShouldPlay(false);
        setIsComplete(true);
      } else {
        setShouldPlay(true);
      }
    } else {
      setShouldPlay(false);
      setIsComplete(true);
    }
  }, []);

  // Listen for custom "replay-intro" event from Footer or dev commands
  useEffect(() => {
    const handleReplay = () => {
      progressProxy.current.value = 5;
      setDisplayProgress(5);
      setPhaseMessage("INITIALIZING EXPERIENCE");
      setIsComplete(false);
      setShouldPlay(true);
      isSkippingRef.current = false;
    };

    window.addEventListener("motion-lab:replay-intro", handleReplay);
    // Expose global replay function for convenience
    // @ts-expect-error Global dev convenience method
    window.replayMotionLabIntro = handleReplay;

    return () => {
      window.removeEventListener("motion-lab:replay-intro", handleReplay);
      // @ts-expect-error Global dev convenience cleanup
      delete window.replayMotionLabIntro;
    };
  }, []);

  // Background floating particle canvas animation
  useEffect(() => {
    if (!shouldPlay || isComplete) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
      alpha: number;
    }[] = [];

    const particleCount = Math.min(50, Math.floor(width / 25));
    const colors = ["#22D3EE", "#8B5CF6", "#EC4899", "#A78BFA"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldPlay, isComplete]);

  // Execute the 100% Cinematic Reveal Animation
  const triggerCinematicReveal = useCallback(() => {
    if (timelineRef.current) timelineRef.current.kill();

    // Lock body during reveal sequence
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        setShouldPlay(false);
        document.body.style.overflow = "";
        sessionStorage.setItem("motion_lab_intro_seen", "true");
      },
    });

    timelineRef.current = tl;

    // Step 1: 100% Burst & Pulse on typography
    if (percentTextRef.current) {
      tl.to(percentTextRef.current, {
        scale: 1.08,
        color: "#ffffff",
        textShadow: "0 0 35px #22D3EE, 0 0 70px #8B5CF6",
        duration: 0.35,
        ease: "power2.out",
      });
    }

    // Step 2: Content text smoothly scales & fades out
    if (contentRef.current) {
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.94,
          y: -24,
          duration: 0.45,
          ease: "power3.inOut",
        },
        "+=0.1"
      );
    }

    // Step 3: Laser beam fires across divider
    if (centerLaserRef.current) {
      tl.fromTo(
        centerLaserRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    // Step 4: Cinematic Curtain Split (Top slides UP, Bottom slides DOWN)
    tl.to(
      topCurtainRef.current,
      {
        yPercent: -100,
        duration: 1.05,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    tl.to(
      bottomCurtainRef.current,
      {
        yPercent: 100,
        duration: 1.05,
        ease: "power4.inOut",
      },
      "<"
    );

    // Step 5: Laser line dissolves smoothly
    if (centerLaserRef.current) {
      tl.to(
        centerLaserRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        },
        "-=0.6"
      );
    }
  }, []);

  // Main Progression Sequence
  useEffect(() => {
    if (!shouldPlay || isComplete) return;

    // Prevent body scroll during loading phase
    document.body.style.overflow = "hidden";

    // GSAP tween for the 05% -> 100% progression
    // Calibrated to ~2.2 seconds total duration for a fluid, premium opening pacing
    const duration = 2.3;

    const tween = gsap.to(progressProxy.current, {
      value: 100,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        const currentVal = Math.min(100, Math.floor(progressProxy.current.value));
        setDisplayProgress(currentVal);
        setPhaseMessage(getMessageForProgress(currentVal));

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${currentVal}%`;
        }
      },
      onComplete: () => {
        setDisplayProgress(100);
        setPhaseMessage("EXPERIENCE READY");
        triggerCinematicReveal();
      },
    });

    // Check actual environment readiness signals to adaptively accelerate
    const checkReadiness = () => {
      const isDocumentLoaded = document.readyState === "complete";
      const isFontsLoaded = document.fonts ? document.fonts.status === "loaded" : true;
      if (isDocumentLoaded && isFontsLoaded && tween.time() > 1.0) {
        tween.timeScale(1.35);
      }
    };

    checkReadiness();
    window.addEventListener("load", checkReadiness);
    if (document.fonts) {
      document.fonts.ready.then(checkReadiness);
    }

    return () => {
      tween.kill();
      window.removeEventListener("load", checkReadiness);
    };
  }, [shouldPlay, isComplete, triggerCinematicReveal]);

  // Skip Intro Handler
  const handleSkip = () => {
    if (isSkippingRef.current) return;
    isSkippingRef.current = true;
    progressProxy.current.value = 100;
    setDisplayProgress(100);
    setPhaseMessage("EXPERIENCE READY");
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "100%";
    }
    triggerCinematicReveal();
  };

  if (!isMounted || !shouldPlay || isComplete) {
    return null;
  }

  // Format percentage with leading zero (e.g. 05%, 09%, 40%, 100%)
  const formattedPercent =
    displayProgress < 10
      ? `0${displayProgress}%`
      : `${displayProgress}%`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto select-none overflow-hidden"
      aria-label="Motion Lab Loading Screen"
    >
      {/* Top Shutter Curtain (slides up) */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#080A12] border-b border-cyan-500/20 z-10 overflow-hidden"
      >
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      </div>

      {/* Bottom Shutter Curtain (slides down) */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#080A12] border-t border-cyan-500/20 z-10 overflow-hidden"
      >
        <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />
      </div>

      {/* Center Laser Divider Hairline */}
      <div
        ref={centerLaserRef}
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-20 bg-cyan-400 opacity-80 pointer-events-none shadow-[0_0_20px_#22D3EE]"
        style={{ transformOrigin: "center" }}
      />

      {/* Floating Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-15 pointer-events-none"
      />

      {/* Main Foreground Loading Content */}
      <div
        ref={contentRef}
        className="relative z-30 w-full h-full flex flex-col justify-between px-6 sm:px-12 py-8 md:py-12"
      >
        {/* Top Header: Branding & Quick Skip */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22D3EE] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase">
              MOTION LAB®
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--card)]/80 text-[10px] font-mono text-cyan-400">
              {"SYS // V1.0-RC"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border)] bg-[#090D16]/90 text-[11px] font-mono text-[var(--muted)] hover:text-cyan-300 hover:border-cyan-400 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(34,211,238,0.3)]"
            title="Skip loading animation"
          >
            <span>SKIP INTRO</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </header>

        {/* Center: Large Percentage & Phase Message */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-6">
          <div className="relative flex flex-col items-center">
            {/* Subtle cyber background ambient aura */}
            <div className="absolute w-[360px] h-[360px] rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />

            {/* Giant Monospace Percentage Display */}
            <div
              ref={percentTextRef}
              className="font-mono font-black text-7xl sm:text-9xl md:text-[11rem] tracking-tighter text-cyan-400 leading-none select-none transition-all duration-75"
              style={{
                textShadow: "0 0 24px rgba(34, 211, 238, 0.45)",
              }}
            >
              {formattedPercent}
            </div>

            {/* Subtitle Message below number */}
            <div className="mt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-[#090D16]/90 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-cyan-300 uppercase">
                {phaseMessage}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Progress Bar Track & Status Details */}
        <footer className="w-full max-w-2xl mx-auto space-y-3">
          {/* Cyber Progress Bar Track */}
          <div className="w-full h-1 bg-[#1A2234] rounded-full overflow-hidden border border-cyan-500/20">
            <div
              ref={progressBarRef}
              className="h-full bg-cyan-400 rounded-full transition-all duration-75 shadow-[0_0_12px_#22D3EE]"
              style={{ width: `${displayProgress}%` }}
            />
          </div>

          {/* Subtext Status & Percentage Echo */}
          <div className="flex items-center justify-between font-mono text-[11px] text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-ping" />
              <span className="tracking-widest uppercase">LOADING ASSETS</span>
              <span className="text-zinc-600">{"//"}</span>
              <span className="hidden sm:inline text-zinc-500">ENGINE_CORE_READY</span>
            </div>

            <div className="flex items-center gap-1.5 tracking-wider text-cyan-400 font-bold">
              <span>{formattedPercent}</span>
              <span className="text-zinc-600">/ 100%</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

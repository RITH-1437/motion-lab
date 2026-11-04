"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ComponentItem } from "./types";

// 1. Decrypt Scramble Text Demo
function DecryptTextDemo() {
  const target = "QUANTUM MOTION";
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [displayText, setDisplayText] = useState(target);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        target
          .split("")
          .map((char, index) => {
            if (index < iteration) return target[index];
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= target.length) clearInterval(interval);
    }, 30);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span
        onMouseEnter={scramble}
        className="font-mono text-base font-bold text-accent-cyan tracking-widest cursor-pointer select-none"
      >
        {displayText}
      </span>
      <span className="text-[10px] font-mono text-[var(--muted)]">Hover to Decrypt</span>
    </div>
  );
}

// 2. Shimmer Gradient Text Demo
function ShimmerTextDemo() {
  return (
    <span className="font-mono text-lg font-bold bg-[linear-gradient(110deg,#94A3B8,45%,#FFF,55%,#94A3B8)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2.5s_infinite]">
      NEO-KINETIC LABS
    </span>
  );
}

// 3. Typewriter Cursor Text Demo
const TYPEWRITER_PHRASES = ["Orbital Mechanics", "WebGL Shaders", "Framer Physics"];

function TypewriterTextDemo() {
  const [idx, setIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIdx === TYPEWRITER_PHRASES[idx].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1000);
      return () => clearTimeout(timeout);
    }
    if (subIdx === 0 && reverse) {
      setReverse(false);
      setIdx((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIdx((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [subIdx, reverse, idx]);

  return (
    <div className="font-mono text-sm font-semibold text-accent-violet flex items-center">
      <span>{TYPEWRITER_PHRASES[idx].substring(0, subIdx)}</span>
      <span className="w-1.5 h-4 bg-accent-cyan ml-1 animate-pulse" />
    </div>
  );
}

// 4. Word Pull-Up Animation Demo
function WordPullUpDemo() {
  const words = "SPATIAL COMPUTING REALMS".split(" ");
  return (
    <div className="flex gap-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
          className="font-mono text-base font-bold text-[var(--foreground)]"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

// 5. Chromatic RGB Glitch Split Text Demo
function GlitchSplitTextDemo() {
  return (
    <div className="relative font-mono text-lg font-extrabold tracking-wider group cursor-pointer">
      <span className="relative z-10 text-[var(--foreground)]">CYBER MATRIX</span>
      <span className="absolute inset-0 text-cyan-400 -translate-x-0.5 translate-y-0.5 opacity-70 group-hover:animate-pulse">
        CYBER MATRIX
      </span>
      <span className="absolute inset-0 text-pink-500 translate-x-0.5 -translate-y-0.5 opacity-70 group-hover:animate-ping">
        CYBER MATRIX
      </span>
    </div>
  );
}

// 6. Kinetic Harmonic Wave Text Demo
function KineticWaveDemo() {
  const letters = "SYNCHRONICITY".split("");
  return (
    <div className="flex font-mono text-base font-bold text-accent-cyan tracking-wider">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: [-4, 4, -4] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

// 7. Counter Odometer Increment Demo
function CounterOdometerDemo() {
  const [val, setVal] = useState(1480);
  return (
    <div className="flex flex-col items-center gap-1 font-mono">
      <div className="text-2xl font-bold text-accent-cyan flex items-center">
        <span>$</span>
        <motion.span
          key={val}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {val.toLocaleString()}
        </motion.span>
      </div>
      <button
        onClick={() => setVal((v) => v + 125)}
        className="text-[10px] uppercase tracking-wider text-[var(--muted)] hover:text-accent-pink border border-[var(--border)] px-2 py-0.5 rounded"
      >
        + Add Increment
      </button>
    </div>
  );
}

// 8. 3D Perspective Hover Text Demo
function PerspectiveTiltTextDemo() {
  return (
    <div className="[perspective:400px]">
      <motion.span
        whileHover={{ rotateX: 20, rotateY: -15, scale: 1.08 }}
        className="inline-block font-mono text-base font-bold text-white bg-violet-950/60 border border-violet-500/50 px-4 py-1.5 rounded-xl shadow-glow cursor-pointer"
      >
        3D GYROSCOPIC
      </motion.span>
    </div>
  );
}

// 9. Neon Gas Tube Flicker Header Demo
function NeonFlickerDemo() {
  return (
    <span className="font-mono text-lg font-bold text-pink-400 shadow-[0_0_15px_#EC4899] animate-[pulse_2s_infinite]">
      NEON ELECTR<span className="opacity-40 animate-[ping_1.5s_infinite]">O</span>N
    </span>
  );
}

// 10. Masked Reveal Text Demo
function MaskedRevealDemo() {
  return (
    <div className="overflow-hidden py-1">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-base font-bold text-accent-cyan"
      >
        HORIZONTAL MASKED WIPE
      </motion.div>
    </div>
  );
}

// 11. Gaussian Blur-In Typography Demo
function BlurInDemo() {
  return (
    <motion.div
      initial={{ filter: "blur(12px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="font-mono text-base font-extrabold tracking-widest text-[var(--foreground)]"
    >
      ATMOSPHERIC FOCUS
    </motion.div>
  );
}

export const TYPOGRAPHY_COMPONENTS: ComponentItem[] = [
  {
    id: "txt-decrypt",
    title: "Decrypt Scramble Text",
    category: "Text & Typography",
    description: "Matrix character scrambling effect resolving into decrypted message on hover.",
    tags: ["matrix", "scramble", "decrypt", "cyberpunk"],
    code: `<DecryptText text="QUANTUM MOTION" />`,
    demo: <DecryptTextDemo />,
  },
  {
    id: "txt-shimmer",
    title: "Shimmer Gradient Text",
    category: "Text & Typography",
    description: "Luminous linear light sweep traversing across typography letterforms.",
    tags: ["shimmer", "gradient", "sweep", "glow"],
    code: `<ShimmerText text="NEO-KINETIC LABS" />`,
    demo: <ShimmerTextDemo />,
  },
  {
    id: "txt-typewriter",
    title: "Terminal Typewriter Text",
    category: "Text & Typography",
    description: "Monospace sequential typing and character erasing with blinking cursor.",
    tags: ["typewriter", "terminal", "blinking", "cursor"],
    code: `<TypewriterText phrases={["Orbital", "WebGL"]} />`,
    demo: <TypewriterTextDemo />,
  },
  {
    id: "txt-word-pullup",
    title: "Word Pull-Up Animation",
    category: "Text & Typography",
    description: "Staggered word-by-word vertical entrance with simultaneous blur dissipation.",
    tags: ["framer-motion", "stagger", "pull-up", "blur"],
    code: `<WordPullUp text="SPATIAL COMPUTING REALMS" />`,
    demo: <WordPullUpDemo />,
  },
  {
    id: "txt-glitch-split",
    title: "Chromatic Glitch Split",
    category: "Text & Typography",
    description: "Multi-channel RGB offset creating retro CRT chromatic aberration.",
    tags: ["glitch", "chromatic", "rgb-split", "retro"],
    code: `<GlitchSplitText text="CYBER MATRIX" />`,
    demo: <GlitchSplitTextDemo />,
  },
  {
    id: "txt-kinetic-wave",
    title: "Kinetic Harmonic Wave",
    category: "Text & Typography",
    description: "Continuous harmonic sine oscillation across individual letter glyphs.",
    tags: ["kinetic", "wave", "harmonic", "oscillation"],
    code: `<KineticWaveText text="SYNCHRONICITY" />`,
    demo: <KineticWaveDemo />,
  },
  {
    id: "txt-odometer",
    title: "Number Ticker Odometer",
    category: "Text & Typography",
    description: "Smooth numeric increment animation for statistics, pricing, and counts.",
    tags: ["counter", "odometer", "numbers", "ticker"],
    code: `<CounterOdometer value={1480} />`,
    demo: <CounterOdometerDemo />,
  },
  {
    id: "txt-perspective-tilt",
    title: "3D Perspective Hover Text",
    category: "Text & Typography",
    description: "Typography element tilts in 3D perspective following cursor interaction.",
    tags: ["3d", "perspective", "tilt", "gyro"],
    code: `<PerspectiveText text="3D GYROSCOPIC" />`,
    demo: <PerspectiveTiltTextDemo />,
  },
  {
    id: "txt-neon-flicker",
    title: "Neon Gas Tube Header",
    category: "Text & Typography",
    description: "Realistic neon discharge tube simulation with randomized micro-flickers.",
    tags: ["neon", "gas-tube", "flicker", "cyber"],
    code: `<NeonFlicker text="NEON ELECTRON" />`,
    demo: <NeonFlickerDemo />,
  },
  {
    id: "txt-masked-reveal",
    title: "Masked Horizontal Wipe",
    category: "Text & Typography",
    description: "Typography emerges horizontally from behind a razor-sharp container mask.",
    tags: ["mask", "wipe", "reveal", "entrance"],
    code: `<MaskedReveal text="HORIZONTAL MASKED WIPE" />`,
    demo: <MaskedRevealDemo />,
  },
  {
    id: "txt-blur-focus",
    title: "Atmospheric Blur-In Focus",
    category: "Text & Typography",
    description: "Transitioning smoothly from atmospheric Gaussian blur into sharp focus.",
    tags: ["blur", "focus", "atmospheric", "framer-motion"],
    code: `<BlurInText text="ATMOSPHERIC FOCUS" />`,
    demo: <BlurInDemo />,
  },
];

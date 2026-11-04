"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Check,
  Upload,
  Copy,
  X,
} from "lucide-react";
import { ComponentItem } from "./types";

// 1. Spotlight Search Field Demo
function SpotlightSearchDemo() {
  const [val, setVal] = useState("");
  return (
    <div className="relative w-full max-w-xs">
      <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Spotlight Search..."
        className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all"
      />
    </div>
  );
}

// 2. Floating Label Input Demo
function FloatingLabelDemo() {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");

  return (
    <div className="relative w-full max-w-xs pt-3">
      <input
        type="text"
        value={val}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setVal(e.target.value)}
        className="w-full px-3 py-2 rounded-xl bg-transparent border border-[var(--border)] text-xs font-mono text-[var(--foreground)] focus:outline-none focus:border-accent-cyan"
      />
      <motion.label
        animate={{
          y: focused || val ? -22 : 6,
          scale: focused || val ? 0.85 : 1,
          color: focused ? "#22D3EE" : "#94A3B8",
        }}
        className="absolute left-3 top-2 pointer-events-none font-mono text-xs origin-left"
      >
        Planet Name
      </motion.label>
    </div>
  );
}

// 3. Cyber Checkbox Demo
function CyberCheckboxDemo() {
  const [checked, setChecked] = useState(true);
  return (
    <div
      onClick={() => setChecked(!checked)}
      className="flex items-center gap-2 cursor-pointer select-none font-mono text-xs"
    >
      <div
        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
          checked
            ? "border-cyan-400 bg-cyan-950/80 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            : "border-zinc-700 bg-zinc-900"
        }`}
      >
        {checked && <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[3]" />}
      </div>
      <span className={checked ? "text-cyan-300 font-semibold" : "text-[var(--muted)]"}>
        Rayleigh Atmosphere
      </span>
    </div>
  );
}

// 4. Magnetic Physics Toggle Switch Demo
function MagneticToggleDemo() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div
      onClick={() => setEnabled(!enabled)}
      className="flex items-center gap-3 cursor-pointer select-none font-mono text-xs"
    >
      <div
        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ${
          enabled ? "bg-accent-violet shadow-glow" : "bg-zinc-800"
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-5 h-5 rounded-full bg-white shadow-md"
        />
      </div>
      <span className={enabled ? "text-accent-violet font-semibold" : "text-[var(--muted)]"}>
        {enabled ? "ACTIVE" : "DISABLED"}
      </span>
    </div>
  );
}

// 5. Neon Glow Range Slider Demo
function NeonSliderDemo() {
  const [val, setVal] = useState(65);
  return (
    <div className="w-full max-w-xs space-y-1.5 font-mono text-xs">
      <div className="flex justify-between text-[var(--muted)]">
        <span>Orbital Eccentricity</span>
        <span className="text-accent-cyan font-bold">{val}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full h-1.5 rounded-lg accent-accent-cyan bg-zinc-800 cursor-pointer"
      />
    </div>
  );
}

// 6. OTP 6-Digit PIN Verification Demo
function OtpPinDemo() {
  const [pins, setPins] = useState(["4", "8", "1", "7", "", ""]);
  return (
    <div className="flex gap-2 font-mono">
      {pins.map((p, i) => (
        <input
          key={i}
          type="text"
          maxLength={1}
          value={p}
          onChange={(e) => {
            const next = [...pins];
            next[i] = e.target.value.slice(-1);
            setPins(next);
          }}
          className={`w-8 h-10 text-center rounded-lg border text-sm font-bold bg-zinc-900 ${
            p
              ? "border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
              : "border-zinc-700 text-zinc-500"
          }`}
        />
      ))}
    </div>
  );
}

// 7. Password Entropy Strength Meter Demo
function PasswordMeterDemo() {
  const [val, setVal] = useState("Quantum9#Pass");
  const strength = val.length > 8 ? 4 : val.length > 5 ? 2 : 1;
  const colors = ["bg-red-500", "bg-amber-500", "bg-cyan-400", "bg-emerald-400"];

  return (
    <div className="w-full max-w-xs space-y-2 font-mono text-xs">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-cyan-400"
      />
      <div className="grid grid-cols-4 gap-1.5 h-1">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`h-full rounded-full transition-colors ${
              idx < strength ? colors[strength - 1] : "bg-zinc-800"
            }`}
          />
        ))}
      </div>
      <span className="text-[10px] text-emerald-400">Security Entropy: Strong</span>
    </div>
  );
}

// 8. Interactive Tag Input Chips Demo
function TagInputDemo() {
  const [tags, setTags] = useState(["WebGL", "Three.js", "GSAP"]);
  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t));

  return (
    <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-zinc-900 border border-zinc-700 font-mono text-xs">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-950/80 border border-violet-500/50 text-violet-300"
        >
          <span>#{tag}</span>
          <X
            onClick={() => removeTag(tag)}
            className="w-3 h-3 cursor-pointer hover:text-white"
          />
        </span>
      ))}
      <span className="text-zinc-500 text-[11px] self-center ml-1">+ Add Tag</span>
    </div>
  );
}

// 9. Radio Cyber Pills Selector Demo
function RadioPillsDemo() {
  const [selected, setSelected] = useState("60 FPS");
  const options = ["30 FPS", "60 FPS", "120 FPS"];

  return (
    <div className="flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setSelected(opt)}
          className={`px-3 py-1 rounded-lg transition-colors ${
            selected === opt
              ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(34,211,238,0.5)]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// 10. File Upload Dropzone Demo
function FileDropzoneDemo() {
  return (
    <div className="w-full max-w-xs p-4 rounded-xl border-2 border-dashed border-cyan-400/50 bg-cyan-950/20 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-cyan-400 hover:bg-cyan-950/40 transition-all">
      <Upload className="w-5 h-5 text-cyan-400 animate-bounce" />
      <span className="font-mono text-xs text-cyan-300 font-semibold">Drop 3D Model</span>
      <span className="font-mono text-[10px] text-zinc-500">.GLTF, .GLB, or .OBJ</span>
    </div>
  );
}

// 11. Quick Copy Field Demo
function CopyFieldDemo() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-700 font-mono text-xs">
      <span className="px-2 text-zinc-300">npm i @motion-lab/engine</span>
      <button
        onClick={copy}
        className="px-2.5 py-1 rounded-lg bg-accent-violet text-white font-semibold flex items-center gap-1 hover:bg-violet-600 transition-colors"
      >
        {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

export const FORM_COMPONENTS: ComponentItem[] = [
  {
    id: "inp-spotlight-search",
    title: "Spotlight Search Field",
    category: "Form Controls",
    description: "Search input with glowing cyan border beam and icon indicator.",
    tags: ["search", "input", "spotlight", "glow"],
    code: `<SpotlightSearchInput placeholder="Search..." />`,
    demo: <SpotlightSearchDemo />,
  },
  {
    id: "inp-floating-label",
    title: "Floating Label Input",
    category: "Form Controls",
    description: "Animated placeholder elevating to border line with smooth scale.",
    tags: ["floating-label", "form", "input", "framer-motion"],
    code: `<FloatingLabelInput label="Planet Name" />`,
    demo: <FloatingLabelDemo />,
  },
  {
    id: "inp-cyber-checkbox",
    title: "Cyber Angular Checkbox",
    category: "Form Controls",
    description: "Chamfered checkbox with animated neon checkmark drawing path.",
    tags: ["checkbox", "cyberpunk", "checkmark", "toggle"],
    code: `<CyberCheckbox label="Rayleigh Atmosphere" />`,
    demo: <CyberCheckboxDemo />,
  },
  {
    id: "inp-magnetic-toggle",
    title: "Magnetic Physics Toggle",
    category: "Form Controls",
    description: "Spring-loaded pill switch with rolling glowing slider ball.",
    tags: ["toggle", "switch", "magnetic", "spring"],
    code: `<MagneticToggle />`,
    demo: <MagneticToggleDemo />,
  },
  {
    id: "inp-neon-slider",
    title: "Neon Glow Range Slider",
    category: "Form Controls",
    description: "Slider track with glowing accent thumb and live telemetry readout.",
    tags: ["slider", "range", "neon", "track"],
    code: `<NeonSlider min={0} max={100} />`,
    demo: <NeonSliderDemo />,
  },
  {
    id: "inp-otp-pin",
    title: "OTP 6-Digit PIN Field",
    category: "Form Controls",
    description: "Segmented multi-digit verification code boxes with active glow ring.",
    tags: ["otp", "pin", "verification", "boxes"],
    code: `<OtpPinInput digits={6} />`,
    demo: <OtpPinDemo />,
  },
  {
    id: "inp-password-meter",
    title: "Password Strength Meter",
    category: "Form Controls",
    description: "Segmented color-shifting entropy meter evaluating complexity.",
    tags: ["password", "strength", "entropy", "meter"],
    code: `<PasswordStrengthMeter />`,
    demo: <PasswordMeterDemo />,
  },
  {
    id: "inp-tag-chips",
    title: "Interactive Tag Chip Input",
    category: "Form Controls",
    description: "Dynamic chip creation and deletion with spring exit transitions.",
    tags: ["tags", "chips", "input", "interactive"],
    code: `<TagChipInput tags={tags} />`,
    demo: <TagInputDemo />,
  },
  {
    id: "inp-radio-pills",
    title: "Radio Cyber Pill Selector",
    category: "Form Controls",
    description: "Mutually exclusive pill selector with sliding neon active state.",
    tags: ["radio", "pills", "selector", "segmented"],
    code: `<RadioPillSelector options={["30 FPS", "60 FPS"]} />`,
    demo: <RadioPillsDemo />,
  },
  {
    id: "inp-file-dropzone",
    title: "Magnetic File Dropzone",
    category: "Form Controls",
    description: "Animated dashed border dropzone with hover suction elevation.",
    tags: ["dropzone", "upload", "file", "drag-drop"],
    code: `<FileDropzone accept=".glb,.gltf" />`,
    demo: <FileDropzoneDemo />,
  },
  {
    id: "inp-copy-field",
    title: "Integrated Copy Action Field",
    category: "Form Controls",
    description: "Code or text input with attached copy button and transient check feedback.",
    tags: ["copy", "clipboard", "field", "feedback"],
    code: `<CopyActionField text="npm i @motion-lab/engine" />`,
    demo: <CopyFieldDemo />,
  },
];

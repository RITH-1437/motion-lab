"use client";

import * as THREE from "three";

// Cache generated textures so canvas renders happen only once per session
const textureCache: Record<string, THREE.CanvasTexture> = {};

/**
 * Creates a CanvasTexture using an offscreen canvas generator.
 */
function createCachedTexture(
  key: string,
  width: number,
  height: number,
  renderFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void
): THREE.CanvasTexture {
  if (typeof window === "undefined") {
    // Return empty fallback during SSR
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }

  if (textureCache[key]) {
    return textureCache[key];
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    renderFn(ctx, width, height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  textureCache[key] = texture;
  return texture;
}

/**
 * Procedural Sun Texture (Granulation & Plasma Flares)
 */
export function getSunTexture(): THREE.CanvasTexture {
  return createCachedTexture("sun", 1024, 512, (ctx, w, h) => {
    ctx.fillStyle = "#FF7A00";
    ctx.fillRect(0, 0, w, h);

    // Plasma convection cells
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 10 + Math.random() * 40;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, "rgba(255, 230, 80, 0.8)");
      grad.addColorStop(0.5, "rgba(255, 140, 0, 0.4)");
      grad.addColorStop(1, "rgba(255, 80, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

/**
 * Procedural Earth Day Texture (Continents, Vibrant Greens, Turquoise Water Shallows, Polar Caps)
 */
export function getEarthDayTexture(): THREE.CanvasTexture {
  return createCachedTexture("earth-day", 2048, 1024, (ctx, w, h) => {
    // 1. Deep Ocean Base with realistic marine blue depth
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
    oceanGrad.addColorStop(0, "#031E42");
    oceanGrad.addColorStop(0.25, "#063970");
    oceanGrad.addColorStop(0.5, "#0A58CA"); // Vibrant tropical deep blue
    oceanGrad.addColorStop(0.75, "#063970");
    oceanGrad.addColorStop(1, "#031E42");
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, w, h);

    // Oceanic current swirls (subtle deep blue variations)
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = "rgba(14, 116, 144, 0.15)";
      ctx.beginPath();
      ctx.ellipse(
        Math.random() * w,
        Math.random() * h,
        150 + Math.random() * 200,
        40 + Math.random() * 80,
        (Math.random() - 0.5) * 0.4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Detailed landmass coordinate configurations
    const continentData = [
      // North America
      {
        center: [w * 0.22, h * 0.35],
        parts: [
          { dx: 0, dy: -30, rx: 120, ry: 75, angle: 0 }, // Canada / Subarctic
          { dx: -20, dy: 30, rx: 90, ry: 65, angle: -0.1 }, // US Mainland
          { dx: -50, dy: 90, rx: 45, ry: 40, angle: 0.5 }, // Mexico
          { dx: -20, dy: 130, rx: 25, ry: 50, angle: 0.7 }, // Central America isthmus
          { dx: -130, dy: -45, rx: 55, ry: 40, angle: -0.2 }, // Alaska
          { dx: 45, dy: 35, rx: 15, ry: 40, angle: 0.2 }, // Florida peninsula
        ],
      },
      // Greenland
      {
        center: [w * 0.38, h * 0.16],
        parts: [{ dx: 0, dy: 0, rx: 65, ry: 80, angle: 0.1 }],
      },
      // South America
      {
        center: [w * 0.31, h * 0.66],
        parts: [
          { dx: 0, dy: -30, rx: 95, ry: 70, angle: 0.1 }, // Amazon Basin
          { dx: -25, dy: 40, rx: 65, ry: 95, angle: 0.25 }, // Brazil / Argentina
          { dx: -55, dy: 20, rx: 25, ry: 130, angle: 0.15 }, // Andes Coastline
        ],
      },
      // Europe
      {
        center: [w * 0.52, h * 0.29],
        parts: [
          { dx: -10, dy: -10, rx: 75, ry: 50, angle: 0 }, // Central Europe
          { dx: 15, dy: -55, rx: 45, ry: 65, angle: -0.3 }, // Scandinavia
          { dx: -60, dy: 25, rx: 35, ry: 30, angle: 0.1 }, // Iberian Peninsula
          { dx: -20, dy: 30, rx: 18, ry: 40, angle: 0.6 }, // Italy boot
          { dx: -65, dy: -15, rx: 25, ry: 35, angle: 0.3 }, // British Isles
        ],
      },
      // Africa
      {
        center: [w * 0.53, h * 0.56],
        parts: [
          { dx: 0, dy: -50, rx: 110, ry: 60, angle: 0 }, // North Africa / Sahara
          { dx: -15, dy: 15, rx: 85, ry: 70, angle: 0.1 }, // Central Rainforest / Congo
          { dx: 5, dy: 80, rx: 60, ry: 80, angle: 0.2 }, // Southern Africa
          { dx: 55, dy: -25, rx: 35, ry: 45, angle: 0.6 }, // Horn of Africa
          { dx: 80, dy: 85, rx: 20, ry: 45, angle: 0.3 }, // Madagascar
        ],
      },
      // Asia
      {
        center: [w * 0.73, h * 0.33],
        parts: [
          { dx: 0, dy: -60, rx: 180, ry: 75, angle: 0 }, // Siberia / Russia
          { dx: -70, dy: 30, rx: 65, ry: 65, angle: 0.3 }, // India
          { dx: 25, dy: 15, rx: 100, ry: 70, angle: 0 }, // China / East Asia
          { dx: 60, dy: 80, rx: 45, ry: 60, angle: 0.6 }, // Southeast Asia
          { dx: -110, dy: 15, rx: 55, ry: 50, angle: -0.2 }, // Middle East / Arabia
          { dx: 125, dy: 10, rx: 18, ry: 65, angle: 0.4 }, // Japan archipelago
        ],
      },
      // Australia & Oceania
      {
        center: [w * 0.83, h * 0.73],
        parts: [
          { dx: 0, dy: 0, rx: 80, ry: 55, angle: 0 }, // Australia Mainland
          { dx: 10, dy: 55, rx: 16, ry: 16, angle: 0 }, // Tasmania
          { dx: 75, dy: 40, rx: 18, ry: 50, angle: 0.5 }, // New Zealand
        ],
      },
      // Maritime Southeast Asia / Indonesia archipelago
      {
        center: [w * 0.78, h * 0.58],
        parts: [
          { dx: -20, dy: 0, rx: 40, ry: 15, angle: 0.2 }, // Sumatra / Java
          { dx: 20, dy: -10, rx: 35, ry: 25, angle: 0 }, // Borneo
          { dx: 65, dy: 10, rx: 45, ry: 20, angle: -0.1 }, // New Guinea
          { dx: 15, dy: -35, rx: 15, ry: 30, angle: 0.2 }, // Philippines
        ],
      },
    ];

    // STEP 2: Render Continental Shelves / Turquoise Shallow Waters
    // Gives Earth that luminous aquamarine glow along coastlines & reefs
    continentData.forEach(({ center, parts }) => {
      const [cx, cy] = center;
      parts.forEach(({ dx, dy, rx, ry, angle }) => {
        // Outer turquoise lagoon aura
        ctx.fillStyle = "rgba(6, 182, 212, 0.45)"; // Cyan-500
        ctx.beginPath();
        ctx.ellipse(cx + dx, cy + dy, rx + 24, ry + 20, angle, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright aqua reef rim
        ctx.fillStyle = "rgba(34, 211, 238, 0.65)"; // Cyan-400
        ctx.beginPath();
        ctx.ellipse(cx + dx, cy + dy, rx + 12, ry + 10, angle, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // STEP 3: Render Continents with Lush Forest & Emerald Greens
    continentData.forEach(({ center, parts }) => {
      const [cx, cy] = center;

      // Base lush vegetation green
      ctx.fillStyle = "#166534"; // Deep forest green
      parts.forEach(({ dx, dy, rx, ry, angle }) => {
        ctx.beginPath();
        ctx.ellipse(cx + dx, cy + dy, rx, ry, angle, 0, Math.PI * 2);
        ctx.fill();
      });

      // Layer 2: Vibrant emerald & fertile plains
      ctx.fillStyle = "#15803D"; // Vibrant emerald
      parts.forEach(({ dx, dy, rx, ry, angle }) => {
        ctx.beginPath();
        ctx.ellipse(cx + dx * 0.95, cy + dy * 0.95, rx * 0.85, ry * 0.82, angle, 0, Math.PI * 2);
        ctx.fill();
      });

      // Layer 3: Rainforest canopies & bright river basins
      ctx.fillStyle = "#10B981"; // Emerald-500
      parts.forEach(({ dx, dy, rx, ry, angle }) => {
        ctx.beginPath();
        ctx.ellipse(cx + dx * 0.9, cy + dy * 0.9, rx * 0.55, ry * 0.5, angle, 0, Math.PI * 2);
        ctx.fill();
      });

      // Layer 4: Warm savannah & cordillera mountains
      ctx.fillStyle = "#84CC16"; // Bright lime/savannah
      parts.forEach(({ dx, dy, rx, ry, angle }) => {
        ctx.beginPath();
        ctx.ellipse(cx + dx * 0.85, cy + dy * 0.85, rx * 0.32, ry * 0.28, angle + 0.1, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mountain spines / arid highland peaks
      ctx.fillStyle = "#9A7B56"; // Natural alpine earthen tone
      parts.forEach(({ dx, dy, rx, ry, angle }) => {
        ctx.beginPath();
        ctx.ellipse(cx + dx * 0.8, cy + dy * 0.8, rx * 0.18, ry * 0.14, angle, 0, Math.PI * 2);
        ctx.fill();
      });
    });

    // STEP 4: Blue Great Lakes & Inland Waterways
    ctx.fillStyle = "#0284C7"; // Vivid freshwater blue
    // Great Lakes
    ctx.beginPath();
    ctx.ellipse(w * 0.24, h * 0.32, 16, 9, 0.3, 0, Math.PI * 2);
    ctx.fill();
    // Caspian Sea
    ctx.beginPath();
    ctx.ellipse(w * 0.59, h * 0.31, 12, 22, 0.2, 0, Math.PI * 2);
    ctx.fill();
    // Black Sea
    ctx.beginPath();
    ctx.ellipse(w * 0.55, h * 0.3, 14, 8, -0.1, 0, Math.PI * 2);
    ctx.fill();
    // Lake Victoria
    ctx.beginPath();
    ctx.ellipse(w * 0.56, h * 0.55, 10, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // STEP 5: Polar Ice Caps with Glacial Turquoise Edges
    // North Pole (Arctic)
    ctx.fillStyle = "rgba(6, 182, 212, 0.5)"; // Turquoise shelf
    ctx.fillRect(0, 0, w, 55);
    ctx.fillStyle = "#F0FDF4"; // Pure glacier snow
    ctx.fillRect(0, 0, w, 42);

    // South Pole (Antarctica)
    ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
    ctx.fillRect(0, h - 70, w, 70);
    ctx.fillStyle = "#F0FDF4";
    ctx.fillRect(0, h - 55, w, 55);
  });
}

/**
 * Procedural Earth Night Texture (City Lights Illumination)
 */
export function getEarthNightTexture(): THREE.CanvasTexture {
  return createCachedTexture("earth-night", 1024, 512, (ctx, w, h) => {
    ctx.fillStyle = "#02040a";
    ctx.fillRect(0, 0, w, h);

    // Golden clusters of human civilization city lights
    ctx.fillStyle = "#fef08a";
    const cityCenters = [
      { x: w * 0.22, y: h * 0.34, count: 250 }, // North America East & West
      { x: w * 0.3, y: h * 0.65, count: 80 },   // South America coasts
      { x: w * 0.52, y: h * 0.3, count: 320 },  // Western Europe
      { x: w * 0.75, y: h * 0.38, count: 350 }, // East Asia & India
      { x: w * 0.82, y: h * 0.72, count: 90 },  // Australia coasts
    ];

    cityCenters.forEach(({ x, y, count }) => {
      for (let i = 0; i < count; i++) {
        const cx = x + (Math.random() - 0.5) * 110;
        const cy = y + (Math.random() - 0.5) * 70;
        const radius = Math.random() > 0.8 ? 1.5 : 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  });
}

/**
 * Procedural Earth Cloud Layer Texture (Swirling Cyclone Bands)
 */
export function getEarthCloudsTexture(): THREE.CanvasTexture {
  return createCachedTexture("earth-clouds", 1024, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);

    // White cloud streaks with transparency
    for (let i = 0; i < 70; i++) {
      const y = Math.random() * h;
      const x = Math.random() * w;
      const width = 100 + Math.random() * 250;
      const height = 15 + Math.random() * 45;

      ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.random() * 0.5})`;
      ctx.beginPath();
      ctx.ellipse(x, y, width, height, (Math.random() - 0.5) * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

/**
 * Procedural Moon Texture (Craters & Lunar Maria Basins)
 */
export function getMoonTexture(): THREE.CanvasTexture {
  return createCachedTexture("moon", 512, 256, (ctx, w, h) => {
    ctx.fillStyle = "#8a8a8e";
    ctx.fillRect(0, 0, w, h);

    // Dark lunar maria (basalt plains)
    ctx.fillStyle = "#48484a";
    for (let i = 0; i < 8; i++) {
      const x = w * (0.2 + Math.random() * 0.6);
      const y = h * (0.2 + Math.random() * 0.6);
      ctx.beginPath();
      ctx.ellipse(x, y, 40 + Math.random() * 50, 25 + Math.random() * 35, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Impact craters with rims
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 2 + Math.random() * 10;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "rgba(40, 40, 40, 0.5)";
      ctx.beginPath();
      ctx.arc(x, y, r * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

/**
 * Procedural Jupiter Texture (Zonal Cloud Belts & Great Red Spot)
 */
export function getJupiterTexture(): THREE.CanvasTexture {
  return createCachedTexture("jupiter", 1024, 512, (ctx, w, h) => {
    // Alternating horizontal cloud belts
    const colors = ["#d7be94", "#b47a4c", "#e7d6b8", "#8c5332", "#c49a6c", "#eedbc1"];
    const bands = 24;
    const bandHeight = h / bands;

    for (let i = 0; i < bands; i++) {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(0, i * bandHeight, w, bandHeight);
    }

    // Great Red Spot (giant storm)
    ctx.fillStyle = "#9f3622";
    ctx.beginPath();
    ctx.ellipse(w * 0.65, h * 0.65, 55, 32, -0.08, 0, Math.PI * 2);
    ctx.fill();

    // Internal eddy swirl
    ctx.fillStyle = "#c75838";
    ctx.beginPath();
    ctx.ellipse(w * 0.65, h * 0.65, 35, 18, -0.08, 0, Math.PI * 2);
    ctx.fill();
  });
}

/**
 * Procedural Saturn Ring Texture (Translucent Radial Rings)
 */
export function getSaturnRingTexture(): THREE.CanvasTexture {
  return createCachedTexture("saturn-ring", 512, 1, (ctx, w) => {
    const imgData = ctx.createImageData(w, 1);
    for (let i = 0; i < w; i++) {
      const idx = i * 4;
      const norm = i / w;

      // Cassini Division and Ring Bands
      let alpha = 0.85;
      if (norm < 0.1 || norm > 0.95) alpha = 0.0;
      else if (norm > 0.55 && norm < 0.62) alpha = 0.05; // Cassini division

      const shade = 180 + Math.sin(norm * 80) * 45;
      imgData.data[idx] = shade;
      imgData.data[idx + 1] = shade * 0.92;
      imgData.data[idx + 2] = shade * 0.78;
      imgData.data[idx + 3] = Math.floor(alpha * 255);
    }
    ctx.putImageData(imgData, 0, 0);
  });
}

/**
 * Procedural Mars Texture (Rust Deserts & White Polar Ice)
 */
export function getMarsTexture(): THREE.CanvasTexture {
  return createCachedTexture("mars", 512, 256, (ctx, w, h) => {
    ctx.fillStyle = "#c1440e";
    ctx.fillRect(0, 0, w, h);

    // Dark volcanic lowlands (Acidalia, Syrtis Major)
    ctx.fillStyle = "#5c2a18";
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.ellipse(
        w * Math.random(),
        h * (0.3 + Math.random() * 0.5),
        40 + Math.random() * 60,
        20 + Math.random() * 30,
        Math.random(),
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Polar Ice Caps
    ctx.fillStyle = "#fef2f2";
    ctx.fillRect(0, 0, w, 14);
    ctx.fillRect(0, h - 18, w, 18);
  });
}

/**
 * Generic Planetary Procedural Texture Generator
 */
export function getPlanetTexture(id: string, baseColorHex: string): THREE.CanvasTexture {
  switch (id) {
    case "sun":
      return getSunTexture();
    case "earth":
      return getEarthDayTexture();
    case "moon":
      return getMoonTexture();
    case "mars":
      return getMarsTexture();
    case "jupiter":
      return getJupiterTexture();
    default:
      return createCachedTexture(`planet-${id}`, 256, 128, (ctx, w, h) => {
        ctx.fillStyle = baseColorHex;
        ctx.fillRect(0, 0, w, h);

        // Subtle atmospheric cloud stripes
        for (let i = 0; i < 16; i++) {
          ctx.fillStyle = i % 2 === 0 ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.1)";
          ctx.fillRect(0, (i * h) / 16, w, h / 16);
        }
      });
  }
}

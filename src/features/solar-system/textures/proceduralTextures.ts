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
 * Procedural Earth Day Texture (Continents, Oceans, Polar Caps)
 */
export function getEarthDayTexture(): THREE.CanvasTexture {
  return createCachedTexture("earth-day", 1024, 512, (ctx, w, h) => {
    // Deep Ocean Base
    ctx.fillStyle = "#0c2b5c";
    ctx.fillRect(0, 0, w, h);

    // Continental landmass clusters
    ctx.fillStyle = "#2d5e32"; // Lush green/forest
    const continents = [
      { x: w * 0.22, y: h * 0.35, rx: 90, ry: 60 }, // North America
      { x: w * 0.3, y: h * 0.65, rx: 65, ry: 90 },  // South America
      { x: w * 0.52, y: h * 0.3, rx: 70, ry: 45 },  // Europe
      { x: w * 0.52, y: h * 0.55, rx: 80, ry: 80 },  // Africa
      { x: w * 0.72, y: h * 0.35, rx: 130, ry: 80 }, // Asia
      { x: w * 0.82, y: h * 0.72, rx: 60, ry: 45 },  // Australia
    ];

    continents.forEach(({ x, y, rx, ry }) => {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();

      // Desert/arid inner core
      ctx.fillStyle = "#705c31";
      ctx.beginPath();
      ctx.ellipse(x, y, rx * 0.5, ry * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2d5e32";
    });

    // Polar Ice Caps
    ctx.fillStyle = "#e0f2fe";
    ctx.fillRect(0, 0, w, 28);
    ctx.fillRect(0, h - 35, w, 35);
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

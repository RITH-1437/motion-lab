"use client";

import React, { useMemo } from "react";
import { useSolarSimulation } from "../hooks/useSolarSimulation";
import { PLANETS_DATA } from "../config/planets";
import { Sun } from "./Sun";
import { Planet } from "./Planet";
import { Earth } from "./Earth";
import { AsteroidBelt } from "./AsteroidBelt";
import { StarField } from "./StarField";
import { OrbitPath } from "./OrbitPath";
import { CameraController } from "./CameraController";

export function SolarSystemScene() {
  const { config, selectPlanet } = useSolarSimulation();
  const {
    isPlaying,
    simulationSpeed,
    orbitSpacing,
    planetScale,
    showOrbits,
    showLabels,
    showStars,
    showAtmosphere,
    showRings,
    showAsteroidBelt,
    showMoons,
    showClouds,
    selectedPlanetId,
  } = config;

  // Filter regular planets (exclude Sun, Earth, Moon, and Asteroid Belt handled individually)
  const regularPlanets = useMemo(() => {
    return PLANETS_DATA.filter(
      (p) => !["sun", "earth", "moon", "asteroids"].includes(p.id)
    );
  }, []);

  const earthData = useMemo(() => {
    return PLANETS_DATA.find((p) => p.id === "earth");
  }, []);

  const sunData = useMemo(() => {
    return PLANETS_DATA.find((p) => p.id === "sun");
  }, []);

  return (
    <>
      {/* Dynamic Smooth Camera Transition & Orbit Controls */}
      <CameraController />

      {/* 3D Deep Space Starfield */}
      {showStars && <StarField count={2600} />}

      {/* Central Illuminating Sun */}
      <Sun
        radius={(sunData?.visualRadius || 3.4) * Math.min(1.2, Math.max(0.7, planetScale * 0.85))}
        isPlaying={isPlaying}
        showLabels={showLabels}
        isSelected={selectedPlanetId === "sun"}
        onSelect={() => selectPlanet("sun")}
      />

      {/* Planetary Orbit Lines */}
      {showOrbits && (
        <group>
          {PLANETS_DATA.filter((p) => p.orbitDistance > 0 && p.id !== "moon").map((planet) => (
            <OrbitPath
              key={`orbit-${planet.id}`}
              radius={planet.orbitDistance * orbitSpacing}
              color={planet.color}
              opacity={selectedPlanetId === planet.id ? 0.65 : 0.22}
            />
          ))}
        </group>
      )}

      {/* Standalone Priority Feature: Earth with Moon, Atmosphere, Clouds & Specular Day/Night */}
      {earthData && (
        <Earth
          radius={earthData.visualRadius * planetScale}
          orbitDistance={earthData.orbitDistance * orbitSpacing}
          orbitSpeedFactor={earthData.orbitSpeedFactor}
          isPlaying={isPlaying}
          speedMultiplier={simulationSpeed}
          showClouds={showClouds}
          showAtmosphere={showAtmosphere}
          showMoon={showMoons}
          showLabels={showLabels}
          isSelected={selectedPlanetId === "earth"}
          onSelect={() => selectPlanet("earth")}
        />
      )}

      {/* Circumstellar Asteroid Belt between Mars & Jupiter */}
      {showAsteroidBelt && (
        <AsteroidBelt
          spacingMultiplier={orbitSpacing}
          isPlaying={isPlaying}
          speedMultiplier={simulationSpeed}
        />
      )}

      {/* Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto */}
      {regularPlanets.map((planet) => (
        <Planet
          key={planet.id}
          data={planet}
          isPlaying={isPlaying}
          speedMultiplier={simulationSpeed}
          spacingMultiplier={orbitSpacing}
          planetScale={planetScale}
          showRings={showRings}
          showLabels={showLabels}
          isSelected={selectedPlanetId === planet.id}
          onSelect={() => selectPlanet(planet.id)}
        />
      ))}
    </>
  );
}

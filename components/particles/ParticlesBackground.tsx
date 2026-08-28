"use client";

import { useEffect, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { getParticlesOptions } from "./particles.config";
import { CursorGlow } from "./CursorGlow";

async function initEngine(engine: Engine) {
  await loadSlim(engine);
}

export function ParticlesBackground() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.35),transparent_60%)]" />
      <CursorGlow />
      <ParticlesProvider init={initEngine}>
        <Particles
          id="belin7z-particles"
          className="h-full w-full"
          options={getParticlesOptions(reducedMotion)}
        />
      </ParticlesProvider>
    </div>
  );
}

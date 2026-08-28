"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { particlesOptions } from "./particles.config";

async function initEngine(engine: Engine) {
  await loadSlim(engine);
}

export function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.35),transparent_60%)]" />
      <ParticlesProvider init={initEngine}>
        <Particles id="belin7z-particles" className="h-full w-full" options={particlesOptions} />
      </ParticlesProvider>
    </div>
  );
}

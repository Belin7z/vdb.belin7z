"use client";

import { useState, type CSSProperties } from "react";

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const COLORS = ["#c084fc", "#a855f7", "#7c3aed", "#f0abfc", "#e9d5ff"];
const PARTICLE_COUNT = 14;
const BURST_LIFETIME_MS = 700;

export function useParticleBurst() {
  const [burst, setBurst] = useState<BurstParticle[]>([]);

  function trigger(intensity = 1) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const count = Math.round(PARTICLE_COUNT * intensity);
    const reach = Math.min(intensity, 2);
    const particles: BurstParticle[] = Array.from({ length: count }, (_, i) => {
      const angle = ((360 / count) * i + Math.random() * 20) * (Math.PI / 180);
      const distance = (40 + Math.random() * 30) * reach;
      return {
        id: Date.now() + i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        color: COLORS[i % COLORS.length],
        size: (3 + Math.random() * 3) * Math.min(1 + (intensity - 1) * 0.3, 1.6),
      };
    });

    setBurst(particles);
    setTimeout(() => setBurst([]), BURST_LIFETIME_MS);
  }

  return { burst, trigger };
}

export function ParticleBurstLayer({ burst }: { burst: BurstParticle[] }) {
  return (
    <>
      {burst.map((particle) => (
        <span
          key={particle.id}
          className="animate-burst-particle pointer-events-none absolute left-1/2 top-1/2 rounded-full"
          style={
            {
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              "--burst-x": `${particle.x}px`,
              "--burst-y": `${particle.y}px`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

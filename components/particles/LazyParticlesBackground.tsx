"use client";

import dynamic from "next/dynamic";

export const LazyParticlesBackground = dynamic(
  () => import("./ParticlesBackground").then((mod) => mod.ParticlesBackground),
  { ssr: false }
);

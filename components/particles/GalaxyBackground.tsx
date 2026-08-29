"use client";

import { GalaxyCanvas } from "./GalaxyCanvas";

export function GalaxyBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.3),transparent_60%)]" />
      <GalaxyCanvas />
    </div>
  );
}

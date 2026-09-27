"use client";

import { GalaxyCanvas } from "./GalaxyCanvas";
import { useTimeOfDay, type TimeOfDay } from "@/hooks/useTimeOfDay";

const CORE_GLOW: Record<TimeOfDay, string> = {
  morning: "rgba(99,102,241,0.28)",
  afternoon: "rgba(124,58,237,0.3)",
  evening: "rgba(192,38,211,0.32)",
  night: "rgba(88,28,135,0.35)",
};

export function GalaxyBackground() {
  const timeOfDay = useTimeOfDay();

  return (
    <div className="fixed inset-0 -z-10">
      <div
        className="pointer-events-none absolute inset-0 transition-[background-image] duration-1000"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 35%, ${CORE_GLOW[timeOfDay]}, transparent 60%)`,
        }}
      />
      <GalaxyCanvas />
    </div>
  );
}

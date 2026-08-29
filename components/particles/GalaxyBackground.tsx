"use client";

import { useEffect, useState } from "react";
import { GalaxyCanvas } from "./GalaxyCanvas";

const MAX_TILT_DEG = 6;

export function GalaxyBackground() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleMouseMove(event: MouseEvent) {
      const relativeX = event.clientX / window.innerWidth - 0.5;
      const relativeY = event.clientY / window.innerHeight - 0.5;
      setTilt({ x: relativeY * -MAX_TILT_DEG, y: relativeX * MAX_TILT_DEG });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ perspective: "1200px" }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.3),transparent_60%)]" />
      <div
        className="absolute -inset-6 transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`,
        }}
      >
        <GalaxyCanvas />
      </div>
    </div>
  );
}

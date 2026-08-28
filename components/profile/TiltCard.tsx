"use client";

import { useState } from "react";

const MAX_TILT_DEG = 8;

export function TiltCard({ children }: { children: React.ReactNode }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({ x: relativeY * -MAX_TILT_DEG, y: relativeX * MAX_TILT_DEG });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface EyeSpawn {
  x: number;
  y: number;
  size: number;
}

const MIN_DELAY_MS = 18000;
const MAX_DELAY_MS = 35000;
const LIFETIME_MS = 7000;

function randomDelay(): number {
  return MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
}

function randomSpawn(): EyeSpawn {
  return {
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 70,
    size: 70 + Math.random() * 50,
  };
}

function EyeGraphic({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 200 120"
      width={size}
      height={size * 0.6}
      className="creepy-eye-fade"
      style={{ filter: "drop-shadow(0 0 18px rgba(192,132,252,0.55))" }}
    >
      <defs>
        <clipPath id="creepy-eye-shape">
          <path d="M10,60 Q100,8 190,60 Q100,112 10,60 Z" />
        </clipPath>
        <radialGradient id="creepy-eye-iris" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="55%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#2e1065" />
        </radialGradient>
      </defs>

      <g clipPath="url(#creepy-eye-shape)">
        <rect x="0" y="0" width="200" height="120" fill="#1a0b2e" />
        <circle cx="100" cy="60" r="36" fill="url(#creepy-eye-iris)" className="creepy-eye-glow" />
        <ellipse cx="100" cy="60" rx="6" ry="32" fill="#08010f" />
        <circle cx="100" cy="60" r="36" fill="none" stroke="#f0abfc" strokeWidth="1.5" opacity="0.5" />
      </g>

      <path
        d="M10,60 Q100,8 190,60 Q100,112 10,60 Z"
        fill="none"
        stroke="#c084fc"
        strokeWidth="1"
        opacity="0.35"
      />

      <rect className="creepy-eye-lid-top" x="0" y="0" width="200" height="60" fill="#05010f" />
      <rect className="creepy-eye-lid-bottom" x="0" y="60" width="200" height="60" fill="#05010f" />
    </svg>
  );
}

export function CreepyEye() {
  const [eye, setEye] = useState<EyeSpawn | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let spawnTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    function scheduleNext(delay: number) {
      spawnTimer = setTimeout(() => {
        setEye(randomSpawn());
        hideTimer = setTimeout(() => {
          setEye(null);
          scheduleNext(randomDelay());
        }, LIFETIME_MS);
      }, delay);
    }

    scheduleNext(randomDelay());

    return () => {
      clearTimeout(spawnTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!eye) return null;

  return (
    <div
      className="pointer-events-none fixed -z-10"
      style={{
        left: `${eye.x}%`,
        top: `${eye.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <EyeGraphic size={eye.size} />
    </div>
  );
}

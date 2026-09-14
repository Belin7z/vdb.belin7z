"use client";

import { useEffect, useState } from "react";
import { EyeGraphic } from "./EyeGraphic";

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
      <EyeGraphic size={eye.size} className="creepy-eye-fade" />
    </div>
  );
}

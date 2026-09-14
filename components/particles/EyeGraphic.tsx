"use client";

import { useId } from "react";

interface EyeGraphicProps {
  size: number;
  className?: string;
  looping?: boolean;
}

export function EyeGraphic({ size, className, looping = false }: EyeGraphicProps) {
  const uid = useId();
  const clipId = `eye-shape-${uid}`;
  const gradientId = `eye-iris-${uid}`;

  const lidTopClass = looping ? "eye-blink-lid-top" : "creepy-eye-lid-top";
  const lidBottomClass = looping ? "eye-blink-lid-bottom" : "creepy-eye-lid-bottom";
  const glowClass = looping ? "eye-blink-glow" : "creepy-eye-glow";

  return (
    <svg
      viewBox="0 0 200 120"
      width={size}
      height={size * 0.6}
      className={className}
      style={{ filter: "drop-shadow(0 0 18px rgba(192,132,252,0.55))" }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M10,60 Q100,8 190,60 Q100,112 10,60 Z" />
        </clipPath>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="55%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#2e1065" />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="200" height="120" fill="#1a0b2e" />
        <circle cx="100" cy="60" r="36" fill={`url(#${gradientId})`} className={glowClass} />
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

      <rect className={lidTopClass} x="0" y="0" width="200" height="60" fill="#05010f" />
      <rect className={lidBottomClass} x="0" y="60" width="200" height="60" fill="#05010f" />
    </svg>
  );
}

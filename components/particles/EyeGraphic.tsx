"use client";

import { useId } from "react";

interface EyeGraphicProps {
  size: number;
  className?: string;
}

export function EyeGraphic({ size, className }: EyeGraphicProps) {
  const uid = useId();
  const clipId = `eye-shape-${uid}`;
  const irisId = `eye-iris-${uid}`;
  const socketId = `eye-socket-${uid}`;
  const lidTopId = `eye-lid-top-${uid}`;
  const lidBottomId = `eye-lid-bottom-${uid}`;

  return (
    <svg
      viewBox="0 0 200 120"
      width={size}
      height={size * 0.6}
      className={className}
      style={{ filter: "drop-shadow(0 0 18px rgba(192,132,252,0.6))" }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M10,60 Q100,8 190,60 Q100,112 10,60 Z" />
        </clipPath>

        <radialGradient id={irisId} cx="42%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="20%" stopColor="#f0abfc" />
          <stop offset="52%" stopColor="#a855f7" />
          <stop offset="80%" stopColor="#5b21b6" />
          <stop offset="100%" stopColor="#1e0a3c" />
        </radialGradient>

        <radialGradient id={socketId} cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#2a1454" />
          <stop offset="100%" stopColor="#0a0316" />
        </radialGradient>

        <linearGradient id={lidTopId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#08010f" />
          <stop offset="100%" stopColor="#20103f" />
        </linearGradient>

        <linearGradient id={lidBottomId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#08010f" />
          <stop offset="100%" stopColor="#180a30" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="200" height="120" fill={`url(#${socketId})`} />
        <circle cx="100" cy="60" r="36" fill={`url(#${irisId})`} className="eye-blink-glow" />
        <ellipse
          cx="100"
          cy="60"
          rx="6"
          ry="32"
          fill="#05010a"
          stroke="#000000"
          strokeWidth="0.6"
          strokeOpacity="0.5"
        />
        <ellipse cx="88" cy="46" rx="7" ry="4" fill="#ffffff" opacity="0.5" />
        <circle cx="100" cy="60" r="36" fill="none" stroke="#f0abfc" strokeWidth="1.5" opacity="0.55" />
      </g>

      <path
        d="M10,60 Q100,8 190,60 Q100,112 10,60 Z"
        fill="none"
        stroke="#c084fc"
        strokeWidth="1"
        opacity="0.4"
      />

      <rect
        className="eye-blink-lid-top"
        x="0"
        y="0"
        width="200"
        height="60"
        fill={`url(#${lidTopId})`}
      />
      <rect
        className="eye-blink-lid-bottom"
        x="0"
        y="60"
        width="200"
        height="60"
        fill={`url(#${lidBottomId})`}
      />
    </svg>
  );
}

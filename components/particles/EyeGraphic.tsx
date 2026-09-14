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
      style={{
        filter:
          "drop-shadow(0 0 5px rgba(253,244,255,0.85)) drop-shadow(0 0 20px rgba(168,85,247,0.85))",
      }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="M10,60 Q100,8 190,60 Q100,112 10,60 Z" />
        </clipPath>

        <radialGradient id={irisId} cx="42%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="14%" stopColor="#fdf4ff" />
          <stop offset="36%" stopColor="#f0abfc" />
          <stop offset="62%" stopColor="#a855f7" />
          <stop offset="86%" stopColor="#5b21b6" />
          <stop offset="100%" stopColor="#1e0a3c" />
        </radialGradient>

        <radialGradient id={socketId} cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#3b1d6e" />
          <stop offset="100%" stopColor="#0a0316" />
        </radialGradient>

        <linearGradient id={lidTopId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#08010f" />
          <stop offset="100%" stopColor="#2a1550" />
        </linearGradient>

        <linearGradient id={lidBottomId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#08010f" />
          <stop offset="100%" stopColor="#20103f" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="200" height="120" fill={`url(#${socketId})`} />

        <g className="eye-look-around">
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
          <ellipse cx="87" cy="45" rx="8" ry="5" fill="#ffffff" opacity="0.85" />
          <circle cx="113" cy="74" r="2.6" fill="#ffffff" opacity="0.5" />
          <circle cx="100" cy="60" r="36" fill="none" stroke="#f5d0fe" strokeWidth="3" opacity="0.75" />
        </g>

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
      </g>

      <path
        d="M10,60 Q100,8 190,60 Q100,112 10,60 Z"
        fill="none"
        stroke="#f0abfc"
        strokeWidth="2"
        opacity="0.65"
      />
    </svg>
  );
}

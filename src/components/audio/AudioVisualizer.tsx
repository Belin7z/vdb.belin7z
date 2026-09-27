"use client";

import { useEffect, useRef } from "react";

const BAR_COUNT = 3;

interface AudioVisualizerProps {
  analyser: AnalyserNode | null;
  active: boolean;
}

export function AudioVisualizer({ analyser, active }: AudioVisualizerProps) {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!active || !analyser) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const data = new Uint8Array(analyser.frequencyBinCount);
    let rafId: number;

    function draw() {
      analyser!.getByteFrequencyData(data);
      const step = Math.max(1, Math.floor(data.length / BAR_COUNT));
      for (let i = 0; i < BAR_COUNT; i++) {
        const value = data[i * step] / 255;
        const bar = barRefs.current[i];
        if (bar) bar.style.height = `${18 + value * 82}%`;
      }
      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => cancelAnimationFrame(rafId);
  }, [active, analyser]);

  if (!active) return null;

  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          className="w-[2.5px] rounded-sm bg-purple-300"
          style={{ height: "18%" }}
        />
      ))}
    </span>
  );
}

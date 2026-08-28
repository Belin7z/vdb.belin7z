"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleMove(event: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      el.style.background = `radial-gradient(circle at ${event.clientX}px ${event.clientY}px, rgba(168,85,247,0.16), transparent 35%)`;
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 transition-[background] duration-150 ease-out"
    />
  );
}

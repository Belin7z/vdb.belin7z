"use client";

import { useEffect, useState } from "react";

const BOOT_LINES = [
  "Conectando ao Discord...",
  "Sincronizando Spotify...",
  "Inicializando perfil...",
];

const LINE_INTERVAL_MS = 450;
const HOLD_MS = 500;
const FADE_MS = 500;
const SESSION_KEY = "belin7z_intro_seen";

export function BootOverlay() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    if (reducedMotion || alreadySeen) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // sessionStorage unavailable (private mode) — intro just replays, harmless
        }
        setVisible(true);
      }, 0)
    );

    BOOT_LINES.forEach((_, index) => {
      timers.push(setTimeout(() => setLineCount(index + 1), index * LINE_INTERVAL_MS));
    });

    const totalLineTime = BOOT_LINES.length * LINE_INTERVAL_MS;
    timers.push(setTimeout(() => setFading(true), totalLineTime + HOLD_MS));
    timers.push(setTimeout(() => setVisible(false), totalLineTime + HOLD_MS + FADE_MS));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-[#05010f] transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="font-display text-sm text-purple-300/80 sm:text-base">
        {BOOT_LINES.slice(0, lineCount).map((line, index) => (
          <p key={line} className="animate-fade-in flex items-center gap-2 py-0.5">
            <span className="text-purple-400">{">"}</span>
            {line}
            {index === lineCount - 1 && lineCount < BOOT_LINES.length && (
              <span className="animate-pulse text-purple-400">_</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

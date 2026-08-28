"use client";

import { useEffect, useState } from "react";
import type { LanyardSpotify } from "@/lib/lanyard/types";

export function useSpotifyProgress(spotify: LanyardSpotify | null) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!spotify) return;

    const interval = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(interval);
  }, [spotify]);

  if (!spotify) {
    return { elapsedMs: 0, durationMs: 0, progress: 0 };
  }

  const { start, end } = spotify.timestamps;
  const durationMs = end - start;
  const elapsedMs = Math.min(Math.max(now - start, 0), durationMs);
  const progress = durationMs > 0 ? elapsedMs / durationMs : 0;

  return { elapsedMs, durationMs, progress };
}

"use client";

import { useEffect, useState } from "react";
import type { LanyardSpotify } from "@/lib/lanyard/types";

export function useSpotifyProgress(spotify: LanyardSpotify | null) {
  const [now, setNow] = useState<number | null>(null);

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
  // `now` is null on the server and on the very first client render (before
  // effects run), so both agree on elapsed = 0 there and avoid a hydration
  // mismatch; the real elapsed time kicks in a moment later via the effect.
  const elapsedMs = Math.min(Math.max((now ?? start) - start, 0), durationMs);
  const progress = durationMs > 0 ? elapsedMs / durationMs : 0;

  return { elapsedMs, durationMs, progress };
}

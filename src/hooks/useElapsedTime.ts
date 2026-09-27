"use client";

import { useEffect, useState } from "react";
import { formatElapsed } from "@/lib/time";

export function useElapsedTime(startMs: number | undefined): string | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!startMs) return;

    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [startMs]);

  if (!startMs) return null;

  const elapsedMs = Math.max((now ?? startMs) - startMs, 0);
  return formatElapsed(elapsedMs);
}

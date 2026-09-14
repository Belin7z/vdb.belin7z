"use client";

import { useEffect, useState } from "react";

const HEARTBEAT_INTERVAL_MS = 15_000;
const SESSION_KEY = "belin7z_visitor_id";

function getVisitorId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

interface Presence {
  live: number | null;
  total: number | null;
}

export function usePresence(): Presence {
  const [presence, setPresence] = useState<Presence>({ live: null, total: null });

  useEffect(() => {
    const visitorId = getVisitorId();
    let cancelled = false;

    async function heartbeat() {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setPresence({
            live: typeof data.live === "number" ? data.live : null,
            total: typeof data.total === "number" ? data.total : null,
          });
        }
      } catch {
        // sem rede/indisponível — indicador simplesmente não aparece
      }
    }

    heartbeat();
    const interval = setInterval(heartbeat, HEARTBEAT_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return presence;
}

"use client";

import { useEffect, useState } from "react";

interface VisitCount {
  total: number | null;
  isReturning: boolean;
  crossedMilestone: number | null;
}

export function useVisitCount(): VisitCount {
  const [state, setState] = useState<VisitCount>({
    total: null,
    isReturning: false,
    crossedMilestone: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetch("/api/visits", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.total === "number") {
          setState({
            total: data.total,
            isReturning: Boolean(data.isReturning),
            crossedMilestone:
              typeof data.crossedMilestone === "number" ? data.crossedMilestone : null,
          });
        }
      })
      .catch(() => {
        // sem rede/indisponível — contador simplesmente não aparece
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

"use client";

import { useEffect, useState } from "react";

export function useVisitCount(): number | null {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/visits", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.total === "number") {
          setTotal(data.total);
        }
      })
      .catch(() => {
        // sem rede/indisponível — contador simplesmente não aparece
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return total;
}

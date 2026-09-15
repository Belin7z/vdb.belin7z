"use client";

import { useEffect, useRef } from "react";
import { useVisitCount } from "@/hooks/useVisitCount";
import { EyeGraphic } from "@/components/particles/EyeGraphic";
import { useParticleBurst, ParticleBurstLayer } from "./ParticleBurst";

const MILESTONES = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

export function VisitorStats() {
  const total = useVisitCount();
  const { burst, trigger } = useParticleBurst();
  const previousTotalRef = useRef<number | null>(null);

  useEffect(() => {
    if (total === null) return;

    const previous = previousTotalRef.current;
    if (previous !== null && MILESTONES.some((m) => previous < m && total >= m)) {
      trigger();
    }
    previousTotalRef.current = total;
  }, [total, trigger]);

  if (total === null) return null;

  const totalLabel = `${total.toLocaleString("pt-BR")} ${total === 1 ? "visita" : "visitas"} no total`;

  return (
    <div className="relative mt-4 flex items-center justify-center gap-2 text-[11px] text-purple-300/50">
      <ParticleBurstLayer burst={burst} />
      <EyeGraphic size={34} />
      <span>{totalLabel}</span>
    </div>
  );
}

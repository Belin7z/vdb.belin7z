"use client";

import { useEffect, useRef } from "react";
import { useVisitCount } from "@/hooks/useVisitCount";
import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/ui/Toast";
import { EyeGraphic } from "@/components/particles/EyeGraphic";
import { useParticleBurst, ParticleBurstLayer } from "./ParticleBurst";

function getBurstIntensity(milestone: number): number {
  if (milestone >= 10000) return 3;
  if (milestone >= 1000) return 2;
  if (milestone >= 100) return 1.5;
  return 1;
}

export function VisitorStats() {
  const { total, isReturning, crossedMilestone } = useVisitCount();
  const { burst, trigger } = useParticleBurst();
  const { message, showToast } = useToast();
  const celebratedRef = useRef(false);
  const welcomedRef = useRef(false);

  useEffect(() => {
    if (crossedMilestone !== null && !celebratedRef.current) {
      celebratedRef.current = true;
      trigger(getBurstIntensity(crossedMilestone));
    }
  }, [crossedMilestone, trigger]);

  useEffect(() => {
    if (isReturning && !welcomedRef.current) {
      welcomedRef.current = true;
      showToast("Bem-vindo de volta!");
    }
  }, [isReturning, showToast]);

  if (total === null) return null;

  const totalLabel = `${total.toLocaleString("pt-BR")} ${total === 1 ? "visita" : "visitas"} no total`;

  return (
    <div className="relative mt-4 flex items-center justify-center gap-2 text-[11px] text-purple-300/50">
      <Toast message={message} />
      <ParticleBurstLayer burst={burst} />
      <EyeGraphic size={34} />
      <span>{totalLabel}</span>
    </div>
  );
}

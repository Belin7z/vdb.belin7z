"use client";

import { usePresence } from "@/hooks/usePresence";
import { EyeGraphic } from "@/components/particles/EyeGraphic";

export function VisitorStats() {
  const { total } = usePresence();
  if (total === null) return null;

  const totalLabel = `${total.toLocaleString("pt-BR")} ${total === 1 ? "visita" : "visitas"} no total`;

  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-purple-300/50">
      <EyeGraphic size={34} />
      <span>{totalLabel}</span>
    </div>
  );
}

"use client";

import { usePresence } from "@/hooks/usePresence";
import { EyeGraphic } from "@/components/particles/EyeGraphic";

export function VisitorStats() {
  const { live, total } = usePresence();
  if (live === null && total === null) return null;

  const showLive = live !== null && live > 0;
  const liveLabel = live === 1 ? "1 pessoa vendo agora" : `${live} pessoas vendo agora`;
  const totalLabel =
    total !== null
      ? `${total.toLocaleString("pt-BR")} ${total === 1 ? "visita" : "visitas"} no total`
      : null;

  return (
    <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-purple-300/50">
      {showLive && (
        <>
          <EyeGraphic size={22} looping />
          <span>{liveLabel}</span>
        </>
      )}
      {showLive && totalLabel && <span className="text-purple-300/30">·</span>}
      {totalLabel && <span>{totalLabel}</span>}
    </div>
  );
}

"use client";

import { useLiveVisitors } from "@/hooks/useLiveVisitors";

export function LiveVisitors() {
  const count = useLiveVisitors();
  if (count === null || count < 1) return null;

  const label = count === 1 ? "1 pessoa vendo agora" : `${count} pessoas vendo agora`;

  return (
    <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-purple-300/50">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-status-ping rounded-full bg-emerald-400" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      {label}
    </div>
  );
}

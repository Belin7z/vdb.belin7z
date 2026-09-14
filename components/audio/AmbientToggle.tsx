"use client";

import { useEffect, useRef, useState } from "react";
import { createAmbientEngine, type AmbientEngine } from "@/lib/audio/ambient-engine";
import { VolumeOffIcon, VolumeOnIcon } from "./icons";

export function AmbientToggle() {
  const [enabled, setEnabled] = useState(false);
  const engineRef = useRef<AmbientEngine | null>(null);

  useEffect(() => {
    return () => engineRef.current?.stop();
  }, []);

  function toggle() {
    if (!engineRef.current) engineRef.current = createAmbientEngine();

    if (enabled) {
      engineRef.current.stop();
    } else {
      engineRef.current.start();
    }
    setEnabled((prev) => !prev);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Desativar som ambiente" : "Ativar som ambiente"}
      aria-pressed={enabled}
      data-capture-ignore="true"
      className="fixed bottom-5 right-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/20 bg-[#150733]/80 text-purple-200 backdrop-blur-sm transition-all duration-300 hover:border-purple-300/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
    >
      {enabled ? <VolumeOnIcon className="h-4 w-4" /> : <VolumeOffIcon className="h-4 w-4" />}
    </button>
  );
}

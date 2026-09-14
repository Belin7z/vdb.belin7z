"use client";

import { useEffect, useRef, useState } from "react";
import { VolumeOffIcon, VolumeOnIcon } from "./icons";

const TRACK_SRC = "/audio/ambient-track.mp3";
const VOLUME = 0.4;

export function AmbientToggle() {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => audioRef.current?.pause();
  }, []);

  function toggle() {
    if (!audioRef.current) {
      const audio = new Audio(TRACK_SRC);
      audio.loop = true;
      audio.volume = VOLUME;
      audioRef.current = audio;
    }

    if (enabled) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setEnabled((prev) => !prev);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Pausar música" : "Tocar música"}
      aria-pressed={enabled}
      data-capture-ignore="true"
      className="fixed bottom-5 right-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/20 bg-[#150733]/80 text-purple-200 backdrop-blur-sm transition-all duration-300 hover:border-purple-300/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
    >
      {enabled ? <VolumeOnIcon className="h-4 w-4" /> : <VolumeOffIcon className="h-4 w-4" />}
    </button>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { VolumeOffIcon, VolumeOnIcon } from "./icons";

const TRACK_SRC = "/audio/ambient-track.mp3";
const DEFAULT_VOLUME = 0.4;

export function AmbientToggle() {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [hovering, setHovering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => audioRef.current?.pause();
  }, []);

  function ensureAudio(): HTMLAudioElement {
    if (!audioRef.current) {
      const audio = new Audio(TRACK_SRC);
      audio.loop = true;
      audio.volume = volume;
      audioRef.current = audio;
    }
    return audioRef.current;
  }

  function toggle() {
    const audio = ensureAudio();
    if (enabled) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setEnabled((prev) => !prev);
  }

  function handleVolumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const next = Number(event.target.value) / 100;
    setVolume(next);
    if (audioRef.current) audioRef.current.volume = next;
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className={`overflow-hidden rounded-full border border-purple-400/20 bg-[#150733]/80 backdrop-blur-sm transition-all duration-300 ${
          hovering ? "w-24 px-3 opacity-100" : "w-0 px-0 opacity-0"
        }`}
      >
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={handleVolumeChange}
          onFocus={() => setHovering(true)}
          aria-label="Volume da música"
          className="volume-slider h-10 w-full"
        />
      </div>
      <button
        type="button"
        onClick={toggle}
        onFocus={() => setHovering(true)}
        aria-label={enabled ? "Pausar música" : "Tocar música"}
        aria-pressed={enabled}
        data-capture-ignore="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-purple-400/20 bg-[#150733]/80 text-purple-200 backdrop-blur-sm transition-all duration-300 hover:border-purple-300/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
      >
        {enabled ? <VolumeOnIcon className="h-4 w-4" /> : <VolumeOffIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}

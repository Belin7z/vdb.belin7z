import Image from "next/image";
import type { LanyardSpotify } from "@/lib/lanyard/types";
import { useSpotifyProgress } from "@/hooks/useSpotifyProgress";
import { SpotifyIcon } from "@/components/social/icons";
import { NowPlayingProgress } from "./NowPlayingProgress";
import { EqualizerBars } from "./EqualizerBars";

export function NowPlaying({ spotify }: { spotify: LanyardSpotify | null }) {
  const { elapsedMs, durationMs, progress } = useSpotifyProgress(spotify);

  if (!spotify) return null;

  return (
    <div className="mt-6 w-full rounded-2xl border border-purple-400/20 bg-white/[0.06] p-3">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={spotify.album_art_url}
            alt={spotify.album}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
            <SpotifyIcon className="h-3 w-3" />
            <span>Ouvindo agora</span>
            <EqualizerBars />
          </div>
          <p className="truncate text-sm font-medium text-white">{spotify.song}</p>
          <p className="truncate text-xs text-purple-300/70">{spotify.artist}</p>
        </div>
      </div>
      <NowPlayingProgress
        elapsedMs={elapsedMs}
        durationMs={durationMs}
        progress={progress}
      />
    </div>
  );
}

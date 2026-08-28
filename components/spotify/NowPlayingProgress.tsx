import { formatDuration } from "@/lib/time";

interface NowPlayingProgressProps {
  elapsedMs: number;
  durationMs: number;
  progress: number;
}

export function NowPlayingProgress({
  elapsedMs,
  durationMs,
  progress,
}: NowPlayingProgressProps) {
  return (
    <div className="mt-2 w-full">
      <div className="h-1 w-full overflow-hidden rounded-full bg-purple-950/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-purple-400 to-violet-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-purple-300/70">
        <span>{formatDuration(elapsedMs)}</span>
        <span>{formatDuration(durationMs)}</span>
      </div>
    </div>
  );
}

import { formatDuration } from "@/lib/time";

interface NowPlayingProgressProps {
  elapsedMs: number;
  durationMs: number;
  progress: number;
  seed: string;
}

const BAR_COUNT = 40;

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function pseudoRandom(seed: number, index: number): number {
  const value = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function NowPlayingProgress({
  elapsedMs,
  durationMs,
  progress,
  seed,
}: NowPlayingProgressProps) {
  const seedValue = hashString(seed);
  const activeBars = Math.round(progress * BAR_COUNT);

  return (
    <div className="mt-2 w-full">
      <div className="flex h-4 items-center gap-[1.5px]">
        {Array.from({ length: BAR_COUNT }, (_, i) => {
          const height = 25 + pseudoRandom(seedValue, i) * 75;
          const isActive = i < activeBars;
          return (
            <span
              key={i}
              className={`flex-1 self-center rounded-full transition-colors duration-300 ${
                isActive
                  ? "bg-gradient-to-t from-fuchsia-400 to-violet-400"
                  : "bg-purple-950/60"
              }`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-purple-300/70">
        <span>{formatDuration(elapsedMs)}</span>
        <span>{formatDuration(durationMs)}</span>
      </div>
    </div>
  );
}

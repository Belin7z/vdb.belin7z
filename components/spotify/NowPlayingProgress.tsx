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

// Hash de inteiros puro (sem seno/ponto flutuante transcendental) para que o
// resultado seja idêntico entre o SSR (Node) e a hidratação no navegador —
// Math.sin não tem precisão garantida bit-a-bit entre builds do V8.
function pseudoRandom(seed: number, index: number): number {
  let h = (seed ^ index) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  h = (h ^ (h >>> 16)) >>> 0;
  return h / 4294967296;
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

import { GithubIcon } from "@/components/social/icons";
import type { GithubStats } from "@/lib/github/stats";

export function GithubStatsRow({ stats }: { stats: GithubStats | null }) {
  if (!stats) return null;

  return (
    <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-purple-300/60">
      <GithubIcon className="h-3 w-3" />
      <span>
        {stats.followers} seguidores · {stats.publicRepos} repositórios
      </span>
    </div>
  );
}

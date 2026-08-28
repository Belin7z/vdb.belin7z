import { getUserBadges } from "@/lib/lanyard/badges";
import { BADGE_ICONS } from "./icons";

export function Badges({ publicFlags }: { publicFlags: number | undefined }) {
  const badges = getUserBadges(publicFlags);
  if (badges.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
      {badges.map((badge) => {
        const Icon = BADGE_ICONS[badge.icon];
        return (
          <span
            key={badge.flag}
            title={badge.label}
            className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-purple-100"
          >
            <Icon className="h-3 w-3" style={{ color: badge.color }} />
            {badge.label}
          </span>
        );
      })}
    </div>
  );
}

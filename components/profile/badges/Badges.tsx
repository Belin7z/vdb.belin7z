import { getUserBadges } from "@/lib/lanyard/badges";
import { BADGE_ICONS } from "./icons";

export function Badges({ publicFlags }: { publicFlags: number | undefined }) {
  const badges = getUserBadges(publicFlags);
  if (badges.length === 0) return null;

  return (
    <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
      {badges.map((badge) => {
        const Icon = BADGE_ICONS[badge.icon];
        return (
          <span
            key={badge.flag}
            title={badge.label}
            className="flex h-7 w-7 items-center justify-center rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            style={{ backgroundColor: badge.color }}
          >
            <Icon className="h-4 w-4 text-white" />
          </span>
        );
      })}
    </div>
  );
}

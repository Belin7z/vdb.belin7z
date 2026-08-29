import Image from "next/image";
import { useElapsedTime } from "@/hooks/useElapsedTime";
import { getActivityAssetUrl } from "@/lib/lanyard/activity-image";
import type { LanyardActivity } from "@/lib/lanyard/types";

const PLAYING_ACTIVITY_TYPE = 0;

export function CurrentActivity({ activities }: { activities: LanyardActivity[] }) {
  const activity = activities.find((a) => a.type === PLAYING_ACTIVITY_TYPE);
  const elapsed = useElapsedTime(activity?.timestamps?.start);

  if (!activity) return null;

  const imageUrl = getActivityAssetUrl(activity.application_id, activity.assets?.large_image);

  return (
    <div className="mt-3 w-full rounded-2xl border border-purple-400/20 bg-white/[0.06] p-3">
      <div className="flex items-center gap-3">
        {imageUrl && (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={activity.assets?.large_text ?? activity.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{activity.name}</p>
          {activity.details && (
            <p className="truncate text-xs text-purple-300/70">{activity.details}</p>
          )}
          {elapsed && <p className="text-[10px] text-purple-300/50">{elapsed}</p>}
        </div>
      </div>
    </div>
  );
}

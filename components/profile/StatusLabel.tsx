import { STATUS_COLOR, STATUS_LABEL, getCustomStatus } from "@/lib/lanyard/status";
import type { DiscordStatus, LanyardActivity } from "@/lib/lanyard/types";

interface StatusLabelProps {
  status: DiscordStatus;
  activities: LanyardActivity[];
}

export function StatusLabel({ status, activities }: StatusLabelProps) {
  const customStatus = getCustomStatus(activities);

  return (
    <div className="mt-2 flex flex-col items-center gap-1">
      <span className="flex items-center gap-1.5 text-xs font-medium text-purple-200">
        <span className={`h-2 w-2 rounded-full ${STATUS_COLOR[status]}`} />
        {STATUS_LABEL[status]}
      </span>
      {customStatus && (
        <span className="max-w-[220px] truncate text-xs text-purple-300/70">
          {customStatus}
        </span>
      )}
    </div>
  );
}

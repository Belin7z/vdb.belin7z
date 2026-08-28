import { STATUS_COLOR } from "@/lib/lanyard/status";
import type { DiscordStatus } from "@/lib/lanyard/types";

export function StatusDot({ status }: { status: DiscordStatus }) {
  return (
    <span className="absolute bottom-1 right-1 flex h-4 w-4">
      {status === "online" && (
        <span className="absolute inline-flex h-full w-full animate-status-ping rounded-full bg-emerald-500" />
      )}
      <span
        className={`relative h-4 w-4 rounded-full border-2 border-[#0d0420] ${STATUS_COLOR[status]}`}
      />
    </span>
  );
}

import type { DiscordStatus } from "@/lib/lanyard/types";

const STATUS_COLOR: Record<DiscordStatus, string> = {
  online: "bg-emerald-500",
  idle: "bg-amber-400",
  dnd: "bg-rose-500",
  offline: "bg-zinc-500",
};

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

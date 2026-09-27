import { STATUS_LABEL } from "@/lib/lanyard/status";
import type { DiscordStatus } from "@/lib/lanyard/types";

const RING_COLOR = "#0d0420";

const STATUS_FILL: Record<DiscordStatus, string> = {
  online: "#23a55a",
  idle: "#f0b232",
  dnd: "#f23f42",
  offline: "#80848e",
};

function StatusGlyph({ status }: { status: DiscordStatus }) {
  const fill = STATUS_FILL[status];

  if (status === "idle") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <circle cx="12" cy="12" r="12" fill={fill} />
        <circle cx="7" cy="7" r="9" fill={RING_COLOR} />
      </svg>
    );
  }

  if (status === "dnd") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <circle cx="12" cy="12" r="12" fill={fill} />
        <rect x="5" y="9.5" width="14" height="5" rx="2.5" fill={RING_COLOR} />
      </svg>
    );
  }

  if (status === "offline") {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <circle cx="12" cy="12" r="12" fill={fill} />
        <circle cx="12" cy="12" r="5.5" fill={RING_COLOR} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <circle cx="12" cy="12" r="12" fill={fill} />
    </svg>
  );
}

export function StatusDot({ status }: { status: DiscordStatus }) {
  return (
    <span
      title={STATUS_LABEL[status]}
      className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0d0420] bg-[#0d0420]"
    >
      {status === "online" && (
        <span className="absolute inline-flex h-full w-full animate-status-ping rounded-full bg-emerald-500" />
      )}
      <StatusGlyph status={status} />
    </span>
  );
}

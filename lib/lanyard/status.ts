import type { DiscordStatus, LanyardActivity } from "./types";

const CUSTOM_STATUS_ACTIVITY_TYPE = 4;

export const STATUS_LABEL: Record<DiscordStatus, string> = {
  online: "Online",
  idle: "Ausente",
  dnd: "Não perturbe",
  offline: "Offline",
};

export function getCustomStatus(activities: LanyardActivity[]): string | null {
  const custom = activities.find((a) => a.type === CUSTOM_STATUS_ACTIVITY_TYPE);
  if (!custom?.state) return null;

  const emoji = custom.emoji && !custom.emoji.id ? `${custom.emoji.name} ` : "";
  return `${emoji}${custom.state}`.trim();
}

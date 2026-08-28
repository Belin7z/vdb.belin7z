import type { LanyardData } from "./types";

const LANYARD_REST_URL = "https://api.lanyard.rest/v1/users";

export async function getInitialPresence(
  discordId: string
): Promise<LanyardData | null> {
  if (!discordId) return null;

  try {
    const res = await fetch(`${LANYARD_REST_URL}/${discordId}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    const json = await res.json();
    return json.success ? (json.data as LanyardData) : null;
  } catch {
    return null;
  }
}

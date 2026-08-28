export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface LanyardDiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  discriminator: string;
  avatar: string | null;
}

export interface LanyardSpotify {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LanyardActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  emoji?: {
    name: string;
    id?: string;
    animated?: boolean;
  } | null;
}

export interface LanyardData {
  discord_user: LanyardDiscordUser;
  discord_status: DiscordStatus;
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
}

export type LanyardSocketMessage =
  | { op: 1; d: { heartbeat_interval: number } }
  | { op: 0; t: "INIT_STATE" | "PRESENCE_UPDATE"; d: LanyardData };

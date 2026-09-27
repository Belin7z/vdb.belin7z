export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface LanyardPrimaryGuild {
  identity_guild_id: string | null;
  identity_enabled: boolean | null;
  tag: string | null;
  badge: string | null;
}

export interface LanyardDisplayNameStyles {
  colors: number[];
  effect_id?: number;
  font_id?: number;
}

export interface LanyardDiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  discriminator: string;
  avatar: string | null;
  public_flags?: number;
  primary_guild?: LanyardPrimaryGuild | null;
  display_name_styles?: LanyardDisplayNameStyles | null;
  avatar_decoration_data?: {
    asset: string;
    sku_id?: string;
  } | null;
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
  details?: string;
  application_id?: string;
  emoji?: {
    name: string;
    id?: string;
    animated?: boolean;
  } | null;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  timestamps?: {
    start?: number;
    end?: number;
  };
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

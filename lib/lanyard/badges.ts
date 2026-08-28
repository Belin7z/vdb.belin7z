export const USER_FLAGS = {
  STAFF: 1 << 0,
  PARTNER: 1 << 1,
  HYPESQUAD_EVENTS: 1 << 2,
  BUG_HUNTER_LEVEL_1: 1 << 3,
  HYPESQUAD_BRAVERY: 1 << 6,
  HYPESQUAD_BRILLIANCE: 1 << 7,
  HYPESQUAD_BALANCE: 1 << 8,
  EARLY_SUPPORTER: 1 << 9,
  BUG_HUNTER_LEVEL_2: 1 << 14,
  VERIFIED_BOT_DEVELOPER: 1 << 17,
  CERTIFIED_MODERATOR: 1 << 18,
  ACTIVE_DEVELOPER: 1 << 22,
} as const;

export type BadgeIconKey = "shield" | "star" | "house" | "magnifier" | "heart" | "code";

export interface BadgeDefinition {
  flag: number;
  label: string;
  color: string;
  icon: BadgeIconKey;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  { flag: USER_FLAGS.STAFF, label: "Discord Staff", color: "#5865f2", icon: "shield" },
  { flag: USER_FLAGS.PARTNER, label: "Parceiro Discord", color: "#5865f2", icon: "shield" },
  {
    flag: USER_FLAGS.CERTIFIED_MODERATOR,
    label: "Moderador Certificado",
    color: "#5865f2",
    icon: "shield",
  },
  { flag: USER_FLAGS.HYPESQUAD_EVENTS, label: "HypeSquad Events", color: "#f4b400", icon: "star" },
  { flag: USER_FLAGS.ACTIVE_DEVELOPER, label: "Active Developer", color: "#22c55e", icon: "star" },
  {
    flag: USER_FLAGS.HYPESQUAD_BRAVERY,
    label: "HypeSquad Bravery",
    color: "#f0483e",
    icon: "house",
  },
  {
    flag: USER_FLAGS.HYPESQUAD_BRILLIANCE,
    label: "HypeSquad Brilliance",
    color: "#f472b6",
    icon: "house",
  },
  {
    flag: USER_FLAGS.HYPESQUAD_BALANCE,
    label: "HypeSquad Balance",
    color: "#2dd4bf",
    icon: "house",
  },
  { flag: USER_FLAGS.BUG_HUNTER_LEVEL_1, label: "Bug Hunter", color: "#84cc16", icon: "magnifier" },
  {
    flag: USER_FLAGS.BUG_HUNTER_LEVEL_2,
    label: "Bug Hunter Gold",
    color: "#eab308",
    icon: "magnifier",
  },
  { flag: USER_FLAGS.EARLY_SUPPORTER, label: "Early Supporter", color: "#f472b6", icon: "heart" },
  {
    flag: USER_FLAGS.VERIFIED_BOT_DEVELOPER,
    label: "Verified Bot Developer",
    color: "#a855f7",
    icon: "code",
  },
];

export function getUserBadges(publicFlags: number | undefined): BadgeDefinition[] {
  if (!publicFlags) return [];
  return BADGE_DEFINITIONS.filter((badge) => (publicFlags & badge.flag) === badge.flag);
}

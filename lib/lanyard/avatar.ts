import type { LanyardDiscordUser } from "./types";

export function getDiscordAvatarUrl(user: LanyardDiscordUser): string {
  if (user.avatar) {
    const ext = user.avatar.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
  }

  const fallbackIndex =
    user.discriminator === "0"
      ? Number((BigInt(user.id) >> BigInt(22)) % BigInt(6))
      : Number(user.discriminator) % 5;

  return `https://cdn.discordapp.com/embed/avatars/${fallbackIndex}.png`;
}

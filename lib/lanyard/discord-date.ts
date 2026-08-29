const DISCORD_EPOCH = BigInt(1420070400000);
const SNOWFLAKE_TIMESTAMP_SHIFT = BigInt(22);

export function getDiscordAccountCreationDate(discordId: string): Date {
  const timestamp = (BigInt(discordId) >> SNOWFLAKE_TIMESTAMP_SHIFT) + DISCORD_EPOCH;
  return new Date(Number(timestamp));
}

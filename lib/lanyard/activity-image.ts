export function getActivityAssetUrl(
  applicationId: string | undefined,
  assetKey: string | undefined
): string | null {
  if (!assetKey) return null;

  if (assetKey.startsWith("mp:")) {
    return `https://media.discordapp.net/${assetKey.slice(3)}`;
  }

  if (!applicationId) return null;
  return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetKey}.png`;
}

import Image from "next/image";
import type { LanyardPrimaryGuild } from "@/lib/lanyard/types";

export function ServerTag({
  primaryGuild,
}: {
  primaryGuild: LanyardPrimaryGuild | null | undefined;
}) {
  if (!primaryGuild?.identity_enabled || !primaryGuild.tag) return null;

  const badgeUrl =
    primaryGuild.badge && primaryGuild.identity_guild_id
      ? `https://cdn.discordapp.com/clan-badges/${primaryGuild.identity_guild_id}/${primaryGuild.badge}.png?size=16`
      : null;

  return (
    <div className="mt-1.5 flex justify-center">
      <span className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] font-semibold text-purple-100">
        {badgeUrl && <Image src={badgeUrl} alt="" width={14} height={14} unoptimized />}
        {primaryGuild.tag}
      </span>
    </div>
  );
}

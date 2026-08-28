"use client";

import { DISCORD_ID } from "@/config/site";
import { useLanyard } from "@/hooks/useLanyard";
import { SocialLinks } from "@/components/social/SocialLinks";
import { NowPlaying } from "@/components/spotify/NowPlaying";
import { Avatar } from "./Avatar";
import { DisplayName } from "./DisplayName";

export function ProfileCard() {
  const { data } = useLanyard(DISCORD_ID);

  return (
    <div className="animate-float relative w-full max-w-sm">
      <div className="animate-border-flow absolute -inset-[1.5px] rounded-3xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 opacity-60 blur-[2px]" />
      <div className="relative rounded-3xl border border-white/10 bg-[#0d0420]/90 p-8 shadow-[0_20px_60px_rgba(88,28,135,0.45)] backdrop-blur-xl">
        <Avatar user={data?.discord_user ?? null} status={data?.discord_status ?? "offline"} />
        <DisplayName user={data?.discord_user ?? null} />
        <div className="mt-6">
          <SocialLinks />
        </div>
        <NowPlaying spotify={data?.spotify ?? null} />
      </div>
    </div>
  );
}

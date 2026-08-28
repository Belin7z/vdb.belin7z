"use client";

import { DISCORD_ID } from "@/config/site";
import { useLanyard } from "@/hooks/useLanyard";
import { getCustomStatus } from "@/lib/lanyard/status";
import type { LanyardData } from "@/lib/lanyard/types";
import { SocialLinks } from "@/components/social/SocialLinks";
import { NowPlaying } from "@/components/spotify/NowPlaying";
import { CurrentActivity } from "@/components/profile/activity/CurrentActivity";
import { Avatar } from "./Avatar";
import { DisplayName } from "./DisplayName";
import { Badges } from "./badges/Badges";
import { ServerTag } from "./badges/ServerTag";

interface ProfileCardProps {
  initialData?: LanyardData | null;
}

export function ProfileCard({ initialData = null }: ProfileCardProps) {
  const { data, status } = useLanyard(DISCORD_ID, initialData);

  return (
    <div className="animate-card-enter flex w-full max-w-sm flex-col items-center">
      <div className="animate-float relative w-full">
        <div className="animate-border-flow absolute -inset-[1.5px] rounded-3xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500 opacity-60 blur-[2px]" />
        <div className="relative rounded-3xl border border-white/10 bg-[#0d0420]/90 p-8 shadow-[0_20px_60px_rgba(88,28,135,0.45)] backdrop-blur-xl">
          <Avatar
            user={data?.discord_user ?? null}
            status={data?.discord_status ?? "offline"}
            connectionStatus={status}
            customStatus={data ? getCustomStatus(data.activities) : null}
          />
          <DisplayName user={data?.discord_user ?? null} connectionStatus={status} />
          {data && <ServerTag primaryGuild={data.discord_user.primary_guild} />}
          <Badges />
          {data?.listening_to_spotify ? (
            <NowPlaying spotify={data.spotify} />
          ) : (
            <CurrentActivity activities={data?.activities ?? []} />
          )}
        </div>
      </div>
      <div className="mt-6">
        <SocialLinks />
      </div>
    </div>
  );
}

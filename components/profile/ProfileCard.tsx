"use client";

import { useState } from "react";
import { DISCORD_ID } from "@/config/site";
import { useLanyard } from "@/hooks/useLanyard";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { getCustomStatus } from "@/lib/lanyard/status";
import type { LanyardData } from "@/lib/lanyard/types";
import type { GithubStats } from "@/lib/github/stats";
import { SocialLinks } from "@/components/social/SocialLinks";
import { NowPlaying } from "@/components/spotify/NowPlaying";
import { CurrentActivity } from "@/components/profile/activity/CurrentActivity";
import { EasterEggToast } from "@/components/EasterEggToast";
import { Avatar } from "./Avatar";
import { DisplayName } from "./DisplayName";
import { Badges } from "./badges/Badges";
import { TiltCard } from "./TiltCard";
import { AccountAge } from "./AccountAge";
import { GithubStatsRow } from "./GithubStatsRow";
import { CardMenu } from "./actions/CardMenu";

const EGG_DURATION_MS = 6000;

interface ProfileCardProps {
  initialData?: LanyardData | null;
  githubStats?: GithubStats | null;
  qrCodeSvg: string;
}

export function ProfileCard({
  initialData = null,
  githubStats = null,
  qrCodeSvg,
}: ProfileCardProps) {
  const { data, status } = useLanyard(DISCORD_ID, initialData);
  const [eggActive, setEggActive] = useState(false);

  useKonamiCode(() => {
    setEggActive(true);
    setTimeout(() => setEggActive(false), EGG_DURATION_MS);
  });

  return (
    <div className="animate-card-enter flex w-full max-w-sm flex-col items-center">
      {eggActive && <EasterEggToast />}
      <TiltCard>
        <div className="animate-float relative w-full">
          <div
            className={`absolute -inset-[1.5px] rounded-3xl opacity-60 blur-[2px] ${
              eggActive
                ? "animate-border-flow-gold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300"
                : "animate-border-flow bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-500"
            }`}
          />
          <div
            id="belin7z-profile-card"
            className="relative rounded-3xl border border-white/10 bg-[#0d0420]/95 p-8 shadow-[0_20px_60px_rgba(88,28,135,0.45)]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
            <CardMenu qrCodeSvg={qrCodeSvg} />
            <Avatar
              user={data?.discord_user ?? null}
              status={data?.discord_status ?? "offline"}
              connectionStatus={status}
              customStatus={data ? getCustomStatus(data.activities) : null}
            />
            <DisplayName user={data?.discord_user ?? null} connectionStatus={status} />
            <Badges />
            {data && <AccountAge discordId={data.discord_user.id} />}
            <GithubStatsRow stats={githubStats} />
            {data?.listening_to_spotify ? (
              <NowPlaying spotify={data.spotify} />
            ) : (
              <CurrentActivity activities={data?.activities ?? []} />
            )}
          </div>
        </div>
      </TiltCard>
      <div className="mt-6">
        <SocialLinks />
      </div>
    </div>
  );
}

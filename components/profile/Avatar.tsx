import Image from "next/image";
import { getDiscordAvatarUrl, getAvatarDecorationUrl } from "@/lib/lanyard/avatar";
import type { LanyardDiscordUser, DiscordStatus } from "@/lib/lanyard/types";
import type { LanyardStatus } from "@/hooks/useLanyard";
import { StatusDot } from "./StatusDot";
import { CustomStatusBubble } from "./CustomStatusBubble";

interface AvatarProps {
  user: LanyardDiscordUser | null;
  status: DiscordStatus;
  connectionStatus: LanyardStatus;
  customStatus?: string | null;
}

export function Avatar({ user, status, connectionStatus, customStatus }: AvatarProps) {
  const decorationUrl = user ? getAvatarDecorationUrl(user) : null;

  return (
    <div className="relative mx-auto h-28 w-28">
      <div className="animate-glow-pulse absolute inset-0 rounded-full bg-purple-500 blur-xl" />
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-purple-300/40 bg-purple-950">
        {user ? (
          <Image
            src={getDiscordAvatarUrl(user)}
            alt={user.global_name ?? user.username}
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        ) : connectionStatus === "error" ? (
          <div className="flex h-full w-full items-center justify-center text-purple-300/40">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5Z" />
            </svg>
          </div>
        ) : (
          <div className="skeleton-shimmer h-full w-full" />
        )}
      </div>
      {decorationUrl && (
        <div className="pointer-events-none absolute -inset-3">
          <Image src={decorationUrl} alt="" fill sizes="136px" unoptimized />
        </div>
      )}
      {user && <StatusDot status={status} />}
      {user && <CustomStatusBubble text={customStatus ?? null} />}
    </div>
  );
}

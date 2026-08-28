import Image from "next/image";
import { getDiscordAvatarUrl } from "@/lib/lanyard/avatar";
import type { LanyardDiscordUser, DiscordStatus } from "@/lib/lanyard/types";
import { StatusDot } from "./StatusDot";

interface AvatarProps {
  user: LanyardDiscordUser | null;
  status: DiscordStatus;
}

export function Avatar({ user, status }: AvatarProps) {
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
        ) : (
          <div className="skeleton-shimmer h-full w-full" />
        )}
      </div>
      {user && <StatusDot status={status} />}
    </div>
  );
}

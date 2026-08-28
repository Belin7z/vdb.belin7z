import { SITE } from "@/config/site";
import { getDisplayNameStyle } from "@/lib/lanyard/name-style";
import type { LanyardDiscordUser } from "@/lib/lanyard/types";
import type { LanyardStatus } from "@/hooks/useLanyard";
import { CopyableUsername } from "./CopyableUsername";
import { ServerTag } from "./badges/ServerTag";

interface DisplayNameProps {
  user: LanyardDiscordUser | null;
  connectionStatus: LanyardStatus;
}

export function DisplayName({ user, connectionStatus }: DisplayNameProps) {
  if (user) {
    return (
      <div className="mt-4 text-center">
        <h1
          className="font-display text-2xl font-semibold tracking-tight text-white"
          style={getDisplayNameStyle(user.display_name_styles)}
        >
          {user.global_name ?? user.username}
        </h1>
        <div className="mt-0.5 grid grid-cols-[1fr_auto_1fr] items-center gap-1.5">
          <span aria-hidden="true" className="invisible justify-self-end">
            <ServerTag primaryGuild={user.primary_guild} />
          </span>
          <CopyableUsername username={user.username} />
          <span className="justify-self-start">
            <ServerTag primaryGuild={user.primary_guild} />
          </span>
        </div>
      </div>
    );
  }

  if (connectionStatus === "error") {
    return (
      <div className="mt-4 text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
          {SITE.name}
        </h1>
        <p className="text-sm text-purple-300/50">Offline</p>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <div className="skeleton-shimmer h-6 w-40 rounded-md" />
      <div className="skeleton-shimmer h-4 w-24 rounded-md" />
    </div>
  );
}

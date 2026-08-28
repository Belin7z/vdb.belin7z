import type { LanyardDiscordUser } from "@/lib/lanyard/types";

export function DisplayName({ user }: { user: LanyardDiscordUser | null }) {
  if (!user) {
    return (
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="skeleton-shimmer h-6 w-40 rounded-md" />
        <div className="skeleton-shimmer h-4 w-24 rounded-md" />
      </div>
    );
  }

  return (
    <div className="mt-4 text-center">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-white">
        {user.global_name ?? user.username}
      </h1>
      <p className="text-sm text-purple-300/70">@{user.username}</p>
    </div>
  );
}

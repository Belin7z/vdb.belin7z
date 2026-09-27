import { getDiscordAccountCreationDate } from "@/lib/lanyard/discord-date";

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" strokeLinecap="round" />
    </svg>
  );
}

export function AccountAge({ discordId }: { discordId: string }) {
  const year = getDiscordAccountCreationDate(discordId).getFullYear();

  return (
    <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-purple-300/50">
      <CalendarIcon className="h-3 w-3" />
      No Discord desde {year}
    </p>
  );
}

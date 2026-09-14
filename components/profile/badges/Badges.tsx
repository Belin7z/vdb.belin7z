import Image from "next/image";
import { PROFILE_BADGES } from "@/lib/lanyard/badges";

export function Badges() {
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-0.5">
      {PROFILE_BADGES.map((badge) => (
        <span
          key={badge.id}
          className="group relative flex h-5 w-5 shrink-0 items-center justify-center"
        >
          <Image src={badge.image} alt={badge.label} fill sizes="20px" className="object-contain" />
          <span className="pointer-events-none absolute -bottom-7 z-10 whitespace-nowrap rounded-md bg-black/70 px-2 py-1 text-[10px] text-purple-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {badge.label}
          </span>
        </span>
      ))}
    </div>
  );
}

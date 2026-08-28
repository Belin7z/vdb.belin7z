import Image from "next/image";
import { PROFILE_BADGES } from "@/lib/lanyard/badges";

export function Badges() {
  return (
    <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
      {PROFILE_BADGES.map((badge) => (
        <span
          key={badge.id}
          title={badge.label}
          className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        >
          <Image src={badge.image} alt={badge.label} fill sizes="28px" className="object-cover" />
        </span>
      ))}
    </div>
  );
}

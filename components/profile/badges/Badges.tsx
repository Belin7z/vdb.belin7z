import Image from "next/image";
import { PROFILE_BADGES } from "@/lib/lanyard/badges";

export function Badges() {
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-0.5">
      {PROFILE_BADGES.map((badge) => (
        <span
          key={badge.id}
          title={badge.label}
          className="relative flex h-5 w-5 shrink-0 items-center justify-center"
        >
          <Image src={badge.image} alt={badge.label} fill sizes="20px" className="object-contain" />
        </span>
      ))}
    </div>
  );
}

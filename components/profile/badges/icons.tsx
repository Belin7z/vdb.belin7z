import type { CSSProperties } from "react";
import type { BadgeIconKey } from "@/lib/lanyard/badges";

type IconProps = { className?: string; style?: CSSProperties };

function ShieldIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" />
    </svg>
  );
}

function StarIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 2l2.9 6.6L22 9.3l-5 4.9 1.3 7.1L12 17.9 5.7 21.3 7 14.2 2 9.3l7.1-.7L12 2Z" />
    </svg>
  );
}

function HouseIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3L12 3Z" />
    </svg>
  );
}

function MagnifierIcon({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={className}
      style={style}
    >
      <circle cx="10" cy="10" r="6" />
      <path d="m20 20-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 21s-7.5-4.7-10-9.3C.4 8.4 2 5 5.4 5 7.5 5 9 6 12 8.5 15 6 16.5 5 18.6 5 22 5 23.6 8.4 22 11.7 19.5 16.3 12 21 12 21Z" />
    </svg>
  );
}

function CodeIcon({ className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="m8 6-5 6 5 6" />
      <path d="m16 6 5 6-5 6" />
    </svg>
  );
}

export const BADGE_ICONS: Record<BadgeIconKey, (props: IconProps) => React.JSX.Element> = {
  shield: ShieldIcon,
  star: StarIcon,
  house: HouseIcon,
  magnifier: MagnifierIcon,
  heart: HeartIcon,
  code: CodeIcon,
};

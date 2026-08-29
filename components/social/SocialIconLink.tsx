import type { ComponentType } from "react";

interface SocialIconLinkProps {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export function SocialIconLink({ href, label, icon: Icon }: SocialIconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-purple-400/20 bg-white/5 text-purple-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/60 hover:text-white hover:shadow-[0_0_18px_rgba(192,132,252,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0420]"
    >
      <Icon className="h-5 w-5" />
      <span className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-md bg-black/70 px-2 py-1 text-xs text-purple-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}

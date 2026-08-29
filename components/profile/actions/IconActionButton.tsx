interface IconActionButtonProps {
  onClick: () => void;
  label: string;
  tooltip: string;
  disabled?: boolean;
  icon: React.ReactNode;
}

export function IconActionButton({
  onClick,
  label,
  tooltip,
  disabled,
  icon,
}: IconActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-purple-400/20 bg-white/5 text-purple-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300/60 hover:text-white hover:shadow-[0_0_18px_rgba(192,132,252,0.55)] disabled:pointer-events-none disabled:opacity-50"
    >
      {icon}
      <span className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-md bg-black/70 px-2 py-1 text-xs text-purple-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {tooltip}
      </span>
    </button>
  );
}

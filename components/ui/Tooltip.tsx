interface TooltipProps {
  label: string;
  className?: string;
}

export function Tooltip({ label, className = "" }: TooltipProps) {
  return (
    <span
      className={`pointer-events-none absolute whitespace-nowrap rounded-md bg-black/70 px-2 py-1 text-purple-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${className}`}
    >
      {label}
    </span>
  );
}

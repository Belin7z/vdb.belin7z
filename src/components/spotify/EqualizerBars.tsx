export function EqualizerBars() {
  return (
    <span className="flex h-2.5 items-end gap-[2px]" aria-hidden="true">
      <span className="animate-eq-bar-1 w-[2.5px] rounded-sm bg-emerald-400" />
      <span className="animate-eq-bar-2 w-[2.5px] rounded-sm bg-emerald-400" />
      <span className="animate-eq-bar-3 w-[2.5px] rounded-sm bg-emerald-400" />
    </span>
  );
}

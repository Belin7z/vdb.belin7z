type IconProps = { className?: string };

export function VolumeOnIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" strokeLinejoin="round" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12" strokeLinecap="round" />
    </svg>
  );
}

export function VolumeOffIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" strokeLinejoin="round" />
      <path d="m16 9 5 6m0-6-5 6" strokeLinecap="round" />
    </svg>
  );
}

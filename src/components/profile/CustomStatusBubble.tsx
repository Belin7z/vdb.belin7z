export function CustomStatusBubble({ text }: { text: string | null }) {
  if (!text) return null;

  return (
    <div className="absolute -top-2 left-full ml-1 w-max max-w-[150px] z-10">
      <div className="relative rounded-2xl rounded-bl-sm border border-purple-300/25 bg-[#1a0a33] px-3 py-1.5 text-[11px] leading-snug text-purple-50 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        {text}
        <div className="absolute -bottom-[5px] left-3 h-2.5 w-2.5 rotate-45 border-b border-l border-purple-300/25 bg-[#1a0a33]" />
      </div>
    </div>
  );
}

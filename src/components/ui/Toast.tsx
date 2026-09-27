export function Toast({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div className="animate-toast-in pointer-events-none fixed left-1/2 top-6 z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-purple-300/30 bg-[#150733]/95 px-4 py-2 text-xs font-medium text-purple-100 shadow-[0_10px_30px_rgba(88,28,135,0.5)]">
      {message}
    </div>
  );
}

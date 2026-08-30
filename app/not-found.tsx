import Link from "next/link";
import { LazyGalaxyBackground } from "@/components/particles/LazyGalaxyBackground";

export default function NotFound() {
  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden px-4 py-6">
      <LazyGalaxyBackground />
      <div className="animate-card-enter flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/10 bg-[#0d0420]/95 p-10 text-center shadow-[0_20px_60px_rgba(88,28,135,0.45)]">
        <p className="font-display text-6xl font-bold text-purple-300">404</p>
        <p className="mt-3 text-lg font-semibold text-white">Perdido no espaço</p>
        <p className="mt-2 text-sm text-purple-300/70">
          Essa página não existe por aqui.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-full border border-purple-400/30 bg-white/5 px-5 py-2 text-sm font-medium text-purple-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}

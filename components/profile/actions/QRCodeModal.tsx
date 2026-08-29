"use client";

import { useEffect } from "react";
import { SITE } from "@/config/site";

interface QRCodeModalProps {
  svg: string;
  onClose: () => void;
}

export function QRCodeModal({ svg, onClose }: QRCodeModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="QR code do perfil"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex w-full max-w-xs flex-col items-center gap-4 rounded-3xl border border-purple-400/20 bg-[#0d0420] p-6 shadow-[0_20px_60px_rgba(88,28,135,0.55)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-purple-300/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
        <div
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <p className="text-center text-xs text-purple-300/60">{SITE.url}</p>
      </div>
    </div>
  );
}

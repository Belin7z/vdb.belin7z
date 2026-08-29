"use client";

import { useEffect, useRef, useState } from "react";
import { useShareProfile } from "@/hooks/useShareProfile";
import { useDownloadCard } from "@/hooks/useDownloadCard";
import { DotsIcon, ShareIcon, DownloadIcon, QRIcon } from "./icons";
import { QRCodeModal } from "./QRCodeModal";

export function CardMenu({ qrCodeSvg }: { qrCodeSvg: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { share, copied } = useShareProfile();
  const { download, isBusy } = useDownloadCard();

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <div
      ref={menuRef}
      data-capture-ignore="true"
      className="absolute -right-3 -top-3 z-20"
    >
      <button
        type="button"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label="Mais opções"
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-purple-200 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
      >
        <DotsIcon className="h-4 w-4" />
      </button>

      {isMenuOpen && (
        <div
          role="menu"
          className="absolute right-0 top-11 w-48 rounded-2xl border border-purple-400/20 bg-[#0d0420]/95 p-1.5 shadow-[0_10px_40px_rgba(88,28,135,0.5)] backdrop-blur-xl"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              share();
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-purple-100 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
          >
            <ShareIcon className="h-4 w-4" />
            {copied ? "Link copiado!" : "Compartilhar"}
          </button>
          <button
            type="button"
            role="menuitem"
            disabled={isBusy}
            onClick={() => {
              download();
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-purple-100 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70 disabled:opacity-50"
          >
            <DownloadIcon className="h-4 w-4" />
            {isBusy ? "Gerando..." : "Baixar imagem"}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsQrOpen(true);
              setIsMenuOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm text-purple-100 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
          >
            <QRIcon className="h-4 w-4" />
            QR code
          </button>
        </div>
      )}

      {isQrOpen && <QRCodeModal svg={qrCodeSvg} onClose={() => setIsQrOpen(false)} />}
    </div>
  );
}

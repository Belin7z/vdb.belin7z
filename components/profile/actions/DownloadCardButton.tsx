"use client";

import { useState } from "react";
import { IconActionButton } from "./IconActionButton";

const CARD_ELEMENT_ID = "belin7z-profile-card";

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 3v12m0 0-4-4m4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
    </svg>
  );
}

export function DownloadCardButton() {
  const [isBusy, setIsBusy] = useState(false);

  async function handleDownload() {
    const node = document.getElementById(CARD_ELEMENT_ID);
    if (!node) return;

    setIsBusy(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        backgroundColor: "#0d0420",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "belin7z-card.png";
      link.click();
    } catch {
      // captura falhou, ignora silenciosamente
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <IconActionButton
      onClick={handleDownload}
      label="Baixar card como imagem"
      tooltip={isBusy ? "Gerando..." : "Baixar card"}
      disabled={isBusy}
      icon={<DownloadIcon className="h-5 w-5" />}
    />
  );
}

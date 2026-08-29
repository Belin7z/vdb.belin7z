"use client";

import { useState } from "react";

const CARD_ELEMENT_ID = "belin7z-profile-card";

export function useDownloadCard() {
  const [isBusy, setIsBusy] = useState(false);

  async function download() {
    const node = document.getElementById(CARD_ELEMENT_ID);
    if (!node) return;

    setIsBusy(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        filter: (child) => !(child instanceof HTMLElement && child.dataset.captureIgnore === "true"),
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

  return { download, isBusy };
}

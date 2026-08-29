"use client";

import { useState } from "react";
import { SITE } from "@/config/site";
import { IconActionButton } from "./IconActionButton";

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6" strokeLinecap="round" />
    </svg>
  );
}

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: SITE.title, url: SITE.url });
      } catch {
        // usuário cancelou o compartilhamento
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(SITE.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard indisponível
    }
  }

  return (
    <IconActionButton
      onClick={handleShare}
      label="Compartilhar perfil"
      tooltip={copied ? "Link copiado!" : "Compartilhar"}
      icon={<ShareIcon className="h-5 w-5" />}
    />
  );
}

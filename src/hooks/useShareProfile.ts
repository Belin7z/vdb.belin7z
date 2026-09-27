"use client";

import { useState } from "react";
import { SITE } from "@/config/site";

export function useShareProfile() {
  const [copied, setCopied] = useState(false);

  async function share() {
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

  return { share, copied };
}

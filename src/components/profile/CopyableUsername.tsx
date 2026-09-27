"use client";

import { useState } from "react";

export function CopyableUsername({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`@${username}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable, silently ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copiar usuário @${username}`}
      className="rounded text-sm text-purple-300/70 transition-colors hover:text-purple-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70"
    >
      {copied ? "Copiado!" : `@${username}`}
    </button>
  );
}

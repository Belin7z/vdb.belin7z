"use client";

import { useEffect, useState } from "react";
import { connectLanyardSocket } from "@/lib/lanyard/socket";
import type { LanyardData } from "@/lib/lanyard/types";

export type LanyardStatus = "loading" | "ready" | "error";

export function useLanyard(discordId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [status, setStatus] = useState<LanyardStatus>(() =>
    discordId ? "loading" : "error"
  );

  useEffect(() => {
    if (!discordId) return;

    const disconnect = connectLanyardSocket(discordId, {
      onUpdate: (update) => {
        setData(update);
        setStatus("ready");
      },
    });

    return disconnect;
  }, [discordId]);

  return { data, status };
}

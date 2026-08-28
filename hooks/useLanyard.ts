"use client";

import { useEffect, useState } from "react";
import { connectLanyardSocket } from "@/lib/lanyard/socket";
import type { LanyardData } from "@/lib/lanyard/types";

export type LanyardStatus = "loading" | "ready" | "error";

export function useLanyard(
  discordId: string,
  initialData: LanyardData | null = null
) {
  const [data, setData] = useState<LanyardData | null>(initialData);
  const [status, setStatus] = useState<LanyardStatus>(() => {
    if (initialData) return "ready";
    return discordId ? "loading" : "error";
  });

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

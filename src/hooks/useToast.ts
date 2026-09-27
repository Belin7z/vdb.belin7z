"use client";

import { useCallback, useRef, useState } from "react";

const TOAST_DURATION_MS = 2200;

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const tokenRef = useRef(0);

  const showToast = useCallback((text: string) => {
    const token = ++tokenRef.current;
    setMessage(text);
    setTimeout(() => {
      if (tokenRef.current === token) setMessage(null);
    }, TOAST_DURATION_MS);
  }, []);

  return { message, showToast };
}

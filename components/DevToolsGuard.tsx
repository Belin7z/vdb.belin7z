"use client";

import { useEffect } from "react";

const BLOCKED_SHORTCUT_KEYS = ["i", "j", "c"];

export function DevToolsGuard() {
  useEffect(() => {
    function blockContextMenu(event: MouseEvent) {
      event.preventDefault();
    }

    function blockShortcuts(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      const isDevToolsShortcut =
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && BLOCKED_SHORTCUT_KEYS.includes(key)) ||
        (event.ctrlKey && key === "u");

      if (isDevToolsShortcut) event.preventDefault();
    }

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockShortcuts);
    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockShortcuts);
    };
  }, []);

  return null;
}

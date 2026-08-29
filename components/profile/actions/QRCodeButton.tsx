"use client";

import { useState } from "react";
import { IconActionButton } from "./IconActionButton";
import { QRCodeModal } from "./QRCodeModal";

function QRIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20v.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function QRCodeButton({ svg }: { svg: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconActionButton
        onClick={() => setIsOpen(true)}
        label="Mostrar QR code do perfil"
        tooltip="QR code"
        icon={<QRIcon className="h-5 w-5" />}
      />
      {isOpen && <QRCodeModal svg={svg} onClose={() => setIsOpen(false)} />}
    </>
  );
}

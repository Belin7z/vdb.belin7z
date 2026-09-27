"use client";

import { useToast } from "@/hooks/useToast";
import { Toast } from "@/components/ui/Toast";
import { SOCIAL_LINKS } from "./social-links.data";
import { SocialIconLink } from "./SocialIconLink";

export function SocialLinks() {
  const { message, showToast } = useToast();

  return (
    <div className="flex items-center justify-center gap-4">
      <Toast message={message} />
      {SOCIAL_LINKS.map((social) => (
        <SocialIconLink key={social.label} {...social} onFeedback={showToast} />
      ))}
    </div>
  );
}

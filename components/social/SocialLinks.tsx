import { SOCIAL_LINKS } from "./social-links.data";
import { SocialIconLink } from "./SocialIconLink";

export function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-4">
      {SOCIAL_LINKS.map((social) => (
        <SocialIconLink key={social.label} {...social} />
      ))}
    </div>
  );
}

import { SOCIALS } from "@/config/site";
import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  SpotifyIcon,
} from "./icons";

export const SOCIAL_LINKS = [
  { label: "Instagram", href: SOCIALS.instagram, icon: InstagramIcon },
  { label: "GitHub", href: SOCIALS.github, icon: GithubIcon },
  { label: "Discord", href: SOCIALS.discord, icon: DiscordIcon },
  { label: "Spotify", href: SOCIALS.spotify, icon: SpotifyIcon },
];

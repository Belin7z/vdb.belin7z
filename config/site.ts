// ID do Discord usado pelo Lanyard (api.lanyard.rest) para trazer
// avatar, nome exibido e "Ouvindo agora" no Spotify em tempo real.
// Defina NEXT_PUBLIC_DISCORD_ID no .env.local (ou nas env vars da Vercel).
// Veja README.md para o passo a passo.
export const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_ID ?? "";

export const SITE = {
  name: "Belin7z",
  title: "Belin7z",
  description: "Perfil de Belin7z",
  url: "https://belin7z.vercel.app",
} as const;

export const SOCIALS = {
  github: "https://github.com/Belin7z",
  instagram: "https://instagram.com/vdb.belin7z",
  discord: DISCORD_ID
    ? `https://discord.com/users/${DISCORD_ID}`
    : "https://discord.com/users/vdb.belin7z",
  spotify:
    "https://open.spotify.com/user/31fpmfsf5vu25c2j2hqaetnpaj74?si=31c7782330994a62",
} as const;

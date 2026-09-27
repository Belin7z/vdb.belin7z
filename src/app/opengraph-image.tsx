import { ImageResponse } from "next/og";
import { SITE, DISCORD_ID } from "@/config/site";
import { getInitialPresence } from "@/lib/lanyard/rest";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOTS = [
  { top: 60, left: 120, s: 6 },
  { top: 140, left: 980, s: 4 },
  { top: 480, left: 90, s: 5 },
  { top: 520, left: 1050, s: 6 },
  { top: 90, left: 560, s: 4 },
  { top: 560, left: 640, s: 5 },
  { top: 240, left: 1120, s: 4 },
  { top: 260, left: 40, s: 4 },
];

export default async function OpengraphImage() {
  const data = await getInitialPresence(DISCORD_ID);
  const avatarUrl = data?.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=256`
    : null;
  const name = data
    ? (data.discord_user.global_name ?? data.discord_user.username)
    : SITE.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a0533 0%, #05010f 65%)",
        }}
      >
        {DOTS.map((dot, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              position: "absolute",
              top: dot.top,
              left: dot.left,
              width: dot.s,
              height: dot.s,
              borderRadius: "50%",
              background: "#c084fc",
              opacity: 0.6,
            }}
          />
        ))}
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            width={160}
            height={160}
            style={{
              borderRadius: "50%",
              border: "4px solid rgba(192,132,252,0.5)",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #c084fc, #7c3aed)",
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 84,
            fontWeight: 800,
            color: "#f3e8ff",
            fontFamily: "sans-serif",
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 30,
            color: "#c4b5fd",
            fontFamily: "sans-serif",
          }}
        >
          Discord &amp; Spotify em tempo real
        </div>
      </div>
    ),
    size
  );
}

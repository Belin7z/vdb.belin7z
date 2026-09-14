import { DISCORD_ID, GITHUB_USERNAME } from "@/config/site";
import { getInitialPresence } from "@/lib/lanyard/rest";
import { getGithubStats } from "@/lib/github/stats";
import { getProfileQrSvg } from "@/lib/qrcode";
import { LazyGalaxyBackground } from "@/components/particles/LazyGalaxyBackground";
import { CreepyEye } from "@/components/particles/CreepyEye";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { BootOverlay } from "@/components/intro/BootOverlay";
import { AmbientToggle } from "@/components/audio/AmbientToggle";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [initialData, githubStats, qrCodeSvg] = await Promise.all([
    getInitialPresence(DISCORD_ID),
    getGithubStats(GITHUB_USERNAME),
    getProfileQrSvg(),
  ]);

  return (
    <main className="flex h-dvh items-center justify-center overflow-hidden px-4 py-6">
      <LazyGalaxyBackground />
      <CreepyEye />
      <ProfileCard initialData={initialData} githubStats={githubStats} qrCodeSvg={qrCodeSvg} />
      <AmbientToggle />
      <BootOverlay />
    </main>
  );
}

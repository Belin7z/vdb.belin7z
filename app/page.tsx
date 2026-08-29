import { DISCORD_ID, GITHUB_USERNAME } from "@/config/site";
import { getInitialPresence } from "@/lib/lanyard/rest";
import { getGithubStats } from "@/lib/github/stats";
import { getProfileQrSvg } from "@/lib/qrcode";
import { LazyParticlesBackground } from "@/components/particles/LazyParticlesBackground";
import { ProfileCard } from "@/components/profile/ProfileCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [initialData, githubStats, qrCodeSvg] = await Promise.all([
    getInitialPresence(DISCORD_ID),
    getGithubStats(GITHUB_USERNAME),
    getProfileQrSvg(),
  ]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <LazyParticlesBackground />
      <ProfileCard initialData={initialData} githubStats={githubStats} qrCodeSvg={qrCodeSvg} />
    </main>
  );
}

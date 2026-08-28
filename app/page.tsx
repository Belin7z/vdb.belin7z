import { DISCORD_ID } from "@/config/site";
import { getInitialPresence } from "@/lib/lanyard/rest";
import { LazyParticlesBackground } from "@/components/particles/LazyParticlesBackground";
import { ProfileCard } from "@/components/profile/ProfileCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialData = await getInitialPresence(DISCORD_ID);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <LazyParticlesBackground />
      <ProfileCard initialData={initialData} />
    </main>
  );
}

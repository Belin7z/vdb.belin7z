import { ParticlesBackground } from "@/components/particles/ParticlesBackground";
import { ProfileCard } from "@/components/profile/ProfileCard";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <ParticlesBackground />
      <ProfileCard />
    </main>
  );
}

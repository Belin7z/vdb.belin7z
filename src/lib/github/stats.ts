export interface GithubStats {
  followers: number;
  publicRepos: number;
}

export async function getGithubStats(username: string): Promise<GithubStats | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;

    const data = await res.json();
    return { followers: data.followers, publicRepos: data.public_repos };
  } catch {
    return null;
  }
}

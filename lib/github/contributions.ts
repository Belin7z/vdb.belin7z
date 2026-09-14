export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const WEEKS_TO_SHOW = 13;

export async function getGithubContributions(username: string): Promise<ContributionDay[] | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data.contributions)) return null;

    return data.contributions.slice(-WEEKS_TO_SHOW * 7);
  } catch {
    return null;
  }
}

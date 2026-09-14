import type { ContributionDay } from "@/lib/github/contributions";

const LEVEL_COLORS = [
  "bg-white/[0.05]",
  "bg-purple-500/25",
  "bg-purple-500/45",
  "bg-purple-400/70",
  "bg-fuchsia-400/90",
];

export function ContributionHeatmap({ days }: { days: ContributionDay[] | null }) {
  if (!days || days.length === 0) return null;

  const remainder = days.length % 7;
  const padCount = remainder === 0 ? 0 : 7 - remainder;
  const padded: (ContributionDay | null)[] = [
    ...Array.from({ length: padCount }, () => null),
    ...days,
  ];

  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  return (
    <div className="mt-3 flex justify-center gap-[3px]">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-[3px]">
          {week.map((day, dayIndex) =>
            day ? (
              <div
                key={day.date}
                title={`${day.count} contribuições em ${day.date}`}
                className={`h-[9px] w-[9px] rounded-[2px] ${LEVEL_COLORS[day.level]}`}
              />
            ) : (
              <div key={dayIndex} className="h-[9px] w-[9px] rounded-[2px] bg-transparent" />
            )
          )}
        </div>
      ))}
    </div>
  );
}

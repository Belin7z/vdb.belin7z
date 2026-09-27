"use client";

import { useEffect, useState } from "react";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 22) return "evening";
  return "night";
}

export function useTimeOfDay(): TimeOfDay {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("night");

  useEffect(() => {
    const timer = setTimeout(() => setTimeOfDay(getTimeOfDay(new Date().getHours())), 0);
    return () => clearTimeout(timer);
  }, []);

  return timeOfDay;
}

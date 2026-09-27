"use client";

import dynamic from "next/dynamic";

export const LazyGalaxyBackground = dynamic(
  () => import("./GalaxyBackground").then((mod) => mod.GalaxyBackground),
  { ssr: false }
);

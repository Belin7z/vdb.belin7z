import type { CSSProperties } from "react";
import type { LanyardDisplayNameStyles } from "./types";

export function getDisplayNameStyle(
  styles: LanyardDisplayNameStyles | null | undefined
): CSSProperties {
  const colors = styles?.colors;
  if (!colors || colors.length === 0) return {};

  const hexColors = colors.map((color) => `#${color.toString(16).padStart(6, "0")}`);

  if (hexColors.length === 1) {
    return {
      color: hexColors[0],
      textShadow: `0 0 16px ${hexColors[0]}80`,
    };
  }

  return {
    backgroundImage: `linear-gradient(90deg, ${hexColors.join(", ")})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };
}

import { describe, expect, it } from "vitest";
import { formatDuration, formatElapsed } from "./time";

describe("formatDuration", () => {
  it("formats whole minutes and seconds", () => {
    expect(formatDuration(0)).toBe("0:00");
    expect(formatDuration(65_000)).toBe("1:05");
    expect(formatDuration(3_599_000)).toBe("59:59");
  });

  it("never goes negative", () => {
    expect(formatDuration(-5000)).toBe("0:00");
  });
});

describe("formatElapsed", () => {
  it("shows 'agora mesmo' for less than a minute", () => {
    expect(formatElapsed(30_000)).toBe("agora mesmo");
  });

  it("shows minutes only under an hour", () => {
    expect(formatElapsed(5 * 60_000)).toBe("há 5 min");
  });

  it("shows hours and minutes past an hour", () => {
    expect(formatElapsed(2 * 60 * 60_000 + 15 * 60_000)).toBe("há 2h 15min");
  });
});

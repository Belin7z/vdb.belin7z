import { describe, expect, it } from "vitest";
import { generateStars, generateNebulae } from "./star-field";

describe("generateStars", () => {
  it("returns the requested number of stars", () => {
    expect(generateStars(50)).toHaveLength(50);
    expect(generateStars(0)).toHaveLength(0);
  });

  it("keeps every star's numeric fields within valid ranges", () => {
    for (const star of generateStars(100)) {
      expect(star.radius).toBeGreaterThanOrEqual(0);
      expect(star.radius).toBeLessThanOrEqual(1);
      expect(star.depth).toBeGreaterThanOrEqual(0);
      expect(star.depth).toBeLessThanOrEqual(1);
      expect(star.size).toBeGreaterThan(0);
      expect(star.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(typeof star.isSparkle).toBe("boolean");
    }
  });
});

describe("generateNebulae", () => {
  it("returns the requested number of nebulae", () => {
    expect(generateNebulae(4)).toHaveLength(4);
  });

  it("keeps each nebula's radius positive", () => {
    for (const nebula of generateNebulae(10)) {
      expect(nebula.radius).toBeGreaterThan(0);
    }
  });
});

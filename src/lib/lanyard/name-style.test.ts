import { describe, expect, it } from "vitest";
import { getDisplayNameStyle } from "./name-style";

describe("getDisplayNameStyle", () => {
  it("returns an empty style when there are no colors", () => {
    expect(getDisplayNameStyle(null)).toEqual({});
    expect(getDisplayNameStyle(undefined)).toEqual({});
    expect(getDisplayNameStyle({ colors: [] })).toEqual({});
  });

  it("applies a solid color with a glow for a single color", () => {
    const style = getDisplayNameStyle({ colors: [0xc084fc] });
    expect(style.color).toBe("#c084fc");
    expect(style.textShadow).toBe("0 0 16px #c084fc80");
  });

  it("applies a gradient text style for two or more colors", () => {
    const style = getDisplayNameStyle({ colors: [0xff0000, 0x0000ff] });
    expect(style.backgroundImage).toBe("linear-gradient(90deg, #ff0000, #0000ff)");
    expect(style.color).toBe("transparent");
  });
});

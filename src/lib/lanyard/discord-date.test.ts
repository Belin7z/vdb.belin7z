import { describe, expect, it } from "vitest";
import { getDiscordAccountCreationDate } from "./discord-date";

describe("getDiscordAccountCreationDate", () => {
  it("decodes the Discord epoch itself from snowflake 0", () => {
    const date = getDiscordAccountCreationDate("0");
    expect(date.toISOString()).toBe("2015-01-01T00:00:00.000Z");
  });

  it("decodes a snowflake exactly 1 second after the epoch", () => {
    const oneSecondAfterEpoch = (BigInt(1000) << BigInt(22)).toString();
    const date = getDiscordAccountCreationDate(oneSecondAfterEpoch);
    expect(date.toISOString()).toBe("2015-01-01T00:00:01.000Z");
  });
});

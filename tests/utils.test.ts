import { describe, expect, it } from "vitest";
import { luoguColor } from "~/utils";

describe("luoguColor", () => {
  it("blue", () => {
    expect(luoguColor("blue")).toBe("#0e90d2");
  });

  it("cheater", () => {
    expect(luoguColor("cheater")).toBe("#996600");
  });
});

import { beforeAll, describe, expect, it } from "vitest";
import { getParents, getUid, luoguColor } from "~/utils";
import { getCardStyle } from "~/utils/card";

describe.each([
  { color: "blue", expected: "#0e90d2" },
  { color: "cheater", expected: "#996600" },
  { color: "red", expected: "#e74c3c" },
])("luoguColor($color)", ({ color, expected }) => {
  it(`returns ${expect}`, () => {
    expect(luoguColor(color)).toBe(expected);
  });
});

describe("getUid", () => {
  it.each([
    { url: "user/1", expected: 1 },
    { url: "/user/12", expected: 12 },
    { url: "https://www.luogu.com.cn/user/123", expected: 123 },
    { url: "space/show?uid=1234", expected: 1234 },
    { url: "/space/show?uid=12345", expected: 12345 },
    { url: "https://www.luogu.com.cn/space/show?uid=123456", expected: 123456 },
    { url: "https://www.luogu.com.cn/", expected: null },
  ])("getUid($url)", ({ url, expected }) => {
    expect(getUid(url)).toBe(expected);
  });
});

describe("getParents", () => {
  it("normal", () => {
    const div = document.createElement("div");
    const a = document.createElement("a");
    const span = document.createElement("span");

    div.appendChild(a);
    a.appendChild(span);

    expect(getParents(span)).toEqual([span, a, div]);
  });
});

describe("getCardStyle", () => {
  beforeAll(() => {
    Object.defineProperty(window.HTMLElement.prototype, "clientWidth", { value: 1920 });
  });

  it("normal", () => {
    expect(getCardStyle(960, 540)).toEqual({
      "position": "absolute",
      "z-index": 2000200,
      "top": "570px",
      "left": "810px",
    });
  });

  it("too left", () => {
    expect(getCardStyle(100, 270)).toEqual({
      "position": "absolute",
      "z-index": 2000300,
      "top": "300px",
      "left": "68px",
    });
  });

  it("too right", () => {
    expect(getCardStyle(1820, 810)).toEqual({
      "position": "absolute",
      "z-index": 2000400,
      "top": "840px",
      "left": "1601px",
    });
  });
});

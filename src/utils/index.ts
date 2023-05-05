import { COLOR_TABLE, USER_PAGE_REGEX } from "~/data/constants";

export const logWarn = (...args) => console.warn("[FLG]", ...args);
export const logInfo = (...args) => console.info("[FLG]", ...args);
export const logDebug = (...args) => {
  if (import.meta.env.MODE === "dev") {
    console.debug("[FLG]", ...args);
  }
};

export const luoguColor = (color: string): string => {
  if (color === "blue") {
    return COLOR_TABLE["bluelight"];
  }

  if (color === "cheater") {
    return COLOR_TABLE["brown"];
  }

  return COLOR_TABLE[color];
};

export const getUid = (url: string): number | null => {
  for (const re of USER_PAGE_REGEX) {
    const match = url.match(re);

    if (match !== null) {
      return Number(match[1]);
    }
  }

  return null;
};

export const getParents = (node: HTMLAnchorElement): HTMLElement[] => {
  let now: HTMLElement | null = node;

  const res: HTMLElement[] = [];

  while (now) {
    res.push(now);
    now = now.parentElement;
  }

  return res;
};

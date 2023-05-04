import { COLOR_TABLE } from "~/data/constants";

export const logInfo = (...args) => console.info("[FLG]", ...args);

export const luoguColor = (color: string) => {
  if (color === "blue") {
    return COLOR_TABLE["bluelight"];
  }

  if (color === "cheater") {
    return COLOR_TABLE["brown"];
  }

  return COLOR_TABLE[color];
};

import { userPageRegex, userPageUrlIndex } from "./data/constants";

export const getUID = (url: string): number => {
  let uid = "-1";
  if (typeof(url) === "string") {
    userPageRegex.forEach((item, index) => {
      if (url.match(item) !== null)
        uid = url.substring(userPageUrlIndex[index]);
    });
  }
  return Number(uid);
};

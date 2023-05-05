import { QueryFunction } from "@tanstack/solid-query";
import { FUser } from "~/data/types";
import { logDebug } from "~/utils";

export const fetchUser: QueryFunction<FUser, ["userinfo", number]> = async ({ queryKey }) => {
  const uid = queryKey[1];

  const resp = await fetch(
    `https://www.luogu.com.cn/user/${uid}`,
    { headers: { "x-luogu-type": "content-only" } },
  );

  if (!resp.ok) {
    throw new Error(`failed to get userinfo, uid = ${uid}`);
  }

  const res = await resp.json();

  logDebug("userinfo", uid, res);

  return res.currentData.user;
};

export const fetchSelf: QueryFunction<number | null, ["self"]> = async () => {
  const resp = await fetch(
    "https://www.luogu.com.cn/user/3", // kkksc03
    { headers: { "x-luogu-type": "content-only" } },
  );

  if (!resp.ok) {
    throw new Error("failed to get self");
  }

  const res = await resp.json();
  const self = res.currentUser;

  logDebug("self", self);

  if (typeof self === "undefined") {
    return null;
  }

  return self.uid;
};

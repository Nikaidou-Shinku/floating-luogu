import $ from "jquery";
import React from "react";
import { UserInfo } from "../data/interfaces/types";
import { InfoCard, FailedCard } from ".";

const getInfo = (id: number): UserInfo => {
  let ans: UserInfo;
  $.ajax({
    async: false,
    type: "GET",
    url: `https://www.luogu.com.cn/user/${id}`,
    headers: { "x-luogu-type": "content-only" },
    success: (res) => { ans = res.currentData.user; }
  });
  return ans;
};

export const Card = (props: { id: number }) => {
  const uid = props.id;
  if (uid < 0) {
    console.error("Get user uid failed!");
    return <FailedCard />;
  }
  let getInfoOK = true;
  const userInfo = getInfo(uid);
  if (userInfo === undefined) {
    console.error(`Get user ${uid}'s info failed!`);
    getInfoOK = false;
  }
  return getInfoOK ? <InfoCard {...userInfo} /> : <FailedCard />;
};

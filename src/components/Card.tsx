import $ from "jquery";
import React from "react";
import { UserInfo } from "../interfaces/types";
import { InfoCard, FailedCard } from ".";

const defaultBackgroundURL = "https://cdn.luogu.org/images/bg/fe/DSCF0530-shrink.jpg";

const getInfo = (id: number): [UserInfo, number] => {
  let ans: UserInfo;
  let num: number;
  $.ajax({
    async: false,
    type: "GET",
    url: `https://www.luogu.com.cn/user/${id}`,
    headers: { "x-luogu-type": "content-only" },
    success: (res) => { ans = res.currentData.user;
       num = (res.currentUser != undefined ? res.currentUser.uid : -2); }
  });
  return [ans, num];
};

export const Card = (props: { id: number }) => {
  let getInfoOK = true;
  const userInfo = getInfo(props.id);
  if (userInfo === undefined) {
    console.error(`Get user ${props.id}'s info failed!`);
    getInfoOK = false;
  } else {
    if (userInfo[0].background === "")
      userInfo[0].background = defaultBackgroundURL;
  }
  return getInfoOK ? <InfoCard info={userInfo[0]} currUID={userInfo[1]} /> : <FailedCard />;
};

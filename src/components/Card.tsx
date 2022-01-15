import $ from "jquery";
import React, { useEffect, useState } from "react";
import { UserInfo } from "../data/interfaces/types";
import { getUser } from "../data/LuoguAPI";
import { InfoCard, FailedCard } from ".";

const getInfo = (id: number): UserInfo => {
  let ans: UserInfo;
  $.ajax({
    async: false,
    type: "GET",
    url: getUser(id),
    headers: {
      "x-luogu-type": "content-only"
    },
    success: (res) => {
      ans = res.currentData.user;
    }
  });
  return ans;
};

export const Card = (props: { id: number }) => {
  const uid = props.id;
  const [loaded, setLoadType] = useState(false);
  const [data, setData] = useState<UserInfo>(undefined);

  if (uid < 0) {
    console.error("Get user uid failed!");
    return <FailedCard />;
  }
  let getInfoOK = true;
  useEffect(() => {
    const userInfo = getInfo(uid);
    if (userInfo === undefined) {
      console.error(`Get user ${uid}'s info failed!`);
      getInfoOK = false;
    }
    setData(userInfo);
    setLoadType(true);
  }, []);
  return loaded ? (getInfoOK ? <InfoCard {...data} /> : <FailedCard />) : <div />;
};

import React from "react";
import { UserInfo } from "./type";
import $ from "jquery";

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
  const dt = getInfo(props.id);
  if (dt === undefined)
    console.error(`Get user ${props.id} info failed!`);
  return (
    <div style={{width: 300, borderRadius: 5, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 0 5px 1px #999", background: "#fff"}}>
      <div style={{width: "100%", height: 60, background: `url(${dt.background}) no-repeat`, backgroundSize: `cover`}}></div>
      <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", flexDirection: "row", width: "100%", position: "relative"}}>
          <div style={{width: 80}}>
            <div style={{background: `url(https://cdn.luogu.com.cn/upload/usericon/${dt.uid}.png) no-repeat`, backgroundSize: `cover`, width: 60, height: 60, borderRadius: 30, position: "absolute", top: -16, left: 10}}></div>
          </div>
          <div style={{flex: 1}}>
            <div className={("lg-fg-" + dt.color.toLowerCase())} style={{fontWeight: "bold", fontSize: 16}}>{dt.name}</div>
            <div style={{color: "grey", fontSize: 14}}>#{dt.uid}</div>
          </div>
        </div>
        <div style={{fontSize: 14, margin: "5px 15px"}}>{dt.slogan}</div>
        <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
          <div style={{flex: 1, margin: 10}}>
            <div style={{textAlign: "center", fontSize: 12}}>关注者</div>
            <div style={{textAlign: "center", fontSize: 16}}>{dt.followerCount}</div>
          </div>
          <div style={{flex: 1, margin: 10}}>
            <div style={{textAlign: "center", fontSize: 12}}>关注的人</div>
            <div style={{textAlign: "center", fontSize: 16}}>{dt.followingCount}</div>
          </div>
          <div style={{flex: 1, margin: 10}}>
            <div style={{textAlign: "center", fontSize: 12}}>咕值排名</div>
            <div style={{textAlign: "center", fontSize: 16}}>{dt.ranking}</div>
          </div>
          <div style={{flex: 1, margin: 10}}>
            <div style={{textAlign: "center", fontSize: 12}}>通过题数</div>
            <div style={{textAlign: "center", fontSize: 16}}>{dt.passedProblemCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

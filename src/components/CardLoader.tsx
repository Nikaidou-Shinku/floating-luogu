import React, { useState } from "react";
import { Card } from ".";
import $ from "jquery";

export const CardLoader = (props: { init: string }) => {
  const STYLE = {
    display: "inline"
  };

  const [mouseOn, setMouse] = useState(false);

  const mouseEnter = () => {
    setMouse(true);
    console.log(props.init, "In");
  };

  const mouseLeave = () => {
    // setMouse(false);
    // console.log(props.init, "Out");
  };

  const currentData = (`{"registerTime":1340000000,"introduction":"1145141919感谢大家支持洛谷!![](bilibili:BV1J54y147Cu)","prize":[{"year":2019,"contestName":"CSP入门","prize":"一等奖"}],"background":"https://cdn.luogu.com.cn/upload/image_hosting/sgseiz6v.png","blogAddress":"https://www.luogu.com.cn/blog/kkksc03/","followingCount":81,"followerCount":15008,"ranking":1661,"userRelationship":1,"reverseUserRelationship":0,"passedProblemCount":272,"submittedProblemCount":873,"uid":1,"name":"kkksc03","slogan":"洛谷吉祥物 DA✩ZE","badge":"吉祥物","isAdmin":true,"isBanned":false,"color":"Purple","ccfLevel":6,"isRoot":true}`)

  return (
    <div style={STYLE} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <a dangerouslySetInnerHTML={{ __html: props.init }} />
      {mouseOn && <Card id={60864} dt={currentData} />}
    </div>
    // <a onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
    //   {mouseOn && <Card id={126486} />}
    // </a>
  );
};

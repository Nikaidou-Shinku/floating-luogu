import React, { useState } from "react";
import { Card } from ".";

const currentData = {
  registerTime: 1340000000,
  introduction: "1145141919感谢大家支持洛谷!![](bilibili:BV1J54y147Cu)",
  prize: [
    {
      year: 2019,
      contestName: "CSP入门",
      prize: "一等奖"
    }
  ],
  background: "https://cdn.luogu.com.cn/upload/image_hosting/sgseiz6v.png",
  blogAddress: "https://www.luogu.com.cn/blog/kkksc03/",
  followingCount: 81,
  followerCount: 15008,
  ranking: 1661,
  userRelationship: 1,
  reverseUserRelationship: 0,
  passedProblemCount: 272,
  submittedProblemCount: 873,
  uid: 1,
  name: "kkksc03",
  slogan: "洛谷吉祥物 DA✩ZE",
  badge: "吉祥物",
  isAdmin: true,
  isBanned: false,
  color: "Purple",
  ccfLevel: 6,
  isRoot: true
};

export const CardLoader = (props: { init: string }) => {
  const INLINE_STYLE = {
    display: "inline"
  };
  const CARD_STYLE = {
    
  };

  const [isCardDisplay, setCard] = useState(false);
  let cardTimeout: NodeJS.Timer = null;

  const mouseEnter = () => {
    if (isCardDisplay) {
      clearTimeout(cardTimeout);
      cardTimeout = null;
    } else {
      cardTimeout = setTimeout(() => {
        setCard(true);
        cardTimeout = null;
      }, 1000);
    }
  };

  const mouseLeave = () => {
    if (isCardDisplay) {
      cardTimeout = setTimeout(() => {
        setCard(false);
        cardTimeout = null;
      }, 1000);
    } else {
      clearTimeout(cardTimeout);
      cardTimeout = null;
    }
  };

  return (
    <div style={INLINE_STYLE} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <div style={INLINE_STYLE} dangerouslySetInnerHTML={{ __html: props.init }} />
      {isCardDisplay && <div style={CARD_STYLE}><Card id={126486} dt={JSON.stringify(currentData)} /></div>}
    </div>
  );
};

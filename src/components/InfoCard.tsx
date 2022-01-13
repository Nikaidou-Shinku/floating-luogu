import React, { CSSProperties } from "react";
import { UserInfo } from "../interfaces/types";
import { AM_BADGE_STYLE, AM_RADIUS_STYLE, LG_BG, LG_FG } from "../styles/luoguStyles";
import { $CSS, CARD_STYLE, CARD_CONTAINER_STYLE, CARD_HEADER_STYLE } from "../styles/cardStyles";

// I put these CSS here just for temporary treatment
// I will dispose of them in the near future :)
const STAT_CONTAINER_STYLE = { flex: 1, margin: 10 };
const BLOG_STYLE = { fontSize: 12, margin: "0.5em 1em 0em 1em" };
const SLOGAN_STYLE = { fontSize: 14, margin: "0.5em 1.5em" };
const STAT_STYLE: CSSProperties = { display: "flex", flexDirection: "row", width: "100%" };

const getStatItemStyle = (fontSize: number): CSSProperties => {
  return {
    textAlign: "center",
    fontSize: fontSize
  };
};

const CardStatItem = (props: { name: string, value: string }) => {
  return (
    <div style={STAT_CONTAINER_STYLE}>
      <div style={getStatItemStyle(12)}>{props.name}</div>
      <div style={getStatItemStyle(16)}>{props.value}</div>
    </div>
  );
};

const getBackgroundStyle = (url: string) => {
  return {
    width: "100%",
    height: 60,
    background: `url(${url}) no-repeat`,
    backgroundSize: "cover"
  };
};

const getAvatarStyle = (uid: number): CSSProperties => {
  return {
    backgroundColor: "#fff",
    boxShadow: "0 0 5px 1px #999",
    background: `url(https://cdn.luogu.com.cn/upload/usericon/${uid}.png) no-repeat`,
    backgroundSize: "cover",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    top: -16,
    left: 10
  };
};

const getBadge = (color: string, value: string) => {
  return (
    <span style={
      $CSS([
        AM_BADGE_STYLE,
        AM_RADIUS_STYLE,
        LG_BG(color),
        {
          textAlign: "center",
          boxSizing: "border-box",
          verticalAlign: "0.25em"
        }
      ])
    }>
      {value}
    </span>
  );
};

export const InfoCard = (props: { info: UserInfo }) => {
  const userInfo = props.info;
  const userColor = userInfo.color.toLowerCase();
  const hasBadge = (userInfo.badge !== null) && (userInfo.badge !== "");
  const hasBlog = userInfo.blogAddress !== null;
  const hasSlogan = userInfo.slogan !== "";
  return (
    <div style={CARD_STYLE}>
      <div style={getBackgroundStyle(userInfo.background)} />
      <div style={CARD_CONTAINER_STYLE}>
        <div style={CARD_HEADER_STYLE}>
          <div style={{width: 80}}>
            <div style={getAvatarStyle(userInfo.uid)} />
          </div>
          <div style={{flex: 1}}>
            <div style={
              $CSS([
                LG_FG(userColor),
                {
                  fontWeight: "bold",
                  fontSize: "1.25em"
                }
              ])
            }>
              {userInfo.name}
              &nbsp;
              {hasBadge && getBadge(userColor, userInfo.badge)}
            </div>
            <div style={
              $CSS([
                LG_FG("gray"),
                { fontSize: 14 }
              ])
            }>#{userInfo.uid}</div>
          </div>
        </div>
        {hasBlog && <a style={BLOG_STYLE} href={userInfo.blogAddress}>{userInfo.blogAddress}</a>}
        {hasSlogan && <div style={SLOGAN_STYLE}>{userInfo.slogan}</div>}
        <div style={STAT_STYLE}>
          <CardStatItem name="关注" value={String(userInfo.followingCount)} />
          <CardStatItem name="粉丝" value={String(userInfo.followerCount)} />
          <CardStatItem name="通过题数" value={userInfo.passedProblemCount === null ? "-" : String(userInfo.passedProblemCount)} />
          <CardStatItem name="咕值排名" value={userInfo.ranking === null ? "-" : String(userInfo.ranking)} />
        </div>
      </div>
    </div>
  );
};

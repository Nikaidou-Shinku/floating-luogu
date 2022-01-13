import React, { CSSProperties } from "react";
import { UserInfo } from "../data/interfaces/types";
import { BADGE_STYLE, LG_BG, LG_FG, LG_FL, bannedUserAvatar, defaultBackgroundURL } from "../styles/luoguStyles";
import { $CSS, CARD_STYLE, CARD_CONTAINER_STYLE, CARD_HEADER_STYLE } from "../styles/cardStyles";
import { consts } from "../data/constants";

// I put these CSS here just for temporary treatment
// I will dispose of them in the near future :)
const STAT_CONTAINER_STYLE = { flex: 1, margin: 10 };
const BLOG_STYLE = { fontSize: 12, margin: "0.5em 1em 0em 1em", borderLeft: "5px solid #d0d0d0", background: "#e7e7e7", padding: "5px" };
const SLOGAN_STYLE = { fontSize: 14, margin: "0.25em 1.5em" };
const STAT_STYLE: CSSProperties = { display: "flex", flexDirection: "row", width: "100%" };
const STAT_BOTTOM_STYLE: CSSProperties = { fontSize: 16, height: 26, flex: 1, borderRadius: 10, padding: "3px 0px", textAlign: "center" };

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

// Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2021 Fonticons, Inc.
const cardButtomIconLust = [
  <path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z" />,
  <path d="M472.1 270.5l-193.1 199.7c-12.64 13.07-33.27 13.08-45.91 .0107l-193.2-199.7C-16.21 212.5-13.1 116.7 49.04 62.86C103.3 15.88 186.4 24.42 236.3 75.98l19.7 20.27l19.7-20.27c49.95-51.56 132.1-60.1 187.3-13.12C525.1 116.6 528.2 212.5 472.1 270.5z" />
];

const CardBottom = (props: { name: string, svgType: number }) => {
  return (
    <div style={STAT_BOTTOM_STYLE}>
      <svg viewBox="0 0 512 512" style={{
        width: 14,
        height: 14,
        verticalAlign: "middle"
      }}>{cardButtomIconLust[props.svgType]}</svg>
      &nbsp;
      {props.name}
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

const getAvatarURL = (uid: number) => {
  return uid < 0 ? bannedUserAvatar : `https://cdn.luogu.com.cn/upload/usericon/${uid}.png`;
};

const getAvatarStyle = (uid: number): CSSProperties => {
  return {
    backgroundColor: "#fff",
    boxShadow: "0 0 5px 1px #999",
    background: `url(${getAvatarURL(uid)}) no-repeat`,
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
        BADGE_STYLE,
        LG_BG(color)
      ])
    }>
      {value}
    </span>
  );
};

const getCCFLevelColor = (value: number) : string => {
  if (value <= 5)
    return "green";
  if (value <= 7)
    return "blue";
  return "gold";
};

// Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2021 Fonticons, Inc.
const CCFLevelBadge = (props: {value: number}) => {
  return (
    <div style={{
      position: "absolute",
      background: "#fff", 
      borderRadius: "100%",
      width: 20,
      height: 20,
      top: 27,
      left: 10
    }}>
      <svg viewBox="0 0 512 512" style={LG_FL(getCCFLevelColor(props.value))}>
        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z" />
      </svg>
    </div>
  );
};

export const InfoCard = (userInfo: UserInfo) => {
  if (userInfo.background === "")
    userInfo.background = defaultBackgroundURL;
  const cUID = consts.currentUID;
  const userColor = userInfo.color.toLowerCase();
  const userBadge = userColor === "cheater" ? "作弊者" : userInfo.badge;
  const hasBadge = (userBadge !== null) && (userBadge !== "");
  const hasBlog = userInfo.blogAddress !== null;
  const hasSlogan = userInfo.slogan !== "";
  const hasRelationship = cUID > 0 && userInfo.uid !== cUID;
  return (
    <div style={CARD_STYLE}>
      <div style={getBackgroundStyle(userInfo.background)} />
      <div style={CARD_CONTAINER_STYLE}>
        <div style={CARD_HEADER_STYLE}>
          <div style={{width: 80}}>
            <div style={getAvatarStyle(userInfo.uid)} />
            {(userInfo.ccfLevel >= 3) && <CCFLevelBadge value={userInfo.ccfLevel} />}
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
              {hasBadge && getBadge(userColor, userBadge)}
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
        {hasRelationship && <div style={$CSS([STAT_STYLE, {marginBottom: 10}])}>
          <CardBottom name="私信" svgType={0} />
          <CardBottom name="关注" svgType={1} />
        </div>}
      </div>
    </div>
  );
};

import $ from "jquery";
import React, { CSSProperties, useEffect, useState } from "react";
import { UserInfo } from "../data/interfaces/types";
import { consts } from "../data/constants";
import { chatWith, getAvatar, getFansPage, getFollowPage, getPracticePage, UPDATE_FOLLOW } from "../data/LuoguAPI";
import { BADGE_STYLE, LG_BG, LG_FG, LG_FL, bannedUserAvatar, defaultBackgroundURL } from "../styles/luoguStyles";
import { $CSS, CARD_STYLE, CARD_CONTAINER_STYLE, CARD_HEADER_STYLE } from "../styles/cardStyles";
import { loadAddress } from ".";

// I put these CSS here just for temporary treatment
// I will dispose of them in the near future :)
const STAT_CONTAINER_STYLE = { flex: 1, margin: 10 };
const BLOG_STYLE: CSSProperties = { position: "absolute", right: 0, top: -2, fontSize: 14, display: "flex", flexDirection: "row", transform: "scale(0.8)", marginBottom: "5px", background: "#eee", borderRadius: 5, padding: "3px 5px", lineHeight: "20px", cursor: "pointer" };
const SLOGAN_STYLE: CSSProperties = { fontSize: 14, margin: "0.25em 1.5em", wordBreak: "break-all", fontWeight: "normal" };
const STAT_STYLE: CSSProperties = { display: "flex", flexDirection: "row", width: "100%" };
const STAT_BUTTON_STYLE: CSSProperties = { fontSize: 16, height: 22, flex: 1, borderRadius: 10, padding: "3px 0px", textAlign: "center", cursor: "pointer", lineHeight: "18px" };

const getStatItemStyle = (fontSize: number): CSSProperties => {
  return {
    textAlign: "center",
    fontSize: fontSize
  };
};

const CardStatItem = (props: { name: string, value: string, link?: string }) => {
  const [mouseOn, setMouse] = useState(false);
  const mouseOnColor = mouseOn ? "#777" : "black";
  const canClick = (props.value !== "-") && (props.link !== undefined);

  return (
    <div onClick={canClick ? () => { window.open(props.link); } : undefined}
    onMouseEnter={() => { setMouse(true); }}
    onMouseLeave={() => { setMouse(false); }}
    style={
      $CSS([
        STAT_CONTAINER_STYLE,
        canClick ? { color: mouseOnColor, transition: "0.2s", cursor: "pointer" } : {}
      ])
    }>
      <div style={getStatItemStyle(12)}>{props.name}</div>
      <div style={getStatItemStyle(16)}>
        <span>{props.value}</span>
      </div>
    </div>
  );
};

// Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2021 Fonticons, Inc.
const ChatButton = (props: { uid: number }) => {
  const chat = () => { window.open(chatWith(props.uid)); };
  const [mouseOn, setMouse] = useState(false);
  const mouseOnColor = mouseOn ? "rgb(0, 86, 179)" : "rgb(52, 152, 219)";

  return (
    <div onClick={chat}
    onMouseEnter={() => { setMouse(true); }}
    onMouseLeave={() => { setMouse(false); }}
    style={
      $CSS([
        STAT_BUTTON_STYLE,
        { color: mouseOnColor }
      ])
    }>
      <svg viewBox="0 0 512 512" style={{
        width: 16,
        height: 16,
        marginBottom: 3,
        marginRight: 5,
        verticalAlign: "middle",
        fill: mouseOnColor
      }}>
        <path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z" />
      </svg>
      私信
    </div>
  );
};

const updateFollow = (uid: number, setFollow: any, value: number, fanState: any) => {
  const target = (value & 1) ^ 1;
  $.ajax({
    type: "POST",
    url: UPDATE_FOLLOW,
    data: JSON.stringify({ relationship: target, uid: uid }),
    headers: {
      "x-csrf-token": consts.csrfToken,
      "content-type": "application/json"
    },
    success: (res) => {
      if (res._empty) {
        setFollow(value ^ 1);
        const fanNumber = fanState[0] + (target ? 1 : -1);
        fanState[1](fanNumber);
      } else console.error(`Update user ${uid}'s follow state failed!`);
    }
  });
};

// Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2021 Fonticons, Inc.
const FollowButton = (props: { uid: number, state: number, changeState: any, fanState: any }) => {
  const [mouseOn, setMouse] = useState(false);
  const [followState, setFollow] = useState(props.state);
  const followColor = (followState & 1) === 0 ? (mouseOn ? "rgb(0, 86, 179)" : "rgb(52, 152, 219)") : "#bbb";
  const getFollowText = () => {
    if ((followState & 1) === 0)
      return "关注";
    if (mouseOn)
      return "取消关注";
    if ((followState & 2) === 2)
      return "已互关";
    return "已关注";
  };

  return (
    <div onClick={() => { updateFollow(props.uid, setFollow, followState, props.fanState); }}
    onMouseEnter={() => { setMouse(true); }}
    onMouseLeave={() => { setMouse(false); }}
    style={
      $CSS([
        STAT_BUTTON_STYLE,
        { color: followColor }
      ])
    }>
      {
        (followState === 3) ?
        <svg viewBox="0 0 512 512" style={{
          width: 16,
          height: 16,
          marginBottom: 3,
          marginRight: 5,
          verticalAlign: "middle",
          fill: followColor
        }}>
          <path d="M472.1 270.5l-193.1 199.7c-12.64 13.07-33.27 13.08-45.91 .0107l-193.2-199.7C-16.21 212.5-13.1 116.7 49.04 62.86C103.3 15.88 186.4 24.42 236.3 75.98l19.7 20.27l19.7-20.27c49.95-51.56 132.1-60.1 187.3-13.12C525.1 116.6 528.2 212.5 472.1 270.5z" />
        </svg> :
        ((followState & 1) !== 0 ? 
        <svg viewBox="0 0 512 512" style={{
          width: 16,
          height: 16,
          marginBottom: 3,
          marginRight: 5,
          verticalAlign: "middle",
          fill: followColor
        }}>
          <path xmlns="http://www.w3.org/2000/svg" d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z"/>
        </svg> : <svg viewBox="0 0 512 512" style={{
          width: 16,
          height: 16,
          marginBottom: 3,
          marginRight: 5,
          verticalAlign: "middle",
          fill: followColor
        }}>
          <path xmlns="http://www.w3.org/2000/svg" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/>
        </svg>)
      }
      {getFollowText()}
    </div>
  );
};

const getBackgroundStyle = (url: string) => {
  return {
    width: "100%",
    height: 60,
    background: `url(${url}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };
};

const getAvatarURL = (uid: number) => {
  return uid < 0 ? bannedUserAvatar : getAvatar(uid);
};

const getAvatarStyle = (uid: number): CSSProperties => {
  return {
    boxShadow: "0 0 5px 1px #999",
    background: `#fff url(${getAvatarURL(uid)}) no-repeat`,
    backgroundSize: "cover",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    top: -16,
    left: 10
  };
};

const UserBadge = (props: { color: string, value: string}) => {
  return (
    <span style={
      $CSS([
        BADGE_STYLE,
        LG_BG(props.color)
      ])
    }>
      {props.value}
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

const BlogButton = (props: { address: string }) => {
  const blog = () => { window.open(props.address); };
  const [mouseOn, setMouse] = useState(false);
  const fontColor = mouseOn ? "rgb(0, 86, 179)" : "rgb(52, 152, 219)";
  return (
    <span style={$CSS([BLOG_STYLE, { color: fontColor }])}
      onMouseEnter={() => { setMouse(true); }}
      onMouseLeave={() => { setMouse(false); }}
      onClick={blog}>
      <svg style={{width: 16, height: 16, margin: "2px 5px 2px 2px", fill: fontColor}} viewBox="0 0 512 512">
        <path xmlns="http://www.w3.org/2000/svg" d="M25.57 176.1C12.41 175.4 .9117 185.2 .0523 198.4s9.173 24.65 22.39 25.5c120.1 7.875 225.7 112.7 233.6 233.6C256.9 470.3 267.4 480 279.1 480c.5313 0 1.062-.0313 1.594-.0625c13.22-.8438 23.25-12.28 22.39-25.5C294.6 310.3 169.7 185.4 25.57 176.1zM32 32C14.33 32 0 46.31 0 64s14.33 32 32 32c194.1 0 352 157.9 352 352c0 17.69 14.33 32 32 32s32-14.31 32-32C448 218.6 261.4 32 32 32zM63.1 351.9C28.63 351.9 0 380.6 0 416s28.63 64 63.1 64s64.08-28.62 64.08-64S99.37 351.9 63.1 351.9z" />
      </svg>
      个人博客
    </span>
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

  // followState:
  //   - 0: we did not know each other
  //   - 1: i followed him but he did not follow me
  //   - 2: he followed me but i did not follow him
  //   - 3: we followed each other
  const [fanNumber, setFan] = useState(userInfo.followerCount);
  const [followState, setFollow] = useState(userInfo.reverseUserRelationship * 2 + userInfo.userRelationship);
  const [sloganElemet, setLoadSlogan] = useState([<span>{userInfo.slogan}</span>]);

  if(hasSlogan){
    useEffect(() => {
      loadAddress(userInfo.slogan, (ret) => {
        setLoadSlogan(ret);
      })
    }, []);
  }

  return (
    <div style={CARD_STYLE}>
      <div style={getBackgroundStyle(userInfo.background)} />
      <div style={CARD_CONTAINER_STYLE}>
        <div style={CARD_HEADER_STYLE}>
          <div style={{width: 80}}>
            <div style={getAvatarStyle(userInfo.isBanned ? -1 : userInfo.uid)} />
            {(userInfo.ccfLevel >= 3) && <CCFLevelBadge value={userInfo.ccfLevel} />}
          </div>
          <div style={{flex: 1}}>
            <div style={
              $CSS([
                LG_FG(userColor),
                {
                  fontWeight: "bold",
                  fontSize: "1em",
                  marginTop: 3
                }
              ])
            }>
              {userInfo.name}
              {hasBadge && <UserBadge color={userColor} value={userBadge} />}
            </div>
            <div style={
              $CSS([
                LG_FG("gray"),
                {
                  fontSize: 14,
                  position: "relative",
                  lineHeight: "14px"
                }
              ])
            }>
              #{userInfo.uid}
              {hasBlog && <BlogButton address={userInfo.blogAddress} />}
            </div>
          </div>
        </div>
        {hasSlogan && <div style={SLOGAN_STYLE}>{sloganElemet}</div>}
        <div style={STAT_STYLE}>
          <CardStatItem link={getFollowPage(userInfo.uid)} name="关注" value={String(userInfo.followingCount)} />
          <CardStatItem link={getFansPage(userInfo.uid)} name="粉丝" value={String(fanNumber)} />
          <CardStatItem link={getPracticePage(userInfo.uid)} name="通过题数" value={userInfo.passedProblemCount === null ? "-" : String(userInfo.passedProblemCount)} />
          <CardStatItem name="咕值排名" value={userInfo.ranking === null ? "-" : String(userInfo.ranking)} />
        </div>
        {
          hasRelationship &&
          <div style={$CSS([STAT_STYLE, {marginBottom: 10}])}>
            <ChatButton uid={userInfo.uid} />
            <FollowButton uid={userInfo.uid} state={followState} changeState={setFollow} fanState={[fanNumber, setFan]} />
          </div>
        }
      </div>
    </div>
  );
};

import { Show, createMemo } from "solid-js";
import { UserSummary } from "~/data/types";
import { BANNED_USER_AVATAR_URL, COLOR_TABLE } from "~/data/constants";
import styles from "./styles.module.scss";

interface CcfLevelBadgeProps {
  level: number;
}

// Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2021 Fonticons, Inc.
const CcfLevelBadge = (props: CcfLevelBadgeProps) => {
  const color = createMemo(() => {
    if (props.level <= 5) {
      return "green";
    }

    if (props.level <= 7) {
      return "blue";
    }

    return "gold";
  });

  return (
    <div class={styles.ccfbadge}>
      <svg viewBox="0 0 512 512" style={{ "fill": COLOR_TABLE[color()] }}>
        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z" />
      </svg>
    </div>
  );
};

interface AvatarProps {
  user: UserSummary;
}

export default (props: AvatarProps) => {
  const avatarUrl = createMemo(() => {
    if (props.user.isBanned) {
      return BANNED_USER_AVATAR_URL;
    }

    return `https://cdn.luogu.com.cn/upload/usericon/${props.user.uid}.png`;
  });

  const ccfLevel = createMemo(() => props.user.ccfLevel);

  return (
    <div style={{ "width": "80px" }}>
      <div
        class={styles.avatar}
        style={{ "background": `url(${avatarUrl()}) 0% 0% / cover no-repeat rgb(255, 255, 255)` }}
      />
      <Show when={ccfLevel() >= 3}>
        <CcfLevelBadge level={ccfLevel()} />
      </Show>
    </div>
  );
};

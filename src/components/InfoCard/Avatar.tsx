import { Show, createMemo } from "solid-js";
import { UserSummary } from "~/data/types";
import { BANNED_USER_AVATAR_URL, COLOR_TABLE } from "~/data/constants";
import styles from "./styles.module.scss";

interface CcfLevelBadgeProps {
  level: number;
}

// Icon 'check-badge' in Solid type is from Hero Icons (https://heroicons.com/), under MIT license.
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
      <svg viewBox="0 0 24 24" style={{ "fill": COLOR_TABLE[color()] }}>
        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
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

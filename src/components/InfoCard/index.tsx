import { Show, createMemo } from "solid-js";
import { FUser } from "~/data/types";
import { COLOR_TABLE, DEFAULT_BACKGROUND_URL } from "~/data/constants";
import Background from "./Background";
import Avatar from "./Avatar";
import Username from "./Username";
import BlogButton from "./BlogButton";
import Slogan from "./Slogan";
import StatItem from "./StatItem";
import styles from "./styles.module.scss";
import card from "../card.module.css";

interface InfoCardProps {
  user: FUser;
}

export default (props: InfoCardProps) => {
  const backgroundUrl = createMemo(() => {
    const background = props.user.background;

    if (background === "") {
      return DEFAULT_BACKGROUND_URL;
    }

    return background;
  });

  return (
    <div class={card.card}>
      <Background url={backgroundUrl()} />
      <div class={styles.container}>
        <div class={styles.header}>
          <Avatar user={props.user} />
          <div style={{ "flex": "1" }}>
            <Username user={props.user} />
            <div style={{
              "color": COLOR_TABLE["gray"],
              "font-size": "14px",
              "position": "relative",
              "line-height": "14px",
            }}>
              #{props.user.uid}
              <Show when={props.user.blogAddress}>
                {(url) => <BlogButton url={url()} />}
              </Show>
            </div>
          </div>
        </div>
        <Show when={props.user.slogan}>
          {(s) => <Slogan slogan={s()} />}
        </Show>
        <div class={styles.stat}>
          <StatItem
            name="关注"
            value={`${props.user.followingCount}`}
            link={`https://www.luogu.com.cn/user/${props.user.uid}#following.following`}
          />
          <StatItem
            name="粉丝"
            value={`${props.user.followerCount}`}
            link={`https://www.luogu.com.cn/user/${props.user.uid}#following.follower`}
          />
          <StatItem
            name="通过题数"
            value={`${props.user.passedProblemCount ?? "-"}`}
            link={`https://www.luogu.com.cn/user/${props.user.uid}#practice`}
          />
          <StatItem
            name="咕值排名"
            value={`${props.user.ranking ?? "-"}`}
          />
        </div>
      </div>
    </div>
  );
};

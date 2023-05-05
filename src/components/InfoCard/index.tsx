import { Show, createMemo } from "solid-js";
import { FUser } from "~/data/types";
import { COLOR_TABLE, DEFAULT_BACKGROUND_URL } from "~/data/constants";
import { useState } from "~/state";
import Background from "./Background";
import Avatar from "./Avatar";
import Username from "./Username";
import BlogButton from "./BlogButton";
import Slogan from "./Slogan";
import StatItem from "./StatItem";
import ChatButton from "./ChatButton";
import FollowButton from "./FollowButton";
import styles from "./styles.module.scss";
import card from "../card.module.css";

interface InfoCardProps {
  user: FUser;
  refetch: () => void;
}

export default (props: InfoCardProps) => {
  const backgroundUrl = createMemo(() => {
    const background = props.user.background;

    if (background === "") {
      return DEFAULT_BACKGROUND_URL;
    }

    return background;
  });

  const state = useState();

  const hasRelationship = createMemo(() => {
    const selfUid = state().selfUid;
    return selfUid !== null && selfUid !== props.user.uid;
  });

  // relationship:
  //   - 0: we did not know each other
  //   - 1: i followed him but he did not follow me
  //   - 2: he followed me but i did not follow him
  //   - 3: we followed each other
  const relationship = createMemo(() => {
    const revertRela = props.user.reverseUserRelationship;
    const rela = props.user.userRelationship;

    if (typeof revertRela === "undefined" || typeof rela === "undefined") {
      throw new Error("unreachable");
    }

    return (revertRela * 2) + rela;
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
        <Show when={hasRelationship()}>
          <div
            class={styles.stat}
            style={{ "margin-bottom": "10px" }}
          >
            <ChatButton uid={props.user.uid} />
            <FollowButton
              state={state()}
              uid={props.user.uid}
              relationship={relationship()}
              refetch={props.refetch}
            />
          </div>
        </Show>
      </div>
    </div>
  );
};

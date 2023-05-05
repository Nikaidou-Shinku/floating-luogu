import { createMemo, createSignal } from "solid-js";
import { logInfo, logWarn } from "~/utils";
import { AppState } from "~/state";
import styles from "./styles.module.scss";

interface FollowButtonProps {
  state: AppState;
  uid: number;
  relationship: number;
  refetch: () => void;
}

// Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2021 Fonticons, Inc.
export default (props: FollowButtonProps) => {
  const [mouseOn, setMouseOn] = createSignal(false);

  // TODO: refactor
  const color = createMemo(() => {
    if ((props.relationship & 1) === 0) {
      return [undefined, undefined];
    }

    return [
      { "color": "#bbb" },
      { "fill": "#bbb" },
    ];
  });

  const followText = createMemo(() => {
    const state = props.relationship;

    if ((state & 1) === 0) {
      return "关注";
    }

    if (mouseOn()) {
      return "取消关注";
    }

    if ((state & 2) === 2) {
      return "已互关";
    }

    return "已关注";
  });

  const onClick = async () => {
    const target = (props.relationship & 1) ^ 1;

    const resp = await fetch("https://www.luogu.com.cn/api/user/updateRelationShip", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-csrf-token": props.state.csrfToken,
      },
      body: JSON.stringify({
        relationship: target,
        uid: props.uid,
      }),
    });

    if (!resp.ok) {
      logWarn("Failed to update relationship");
    }

    const res = await resp.json();

    if (res._empty) {
      logInfo("Successfully updated relationship");
      props.refetch();
      return;
    }

    logWarn("Failed to update relationship");
  };

  return (
    <div
      class={styles.bottomButton}
      onClick={onClick}
      onMouseEnter={() => setMouseOn(true)}
      onMouseLeave={() => setMouseOn(false)}
      style={color()[0]}
    >
      {
        (props.relationship === 3) ? (
          <svg viewBox="0 0 512 512" style={color()[1]}>
            <path d="M472.1 270.5l-193.1 199.7c-12.64 13.07-33.27 13.08-45.91 .0107l-193.2-199.7C-16.21 212.5-13.1 116.7 49.04 62.86C103.3 15.88 186.4 24.42 236.3 75.98l19.7 20.27l19.7-20.27c49.95-51.56 132.1-60.1 187.3-13.12C525.1 116.6 528.2 212.5 472.1 270.5z" />
          </svg>
        ) : (
          (props.relationship & 1) !== 0 ? (
            <svg viewBox="0 0 512 512" style={color()[1]}>
              <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z" />
            </svg>
          ) : (
            <svg viewBox="0 0 512 512" style={color()[1]}>
              <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
            </svg>
          )
        )
      }
      {followText()}
    </div>
  );
};

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

// Icons are from Hero Icons (https://heroicons.com/), under MIT license.
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={color()[1]}>
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        ) : (
          (props.relationship & 1) !== 0 ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={color()[1]}>
              <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={color()[1]}>
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
          )
        )
      }
      {followText()}
    </div>
  );
};

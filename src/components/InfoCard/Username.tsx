import { Show, createMemo } from "solid-js";
import { UserSummary } from "~/data/types";
import { luoguColor } from "~/utils";
import styles from "./styles.module.scss";

interface UserBadgeProps {
  color: string;
  badge: string;
}

const UserBadge = (props: UserBadgeProps) => (
  <span
    class={styles.badge}
    style={{ "background-color": luoguColor(props.color) }}
  >
    {props.badge}
  </span>
);

interface UsernameProps {
  user: UserSummary;
}

export default (props: UsernameProps) => {
  const color = createMemo(() => props.user.color.toLowerCase());

  const badge = createMemo(() => {
    if (color() === "cheater") {
      return "作弊者";
    }

    const badge = props.user.badge;

    if (badge === null) {
      return null;
    }

    if (badge === "") {
      return null;
    }

    return props.user.badge;
  });

  return (
    <div style={{
      "color": luoguColor(color()),
      "font-weight": "bold",
      "font-size": "1em",
      "margin-top": "3px",
    }}>
      {props.user.name}
      <Show when={badge()}>
        {(b) => <UserBadge color={color()} badge={b()} />}
      </Show>
    </div>
  );
};

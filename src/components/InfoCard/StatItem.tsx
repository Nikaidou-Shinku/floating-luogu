import { createMemo } from "solid-js";
import styles from "./styles.module.scss";

interface StatItemProps {
  name: string;
  value: string;
  link?: string;
}

export default (props: StatItemProps) => {
  const canClick = createMemo(() => {
    if (props.value === "-") {
      return false;
    }

    if (typeof props.link === "undefined") {
      return false;
    }

    return true;
  });

  const onClick = createMemo(() => {
    if (!canClick()) {
      return undefined;
    }

    // eslint-disable-next-line solid/reactivity
    return () => window.open(props.link);
  });

  return (
    <div
      onClick={() => onClick()?.()}
      classList={{ [styles.canclick]: canClick() }}
    >
      <div style={{ "font-size": "12px" }}>
        {props.name}
      </div>
      <div style={{ "font-size": "16px" }}>
        <span>{props.value}</span>
      </div>
    </div>
  );
};

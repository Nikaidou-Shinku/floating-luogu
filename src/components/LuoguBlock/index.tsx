import { JSX, children } from "solid-js";
import styles from "./styles.module.css";

interface LuoguBlockProps {
  center?: boolean;
  children: JSX.Element;
}

export default (props: LuoguBlockProps) => {
  const c = children(() => props.children);

  return (
    <div class="am-g">
      <div class="am-u-md-12">
        <div classList={{
          [styles.center]: props.center,
          "lg-article": true,
        }}>
          {c()}
        </div>
      </div>
    </div>
  );
};

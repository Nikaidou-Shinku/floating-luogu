import { JSX } from "solid-js";
import styles from "./styles.module.css";

interface LuoguBlockProps {
  center?: boolean;
  children: JSX.Element;
}

export default (props: LuoguBlockProps) => (
  <div class="am-g">
    <div class="am-u-md-12">
      <div classList={{
        [styles.center]: props.center,
        "lg-article": true,
      }}>
        {props.children}
      </div>
    </div>
  </div>
);

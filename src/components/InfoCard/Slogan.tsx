import styles from "./styles.module.scss";

interface SloganProps {
  slogan: string;
}

// TODO: parse slogan
export default (props: SloganProps) => (
  <div class={styles.slogan}>
    <span>{props.slogan}</span>
  </div>
);

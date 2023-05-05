import styles from "./styles.module.scss";

interface SloganProps {
  slogan: string;
}

// TODO: parse slogan
export default (props: SloganProps) => (
  <div class={styles.slogan}>
    <p>{props.slogan}</p>
  </div>
);

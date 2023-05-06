import styles from "./styles.module.scss";

interface ChatButtonProps {
  uid: number;
}

// Icon 'envelope' in Solid type is from Hero Icons (https://heroicons.com/), under MIT license.
export default (props: ChatButtonProps) => (
  <div
    class={styles.bottomButton}
    onClick={() => window.open(`https://www.luogu.com.cn/chat?uid=${props.uid}`)}
  >
    <svg viewBox="0 0 24 24">
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
    私信
  </div>
);

import styles from "./styles.module.css";
import card from "../card.module.css";

// Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2021 Fonticons, Inc.
export default () => (
  <div class={card.card}>
    <div class={styles.container}>
      <svg fill="#aaa" viewBox="0 0 512 512" class={`${styles.rotatable} ${styles.svg}`}>
        <path d="M512 256c0 141.2-114.8 256-256 256s-256-114.8-256-256c0-112.4 75.19-213.4 182.9-245.4c16.94-5.047 34.75 4.641 39.78 21.55c5.062 16.94-4.594 34.75-21.53 39.8C120.4 95.97 64 171.7 64 256c0 105.9 86.13 192 192 192s192-86.13 192-192c0-84.34-56.38-160-137.1-184c-16.94-5.047-26.59-22.86-21.53-39.8c5.031-16.91 22.84-26.56 39.78-21.55C436.8 42.64 512 143.6 512 256z" />
      </svg>
    </div>
  </div>
);

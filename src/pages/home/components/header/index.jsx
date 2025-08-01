import React from "react";

import styles from "./styles.module.css";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>UI</div>
          <p className={styles.logoName}>Paletton</p>
        </div>
      </div>
    </div>
  );
};

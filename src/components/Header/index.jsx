import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Color Palette Generator</h1>
      <p className={styles.p}>Create beautiful color systems</p>
    </header>
  );
};

export default Header;

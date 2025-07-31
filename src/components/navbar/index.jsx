import React from 'react';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLeft}>
        <span className={styles.logo}>UI Colors</span>
        <ul className={styles.navLinks}>
          <li>Generate</li>
          <li>My palettes</li>
          <li>Tailwind Colors</li>
          <li>More</li>
        </ul>
      </div>
      <div className={styles.navbarRight}>
        <span>Feedback</span>
        <button className={styles.signInButton}>Sign in</button>
      </div>
    </nav>
  );
};
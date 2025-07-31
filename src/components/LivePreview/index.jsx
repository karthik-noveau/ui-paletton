import React from "react";
import ContrastChecker from '../ContrastChecker/index.jsx';
import styles from './LivePreview.module.css';

const LivePreview = ({ shades }) => {
  return (
    <div className={styles.uiExamplesGrid}>
      <div className={styles.exampleCard}>
        <img src="https://via.placeholder.com/300x180" alt="Placeholder" />
        <div className={styles.exampleCardContent}>
          <h3>Track your expenses</h3>
          <p>A brief description of this UI example.</p>
          <ContrastChecker textColor={shades[900]} bgColor={shades[50]} />
        </div>
      </div>
      <div className={styles.exampleCard}>
        <img src="https://via.placeholder.com/300x180" alt="Placeholder" />
        <div className={styles.exampleCardContent}>
          <h3>Expenses</h3>
          <p>$12,543</p>
          <ContrastChecker textColor={shades[900]} bgColor={shades[50]} />
        </div>
      </div>
      <div className={styles.exampleCard}>
        <img src="https://via.placeholder.com/300x180" alt="Placeholder" />
        <div className={styles.exampleCardContent}>
          <h3>Gain control</h3>
          <p>A brief description of this UI example.</p>
          <ContrastChecker textColor={shades[900]} bgColor={shades[50]} />
        </div>
      </div>
    </div>
  );
};

export default LivePreview;

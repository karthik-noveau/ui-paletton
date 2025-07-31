import React from 'react';
import Palette from '../Palette/index.jsx';
import LivePreview from '../LivePreview/index.jsx';
import Export from '../Export/index.jsx';
import styles from './MainContent.module.css';

const MainContent = ({ shades, paletteName, shadeSteps }) => {
  return (
    <main className={styles.mainContent}>
      <div className={styles.paletteHeader}>
        <h2>Palette 1</h2>
        <div className={styles.paletteActions}>
          <button className={styles.savePaletteButton}>Save palette</button>
          <span className={styles.actionLink}>Contrast grid</span>
          <span className={styles.actionLink}>Export</span>
          <span className={styles.actionLink}>Edit</span>
        </div>
      </div>
      <p className={styles.paletteNameDisplay}>{paletteName}</p>
      <Palette shades={shades} shadeSteps={shadeSteps} />
      <h2>UI Examples</h2>
      <LivePreview shades={shades} />
      <Export shades={shades} paletteName={paletteName} />
    </main>
  );
};

export default MainContent;

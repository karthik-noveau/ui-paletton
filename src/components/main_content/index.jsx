import React from 'react';
import { Palette } from '../palette';
import { LivePreview } from '../live_preview';
import { Export } from '../export';
import styles from './MainContent.module.css';

export const MainContent = ({ primaryShades, secondaryShades, primaryPaletteName, secondaryPaletteName, shadeSteps }) => {
  return (
    <main className={styles.mainContentContainer}>
      <div className={styles.paletteHeader}>
        <h2>Palette 1</h2>
        <div className={styles.paletteActions}>
          <button className={styles.savePaletteButton}>Save palette</button>
          <span className={styles.actionLink}>Contrast grid</span>
          <span className={styles.actionLink}>Export</span>
          <span className={styles.actionLink}>Edit</span>
        </div>
      </div>
      <p className={styles.paletteNameDisplay}>{primaryPaletteName}</p>
      <Palette shades={primaryShades} shadeSteps={shadeSteps} />
      <h2>UI Examples</h2>
      <LivePreview shades={primaryShades} />
      {/* Secondary Palette and UI Examples can be added here if needed */}
      <Export primaryShades={primaryShades} secondaryShades={secondaryShades} primaryPaletteName={primaryPaletteName} secondaryPaletteName={secondaryPaletteName} />
    </main>
  );
};

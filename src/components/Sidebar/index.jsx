import React from 'react';
import { ColorPickerSection } from '../color_picker';
import styles from './Sidebar.module.css';

export const Sidebar = ({ primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, primaryPaletteName, setPrimaryPaletteName, secondaryPaletteName, setSecondaryPaletteName }) => {
  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.sidebarContent}>
        <h2 className={styles.sidebarTitle}>Tailwind CSS Color Generator</h2>
        <p className={styles.sidebarDescription}>
          Instantly create stunning color scales by entering a base color or hitting the spacebar.
        </p>
        <ColorPickerSection
          color={primaryColor}
          setColor={setPrimaryColor}
          paletteName={primaryPaletteName}
          setPaletteName={setPrimaryPaletteName}
          label="Primary"
        />
        <button className={styles.addSecondaryButton}>+ Add secondary color scale</button>
        <p className={styles.colorCombinationScheme}>Color combination scheme - auto</p>
      </div>
    </aside>
  );
};
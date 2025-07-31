import React from 'react';
import styles from './Export.module.css';

export const Export = ({ primaryShades, secondaryShades, primaryPaletteName, secondaryPaletteName }) => {
  const generateExportContent = () => {
    return `
:root {
${Object.entries(primaryShades).map(([shade, color]) => `  --${primaryPaletteName}-${shade}: ${color};`).join('\n')}
${Object.entries(secondaryShades).map(([shade, color]) => `  --${secondaryPaletteName}-${shade}: ${color};`).join('\n')}
}
        `;
  };

  const downloadFile = () => {
    const content = generateExportContent();
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `colors.css`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <section className={styles.exportContainer}>
      <h2>Export</h2>
      <div className={styles.exportOptions}>
        <button onClick={downloadFile}>Export CSS</button>
      </div>
      <pre>
        <code>
          {generateExportContent()}
        </code>
      </pre>
    </section>
  );
};
import React from 'react';
import { APCAcontrast } from 'apca-w3';
import styles from './ContrastChecker.module.css';

const ContrastChecker = ({ textColor, bgColor }) => {
  const contrast = APCAcontrast(textColor, bgColor);

  const getContrastLevel = (contrast) => {
    if (Math.abs(contrast) >= 75) return 'AAA';
    if (Math.abs(contrast) >= 60) return 'AA';
    if (Math.abs(contrast) >= 45) return 'A';
    return 'Fail';
  };

  const isCompliant = (contrast) => {
    return Math.abs(contrast) >= 45;
  };

  return (
    <div className={`${styles.contrastChecker} ${isCompliant(contrast) ? styles.compliant : styles.nonCompliant}`}>
      <span>{contrast.toFixed(2)}</span>
      <span>{getContrastLevel(contrast)}</span>
    </div>
  );
};

export default ContrastChecker;

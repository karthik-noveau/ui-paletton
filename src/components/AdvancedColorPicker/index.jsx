import React from 'react';
import { HexColorPicker, RgbColorPicker } from 'react-colorful';
import styles from './AdvancedColorPicker.module.css';

const AdvancedColorPicker = ({ color, setColor, format }) => {
  if (format === 'rgb') {
    return <RgbColorPicker color={color} onChange={setColor} className={styles.colorPicker} />;
  } else {
    return <HexColorPicker color={color} onChange={setColor} className={styles.colorPicker} />;
  }
};

export default AdvancedColorPicker;

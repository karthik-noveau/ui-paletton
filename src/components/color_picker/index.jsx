import React, { useState, useRef } from 'react';
import Popover from 'react-popover';
import { HexColorPicker, RgbColorPicker } from 'react-colorful';
import chroma from 'chroma-js';
import styles from './ColorPickerSection.module.css';

export const ColorPickerSection = ({ color, setColor, paletteName, setPaletteName, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputFormat, setInputFormat] = useState('hex'); // 'hex' or 'rgb'
  const target = useRef(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    try {
      const newColor = chroma(value).hex();
      setColor(newColor);
    } catch (error) {
      // Invalid color, do nothing or show error
    }
  };

  const displayColor = () => {
    if (inputFormat === 'hex') {
      return color;
    } else {
      return chroma(color).rgb().join(', ');
    }
  };

  const handleFormatChange = (e) => {
    setInputFormat(e.target.value);
  };

  return (
    <div className={styles.colorInputSection}>
      <div className={styles.inputGroup}>
        <label>{label}</label>
        <div className={styles.colorPickerWrapper}>
          <div
            ref={target}
            className={styles.colorSwatchContainer}
            style={{ backgroundColor: color }}
            onClick={togglePopover}
          ></div>
          <input
            type="text"
            value={displayColor()}
            onChange={handleInputChange}
            placeholder={inputFormat === 'hex' ? '#ffffff' : '255, 255, 255'}
          />
          <select value={inputFormat} onChange={handleFormatChange}>
            <option value="hex">HEX</option>
            <option value="rgb">RGB</option>
          </select>
          <Popover
            isOpen={isOpen}
            body={inputFormat === 'rgb' ? <RgbColorPicker color={color} onChange={setColor} /> : <HexColorPicker color={color} onChange={setColor} />}
            onOuterAction={closePopover}
            target={target.current}
            placement="bottom"
          >
            <div />
          </Popover>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label>Palette name</label>
        <input
          type="text"
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value)}
          placeholder="Palette name"
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
              className={`${styles.button} ${styles.primary}`}
              onClick={() => {
                // Generate random HSL values with controlled saturation and lightness
                const h = Math.floor(Math.random() * 360); // Full hue spectrum
                const s = 70 + Math.floor(Math.random() * 30); // 70-100% saturation
                const l = 30 + Math.floor(Math.random() * 40); // 30-70% lightness

                // Convert HSL to hex
                const hslToHex = (h, s, l) => {
                  l /= 100;
                  const a = s * Math.min(l, 1 - l) / 100;
                  const f = n => {
                    const k = (n + h / 30) % 12;
                    const color = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
                    return Math.round(255 * color).toString(16).padStart(2, '0');
                  };
                  return `#${f(0)}${f(8)}${f(4)}`;
                };

                setColor(hslToHex(h, s, l));
              }}
            >
              Random Color
            </button>
      </div>
    </div>
  );
};

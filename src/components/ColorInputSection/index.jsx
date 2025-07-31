import React, { useState, useRef } from 'react';
import Popover from 'react-popover';
import AdvancedColorPicker from '../AdvancedColorPicker/index.jsx';
import chroma from 'chroma-js';
import styles from './ColorInputSection.module.css';

const ColorInputSection = ({ baseColor, setBaseColor, paletteName, setPaletteName, onRandomColor, onExportCss }) => {
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
      setBaseColor(newColor);
    } catch (error) {
      // Invalid color, do nothing or show error
    }
  };

  const displayColor = () => {
    if (inputFormat === 'hex') {
      return baseColor;
    } else {
      return chroma(baseColor).rgb().join(', ');
    }
  };

  const handleFormatChange = (e) => {
    setInputFormat(e.target.value);
  };

  return (
    <div className={styles.colorInputSection}>
      <div className={styles.inputGroup}>
        <label>Base color</label>
        <div className={styles.colorPickerWrapper}>
          <div
            ref={target}
            className={styles.colorSwatchContainer}
            style={{ backgroundColor: baseColor }}
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
            body={<AdvancedColorPicker color={baseColor} setColor={setBaseColor} format={inputFormat} />}
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
        <button onClick={onRandomColor}>Random Color</button>
        <button onClick={onExportCss}>Export CSS</button>
      </div>
    </div>
  );
};

export default ColorInputSection;

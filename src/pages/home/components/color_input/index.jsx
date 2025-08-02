import { useState, useEffect } from "react";
import { Input, ColorPicker } from "antd";
import { FiCopy } from "react-icons/fi";
import { Button } from "@skynoveau-ui/core";

import styles from "./styles.module.css";

export const ColorInput = ({
  colorError,
  paletteName,
  onPaletteNameChange,
  colorMaxLength = 7,
  colorValue,
  onColorValueChange,
  onRandomColorChange,
  onExport,
}) => {
  const [internalColor, setInternalColor] = useState(colorValue || "#000000");

  useEffect(() => {
    setInternalColor(colorValue);
  }, [colorValue]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInternalColor(val);
    onColorValueChange(val);
  };

  const handlePickerChange = (color) => {
    const hex = color.toHexString();
    setInternalColor(hex);
    onColorValueChange(hex);
  };

  return (
    <div className={styles.container}>
      <Input
        className={styles.input}
        value={paletteName}
        onChange={(e) => onPaletteNameChange(e.target.value)}
        placeholder="Palette name"
      />

      <div className={styles.inputWrapper}>
        <Input
          value={internalColor}
          onChange={handleInputChange}
          maxLength={colorMaxLength}
          status={colorError && "error"}
          prefix={
            <ColorPicker
              value={internalColor}
              onChangeComplete={handlePickerChange}
              className={styles.colorCircle}
              showText={false}
              size="small"
            />
          }
        />
        {colorError && <span className={styles.errorText}>Invalid Color</span>}
      </div>

      <div className={`${styles.buttonContainer}`}>
        <Button
          className={styles.randomColorButton}
          onClick={onRandomColorChange}
        >
          Random color
        </Button>

        <Button className={styles.exportButton} onClick={onExport}>
          <FiCopy className={styles.copyIcon} /> Export CSS
        </Button>
      </div>
    </div>
  );
};

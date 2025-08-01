import React, { useState } from "react";
import styles from "./styles.module.css";
import { Input, Tooltip, ColorPicker } from "antd";
import { CopyOutlined } from "@ant-design/icons";

export const ColorInput = () => {
  const [color, setColor] = useState("#2a3f16");
  const [inputValue, setInputValue] = useState("#2a3f16");
  const [error, setError] = useState(false);

  const isValidHex = (value) => /^#([0-9A-F]{3}){1,2}$/i.test(value.trim());

  const handleColorChange = (newColor) => {
    const hex = newColor.toHexString();
    setColor(hex);
    setInputValue(hex);
    setError(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (isValidHex(val)) {
      setColor(val);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}></label>
      <Input value={"Primary"} />
      <div className={styles.inputWrapper}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          prefix={
            <ColorPicker
              value={color}
              onChangeComplete={handleColorChange}
              className={styles.colorCircle}
              showText={false}
              size="small"
            />
          }
        />
        {error && <span className={styles.errorText}>Invalid Hex Color</span>}
      </div>
    </div>
  );
};

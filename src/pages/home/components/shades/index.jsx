import React, { useState } from "react";
import styles from "./styles.module.css";

export const ShadesGrid = ({ shades, paletteName }) => {
  const [copied, setCopied] = useState(null);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };
  return (
    <>
      <div className={styles.paletteGrid}>
        <ColorsRow title={`Base color`}>
          <ColorBox
            label={`${paletteName}`}
            color={shades["base"]}
            isCopied={copied === shades["base"]}
            onCopy={handleCopy}
          />
        </ColorsRow>

        <ColorsRow title="Generated colors">
          {Object.keys(shades).map((key) => {
            const shade = shades[key];
            if (key === "base") return null;
            return (
              <ColorBox
                key={key}
                label={`${key.replace("primary-", "")}`}
                color={shade}
                isCopied={copied === shade}
                onCopy={handleCopy}
              />
            );
          })}
        </ColorsRow>
      </div>
    </>
  );
};

const ColorBox = ({ label, color, isCopied, onCopy, className }) => {
  const textColor = getContrastColor(color);

  const handleClick = () => {
    onCopy(color);
  };

  return (
    <div
      className={`${styles.colorBox} ${className} ${
        isCopied ? styles.copied : ""
      }`}
      onClick={handleClick}
    >
      <div
        className={styles.colorPreview}
        style={{ backgroundColor: color, color: textColor }}
      >
        {!isCopied && (
          <>
            <div
              className={`text-14 ${styles.colorLabel}`}
              onClick={handleClick}
            >
              {label}
            </div>
            <div
              className={`text-12 ${styles.colorCode}`}
              onClick={handleClick}
            >
              {color}
            </div>
          </>
        )}

        {isCopied && (
          <div
            className={`text-13 ${styles.copiedText}`}
            style={{ color: textColor }}
          >
            Copied !
          </div>
        )}
      </div>
    </div>
  );
};

const ColorsRow = ({ children, title }) => {
  return (
    <>
      <h3 className={`text-18 weight-400 ${styles.paletteTitle}`}>{title}</h3>
      <div className={styles.colorsRow}>{children}</div>
    </>
  );
};

const getContrastColor = (hex) => {
  // Remove hash and convert to RGB
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  // Calculate luminance
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > 120 ? "#000000" : "#ffffff";
};

import React, { useState, useCallback } from "react";
import chroma from "chroma-js";
import styles from "./Palette.module.css";

export const Palette = ({ shades, shadeSteps }) => {
  const ColorBox = ({ color, shade }) => {
    const [copied, setCopied] = useState(false);
    const [copyFormat, setCopyFormat] = useState("hex"); // 'hex' or 'rgb'

    const copyToClipboard = useCallback(() => {
      let valueToCopy;
      if (copyFormat === "hex") {
        valueToCopy = color;
      } else {
        valueToCopy = chroma(color).rgb().join(", ");
      }
      navigator.clipboard.writeText(valueToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }, [color, copyFormat]);

    const toggleCopyFormat = useCallback(() => {
      setCopyFormat((prevFormat) => (prevFormat === "hex" ? "rgb" : "hex"));
    }, []);

    return (
      <div
        className={styles.colorBox}
        onClick={copyToClipboard}
        style={{ backgroundColor: color }}
      >
        <div className={styles.colorInfo}>
          <span className={styles.colorName}>{shade}</span>
          <span className={styles.colorHex}>
            {copied
              ? "Copied!"
              : copyFormat === "hex"
              ? color
              : chroma(color).rgb().join(", ")}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCopyFormat();
            }}
          >
            {copyFormat.toUpperCase()}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.paletteContainer}>
      <div className={styles.paletteGrid}>
        {Object.values(shades).map((shade) => (
          <ColorBox key={shade} color={shade} />
        ))}
      </div>
    </section>
  );
};

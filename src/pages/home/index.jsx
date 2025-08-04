import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import { generateShades } from "./utils";
import { Header } from "./components/header";
import { ColorInput } from "./components/color_input";
import { ShadesGrid } from "./components/shades";
import { Preview } from "./components/preview";

export const HomePage = () => {
  const [baseColor, setBaseColor] = useState("#256aff");
  const [shades, setShades] = useState(generateShades("#256aff"));
  const [paletteName, setPaletteName] = useState("primary");
  const [colorError, setColorError] = useState(false);

  useEffect(() => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(baseColor)) {
      setShades(generateShades(baseColor));
      setColorError(false);
    } else {
      setColorError(true);
    }
  }, [baseColor]);

  const onExport = () => {
    const cssVariables = `  /* ---------- ${paletteName} ---------- */
  --${paletteName}-color: ${shades.base}; ${
      shades["primary-10"]
        ? `  --${paletteName}-color-10: ${shades["primary-10"]};
  --${paletteName}-color-25: ${shades["primary-25"]};
  --${paletteName}-color-50: ${shades["primary-50"]};`
        : ""
    }
  --${paletteName}-color-100: ${shades["primary-100"]};
  --${paletteName}-color-200: ${shades["primary-200"]};
  --${paletteName}-color-300: ${shades["primary-300"]};
  --${paletteName}-color-400: ${shades["primary-400"]};
  --${paletteName}-color-500: ${shades["primary-500"]};
  --${paletteName}-color-600: ${shades["primary-600"]};
${
  shades["primary-10"]
    ? `  --${paletteName}-color-700: ${shades["primary-700"]};
  --${paletteName}-color-800: ${shades["primary-800"]};
  --${paletteName}-color-900: ${shades["primary-900"]};
  --${paletteName}-color-950: ${shades["primary-950"]};`
    : ""
}`;
    navigator.clipboard.writeText(cssVariables);
  };

  const onPaletteNameChange = (name) => setPaletteName(name);
  const onColorValueChange = (newColor) => setBaseColor(newColor);
  const onRandomColorChange = () => {
    // Generate random HSL values with controlled saturation and lightness
    const h = Math.floor(Math.random() * 360); // Full hue spectrum
    const s = 70 + Math.floor(Math.random() * 30); // 70-100% saturation
    const l = 30 + Math.floor(Math.random() * 40); // 30-70% lightness

    // Convert HSL to hex
    const hslToHex = (h, s, l) => {
      l /= 100;
      const a = (s * Math.min(l, 1 - l)) / 100;
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, "0");
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    setBaseColor(hslToHex(h, s, l));
  };

  return (
    <>
      <Header />

      <div className={`wrapper wrapper-margin`}>
        <div className={`container ${styles.column}`}>
          <div className={`${styles.leftColumn}`}>
            <h1 className={`text-24 weight-500 ${styles.title}`}>
              UI Paletton Smart Color Generator
            </h1>
            <p className={`text-14 ${styles.description}`}>
              Pick your main color then we’ll build the perfect matching shades
              for you, instantly.
            </p>

            <ColorInput
              colorError={colorError}
              paletteName={paletteName}
              onPaletteNameChange={onPaletteNameChange}
              colorMaxLength={7}
              colorValue={baseColor}
              onColorValueChange={onColorValueChange}
              onRandomColorChange={onRandomColorChange}
              onExport={onExport}
            />
          </div>

          <div className={`${styles.rightColumn}`}>
            <ShadesGrid shades={shades} paletteName={paletteName} />

            <div className={styles.ThemeContainer}>
              <Preview shades={shades} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

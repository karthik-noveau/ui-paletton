import React, { useState, useEffect } from "react";
import { FiCopy, FiArrowRight, FiUser } from "react-icons/fi";
import styles from "./home.module.css";
import { generateShades } from "./utils";
import { Header } from "./components/header";
import { Button } from "@skynoveau-ui/core";
import { LeftNav } from "./components/leftnav";

export const HomePage = () => {
  const [baseColor, setBaseColor] = useState("#da169f");
  const [shades, setShades] = useState(generateShades("#da169f"));
  const [copied, setCopied] = useState(null);
  const [paletteName, setPaletteName] = useState("primary");
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(baseColor)) {
      setShades(generateShades(baseColor));
      setInputError(false);
    } else {
      setInputError(true);
    }
  }, [baseColor]);

  const handleCopy = (color) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };

  const exportAsCSS = () => {
    const cssVariables = `  /* ---------- ${paletteName} ---------- */
  --${paletteName}-color: ${shades.base};
  --${paletteName}-color-10: ${shades["primary-10"]};
  --${paletteName}-color-25: ${shades["primary-25"]};
  --${paletteName}-color-50: ${shades["primary-50"]};
  --${paletteName}-color-100: ${shades["primary-100"]};
  --${paletteName}-color-200: ${shades["primary-200"]};
  --${paletteName}-color-300: ${shades["primary-300"]};
  --${paletteName}-color-400: ${shades["primary-400"]};
  --${paletteName}-color-500: ${shades["primary-500"]};
  --${paletteName}-color-600: ${shades["primary-600"]};
  --${paletteName}-color-700: ${shades["primary-700"]};
  --${paletteName}-color-800: ${shades["primary-800"]};
  --${paletteName}-color-900: ${shades["primary-900"]};`;
    navigator.clipboard.writeText(cssVariables);
    setCopied("CSS_VARS");
    setTimeout(() => setCopied(null), 3000);
  };

  return (
    <>
      <Header />

      <div className={`wrapper`}>
        <div className={`container container-margin-top ${styles.column}`}>
          <div className={`${styles.leftColumn}`}>
            <LeftNav />
          </div>

          <div className={`${styles.rightColumn}`}></div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.ThemeContainer}>
          <div className={styles.controls}>
            <div className={styles.inputGroup}>
              <label htmlFor="baseColor" className={styles.label}>
                Base color
              </label>
              <div className={styles.colorInputContainer}>
                <input
                  type="color"
                  id="baseColor"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className={styles.colorPicker}
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className={`${styles.colorInput} ${
                    inputError ? styles.error : ""
                  }`}
                  maxLength={7}
                />
              </div>
              {inputError && (
                <div className={styles.errorMessage}>Invalid HEX color</div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="paletteName" className={styles.label}>
                Palette name
              </label>
              <input
                type="text"
                id="paletteName"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                className={styles.textInput}
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
                    const a = (s * Math.min(l, 1 - l)) / 100;
                    const f = (n) => {
                      const k = (n + h / 30) % 12;
                      const color =
                        l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
                      return Math.round(255 * color)
                        .toString(16)
                        .padStart(2, "0");
                    };
                    return `#${f(0)}${f(8)}${f(4)}`;
                  };

                  setBaseColor(hslToHex(h, s, l));
                }}
              >
                Random Color
              </button>
              <button
                className={`${styles.button} ${styles.secondary}`}
                onClick={exportAsCSS}
              >
                <FiCopy className={styles.copyIcon} /> Export CSS
              </button>
            </div>
          </div>

          {!inputError && (
            <div className={styles.paletteGrid}>
              <ColorsRow title="Generated palette">
                <ColorBox
                  label={`10`}
                  color={shades["primary-10"]}
                  isCopied={copied === shades["primary-10"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`25`}
                  color={shades["primary-25"]}
                  isCopied={copied === shades["primary-25"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`50`}
                  color={shades["primary-50"]}
                  isCopied={copied === shades["primary-50"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`100`}
                  color={shades["primary-100"]}
                  isCopied={copied === shades["primary-100"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`200`}
                  color={shades["primary-200"]}
                  isCopied={copied === shades["primary-200"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`300`}
                  color={shades["primary-300"]}
                  isCopied={copied === shades["primary-300"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`400`}
                  color={shades["primary-400"]}
                  isCopied={copied === shades["primary-400"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`500`}
                  color={shades["primary-500"]}
                  isCopied={copied === shades["primary-500"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`600`}
                  color={shades["primary-600"]}
                  isCopied={copied === shades["primary-600"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`700`}
                  color={shades["primary-700"]}
                  isCopied={copied === shades["primary-700"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`800`}
                  color={shades["primary-800"]}
                  isCopied={copied === shades["primary-800"]}
                  onCopy={handleCopy}
                />
                <ColorBox
                  label={`900`}
                  color={shades["primary-900"]}
                  isCopied={copied === shades["primary-900"]}
                  onCopy={handleCopy}
                />
              </ColorsRow>
            </div>
          )}

          {!inputError && (
            <div className={styles.practicalExamples}>
              <h3 className={styles.paletteTitle}>Theme Preview</h3>

              {/* UI Components Showcase */}
              <div className={styles.componentsGrid}>
                {/* Buttons */}
                <div className={styles.componentGroup}>
                  <h3>Buttons</h3>
                  <div className={styles.buttonRow}>
                    <button
                      className={`${styles.primaryButton} ${styles.primaryHoverButton}`}
                      style={{
                        backgroundColor: shades["base"],
                        color: "white",
                        "--hover-bg-color": shades["primary-600"],
                      }}
                    >
                      Primary
                    </button>
                    <button
                      className={styles.primaryButton}
                      style={{
                        backgroundColor: shades["primary-600"],
                        color: "white",
                      }}
                    >
                      Primary 600
                    </button>
                  </div>

                  <div className={styles.buttonRow}>
                    <button
                      className={styles.secondaryButton}
                      style={{
                        backgroundColor: shades["primary-50"],
                        color: shades["primary-700"],
                        border: `1px solid ${shades["primary-300"]}`,
                      }}
                    >
                      Primary 50
                    </button>
                    <button
                      className={styles.secondaryButton}
                      style={{
                        backgroundColor: shades["primary-100"],
                        color: shades["primary-700"],
                        border: `1px solid ${shades["primary-300"]}`,
                      }}
                    >
                      Primary 100
                    </button>
                    <button
                      className={styles.secondaryButton}
                      style={{
                        backgroundColor: shades["primary-200"],
                        color: shades["primary-800"],
                        border: `1px solid ${shades["primary-400"]}`,
                      }}
                    >
                      Primary 200
                    </button>
                  </div>
                </div>

                {/* Cards */}
                <div className={styles.componentGroup}>
                  <h3>Cards</h3>
                  <div className={styles.cardGrid}>
                    <div
                      className={styles.card}
                      style={{
                        backgroundColor: shades["primary-10"],
                        border: `1px solid ${shades["primary-400"]}`,
                      }}
                    >
                      <div
                        className={styles.cardHeader}
                        style={{ color: shades["primary-600"] }}
                      >
                        <h4 style={{ color: shades["primary-800"] }}>
                          Team Member
                        </h4>
                      </div>
                      <p style={{ color: shades["primary-600"] }}>
                        Another card variation with different styling.
                      </p>
                      <button
                        className={styles.cardButton}
                        style={{
                          backgroundColor: shades["primary-100"],
                          color: shades["primary-700"],
                        }}
                      >
                        View Profile <FiArrowRight />
                      </button>
                    </div>

                    <div
                      className={styles.card}
                      style={{ backgroundColor: shades["primary-25"] }}
                    >
                      <div
                        className={styles.cardHeader}
                        style={{ color: shades["primary-600"] }}
                      >
                        <FiUser className={styles.cardIcon} />
                        <h4 style={{ color: shades["primary-700"] }}>
                          User Profile
                        </h4>
                      </div>
                      <p style={{ color: shades["primary-600"] }}>
                        This is an example card showing how your colors work in
                        components.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {copied && (
          <div className={styles.toast}>
            {copied === "CSS_VARS"
              ? "CSS variables copied to clipboard!"
              : `Copied ${copied} to clipboard!`}
          </div>
        )}
      </div>
    </>
  );
};

const ColorBox = ({ label, color, isCopied, onCopy, className }) => {
  const textColor = getContrastColor(color);

  return (
    <div
      className={`${styles.colorBox} ${className} ${
        isCopied ? styles.copied : ""
      }`}
      onClick={() => onCopy(color)}
    >
      <div
        className={styles.colorPreview}
        style={{ backgroundColor: color, color: textColor }}
      >
        <div className={styles.colorLabel}>{label}</div>
        <div className={styles.colorCode}>{color}</div>
      </div>
    </div>
  );
};

const ColorsRow = ({ children, title }) => {
  return (
    <>
      <h3 className={styles.paletteTitle}>{title}</h3>
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

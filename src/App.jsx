import React, { useState, useEffect } from "react";
import { FiCopy, FiArrowRight, FiUser, FiMail, FiLock } from "react-icons/fi";
import styles from "./styles.module.css";

const generateShades = (hex) => {
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    const bigint = parseInt(hex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => clamp(Math.round(x), 0, 255).toString(16).padStart(2, "0"))
      .join("");

  const hexToHsl = (hex) => {
    const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }
    return [h, s * 100, l * 100];
  };

  const blendColor = (rgb, target, factor) => {
    return rgb.map((channel, i) =>
      clamp(channel + (target[i] - channel) * factor, 0, 255)
    );
  };

  // Validate input
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) hex = "#808080";
  const baseRgb = hexToRgb(hex);
  let [h, s, l] = hexToHsl(hex);
  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  const isPureBlack = hex.toLowerCase() === "#000000";
  const isPureGray = s < 10;

  const shadeConfigs = {
    normal: {
      lightShades: {
        "primary-10": 0.98,
        "primary-25": 0.96,
        "primary-50": 0.95,
        "primary-100": 0.85,
        "primary-200": 0.75,
        "primary-300": 0.6,
        "primary-400": 0.45,
        "primary-500": 0.3,
      },
      darkShades: {
        "primary-600": 0.05,
        "primary-700": 0.1,
        "primary-800": 0.3,
        "primary-900": 0.5,
      },
    },
    pureBlack: {
      lightShades: {
        "primary-10": 0.98,
        "primary-25": 0.96,
        "primary-50": 0.95,
        "primary-100": 0.85,
        "primary-200": 0.75,
        "primary-300": 0.6,
        "primary-400": 0.45,
      },
      darkShades: {
        "primary-500": 0.1,
        "primary-600": 0.2,
        "primary-700": 0.3,
        "primary-800": 0.4,
        "primary-900": 0.5,
      },
    },
    pureGray: {
      lightShades: {
        "primary-10": 0.98,
        "primary-25": 0.96,
        "primary-50": 0.95,
        "primary-100": 0.85,
        "primary-200": 0.75,
        "primary-300": 0.6,
        "primary-400": 0.45,
      },
      darkShades: {
        "primary-500": 0.0,
        "primary-600": 0.2,
        "primary-700": 0.4,
        "primary-800": 0.6,
        "primary-900": 0.8,
      },
    },
  };

  const getShades = (config, colorType = "normal") => {
    const shades = { base: rgbToHex(...baseRgb) };

    let whiteTarget, blackTarget;

    if (colorType === "pureBlack") {
      whiteTarget = hexToRgb("#707070");
      blackTarget = hexToRgb("#101010");
    } else if (colorType === "pureGray") {
      whiteTarget = hexToRgb("#ffffff");
      blackTarget = hexToRgb("#4d4d4d"); // ✅ FIXED HERE
    } else {
      whiteTarget = [255, 255, 255];
      blackTarget = [0, 0, 0];
    }

    Object.entries(config.lightShades).forEach(([key, factor]) => {
      shades[key] = rgbToHex(...blendColor(baseRgb, whiteTarget, factor));
    });

    Object.entries(config.darkShades).forEach(([key, factor]) => {
      if (factor === 0.0) {
        shades[key] = rgbToHex(...baseRgb);
      } else {
        shades[key] = rgbToHex(...blendColor(baseRgb, blackTarget, factor));
      }
    });

    return shades;
  };

  if (isPureBlack) return getShades(shadeConfigs.pureBlack, "pureBlack");
  if (isPureGray) return getShades(shadeConfigs.pureGray, "pureGray");
  return getShades(shadeConfigs.normal);
};

export const App = () => {
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Color Palette Generator</h1>
        <p className={styles.subtitle}>Create beautiful color systems</p>
      </div>

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

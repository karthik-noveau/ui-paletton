import React, { useState, useEffect } from "react";
import styles from "./home.module.css";
import { generateShades } from "./utils";
import { Header } from "./components/header";
import { ColorInput } from "./components/color_input";
import { ShadesGrid } from "./components/shades";
import { Preview } from "./components/preview";

const DEFAULT_CONFIG = {
  baseColor: "#256aff",
  paletteName: "primary",
  lightAdjustment: 0,
  darkAdjustment: 0,
  saturationAdjustment: 0,
  hueRotation: 0,
  temperatureShift: 0,
  distributionMode: "linear",
  contrast: 0,
  brightness: 0,
};

const STORAGE_KEY = "ui-paletton-config";

export const HomePage = () => {
  // Load configuration from localStorage or use defaults
  const loadConfig = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved
        ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) }
        : DEFAULT_CONFIG;
    } catch (error) {
      console.error("Failed to load configuration:", error);
      return DEFAULT_CONFIG;
    }
  };

  const initialConfig = loadConfig();

  const [baseColor, setBaseColor] = useState(initialConfig.baseColor);
  const [shades, setShades] = useState(generateShades(initialConfig.baseColor));
  const [paletteName, setPaletteName] = useState(initialConfig.paletteName);
  const [colorError, setColorError] = useState(false);
  const [lightAdjustment, setLightAdjustment] = useState(
    initialConfig.lightAdjustment
  );
  const [darkAdjustment, setDarkAdjustment] = useState(
    initialConfig.darkAdjustment
  );
  const [saturationAdjustment, setSaturationAdjustment] = useState(
    initialConfig.saturationAdjustment
  );
  const [hueRotation, setHueRotation] = useState(initialConfig.hueRotation);
  const [temperatureShift, setTemperatureShift] = useState(
    initialConfig.temperatureShift
  );
  const [distributionMode, setDistributionMode] = useState(
    initialConfig.distributionMode
  );
  const [contrast, setContrast] = useState(initialConfig.contrast);
  const [brightness, setBrightness] = useState(initialConfig.brightness);

  // Save configuration to localStorage whenever it changes
  useEffect(() => {
    try {
      const config = {
        baseColor,
        paletteName,
        lightAdjustment,
        darkAdjustment,
        saturationAdjustment,
        hueRotation,
        temperatureShift,
        distributionMode,
        contrast,
        brightness,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error("Failed to save configuration:", error);
    }
  }, [
    baseColor,
    paletteName,
    lightAdjustment,
    darkAdjustment,
    saturationAdjustment,
    hueRotation,
    temperatureShift,
    distributionMode,
    contrast,
    brightness,
  ]);

  // Generate shades when color or adjustments change
  useEffect(() => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(baseColor)) {
      setShades(
        generateShades(baseColor, {
          lightAdjustment,
          darkAdjustment,
          saturationAdjustment,
          hueRotation,
          temperatureShift,
          distributionMode,
          contrast,
          brightness,
        })
      );
      setColorError(false);
    } else {
      setColorError(true);
    }
  }, [
    baseColor,
    lightAdjustment,
    darkAdjustment,
    saturationAdjustment,
    hueRotation,
    temperatureShift,
    distributionMode,
    contrast,
    brightness,
  ]);

  const onExport = () => {
    const cssVariables = `  /* ---------- ${paletteName} ---------- */
  --${paletteName}-color: ${shades.base};
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
  };

  const onPaletteNameChange = (name) => setPaletteName(name);
  const onColorValueChange = (newColor) => setBaseColor(newColor);

  const onResetAll = () => {
    setBaseColor(DEFAULT_CONFIG.baseColor);
    setPaletteName(DEFAULT_CONFIG.paletteName);
    setLightAdjustment(DEFAULT_CONFIG.lightAdjustment);
    setDarkAdjustment(DEFAULT_CONFIG.darkAdjustment);
    setSaturationAdjustment(DEFAULT_CONFIG.saturationAdjustment);
    setHueRotation(DEFAULT_CONFIG.hueRotation);
    setTemperatureShift(DEFAULT_CONFIG.temperatureShift);
    setDistributionMode(DEFAULT_CONFIG.distributionMode);
    setContrast(DEFAULT_CONFIG.contrast);
    setBrightness(DEFAULT_CONFIG.brightness);
  };

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
              lightAdjustment={lightAdjustment}
              darkAdjustment={darkAdjustment}
              onLightAdjustmentChange={setLightAdjustment}
              onDarkAdjustmentChange={setDarkAdjustment}
              saturationAdjustment={saturationAdjustment}
              hueRotation={hueRotation}
              temperatureShift={temperatureShift}
              distributionMode={distributionMode}
              contrast={contrast}
              brightness={brightness}
              onSaturationAdjustmentChange={setSaturationAdjustment}
              onHueRotationChange={setHueRotation}
              onTemperatureShiftChange={setTemperatureShift}
              onDistributionModeChange={setDistributionMode}
              onContrastChange={setContrast}
              onBrightnessChange={setBrightness}
              onResetAll={onResetAll}
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

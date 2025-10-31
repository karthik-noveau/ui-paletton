import React, { useState, useEffect } from "react";
import { Input, ColorPicker, Select, Slider } from "antd";
import {
  FiCopy,
  FiChevronDown,
  FiSun,
  FiMoon,
  FiDroplet,
  FiRotateCw,
  FiThermometer,
  FiGrid,
  FiZap,
  FiAperture,
} from "react-icons/fi";
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
  lightAdjustment = 0,
  darkAdjustment = 0,
  onLightAdjustmentChange,
  onDarkAdjustmentChange,
  saturationAdjustment = 0,
  hueRotation = 0,
  temperatureShift = 0,
  distributionMode = "linear",
  contrast = 0,
  brightness = 0,
  onSaturationAdjustmentChange,
  onHueRotationChange,
  onTemperatureShiftChange,
  onDistributionModeChange,
  onContrastChange,
  onBrightnessChange,
  onResetAdvanced,
  onResetAll,
}) => {
  const [internalColor, setInternalColor] = useState(colorValue || "#000000");
  const [showAdvanced, setShowAdvanced] = useState(false);

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

      <div className={styles.advancedSection}>
        <button
          className={styles.advancedToggle}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Advanced Configuration
          <FiChevronDown
            className={`${styles.chevronIcon} ${
              showAdvanced ? styles.chevronOpen : ""
            }`}
          />
        </button>

        <div
          className={`${styles.advancedContent} ${
            showAdvanced ? styles.open : ""
          }`}
        >
          <div>
            <div className={styles.controlSection}>
              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>
                  <FiSun className={styles.labelIcon} />
                  Light Shades: {lightAdjustment > 0 ? "+" : ""}
                  {lightAdjustment}
                </label>
                <Slider
                  min={-50}
                  max={50}
                  value={lightAdjustment}
                  onChange={onLightAdjustmentChange}
                  className={styles.slider}
                />
              </div>

              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>
                  <FiMoon className={styles.labelIcon} />
                  Dark Shades: {darkAdjustment > 0 ? "+" : ""}
                  {darkAdjustment}
                </label>
                <Slider
                  min={-50}
                  max={50}
                  value={darkAdjustment}
                  onChange={onDarkAdjustmentChange}
                  className={styles.slider}
                />
              </div>
            </div>

            <div className={styles.controlSection}>
              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>
                  <FiDroplet className={styles.labelIcon} />
                  Saturation: {saturationAdjustment > 0 ? "+" : ""}
                  {saturationAdjustment}%
                </label>
                <Slider
                  min={-100}
                  max={100}
                  value={saturationAdjustment}
                  onChange={onSaturationAdjustmentChange}
                  className={styles.slider}
                />
              </div>

              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>
                  <FiRotateCw className={styles.labelIcon} />
                  Hue Rotation: {hueRotation > 0 ? "+" : ""}
                  {hueRotation}°
                </label>
                <Slider
                  min={-30}
                  max={30}
                  value={hueRotation}
                  onChange={onHueRotationChange}
                  className={styles.slider}
                />
              </div>

              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>
                  <FiThermometer className={styles.labelIcon} />
                  Temperature:{" "}
                  {temperatureShift > 0
                    ? "Warmer +"
                    : temperatureShift < 0
                    ? "Cooler "
                    : ""}
                  {temperatureShift}
                </label>
                <Slider
                  min={-50}
                  max={50}
                  value={temperatureShift}
                  onChange={onTemperatureShiftChange}
                  className={styles.slider}
                />
              </div>
            </div>

            <div className={styles.controlSection}>
              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>
                  <FiAperture className={styles.labelIcon} />
                  Contrast: {contrast > 0 ? "+" : ""}
                  {contrast}
                </label>
                <Slider
                  min={-50}
                  max={50}
                  value={contrast}
                  onChange={onContrastChange}
                  className={styles.slider}
                />
              </div>

              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>
                  <FiZap className={styles.labelIcon} />
                  Brightness: {brightness > 0 ? "+" : ""}
                  {brightness}
                </label>
                <Slider
                  min={-50}
                  max={50}
                  value={brightness}
                  onChange={onBrightnessChange}
                  className={styles.slider}
                />
              </div>
              <div className={styles.sliderGroup}>
                <label className={styles.sliderLabel}>
                  <FiGrid className={styles.labelIcon} />
                  Distribution Mode
                </label>
                <Select
                  value={distributionMode}
                  onChange={onDistributionModeChange}
                  className={styles.select}
                  options={[
                    { value: "linear", label: "Linear" },
                    { value: "exponential", label: "Exponential" },
                    { value: "smooth", label: "Smooth" },
                  ]}
                />
              </div>
            </div>

            <div className={styles.resetButtonGroup}>
              <Button className={styles.resetButton} onClick={onResetAdvanced}>
                Reset Advanced
              </Button>
              <Button className={styles.resetAllButton} onClick={onResetAll}>
                Reset All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

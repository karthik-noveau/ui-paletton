export const generateShades = (hex, options = {}) => {
  const {
    lightAdjustment = 0,
    darkAdjustment = 0,
    saturationAdjustment = 0,
    hueRotation = 0,
    temperatureShift = 0,
    distributionMode = "linear",
    contrast = 0,
    brightness = 0,
  } = options;

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

  const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return [
      Math.round(255 * f(0)),
      Math.round(255 * f(8)),
      Math.round(255 * f(4)),
    ];
  };

  const applyDistribution = (factor, mode) => {
    switch (mode) {
      case "exponential":
        return Math.pow(factor, 1.5);
      case "smooth":
        return factor < 0.5
          ? 2 * factor * factor
          : 1 - Math.pow(-2 * factor + 2, 2) / 2;
      default:
        return factor;
    }
  };

  const adjustHSL = (rgb, shadeKey, isLight) => {
    let [h, s, l] = hexToHsl(rgbToHex(...rgb));

    // Apply saturation adjustment
    s = clamp(s + saturationAdjustment, 0, 100);

    // Apply hue rotation based on shade position
    const shadeNumber = parseInt(shadeKey.split("-")[1]) || 0;
    const rotationFactor = isLight
      ? -((1000 - shadeNumber) / 1000)
      : (shadeNumber - 500) / 500;
    h = (h + hueRotation * rotationFactor + 360) % 360;

    // Apply temperature shift
    if (temperatureShift !== 0) {
      const tempHueShift = temperatureShift > 0 ? 30 : -150; // Warm (orange) or cool (blue)
      const tempAmount = Math.abs(temperatureShift) / 100;
      h = (h + tempHueShift * tempAmount + 360) % 360;
    }

    // Apply brightness adjustment
    if (brightness !== 0) {
      l = clamp(l + brightness * 0.5, 0, 100);
    }

    // Apply contrast adjustment
    if (contrast !== 0) {
      // Increase or decrease contrast by moving lightness away from or towards 50%
      const contrastFactor = contrast / 100;
      l = clamp(50 + (l - 50) * (1 + contrastFactor), 0, 100);
    }

    return hslToRgb(h, s, l);
  };

  const blendColor = (rgb, target, factor) => {
    return rgb.map((channel, i) =>
      clamp(channel + (target[i] - channel) * factor, 0, 255)
    );
  };

  // Validate input
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) hex = "#808080";

  const baseRgb = hexToRgb(hex);
  // eslint-disable-next-line no-unused-vars
  const [h, s, l] = hexToHsl(hex);

  // Determine color category
  const isPureWhite = hex.toLowerCase() === "#ffffff";
  const isPureBlack = hex.toLowerCase() === "#000000";
  const isPureGray = hex.toLowerCase() === "#808080";

  // Color configurations
  const colorConfigs = {
    normal: {
      lightShades: {
        "primary-25": 0.98,
        "primary-50": 0.96,
        "primary-100": 0.9,
        "primary-200": 0.7,
        "primary-300": 0.5,
        "primary-400": 0.3,
        "primary-500": 0.1,
      },
      darkShades: {
        "primary-600": 0.15,
        "primary-700": 0.3,
        "primary-800": 0.5,
        "primary-900": 0.7,
      },
      whiteTarget: [255, 255, 255],
      blackTarget: [0, 0, 0],
    },
    pureWhite: {
      lightShades: {},
      darkShades: {
        "primary-25": 0.05,
        "primary-50": 0.1,
        "primary-100": 0.15,
        "primary-200": 0.2,
        "primary-300": 0.25,
        "primary-400": 0.3,
        "primary-500": 0.35,
        "primary-600": 0.4,
        "primary-700": 0.45,
        "primary-800": 0.5,
        "primary-900": 0.55,
      },
      whiteTarget: [255, 255, 255],
      blackTarget: [128, 128, 128],
    },
    pureGray: {
      lightShades: {
        "primary-25": 0.95,
        "primary-50": 0.85,
        "primary-100": 0.75,
        "primary-200": 0.65,
        "primary-300": 0.55,
        "primary-400": 0.35,
        "primary-500": 0.15,
        "primary-600": 0.05,
      },
      darkShades: {
        "primary-700": 0.2,
        "primary-800": 0.3,
        "primary-900": 0.4,
      },
      whiteTarget: [255, 255, 255],
      blackTarget: [0, 0, 0],
    },
    pureBlack: {
      lightShades: {
        "primary-25": 0.95,
        "primary-50": 0.85,
        "primary-100": 0.75,
        "primary-200": 0.65,
        "primary-300": 0.55,
        "primary-400": 0.45,
        "primary-500": 0.35,
        "primary-600": 0.25,
        "primary-700": 0.15,
        "primary-800": 0.05,
        "primary-900": 0.01,
      },
      darkShades: {},
      whiteTarget: [128, 128, 128],
      blackTarget: [0, 0, 0],
    },
  };

  const getShades = (config) => {
    const shades = { base: rgbToHex(...baseRgb) };
    const { whiteTarget, blackTarget } = config;

    // Convert adjustments from -50 to +50 range to factor adjustments
    const lightFactorAdjustment = lightAdjustment / 100;
    const darkFactorAdjustment = darkAdjustment / 100;

    Object.entries(config.lightShades).forEach(([key, factor]) => {
      let adjustedFactor = clamp(factor + lightFactorAdjustment, 0, 1);
      adjustedFactor = applyDistribution(adjustedFactor, distributionMode);

      const blendedRgb = blendColor(baseRgb, whiteTarget, adjustedFactor);
      const finalRgb =
        saturationAdjustment !== 0 || hueRotation !== 0 || temperatureShift !== 0
          ? adjustHSL(blendedRgb, key, true)
          : blendedRgb;

      shades[key] = rgbToHex(...finalRgb);
    });

    Object.entries(config.darkShades).forEach(([key, factor]) => {
      let adjustedFactor = clamp(factor + darkFactorAdjustment, 0, 1);
      adjustedFactor = applyDistribution(adjustedFactor, distributionMode);

      const blendedRgb = blendColor(baseRgb, blackTarget, adjustedFactor);
      const finalRgb =
        saturationAdjustment !== 0 || hueRotation !== 0 || temperatureShift !== 0
          ? adjustHSL(blendedRgb, key, false)
          : blendedRgb;

      shades[key] = rgbToHex(...finalRgb);
    });

    return shades;
  };

  if (isPureWhite) return getShades(colorConfigs.pureWhite);
  if (isPureBlack) return getShades(colorConfigs.pureBlack);
  if (isPureGray) return getShades(colorConfigs.pureGray);

  return getShades(colorConfigs.normal);
};

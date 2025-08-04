export const generateShades = (hex) => {
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
  // eslint-disable-next-line no-unused-vars
  const [h, s, l] = hexToHsl(hex);

  // Determine color category
  const isPureWhite = hex.toLowerCase() === "#ffffff";
  const isPureBlack = hex.toLowerCase() === "#000000";
  const isPureGray = s < 10 || hex.toLowerCase() === "#808080";

  // Color configurations
  const colorConfigs = {
    normal: {
      lightShades: {
        "primary-50": 0.9,
        "primary-100": 0.8,
        "primary-200": 0.6,
        "primary-300": 0.4,
        "primary-400": 0.2,
      },
      darkShades: {
        "primary-600": 0.2,
        "primary-700": 0.4,
        "primary-800": 0.6,
        "primary-900": 0.8,
        "primary-950": 0.9,
      },
      whiteTarget: [255, 255, 255],
      blackTarget: [0, 0, 0],
    },
    pureWhite: {
      lightShades: {},
      darkShades: {
        "primary-100": 0.05,
        "primary-200": 0.1,
        "primary-300": 0.15,
        "primary-400": 0.2,
        "primary-500": 0.25,
        "primary-600": 0.3,
      },
      whiteTarget: [255, 255, 255],
      blackTarget: [128, 128, 128],
    },
    pureGray: {
      lightShades: {
        "primary-100": 0.62,
        "primary-200": 0.52,
        "primary-300": 0.42,
        "primary-400": 0.32,
        "primary-500": 0.22,
        "primary-600": 0.12,
      },
      darkShades: {},
      whiteTarget: [255, 255, 255],
      blackTarget: [0, 0, 0],
    },
    pureBlack: {
      lightShades: {
        "primary-100": 0.92,
        "primary-200": 0.72,
        "primary-300": 0.52,
        "primary-400": 0.32,
        "primary-500": 0.22,
        "primary-600": 0.1,
      },
      darkShades: {},
      whiteTarget: [128, 128, 128],
      blackTarget: [0, 0, 0],
    },
  };

  const getShades = (config) => {
    const shades = { base: rgbToHex(...baseRgb) };
    const { whiteTarget, blackTarget } = config;

    Object.entries(config.lightShades).forEach(([key, factor]) => {
      shades[key] = rgbToHex(...blendColor(baseRgb, whiteTarget, factor));
    });

    Object.entries(config.darkShades).forEach(([key, factor]) => {
      shades[key] = rgbToHex(...blendColor(baseRgb, blackTarget, factor));
    });

    return shades;
  };

  if (isPureWhite) return getShades(colorConfigs.pureWhite);
  if (isPureBlack) return getShades(colorConfigs.pureBlack);
  if (isPureGray) return getShades(colorConfigs.pureGray);

  return getShades(colorConfigs.normal);
};

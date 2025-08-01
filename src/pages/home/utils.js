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
        "primary-10": 1,
        "primary-25": 0.96,
        "primary-50": 0.95,
        "primary-100": 0.85,
        "primary-200": 0.75,
        "primary-300": 0.6,
        "primary-400": 0.45,
      },
      darkShades: {
        "primary-500": 5,
        "primary-600": 4,
        "primary-700": 3,
        "primary-800": 2,
        "primary-900": 1,
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
        "primary-500": 0.1,
        "primary-600": 0.3,
        "primary-700": 0.5,
        "primary-800": 0.7,
        "primary-900": 0.9,
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
      blackTarget = hexToRgb("#4d4d4d");
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

import chroma from 'chroma-js';

export const shadeSteps = [10, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export const generateShades = (color) => {
  const scale = chroma.scale(['white', color, 'black']).mode('lch').colors(15);
  return {
    '10': scale[1],
    '25': scale[2],
    '50': scale[3],
    '100': scale[4],
    '200': scale[5],
    '300': scale[6],
    '400': scale[7],
    '500': color,
    '600': scale[9],
    '700': scale[10],
    '800': scale[11],
    '900': scale[12],
    '950': scale[13],
  };
};
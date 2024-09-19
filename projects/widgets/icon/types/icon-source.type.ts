export const IconSource = {
  SVG: 'svg',
  FONT: 'font',
} as const;

export type IconSourceType = (typeof IconSource)[keyof typeof IconSource];

export const IdsIconSource = {
  SVG: 'svg',
  FONT: 'font',
} as const;

export type IdsIconSourceType = (typeof IdsIconSource)[keyof typeof IdsIconSource];

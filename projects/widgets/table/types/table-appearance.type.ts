export const IdsTableAppearance = {
  PLAIN: 'plain',
  LINE_DIVISION: 'line-division',
  ZEBRA: 'zebra',
} as const;

export type IdsTableAppearanceType = (typeof IdsTableAppearance)[keyof typeof IdsTableAppearance];

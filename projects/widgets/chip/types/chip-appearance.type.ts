export const IdsChipAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
} as const;

export type IdsChipAppearanceType = (typeof IdsChipAppearance)[keyof typeof IdsChipAppearance];

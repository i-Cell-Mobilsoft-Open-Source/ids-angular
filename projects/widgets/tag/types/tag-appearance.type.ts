export const IdsTagAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
} as const;

export type IdsTagAppearanceType = (typeof IdsTagAppearance)[keyof typeof IdsTagAppearance];

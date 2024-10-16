export const IdsIconButtonAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  STANDARD: 'standard',
} as const;

export type IdsIconButtonAppearanceType = (typeof IdsIconButtonAppearance)[keyof typeof IdsIconButtonAppearance];

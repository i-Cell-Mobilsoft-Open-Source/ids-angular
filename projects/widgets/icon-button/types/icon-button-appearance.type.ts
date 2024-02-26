export const IconButtonAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  STANDARD: 'standard'
} as const;

export type IconButtonAppearanceType = (typeof IconButtonAppearance)[keyof typeof IconButtonAppearance];

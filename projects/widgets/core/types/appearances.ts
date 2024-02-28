export const ButtonAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TEXT: 'text'
} as const;

export type ButtonAppearanceType = (typeof ButtonAppearance)[keyof typeof ButtonAppearance];

export const IconButtonAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  STANDARD: 'standard'
} as const;

export type IconButtonAppearanceType = (typeof IconButtonAppearance)[keyof typeof IconButtonAppearance];

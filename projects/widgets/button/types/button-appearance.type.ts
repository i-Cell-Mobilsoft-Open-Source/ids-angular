export const ButtonAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TEXT: 'text'
} as const;

export type ButtonAppearanceType = (typeof ButtonAppearance)[keyof typeof ButtonAppearance];

export const CardAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  ELEVATED: 'elevated',
} as const;

export type CardAppearanceType = (typeof CardAppearance)[keyof typeof CardAppearance];

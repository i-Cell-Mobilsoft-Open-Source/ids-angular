export const Appearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TEXT: 'text'
} as const;

export type AppearanceType = (typeof Appearance)[keyof typeof Appearance];

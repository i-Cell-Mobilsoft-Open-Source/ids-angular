export const TagAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
} as const;

export type TagAppearanceType = (typeof TagAppearance)[keyof typeof TagAppearance];

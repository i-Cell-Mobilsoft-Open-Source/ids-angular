export const IdsCardAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  ELEVATED: 'elevated',
} as const;

export type IdsCardAppearanceType = (typeof IdsCardAppearance)[keyof typeof IdsCardAppearance];

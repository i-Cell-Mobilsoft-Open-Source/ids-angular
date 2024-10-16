export const IdsButtonAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TEXT: 'text',
} as const;

export type IdsButtonAppearanceType = (typeof IdsButtonAppearance)[keyof typeof IdsButtonAppearance];

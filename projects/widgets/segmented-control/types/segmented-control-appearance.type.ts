export const IdsSegmentedControlAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
} as const;

export type IdsSegmentedControlAppearanceType = (typeof IdsSegmentedControlAppearance)[keyof typeof IdsSegmentedControlAppearance];

export const IdsSegmentedControlAppearance = {
  OUTLINED: 'outlined',
} as const;

export type IdsSegmentedControlAppearanceType = (typeof IdsSegmentedControlAppearance)[keyof typeof IdsSegmentedControlAppearance];

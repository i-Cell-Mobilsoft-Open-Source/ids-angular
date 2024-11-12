export const IdsSegmentedControlToggleAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
} as const;

export type IdsSegmentedControlToggleAppearanceType =
  (typeof IdsSegmentedControlToggleAppearance)[keyof typeof IdsSegmentedControlToggleAppearance];

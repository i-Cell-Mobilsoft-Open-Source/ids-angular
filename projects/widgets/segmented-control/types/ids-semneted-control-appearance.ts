export const SegmentedControlAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
} as const;

export type SegmentedControlAppearanceType = (typeof SegmentedControlAppearance)[keyof typeof SegmentedControlAppearance];

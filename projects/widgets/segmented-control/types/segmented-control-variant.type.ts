export const SegmentedControlVariant = {
  PRIMARY: 'primary',
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type SegmentedControlVariantType = (typeof SegmentedControlVariant)[keyof typeof SegmentedControlVariant];

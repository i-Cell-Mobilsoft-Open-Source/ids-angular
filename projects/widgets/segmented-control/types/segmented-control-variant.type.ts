export const IdsSegmentedControlVariant = {
  PRIMARY: 'primary',
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsSegmentedControlVariantType = (typeof IdsSegmentedControlVariant)[keyof typeof IdsSegmentedControlVariant];

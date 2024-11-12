export const IdsSegmentedControlVariant = {
  PRIMARY: 'primary',
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsSegmentedControlVariantType = (typeof IdsSegmentedControlVariant)[keyof typeof IdsSegmentedControlVariant];

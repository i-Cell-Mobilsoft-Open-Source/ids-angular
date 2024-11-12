export const IdsSegmentedControlToggleVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsSegmentedControlToggleVariantType =
  (typeof IdsSegmentedControlToggleVariant)[keyof typeof IdsSegmentedControlToggleVariant];

export const IdsSegmentedControlToggleButtonVariant = {
  PRIMARY: 'primary',
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsSegmentedControlToggleButtonVariantType =
  (typeof IdsSegmentedControlToggleButtonVariant)[keyof typeof IdsSegmentedControlToggleButtonVariant];

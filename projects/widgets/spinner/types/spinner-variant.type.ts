export const IdsSpinnerVariant = {
  SURFACE: 'surface',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  BRAND: 'brand',
  LIGHT: 'light',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export type IdsSpinnerVariantType = (typeof IdsSpinnerVariant)[keyof typeof IdsSpinnerVariant];

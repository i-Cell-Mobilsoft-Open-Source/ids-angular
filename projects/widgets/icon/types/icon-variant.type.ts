export const IdsIconVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  BRAND: 'brand',
  SURFACE: 'surface',
} as const;

export type IdsIconVariantType = (typeof IdsIconVariant)[keyof typeof IdsIconVariant];

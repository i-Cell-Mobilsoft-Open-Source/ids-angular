export const IdsIconVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SURFACE: 'surface',
  BRAND: 'brand',
  LIGHT: 'light',
  DARK: 'dark',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type IdsIconVariantType = (typeof IdsIconVariant)[keyof typeof IdsIconVariant];

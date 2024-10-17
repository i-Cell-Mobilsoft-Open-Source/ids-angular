export const IdsButtonVariant = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
  BRAND: 'brand',
  SURFACE: 'surface',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsButtonVariantType = (typeof IdsButtonVariant)[keyof typeof IdsButtonVariant];


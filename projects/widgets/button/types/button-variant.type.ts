export const IdsButtonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SURFACE: 'surface',
  BRAND: 'brand',
  LIGHT: 'light',
  DARK: 'dark',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type IdsButtonVariantType = (typeof IdsButtonVariant)[keyof typeof IdsButtonVariant];


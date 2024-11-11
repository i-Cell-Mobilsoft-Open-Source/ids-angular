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
  LIGHT_FIXED: 'light-fixed',
} as const;

export type IdsButtonVariantType = (typeof IdsButtonVariant)[keyof typeof IdsButtonVariant];


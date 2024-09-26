export const IconVariant = {
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

export type IconVariantType = (typeof IconVariant)[keyof typeof IconVariant];

export const Variant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  BRAND: 'brand',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  LIGHT: 'light',
  DARK: 'dark',
  SURFACE: 'surface'
} as const;

export type VariantType = (typeof Variant)[keyof typeof Variant];

export const IdsDividerVariant = {
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

export type IdsDividerVariantType = (typeof IdsDividerVariant)[keyof typeof IdsDividerVariant];


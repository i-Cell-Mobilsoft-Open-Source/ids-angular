export const IdsBadgeVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SURFACE: 'surface',
  BRAND: 'brand',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsBadgeVariantType =
  (typeof IdsBadgeVariant)[keyof typeof IdsBadgeVariant];

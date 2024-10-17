export const IdsCardVariant = {
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

export type IdsCardVariantType = (typeof IdsCardVariant)[keyof typeof IdsCardVariant];


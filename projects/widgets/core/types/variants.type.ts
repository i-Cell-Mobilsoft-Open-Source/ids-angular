export const IdsBaseVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsBaseVariantType = (typeof IdsBaseVariant)[keyof typeof IdsBaseVariant];

export const IdsSurfaceVariant = {
  ...IdsBaseVariant,
  SURFACE: 'surface',
} as const;

export type IdsSurfaceVariantType = (typeof IdsSurfaceVariant)[keyof typeof IdsSurfaceVariant];

export const IdsBrandVariant = {
  ...IdsSurfaceVariant,
  BRAND: 'brand',
} as const;

export type IdsBrandVariantType = (typeof IdsBrandVariant)[keyof typeof IdsBrandVariant];

export const IdsAllVariants = {
  ...IdsBrandVariant,
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type IdsAllVariantsType = (typeof IdsAllVariants)[keyof typeof IdsAllVariants];

export const BaseVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type BaseVariantType = (typeof BaseVariant)[keyof typeof BaseVariant];

export const SurfaceVariant = {
  ...BaseVariant,
  SURFACE: 'surface'
} as const;

export type SurfaceVariantType = (typeof SurfaceVariant)[keyof typeof SurfaceVariant];

export const BrandVariant = {
  ...SurfaceVariant,
  BRAND: 'brand',
} as const;

export type BrandVariantType = (typeof BrandVariant)[keyof typeof BrandVariant];

export const AllVariants = {
  ...BrandVariant,
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export type AllVariantsType = (typeof AllVariants)[keyof typeof AllVariants];

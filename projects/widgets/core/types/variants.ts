export const BaseVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
  SURFACE: 'surface'
} as const;

export type BaseVariantType = (typeof BaseVariant)[keyof typeof BaseVariant];

export const BrandVariant = {
  ...BaseVariant,
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

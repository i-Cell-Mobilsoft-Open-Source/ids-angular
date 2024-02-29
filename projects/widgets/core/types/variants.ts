export const BaseVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
  DARK: 'dark',
  SURFACE: 'surface'
} as const;

export type BaseVariantType = (typeof BaseVariant)[keyof typeof BaseVariant];

export const BaseButtonVariant = {
  ...BaseVariant,
  BRAND: 'brand',
} as const;

export type BaseButtonVariantType = (typeof BaseButtonVariant)[keyof typeof BaseButtonVariant];

export const ButtonVariant = {
  ...BaseButtonVariant,
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const;

export type ButtonVariantType = (typeof ButtonVariant)[keyof typeof ButtonVariant];

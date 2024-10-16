export const IdsPaginatorVariant = {
  SURFACE: 'surface',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
} as const;

export type IdsPaginatorVariantType = (typeof IdsPaginatorVariant)[keyof typeof IdsPaginatorVariant];

export const IdsPaginatorVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsPaginatorVariantType = (typeof IdsPaginatorVariant)[keyof typeof IdsPaginatorVariant];

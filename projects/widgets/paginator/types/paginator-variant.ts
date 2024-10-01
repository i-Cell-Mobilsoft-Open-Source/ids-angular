export const PaginatorVariant = {
  SURFACE: 'surface',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  LIGHT: 'light',
} as const;

export type PaginatorVariantType = (typeof PaginatorVariant)[keyof typeof PaginatorVariant];

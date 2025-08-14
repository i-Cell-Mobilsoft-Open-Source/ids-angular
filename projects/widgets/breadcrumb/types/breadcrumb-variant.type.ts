export const IdsBreadcrumbVariant = {
  PRIMARY: 'primary',
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsBreadcrumbVariantType = (typeof IdsBreadcrumbVariant)[keyof typeof IdsBreadcrumbVariant];

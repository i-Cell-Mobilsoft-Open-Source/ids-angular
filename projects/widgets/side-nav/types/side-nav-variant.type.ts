export const IdsSideNavVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsSideNavVariantType = (typeof IdsSideNavVariant)[keyof typeof IdsSideNavVariant];

export const IdsMenuItemVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsMenuItemVariantType = (typeof IdsMenuItemVariant)[keyof typeof IdsMenuItemVariant];

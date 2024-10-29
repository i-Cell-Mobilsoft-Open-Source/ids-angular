export const IdsMenuItemVariant = {
  SURFACE: 'surface',
} as const;

export type MenuItemVariantType = (typeof IdsMenuItemVariant)[keyof typeof IdsMenuItemVariant];

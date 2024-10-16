export const MenuItemVariant = {
  SURFACE: 'surface',
} as const;

export type MenuItemVariantType = (typeof MenuItemVariant)[keyof typeof MenuItemVariant];

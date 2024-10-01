export const MenuItemAppearance = {
  FILLED: 'filled',
  TEXT: 'text',
} as const;

export type MenuItemAppearanceType = (typeof MenuItemAppearance)[keyof typeof MenuItemAppearance];

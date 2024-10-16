export const IdsMenuItemAppearance = {
  FILLED: 'filled',
  TEXT: 'text',
} as const;

export type IdsMenuItemAppearanceType = (typeof IdsMenuItemAppearance)[keyof typeof IdsMenuItemAppearance];

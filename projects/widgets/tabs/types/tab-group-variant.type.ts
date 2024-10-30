export const IdsTabGroupVariant = {
  PRIMARY: 'primary',
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsTabGroupVariantType = (typeof IdsTabGroupVariant)[keyof typeof IdsTabGroupVariant];

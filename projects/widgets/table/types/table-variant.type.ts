export const IdsTableVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SURFACE: 'surface',
} as const;

export type IdsTableVariantType = (typeof IdsTableVariant)[keyof typeof IdsTableVariant];


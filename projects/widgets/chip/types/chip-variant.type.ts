export const IdsChipVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsChipVariantType = (typeof IdsChipVariant)[keyof typeof IdsChipVariant];

export const IdsCheckboxVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsCheckboxVariantType = (typeof IdsCheckboxVariant)[keyof typeof IdsCheckboxVariant];

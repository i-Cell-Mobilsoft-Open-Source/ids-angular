export const IdsFormFieldVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsFormFieldVariantType = (typeof IdsFormFieldVariant)[keyof typeof IdsFormFieldVariant];

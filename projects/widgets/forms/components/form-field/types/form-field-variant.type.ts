export const FormFieldVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type FormFieldVariantType = (typeof FormFieldVariant)[keyof typeof FormFieldVariant];

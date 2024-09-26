export const FieldsetVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type FieldsetVariantType = (typeof FieldsetVariant)[keyof typeof FieldsetVariant];

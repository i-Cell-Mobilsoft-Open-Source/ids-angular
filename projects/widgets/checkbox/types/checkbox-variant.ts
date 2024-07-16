export const CheckboxVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type CheckboxVariantType = (typeof CheckboxVariant)[keyof typeof CheckboxVariant];

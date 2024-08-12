export const RadioVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type RadioVariantType = (typeof RadioVariant)[keyof typeof RadioVariant];

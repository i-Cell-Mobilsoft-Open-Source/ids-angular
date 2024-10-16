export const IdsMessageVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsMessageVariantType = (typeof IdsMessageVariant)[keyof typeof IdsMessageVariant];

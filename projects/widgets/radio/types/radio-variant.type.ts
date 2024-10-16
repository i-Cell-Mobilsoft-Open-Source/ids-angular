export const IdsRadioVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsRadioVariantType = (typeof IdsRadioVariant)[keyof typeof IdsRadioVariant];

export const SwitchVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
  PRIMARY: 'primary',
} as const;

export type SwitchVariantType = (typeof SwitchVariant)[keyof typeof SwitchVariant];

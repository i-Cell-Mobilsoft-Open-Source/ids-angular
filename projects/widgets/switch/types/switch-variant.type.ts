export const IdsSwitchVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
  PRIMARY: 'primary',
} as const;

export type IdsSwitchVariantType = (typeof IdsSwitchVariant)[keyof typeof IdsSwitchVariant];

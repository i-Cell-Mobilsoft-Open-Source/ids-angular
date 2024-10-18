export const IdsSwitchVariant = {
  PRIMARY: 'primary',
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsSwitchVariantType = (typeof IdsSwitchVariant)[keyof typeof IdsSwitchVariant];

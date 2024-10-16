export const IdsAvatarVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsAvatarVariantType = (typeof IdsAvatarVariant)[keyof typeof IdsAvatarVariant];

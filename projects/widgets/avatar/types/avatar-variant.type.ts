export const AvatarVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type AvatarVariantType = (typeof AvatarVariant)[keyof typeof AvatarVariant];

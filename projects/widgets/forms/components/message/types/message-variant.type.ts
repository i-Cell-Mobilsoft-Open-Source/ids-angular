export const MessageVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type MessageVariantType = (typeof MessageVariant)[keyof typeof MessageVariant];

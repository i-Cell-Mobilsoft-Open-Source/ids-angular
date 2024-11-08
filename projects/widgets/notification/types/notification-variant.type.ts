export const IdsNotificationVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
  DARK: 'dark',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type IdsNotificationVariantType = (typeof IdsNotificationVariant)[keyof typeof IdsNotificationVariant];


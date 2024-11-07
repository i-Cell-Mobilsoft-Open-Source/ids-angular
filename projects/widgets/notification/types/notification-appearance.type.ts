export const IdsNotificationAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
} as const;

export type IdsNotificationAppearanceType = (typeof IdsNotificationAppearance)[keyof typeof IdsNotificationAppearance];

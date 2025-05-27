export const IdsBadgeAppearance = {
  FILLED: 'filled',
} as const;

export type IdsBadgeAppearanceType =
  (typeof IdsBadgeAppearance)[keyof typeof IdsBadgeAppearance];

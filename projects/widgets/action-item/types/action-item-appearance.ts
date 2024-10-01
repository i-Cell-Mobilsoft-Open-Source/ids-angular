export const ActionItemAppearance = {
  FILLED: 'filled',
  TEXT: 'text',
} as const;

export type ActionItemAppearanceType = (typeof ActionItemAppearance)[keyof typeof ActionItemAppearance];

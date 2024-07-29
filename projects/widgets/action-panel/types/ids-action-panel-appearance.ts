export const ActionPanelAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  ELEVATED: 'elevated',
} as const;

export type ActionPanelAppearanceType = (typeof ActionPanelAppearance)[keyof typeof ActionPanelAppearance];

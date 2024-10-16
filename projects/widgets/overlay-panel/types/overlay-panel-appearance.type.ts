export const IdsOverlayPanelAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  ELEVATED: 'elevated',
} as const;

export type IdsOverlayPanelAppearanceType = (typeof IdsOverlayPanelAppearance)[keyof typeof IdsOverlayPanelAppearance];

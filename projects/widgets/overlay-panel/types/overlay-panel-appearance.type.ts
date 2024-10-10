export const OverlayPanelAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  ELEVATED: 'elevated',
} as const;

export type OverlayPanelAppearanceType = (typeof OverlayPanelAppearance)[keyof typeof OverlayPanelAppearance];

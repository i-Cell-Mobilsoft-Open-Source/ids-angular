export const OverlayPanelVariant = {
  LIGHT: 'light',
  SURFACE: 'surface',
} as const;

export type OverlayPanelVariantType = (typeof OverlayPanelVariant)[keyof typeof OverlayPanelVariant];

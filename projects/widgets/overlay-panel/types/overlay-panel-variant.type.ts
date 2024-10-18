export const IdsOverlayPanelVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

export type IdsOverlayPanelVariantType = (typeof IdsOverlayPanelVariant)[keyof typeof IdsOverlayPanelVariant];

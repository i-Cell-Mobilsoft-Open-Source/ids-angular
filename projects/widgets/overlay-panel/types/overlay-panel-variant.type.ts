export const IdsOverlayPanelVariant = {
  LIGHT: 'light',
  SURFACE: 'surface',
} as const;

export type IdsOverlayPanelVariantType = (typeof IdsOverlayPanelVariant)[keyof typeof IdsOverlayPanelVariant];

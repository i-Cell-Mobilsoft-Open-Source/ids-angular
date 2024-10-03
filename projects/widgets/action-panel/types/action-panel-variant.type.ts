export const ActionPanelVariant = {
  LIGHT: 'light',
} as const;

export type ActionPanelVariantType = (typeof ActionPanelVariant)[keyof typeof ActionPanelVariant];

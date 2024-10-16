export const IdsTooltipVariant = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type IdsTooltipVariantType = (typeof IdsTooltipVariant)[keyof typeof IdsTooltipVariant];

export const TooltipVariant = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type TooltipVariantType = (typeof TooltipVariant)[keyof typeof TooltipVariant];

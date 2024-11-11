export const IdsTabIndicatorPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type IdsTabIndicatorPositionType = (typeof IdsTabIndicatorPosition)[keyof typeof IdsTabIndicatorPosition];

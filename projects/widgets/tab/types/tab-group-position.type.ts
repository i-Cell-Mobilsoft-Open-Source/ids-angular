export const IdsTabGroupPosition = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
} as const;

export type IdsTabGroupPositionType = (typeof IdsTabGroupPosition)[keyof typeof IdsTabGroupPosition];

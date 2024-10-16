export const IdsTooltipPosition = {
  NORTH: 'north',
  NORTHEAST: 'northeast',
  EAST: 'east',
  SOUTHEAST: 'southeast',
  SOUTH: 'south',
  SOUTHWEST: 'southwest',
  WEST: 'west',
  NORTHWEST: 'northwest',
} as const;

export type IdsTooltipPositionType = (typeof IdsTooltipPosition)[keyof typeof IdsTooltipPosition];

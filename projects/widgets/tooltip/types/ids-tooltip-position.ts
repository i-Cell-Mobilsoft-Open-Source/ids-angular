export const TooltipPosition = {
  NORTH: 'north',
  NORTHEAST: 'northeast',
  EAST: 'east',
  SOUTHEAST: 'southeast',
  SOUTH: 'south',
  SOUTHWEST: 'southwest',
  WEST: 'west',
  NORTHWEST: 'northwest',
} as const;

export type TooltipPositionType = (typeof TooltipPosition)[keyof typeof TooltipPosition];

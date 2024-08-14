export const HorizontalPosition = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type HorizontalPositionType = (typeof HorizontalPosition)[keyof typeof HorizontalPosition];

export const ExtendedHorizontalPosition = {
  ...HorizontalPosition,
  CENTER: 'center',
} as const;

export type ExtendedHorizontalPositionType = (typeof ExtendedHorizontalPosition)[keyof typeof ExtendedHorizontalPosition];

export const VerticalPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type VerticalPositionType = (typeof VerticalPosition)[keyof typeof VerticalPosition];

export const ExtendedVerticalPosition = {
  ...VerticalPosition,
  CENTER: 'center',
} as const;

export type ExtendedVerticalPositionType = (typeof ExtendedVerticalPosition)[keyof typeof ExtendedVerticalPosition];

export const Position = {
  ...HorizontalPosition,
  ...VerticalPosition,
} as const;

export type PositionType = (typeof Position)[keyof typeof Position];

export type PositionPairType = [HorizontalPositionType, VerticalPositionType];

export const ExtendedPosition = {
  ...ExtendedHorizontalPosition,
  ...ExtendedVerticalPosition,
} as const;

export type ExtendedPositionType = (typeof ExtendedPosition)[keyof typeof ExtendedPosition];

export type ExtendedPositionPairType = [ExtendedHorizontalPositionType, ExtendedVerticalPositionType];

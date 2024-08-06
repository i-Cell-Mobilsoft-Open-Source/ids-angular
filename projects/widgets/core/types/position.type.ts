export const HorizontalPosition = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type HorizontalPositionType = (typeof HorizontalPosition)[keyof typeof HorizontalPosition];

export const VerticalPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type VerticalPositionType = (typeof VerticalPosition)[keyof typeof VerticalPosition];

export const Position = {
  ...HorizontalPosition,
  ...VerticalPosition,
} as const;

export type PositionType = (typeof Position)[keyof typeof Position];

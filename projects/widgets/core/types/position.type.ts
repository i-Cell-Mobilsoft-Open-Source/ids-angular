export const IdsHorizontalPosition = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type IdsHorizontalPositionType = (typeof IdsHorizontalPosition)[keyof typeof IdsHorizontalPosition];

export const IdsExtendedHorizontalPosition = {
  ...IdsHorizontalPosition,
  CENTER: 'center',
} as const;

export type IdsExtendedHorizontalPositionType = (typeof IdsExtendedHorizontalPosition)[keyof typeof IdsExtendedHorizontalPosition];

export const IdsVerticalPosition = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

export type IdsVerticalPositionType = (typeof IdsVerticalPosition)[keyof typeof IdsVerticalPosition];

export const IdsExtendedVerticalPosition = {
  ...IdsVerticalPosition,
  CENTER: 'center',
} as const;

export type IdsExtendedVerticalPositionType = (typeof IdsExtendedVerticalPosition)[keyof typeof IdsExtendedVerticalPosition];

export const IdsPosition = {
  ...IdsHorizontalPosition,
  ...IdsVerticalPosition,
} as const;

export type IdsPositionType = (typeof IdsPosition)[keyof typeof IdsPosition];

export type IdsPositionPairType = [IdsHorizontalPositionType, IdsVerticalPositionType];

export const IdsExtendedPosition = {
  ...IdsExtendedHorizontalPosition,
  ...IdsExtendedVerticalPosition,
} as const;

export type IdsExtendedPositionType = (typeof IdsExtendedPosition)[keyof typeof IdsExtendedPosition];

export type IdsExtendedPositionPairType = [IdsExtendedHorizontalPositionType, IdsExtendedVerticalPositionType];

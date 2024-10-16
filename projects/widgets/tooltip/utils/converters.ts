import { IdsTooltipPosition, IdsTooltipPositionType } from '../types/tooltip-position.type';

import { IdsExtendedHorizontalPosition, IdsExtendedPosition, IdsExtendedVerticalPosition, IdsExtendedPositionPairType } from '@i-cell/ids-angular/core';

export function tooltipPositionToExtendedPosition(position: IdsTooltipPositionType | null | undefined): IdsExtendedPositionPairType | null {
  if (!position) {
    return null;
  }

  switch (position) {
    case IdsTooltipPosition.NORTH:
      return [
        IdsExtendedPosition.CENTER,
        IdsExtendedPosition.TOP,
      ];
    case IdsTooltipPosition.NORTHEAST:
      return [
        IdsExtendedHorizontalPosition.RIGHT,
        IdsExtendedVerticalPosition.TOP,
      ];
    case IdsTooltipPosition.EAST:
      return [
        IdsExtendedHorizontalPosition.RIGHT,
        IdsExtendedVerticalPosition.CENTER,
      ];
    case IdsTooltipPosition.SOUTHEAST:
      return [
        IdsExtendedHorizontalPosition.RIGHT,
        IdsExtendedVerticalPosition.BOTTOM,
      ];
    case IdsTooltipPosition.SOUTH:
      return [
        IdsExtendedHorizontalPosition.CENTER,
        IdsExtendedVerticalPosition.BOTTOM,
      ];
    case IdsTooltipPosition.SOUTHWEST:
      return [
        IdsExtendedHorizontalPosition.LEFT,
        IdsExtendedVerticalPosition.BOTTOM,
      ];
    case IdsTooltipPosition.WEST:
      return [
        IdsExtendedHorizontalPosition.LEFT,
        IdsExtendedVerticalPosition.CENTER,
      ];
    case IdsTooltipPosition.NORTHWEST:
      return [
        IdsExtendedHorizontalPosition.LEFT,
        IdsExtendedVerticalPosition.TOP,
      ];
  }
}

export function extendedPositionToTooltipPosition(position: IdsExtendedPositionPairType | null | undefined): IdsTooltipPositionType | null {
  if (!position) {
    return null;
  }

  // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
  const [hor, vert] = position;
  if (hor === IdsExtendedHorizontalPosition.CENTER && vert === IdsExtendedVerticalPosition.TOP) {
    return IdsTooltipPosition.NORTH;
  }
  if (hor === IdsExtendedHorizontalPosition.RIGHT && vert === IdsExtendedVerticalPosition.TOP) {
    return IdsTooltipPosition.NORTHEAST;
  }
  if (hor === IdsExtendedHorizontalPosition.RIGHT && vert === IdsExtendedVerticalPosition.CENTER) {
    return IdsTooltipPosition.EAST;
  }
  if (hor === IdsExtendedHorizontalPosition.RIGHT && vert === IdsExtendedVerticalPosition.BOTTOM) {
    return IdsTooltipPosition.SOUTHEAST;
  }
  if (hor === IdsExtendedHorizontalPosition.CENTER && vert === IdsExtendedVerticalPosition.BOTTOM) {
    return IdsTooltipPosition.SOUTH;
  }
  if (hor === IdsExtendedHorizontalPosition.LEFT && vert === IdsExtendedVerticalPosition.BOTTOM) {
    return IdsTooltipPosition.SOUTHWEST;
  }
  if (hor === IdsExtendedHorizontalPosition.LEFT && vert === IdsExtendedVerticalPosition.CENTER) {
    return IdsTooltipPosition.WEST;
  }
  if (hor === IdsExtendedHorizontalPosition.LEFT && vert === IdsExtendedVerticalPosition.TOP) {
    return IdsTooltipPosition.NORTHWEST;
  }
  return null;
}

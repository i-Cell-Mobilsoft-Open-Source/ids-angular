import { TooltipPosition, TooltipPositionType } from '../types/ids-tooltip-position';

import { ExtendedHorizontalPosition, ExtendedPosition, ExtendedVerticalPosition, ExtendedPositionPairType } from '@i-cell/ids-angular/core';

export function tooltipPositionToExtendedPosition(position: TooltipPositionType | null): ExtendedPositionPairType | null {
  if (!position) {
    return null;
  }

  switch (position) {
    case TooltipPosition.NORTH:
      return [
        ExtendedPosition.CENTER,
        ExtendedPosition.TOP,
      ];
    case TooltipPosition.NORTHEAST:
      return [
        ExtendedHorizontalPosition.RIGHT,
        ExtendedVerticalPosition.TOP,
      ];
    case TooltipPosition.EAST:
      return [
        ExtendedHorizontalPosition.RIGHT,
        ExtendedVerticalPosition.CENTER,
      ];
    case TooltipPosition.SOUTHEAST:
      return [
        ExtendedHorizontalPosition.RIGHT,
        ExtendedVerticalPosition.BOTTOM,
      ];
    case TooltipPosition.SOUTH:
      return [
        ExtendedHorizontalPosition.CENTER,
        ExtendedVerticalPosition.BOTTOM,
      ];
    case TooltipPosition.SOUTHWEST:
      return [
        ExtendedHorizontalPosition.LEFT,
        ExtendedVerticalPosition.BOTTOM,
      ];
    case TooltipPosition.WEST:
      return [
        ExtendedHorizontalPosition.LEFT,
        ExtendedVerticalPosition.CENTER,
      ];
    case TooltipPosition.NORTHWEST:
      return [
        ExtendedHorizontalPosition.LEFT,
        ExtendedVerticalPosition.TOP,
      ];
  }
}

export function extendedPositionToTooltipPosition(position: ExtendedPositionPairType | null): TooltipPositionType | null {
  if (!position) {
    return null;
  }

  // eslint-disable-next-line @stylistic/array-bracket-newline, @stylistic/array-element-newline
  const [hor, vert] = position;
  if (hor === ExtendedHorizontalPosition.CENTER && vert === ExtendedVerticalPosition.TOP) {
    return TooltipPosition.NORTH;
  }
  if (hor === ExtendedHorizontalPosition.RIGHT && vert === ExtendedVerticalPosition.TOP) {
    return TooltipPosition.NORTHEAST;
  }
  if (hor === ExtendedHorizontalPosition.RIGHT && vert === ExtendedVerticalPosition.CENTER) {
    return TooltipPosition.EAST;
  }
  if (hor === ExtendedHorizontalPosition.RIGHT && vert === ExtendedVerticalPosition.BOTTOM) {
    return TooltipPosition.SOUTHEAST;
  }
  if (hor === ExtendedHorizontalPosition.CENTER && vert === ExtendedVerticalPosition.BOTTOM) {
    return TooltipPosition.SOUTH;
  }
  if (hor === ExtendedHorizontalPosition.LEFT && vert === ExtendedVerticalPosition.BOTTOM) {
    return TooltipPosition.SOUTHWEST;
  }
  if (hor === ExtendedHorizontalPosition.LEFT && vert === ExtendedVerticalPosition.CENTER) {
    return TooltipPosition.WEST;
  }
  if (hor === ExtendedHorizontalPosition.LEFT && vert === ExtendedVerticalPosition.TOP) {
    return TooltipPosition.NORTHWEST;
  }
  return null;
}

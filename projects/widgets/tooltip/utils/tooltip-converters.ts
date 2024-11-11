import { IdsTooltipPosition, IdsTooltipPositionType } from '../types/tooltip-position.type';

import { ConnectionPositionPair } from '@angular/cdk/overlay';

export function connectedPositionPairToTooltipPosition(positionPair: ConnectionPositionPair): IdsTooltipPositionType {
  const { originX, originY, overlayX, overlayY } = positionPair;

  if (
    originX=== 'center' &&
    originY === 'top' &&
    overlayX === 'center' &&
    overlayY === 'bottom'
  ) {
    return IdsTooltipPosition.NORTH;
  }
  if (
    originX === 'end' &&
    originY === 'top' &&
    overlayX === 'start' &&
    overlayY === 'bottom'
  ) {
    return IdsTooltipPosition.NORTHEAST;
  }
  if (
    originX === 'end' &&
    originY === 'center' &&
    overlayX === 'start' &&
    overlayY === 'center'
  ) {
    return IdsTooltipPosition.EAST;
  }
  if (
    originX === 'end' &&
    originY === 'bottom' &&
    overlayX === 'start' &&
    overlayY === 'top'
  ) {
    return IdsTooltipPosition.SOUTHEAST;
  }
  if (
    originX === 'center' &&
    originY === 'bottom' &&
    overlayX === 'center' &&
    overlayY === 'top'
  ) {
    return IdsTooltipPosition.SOUTH;
  }
  if (
    originX === 'start' &&
    originY === 'bottom' &&
    overlayX === 'end' &&
    overlayY === 'top'
  ) {
    return IdsTooltipPosition.SOUTHWEST;
  }
  if (
    originX === 'start' &&
    originY === 'center' &&
    overlayX === 'end' &&
    overlayY === 'center'
  ) {
    return IdsTooltipPosition.WEST;
  }
  if (
    originX === 'start' &&
    originY === 'top' &&
    overlayX === 'end' &&
    overlayY === 'bottom'
  ) {
    return IdsTooltipPosition.NORTHWEST;
  }

  return IdsTooltipPosition.EAST;
}

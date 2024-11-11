import { IdsTooltipPosition, IdsTooltipPositionType } from './types/tooltip-position.type';

import { ConnectedPosition, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';

export function setTooltipFlexibleConnectedPositionStrategy(
  connectedTo: FlexibleConnectedPositionStrategy,
  tooltipPosition: IdsTooltipPositionType,
): FlexibleConnectedPositionStrategy {
  switch (tooltipPosition) {
    case IdsTooltipPosition.NORTH:
      return connectedTo.withPositions([
        connectedPosition.north,
        connectedPosition.northwest,
        connectedPosition.northeast,
        connectedPosition.south,
        connectedPosition.southwest,
        connectedPosition.southeast,
      ]);
    case IdsTooltipPosition.NORTHEAST:
      return connectedTo.withPositions([
        connectedPosition.northeast,
        connectedPosition.southeast,
        connectedPosition.northwest,
        connectedPosition.southwest,
      ]);
    case IdsTooltipPosition.EAST:
      return connectedTo.withPositions([
        connectedPosition.east,
        connectedPosition.northeast,
        connectedPosition.southeast,
        connectedPosition.west,
        connectedPosition.northwest,
        connectedPosition.southwest,
      ]);
    case IdsTooltipPosition.SOUTHEAST:
      return connectedTo.withPositions([
        connectedPosition.southeast,
        connectedPosition.southwest,
        connectedPosition.northeast,
        connectedPosition.northwest,
      ]);
    case IdsTooltipPosition.SOUTH:
      return connectedTo.withPositions([
        connectedPosition.south,
        connectedPosition.southwest,
        connectedPosition.southeast,
        connectedPosition.north,
        connectedPosition.northwest,
        connectedPosition.northeast,
      ]);
    case IdsTooltipPosition.SOUTHWEST:
      return connectedTo.withPositions([
        connectedPosition.southwest,
        connectedPosition.northwest,
        connectedPosition.southeast,
        connectedPosition.northeast,
      ]);
    case IdsTooltipPosition.WEST:
      return connectedTo.withPositions([
        connectedPosition.west,
        connectedPosition.northwest,
        connectedPosition.southwest,
        connectedPosition.east,
        connectedPosition.northeast,
        connectedPosition.southeast,
      ]);
    case IdsTooltipPosition.NORTHWEST:
      return connectedTo.withPositions([
        connectedPosition.northwest,
        connectedPosition.southwest,
        connectedPosition.northeast,
        connectedPosition.southeast,
      ]);
  }
}

const connectedPosition: Record<IdsTooltipPositionType, ConnectedPosition> = {
  north: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  },
  northeast: {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  },
  east: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
  },
  southeast: {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
  south: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  southwest: {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  },
  west: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
  },
  northwest: {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
  },
};

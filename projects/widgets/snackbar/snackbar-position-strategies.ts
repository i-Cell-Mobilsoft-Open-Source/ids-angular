import { SnackbarPosition, SnackbarPositionType } from './public-api';

import { FlexibleConnectedPositionStrategy, GlobalPositionStrategy } from '@angular/cdk/overlay';

export function getSnackbarFlexibleConnectedPositionStrategy(
  connectedTo: FlexibleConnectedPositionStrategy,
  snackbarPosition: SnackbarPositionType,
  margin: number,
): FlexibleConnectedPositionStrategy {
  switch (snackbarPosition) {
    case SnackbarPosition.BOTTOM_CENTER:
      return connectedTo.withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: 0 - margin,
        },
      ]);
    case SnackbarPosition.TOP_CENTER:
      return connectedTo.withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: margin,
        },
      ]);
    case SnackbarPosition.TOP_LEFT:
      return connectedTo.withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: margin,
          offsetY: margin,
        },
      ]);
    case SnackbarPosition.TOP_RIGHT:
      return connectedTo.withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: 0 - margin,
          offsetY: margin,
        },
      ]);
    case SnackbarPosition.BOTTOM_LEFT:
      return connectedTo.withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetX: margin,
          offsetY: 0 - margin,
        },
      ]);
    case SnackbarPosition.BOTTOM_RIGHT:
      return connectedTo.withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetX: 0 - margin,
          offsetY: 0 - margin,
        },
      ]);
  }
}

export function getSnackbarGlobalPositionStrategy(
  globalPosition: GlobalPositionStrategy,
  position: SnackbarPositionType,
  margin: number = 0,
): GlobalPositionStrategy {
  const marginPx = `${margin}px`;
  switch (position) {
    case SnackbarPosition.BOTTOM_CENTER:
      return globalPosition.bottom(marginPx).centerHorizontally();
    case SnackbarPosition.TOP_CENTER:
      return globalPosition.top(marginPx).centerHorizontally();
    case SnackbarPosition.TOP_LEFT:
      return globalPosition.top(marginPx).left(marginPx);
    case SnackbarPosition.TOP_RIGHT:
      return globalPosition.top(marginPx).right(marginPx);
    case SnackbarPosition.BOTTOM_LEFT:
      return globalPosition.bottom(marginPx).left(marginPx);
    case SnackbarPosition.BOTTOM_RIGHT:
      return globalPosition.bottom(marginPx).right(marginPx);
  }
}

import { IdsSnackbarPosition, IdsSnackbarPositionType } from './types/snackbar-position.type';

import { FlexibleConnectedPositionStrategy, GlobalPositionStrategy } from '@angular/cdk/overlay';

export function getSnackbarFlexibleConnectedPositionStrategy(
  connectedTo: FlexibleConnectedPositionStrategy,
  snackbarPosition: IdsSnackbarPositionType,
  margin: number,
): FlexibleConnectedPositionStrategy {
  switch (snackbarPosition) {
    case IdsSnackbarPosition.BOTTOM_CENTER:
      return connectedTo.withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: 0 - margin,
        },
      ]);
    case IdsSnackbarPosition.TOP_CENTER:
      return connectedTo.withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: margin,
        },
      ]);
    case IdsSnackbarPosition.TOP_LEFT:
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
    case IdsSnackbarPosition.TOP_RIGHT:
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
    case IdsSnackbarPosition.BOTTOM_LEFT:
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
    case IdsSnackbarPosition.BOTTOM_RIGHT:
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
  position: IdsSnackbarPositionType,
  margin: number = 0,
): GlobalPositionStrategy {
  const marginPx = `${margin}px`;
  switch (position) {
    case IdsSnackbarPosition.BOTTOM_CENTER:
      return globalPosition.bottom(marginPx).centerHorizontally();
    case IdsSnackbarPosition.TOP_CENTER:
      return globalPosition.top(marginPx).centerHorizontally();
    case IdsSnackbarPosition.TOP_LEFT:
      return globalPosition.top(marginPx).left(marginPx);
    case IdsSnackbarPosition.TOP_RIGHT:
      return globalPosition.top(marginPx).right(marginPx);
    case IdsSnackbarPosition.BOTTOM_LEFT:
      return globalPosition.bottom(marginPx).left(marginPx);
    case IdsSnackbarPosition.BOTTOM_RIGHT:
      return globalPosition.bottom(marginPx).right(marginPx);
  }
}

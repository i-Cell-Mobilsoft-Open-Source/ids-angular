import { IdsSnackbarPosition, IdsSnackbarPositionType } from './types/snackbar-position.type';

import { GlobalPositionStrategy } from '@angular/cdk/overlay';

export function getSnackbarGlobalPositionStrategy(
  globalPosition: GlobalPositionStrategy,
  position: IdsSnackbarPositionType,
  margin = 0,
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

import { SnackbarPosition, SnackbarPositionType } from './types/snackbar-position.type';
import { SnackbarVariant, SnackbarVariantType } from './types/snackbar-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export const READ_SPEED_PER_CHAR = 50;
export const MIN_DURATION = 2_000;
export const READ_SPEED_PER_ACTION = 2_000;

export interface IdsSnackbarDefaultConfig {
  size?: SizeType
  variant?: SnackbarVariantType
  position?: SnackbarPositionType
  newestAtStartPosition?: boolean
  viewportMargin?: number
}

export const IDS_SNACKBAR_DEFAULT_CONFIG = new InjectionToken<IdsSnackbarDefaultConfig>(
  'IDS_SNACKBAR_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY(): (Required<IdsSnackbarDefaultConfig>) {
  return {
    size: Size.COMFORTABLE,
    variant: SnackbarVariant.DARK,
    position: SnackbarPosition.BOTTOM_CENTER,
    newestAtStartPosition: false,
    viewportMargin: 16,
  };
}

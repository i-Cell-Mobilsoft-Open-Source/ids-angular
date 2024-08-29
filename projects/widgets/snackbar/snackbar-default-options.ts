import { SnackbarPosition, SnackbarPositionType } from './types/snackbar-position.type';
import { SnackbarVariant, SnackbarVariantType } from './types/snackbar-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export const READ_SPEED_PER_CHAR = 50;
export const MIN_DURATION = 2_000;

export interface IdsSnackbarDefaultOptions {
  size?: SizeType
  variant?: SnackbarVariantType
  position?: SnackbarPositionType
  newestAtStartPosition?: boolean
}

export const IDS_SNACKBAR_DEFAULT_OPTIONS = new InjectionToken<IdsSnackbarDefaultOptions>(
  'IDS_SNACKBAR_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: IDS_SNACKBAR_DEFAULT_OPTIONS_FACTORY,
  },
);

export function IDS_SNACKBAR_DEFAULT_OPTIONS_FACTORY(): (Required<IdsSnackbarDefaultOptions>) {
  return {
    size: Size.COMFORTABLE,
    variant: SnackbarVariant.DARK,
    position: SnackbarPosition.BOTTOM_CENTER,
    newestAtStartPosition: false,
  };
}

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsDialogDefaultConfig {
  size?: IdsSizeType,
  showCloseButton?: boolean,
  showBackdrop?: boolean,
}

export const IDS_DIALOG_DEFAULT_CONFIG = new InjectionToken<IdsDialogDefaultConfig>(
  'IDS_DIALOG_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_DIALOG_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_DIALOG_DEFAULT_CONFIG_FACTORY(): Required<IdsDialogDefaultConfig> {
  return {
    size: IdsSize.COMPACT,
    showCloseButton: false,
    showBackdrop: true,
  };
}


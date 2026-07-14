import { IdsDatepickerView, IdsDatepickerViewType } from './tokens/datepicker-view';

import { InjectionToken } from '@angular/core';
import { IdsOverlayPanelAppearance, IdsOverlayPanelAppearanceType } from '@i-cell/ids-angular/overlay-panel';

export interface IdsDatepickerDefaultConfig {
  view?: IdsDatepickerViewType,
  appearance?: IdsOverlayPanelAppearanceType,
}

export const IDS_DATEPICKER_DEFAULT_CONFIG = new InjectionToken<IdsDatepickerDefaultConfig>(
  'IDS_DATEPICKER_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_DATEPICKER_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_DATEPICKER_DEFAULT_CONFIG_FACTORY(): Required<IdsDatepickerDefaultConfig> {
  return {
    view: IdsDatepickerView.DAY,
    appearance: IdsOverlayPanelAppearance.ELEVATED,
  };
}


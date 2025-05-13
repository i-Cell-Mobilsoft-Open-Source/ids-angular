import { IdsDatepickerView, IdsDatepickerViewType } from './tokens/datepicker-view';

import { InjectionToken } from '@angular/core';

export interface IdsDatepickerDefaultConfig {
  view?: IdsDatepickerViewType,
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
  };
}


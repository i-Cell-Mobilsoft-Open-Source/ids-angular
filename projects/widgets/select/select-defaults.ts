import { InjectionToken } from '@angular/core';

export interface IdsSelectDefaultConfig {
}

export const IDS_SELECT_DEFAULT_CONFIG = new InjectionToken<IdsSelectDefaultConfig>(
  'IDS_SELECT_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_SELECT_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_SELECT_DEFAULT_CONFIG_FACTORY(): Required<IdsSelectDefaultConfig> {
  return {
  };
}

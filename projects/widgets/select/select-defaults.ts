import { InjectionToken } from '@angular/core';
import { AbstractErrorStateMatcher, AbstractSuccessStateMatcher, ErrorStateMatcher, SuccessStateMatcher } from '@i-cell/ids-angular/forms';

export interface IdsSelectDefaultConfig {
  errorStateMatcher?: typeof AbstractErrorStateMatcher
  successStateMatcher?: typeof AbstractSuccessStateMatcher
  typeaheadDebounceInterval: number
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
    errorStateMatcher: ErrorStateMatcher,
    successStateMatcher: SuccessStateMatcher,
    typeaheadDebounceInterval: 200,
  };
}

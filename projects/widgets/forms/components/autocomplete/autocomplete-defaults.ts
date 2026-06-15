import { AbstractErrorStateMatcher, ErrorStateMatcher } from '../../common/error/error-state';
import { AbstractSuccessStateMatcher, SuccessStateMatcher } from '../../common/success/success-state';

import { InjectionToken } from '@angular/core';

export interface IdsAutocompleteDefaultConfig {
  errorStateMatcher?: typeof AbstractErrorStateMatcher
  successStateMatcher?: typeof AbstractSuccessStateMatcher
}

export const IDS_AUTOCOMPLETE_DEFAULT_CONFIG = new InjectionToken<IdsAutocompleteDefaultConfig>(
  'IDS_AUTOCOMPLETE_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY(): Required<IdsAutocompleteDefaultConfig> {
  return {
    errorStateMatcher: ErrorStateMatcher,
    successStateMatcher: SuccessStateMatcher,
  };
}

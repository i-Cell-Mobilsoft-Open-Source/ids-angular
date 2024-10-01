import { AbstractErrorStateMatcher, ErrorStateMatcher } from '../../common/error/error-state';
import { AbstractSuccessStateMatcher, SuccessStateMatcher } from '../../common/success/success-state';

import { InjectionToken } from '@angular/core';

export interface IdsInputDefaultConfig {
  errorStateMatcher?: typeof AbstractErrorStateMatcher
  successStateMatcher?: typeof AbstractSuccessStateMatcher
}

export const IDS_INPUT_DEFAULT_CONFIG = new InjectionToken<IdsInputDefaultConfig>(
  'IDS_INPUT_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_INPUT_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_INPUT_DEFAULT_CONFIG_FACTORY(): Required<IdsInputDefaultConfig> {
  return {
    errorStateMatcher: ErrorStateMatcher,
    successStateMatcher: SuccessStateMatcher,
  };
}

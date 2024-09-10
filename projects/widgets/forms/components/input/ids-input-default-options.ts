import { InjectionToken } from '@angular/core';
import { AbstractErrorStateMatcher, AbstractSuccessStateMatcher, ErrorStateMatcher, SuccessStateMatcher } from '@i-cell/ids-angular/forms';

export interface IdsInputDefaultOptions {
  errorStateMatcher?: typeof AbstractErrorStateMatcher
  successStateMatcher?: typeof AbstractSuccessStateMatcher
}

export const IDS_INPUT_DEFAULT_OPTIONS = new InjectionToken<IdsInputDefaultOptions>(
  'IDS_INPUT_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: IDS_INPUT_DEFAULT_OPTIONS_FACTORY,
  },
);

export function IDS_INPUT_DEFAULT_OPTIONS_FACTORY(): Required<IdsInputDefaultOptions> {
  return {
    errorStateMatcher: ErrorStateMatcher,
    successStateMatcher: SuccessStateMatcher,
  };
}

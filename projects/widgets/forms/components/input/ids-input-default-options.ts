/* eslint-disable no-magic-numbers */

import { AbstractErrorStateMatcher, ErrorStateMatcher } from '../../common/error/error-state';

import { InjectionToken } from '@angular/core';

export interface IdsInputDefaultOptions {
  errorStateMatcher?: AbstractErrorStateMatcher
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
    errorStateMatcher: new ErrorStateMatcher(),
  };
}

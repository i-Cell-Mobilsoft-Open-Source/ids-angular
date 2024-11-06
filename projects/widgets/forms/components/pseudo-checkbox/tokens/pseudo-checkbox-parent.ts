import { InjectionToken, Signal } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsPseudoCheckboxParent<T extends string> {
  embeddedPseudoCheckboxSize: Signal<IdsSizeType>
  embeddedPseudoCheckboxVariant: Signal<T>
}

export const IDS_PSEUDO_CHECKBOX_PARENT = new InjectionToken<IdsPseudoCheckboxParent<string>>(
  'IDS_PSEUDO_CHECKBOX_PARENT',
);

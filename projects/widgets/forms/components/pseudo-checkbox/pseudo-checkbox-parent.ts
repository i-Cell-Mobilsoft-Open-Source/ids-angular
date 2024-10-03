import { InjectionToken, Signal } from '@angular/core';
import { SizeType } from '@i-cell/ids-angular/core';

export interface IdsPseudoCheckboxParentComponent<T extends string> {
  size: Signal<SizeType>
  variant: Signal<T>
}

export const IDS_PSEUDO_CHECKBOX_PARENT_COMPONENT = new InjectionToken<IdsPseudoCheckboxParentComponent<string>>(
  'IDS_PSEUDO_CHECKBOX_PARENT_COMPONENT',
);

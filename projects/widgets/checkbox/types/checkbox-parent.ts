import { IdsCheckboxVariantType } from './checkbox-variant.type';

import { InjectionToken, Signal } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsCheckboxParent {
  size: Signal<IdsSizeType | null>;
  variant: Signal<IdsCheckboxVariantType | null>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IDS_CHECKBOX_PARENT = new InjectionToken<IdsCheckboxParent>('IDS_CHECKBOX_PARENT');

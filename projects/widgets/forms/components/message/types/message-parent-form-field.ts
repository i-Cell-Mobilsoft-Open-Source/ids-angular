import { IdsFormFieldVariantType } from '../../form-field/types/form-field-variant.type';

import { InjectionToken, Signal } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsMessageParentFormField {
  disabled: Signal<boolean>;
  size: Signal<IdsSizeType>;
  variant: Signal<IdsFormFieldVariantType>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IDS_MESSAGE_PARENT_FORM_FIELD = new InjectionToken<IdsMessageParentFormField>('IDS_MESSAGE_PARENT_FORM_FIELD');

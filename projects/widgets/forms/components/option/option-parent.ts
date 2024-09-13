import { FormFieldVariantType } from '../form-field/types/ids-form-field-variant.type';

import { InjectionToken, Signal } from '@angular/core';
import { SizeType } from '@i-cell/ids-angular/core';

export interface IdsOptionParentComponent {
  multiSelect: Signal<boolean>
  inertGroups?: boolean
  parentSize: Signal<SizeType>
  parentVariant: Signal<FormFieldVariantType>
  isOptionPreSelectedByValue(optionValue: unknown): boolean
}

export const IDS_OPTION_PARENT_COMPONENT = new InjectionToken<IdsOptionParentComponent>(
  'IDS_OPTION_PARENT_COMPONENT',
);

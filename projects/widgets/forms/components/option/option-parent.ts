import { IdsFormFieldVariantType } from '../form-field/types/form-field-variant.type';

import { InjectionToken, Signal } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsOptionParentComponent {
  multiSelect: Signal<boolean>
  inertGroups?: boolean
  parentSize: Signal<IdsSizeType>
  parentVariant: Signal<IdsFormFieldVariantType>
  isOptionPreSelectedByValue(optionValue: unknown): boolean
}

export const IDS_OPTION_PARENT_COMPONENT = new InjectionToken<IdsOptionParentComponent>(
  'IDS_OPTION_PARENT_COMPONENT',
);

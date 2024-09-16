import { FormElementBase } from './form-element.type';

import { Signal } from '@angular/core';

export interface IdsFormField extends FormElementBase {
  hasErrorState: Signal<boolean>
  hasSuccessState: Signal<boolean>
  onContainerClick?: () => void
}
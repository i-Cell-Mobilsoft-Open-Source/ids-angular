import { IdsCheckboxStateType } from './checkbox-state.type';

import { InjectionToken } from '@angular/core';

export interface IdsCheckboxGroupChild {
  checkboxState(): IdsCheckboxStateType;
  deselect(): void;
  select(): void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IDS_CHECKBOX_GROUP_CHILD = new InjectionToken<IdsCheckboxGroupChild>('IDS_CHECKBOX_GROUP_CHILD');

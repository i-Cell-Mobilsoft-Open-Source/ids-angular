import { InjectionToken } from '@angular/core';

export interface IdsOptionParentComponent {
  multiSelect?: boolean
  inertGroups?: boolean
}

export const IDS_OPTION_PARENT_COMPONENT = new InjectionToken<IdsOptionParentComponent>(
  'IDS_OPTION_PARENT_COMPONENT',
);

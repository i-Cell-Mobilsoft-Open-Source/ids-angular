import { IdsAccordionAppearance, IdsAccordionAppearanceType } from './types/accordion-appearance.type';

import { InjectionToken } from '@angular/core';
import { IdsButtonAppearance, IdsButtonAppearanceType, IdsButtonVariant, IdsButtonVariantType } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsAccordionDefaultConfig {
  size?: IdsSizeType
  appearance?: IdsAccordionAppearanceType
  multi?: boolean,
  btnSize?: IdsSizeType,
  btnAppearance?: IdsButtonAppearanceType,
  btnVariant?: IdsButtonVariantType,
  expandBtnLabel?: string,
  collapseBtnLabel?: string,
  hasLeadingIcon?: boolean,
  hasTrailingIcon?: boolean,
}

export const IDS_ACCORDION_DEFAULT_CONFIG = new InjectionToken<IdsAccordionDefaultConfig>(
  'IDS_ACCORDION_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_ACCORDION_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_ACCORDION_DEFAULT_CONFIG_FACTORY(): Required<IdsAccordionDefaultConfig> {
  return {
    size: IdsSize.COMPACT,
    appearance: IdsAccordionAppearance.FILLED,
    multi: false,
    btnSize: IdsSize.COMPACT,
    btnAppearance: IdsButtonAppearance.FILLED,
    btnVariant: IdsButtonVariant.SURFACE,
    expandBtnLabel: 'Expand all',
    collapseBtnLabel: 'Collapse all',
    hasLeadingIcon: false,
    hasTrailingIcon: true,
  };
}

import { AccordionAppearance, AccordionAppearanceType } from './types/accordion-appearance.type';

import { InjectionToken } from '@angular/core';
import { ButtonAppearance, ButtonAppearanceType } from '@i-cell/ids-angular/button';
import { AllVariants, AllVariantsType, Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsAccordionDefaultConfig {
  size?: SizeType
  appearance?: AccordionAppearanceType
  multi?: boolean,
  btnSize?: SizeType,
  btnAppearance?: ButtonAppearanceType,
  btnVariant?: AllVariantsType,
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
    size: Size.COMPACT,
    appearance: AccordionAppearance.FILLED,
    multi: false,
    btnSize: Size.COMPACT,
    btnAppearance: ButtonAppearance.FILLED,
    btnVariant: AllVariants.SURFACE,
    expandBtnLabel: 'Expand all',
    collapseBtnLabel: 'Collapse all',
    hasLeadingIcon: false,
    hasTrailingIcon: true,
  };
}

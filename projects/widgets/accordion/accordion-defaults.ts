import { IdsAccordionAppearance, IdsAccordionAppearanceType } from './types/accordion-appearance.type';

import { InjectionToken } from '@angular/core';
import { IdsButtonAppearance, IdsButtonAppearanceType } from '@i-cell/ids-angular/button';
import { IdsAllVariants, IdsAllVariantsType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsAccordionDefaultConfig {
  size?: IdsSizeType
  appearance?: IdsAccordionAppearanceType
  multi?: boolean,
  btnSize?: IdsSizeType,
  btnAppearance?: IdsButtonAppearanceType,
  btnVariant?: IdsAllVariantsType,
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
    btnVariant: IdsAllVariants.SURFACE,
    expandBtnLabel: 'Expand all',
    collapseBtnLabel: 'Collapse all',
    hasLeadingIcon: false,
    hasTrailingIcon: true,
  };
}

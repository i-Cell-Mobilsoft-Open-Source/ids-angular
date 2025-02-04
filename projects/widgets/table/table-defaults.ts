import { IdsTableAppearance, IdsTableAppearanceType } from './types/table-appearance.type';
import { IdsTableVariant, IdsTableVariantType } from './types/table-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export const DEFAULT_MASTER_DETAIL_TEMPLATE_NAME = 'detail';

export interface IdsTableDefaultConfig {
  appearance?: IdsTableAppearanceType,
  size?: IdsSizeType,
  variant?: IdsTableVariantType,
  fixedHeader?: boolean,
  enableSorting?: boolean,
  masterDetail?: boolean,
  detailTemplateName?: string,
  detailStickyColumns?: boolean,
  showDetailHeader?: boolean,
  enableRowSelection?: boolean,
  clearSelectionOnChange?: boolean,
  noRowsToShowOverlayBelow?: boolean,
  withBorder?: boolean,
}

export const IDS_TABLE_DEFAULT_CONFIG = new InjectionToken<IdsTableDefaultConfig>(
  'IDS_TABLE_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_TABLE_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_TABLE_DEFAULT_CONFIG_FACTORY(): Required<IdsTableDefaultConfig> {
  return {
    appearance: IdsTableAppearance.LINE_DIVISION,
    size: IdsSize.COMPACT,
    variant: IdsTableVariant.SURFACE,
    fixedHeader: false,
    enableSorting: false,
    masterDetail: false,
    detailTemplateName: DEFAULT_MASTER_DETAIL_TEMPLATE_NAME,
    detailStickyColumns: true,
    showDetailHeader: false,
    enableRowSelection: false,
    clearSelectionOnChange: true,
    noRowsToShowOverlayBelow: false,
    withBorder: false,
  };
}


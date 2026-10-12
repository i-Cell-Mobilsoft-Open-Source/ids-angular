import { IdsTableAppearance, IdsTableAppearanceType } from './types/table-appearance.type';
import { IdsTableDetailTogglePosition, IdsTableDetailTogglePositionType } from './types/table-detail-toggle-position.type';
import { IdsTableDetailTriggerMode, IdsTableDetailTriggerModeType } from './types/table-detail-trigger-mode.type';
import { IdsTableVariant, IdsTableVariantType } from './types/table-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export const DEFAULT_MASTER_DETAIL_TEMPLATE_NAME = 'detail';
export const DEFAULT_MASTER_DETAIL_TRIGGER_TEMPLATE_NAME = 'detailTrigger';

export interface IdsTableDefaultConfig {
  appearance?: IdsTableAppearanceType,
  size?: IdsSizeType,
  variant?: IdsTableVariantType,
  fixedHeader?: boolean,
  enableSorting?: boolean,
  masterDetail?: boolean,
  masterDetailToggleColumnId?: string | null,
  masterDetailTogglePosition?: IdsTableDetailTogglePositionType,
  masterDetailTriggerMode?: IdsTableDetailTriggerModeType,
  masterDetailTriggerTemplateName?: string,
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
    masterDetailToggleColumnId: null,
    masterDetailTogglePosition: IdsTableDetailTogglePosition.BEFORE,
    masterDetailTriggerMode: IdsTableDetailTriggerMode.DEFAULT,
    masterDetailTriggerTemplateName: DEFAULT_MASTER_DETAIL_TRIGGER_TEMPLATE_NAME,
    detailTemplateName: DEFAULT_MASTER_DETAIL_TEMPLATE_NAME,
    detailStickyColumns: true,
    showDetailHeader: false,
    enableRowSelection: false,
    clearSelectionOnChange: true,
    noRowsToShowOverlayBelow: false,
    withBorder: false,
  };
}

/* eslint-disable no-magic-numbers */
import { PaginatorPageButtonAppearance, PaginatorPageButtonAppearanceType } from './types/paginator-appearance.type';
import { PaginatorVariant, PaginatorVariantType } from './types/paginator-variant.type';

import { InjectionToken } from '@angular/core';
import { SizeType, Size } from '@i-cell/ids-angular/core';

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_DISPLAYED_ITEM_COUNT = 7;

export interface IdsPaginatorDefaultConfig {
  pageSize?: number
  pageSizeOptions?: number[]
  showFirstLastButton?: boolean
  showPrevNextLabel?: boolean
  showPageInfo?: boolean
  showPageButtons?: boolean
  showAllPages?: boolean
  maxDisplayedItemCount?: number
  size?: SizeType
  variant?: PaginatorVariantType
  pageButtonAppearance?: PaginatorPageButtonAppearanceType
  debounceTime: number
}

export const IDS_PAGINATOR_DEFAULT_CONFIG = new InjectionToken<IdsPaginatorDefaultConfig>(
  'IDS_PAGINATOR_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY(): Required<IdsPaginatorDefaultConfig> {
  return {
    pageSize: DEFAULT_PAGE_SIZE,
    pageSizeOptions: [
      10,
      20,
      50,
      100,
    ],
    showFirstLastButton: true,
    showPrevNextLabel: false,
    showPageInfo: true,
    showPageButtons: true,
    showAllPages: false,
    maxDisplayedItemCount: MAX_DISPLAYED_ITEM_COUNT,
    size: Size.COMFORTABLE,
    variant: PaginatorVariant.SURFACE,
    pageButtonAppearance: PaginatorPageButtonAppearance.PLAIN,
    debounceTime: 300,
  };
}

/* eslint-disable no-magic-numbers */
import { PaginatorPageButtonAppearance, PaginatorPageButtonAppearanceType } from './types/ids-paginator-appearance';
import { PaginatorVariant, PaginatorVariantType } from './types/ids-paginator-variant';

import { InjectionToken } from '@angular/core';
import { SizeType, Size } from '@i-cell/ids-angular/core';

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_DISPLAYED_ITEM_COUNT = 7;

export interface IdsPaginatorDefaultOptions {
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
}

export const IDS_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken<IdsPaginatorDefaultOptions>(
  'IDS_PAGINATOR_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: IDS_PAGINATOR_DEFAULT_OPTIONS_FACTORY,
  },
);

export function IDS_PAGINATOR_DEFAULT_OPTIONS_FACTORY(): Required<IdsPaginatorDefaultOptions> {
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
  };
}

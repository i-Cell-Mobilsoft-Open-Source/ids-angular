/* eslint-disable no-magic-numbers */
import { PaginatorVariant, PaginatorVariantType } from './types/paginator-variant';

import { InjectionToken } from '@angular/core';
import { SizeType, Size } from '@i-cell/ids-angular/core';

export const DEFAULT_PAGE_SIZE = 10;

export interface IdsPaginatorDefaultOptions {
  pageSize?: number
  pageSizeOptions?: number[]
  showFirstLastLink?: boolean
  showPageInfo?: boolean
  showPageLinks?: boolean
  size?: SizeType
  variant?: PaginatorVariantType
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
    showFirstLastLink: true,
    showPageInfo: true,
    showPageLinks: true,
    size: Size.COMFORTABLE,
    variant: PaginatorVariant.SURFACE,
  };
}
import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY, IdsPaginatorPageButtonAppearance, IdsPaginatorPageButtonAppearanceType, IdsPaginatorPageChangeEvent, IdsPaginatorVariant, IdsPaginatorVariantType } from '@i-cell/ids-angular/paginator';

const defaultConfig = IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY();

type PaginatorInputControls = {
  length: number,
  pageSize: number
  pageSizeOptions: number[]
  showFirstLastButton: boolean
  showPrevNextLabel: boolean
  showPageInfo: boolean
  showPageButtons: boolean
  showAllPages: boolean
  maxDisplayedItemCount: number
  size: IdsSizeType
  variant: IdsPaginatorVariantType
  pageButtonAppearance: IdsPaginatorPageButtonAppearanceType
  debounceTime: number,
  disabled: boolean,
  compactLayout: boolean,
};

@Injectable()
export class PaginatorDemoService {
  public inputControlConfig: DemoControlConfig<PaginatorInputControls> ={
    length: {
      description: 'The total number of items to paginate.',
      type: 'number',
      default: 120,
      control: DemoControl.NUMBER,
      step: 1,
      min: 0,
    },
    pageSize: {
      description: 'The number of items per page.',
      type: 'number',
      default: defaultConfig.pageSize,
      control: DemoControl.SELECT,
      list: [],
    },
    pageSizeOptions: {
      description: 'Array of available page size options.',
      type: 'number[]',
      default: defaultConfig.pageSizeOptions,
      control: DemoControl.NUMBERARRAY,
    },
    showFirstLastButton: {
      description: 'Whether to show "First" and "Last" buttons in the paginator.',
      type: 'boolean',
      default: defaultConfig.showFirstLastButton,
      control: DemoControl.SWITCH,
    },
    showPrevNextLabel: {
      description: 'Whether to display labels for "Previous" and "Next" buttons. Works only when compactLayout is true.',
      type: 'boolean',
      default: defaultConfig.showPrevNextLabel,
      control: DemoControl.SWITCH,
    },
    showPageInfo: {
      description: 'Whether to display page information (e.g., "Page 1 of 10").',
      type: 'boolean',
      default: defaultConfig.showPageInfo,
      control: DemoControl.SWITCH,
    },
    showPageButtons: {
      description: 'Whether to display individual page buttons.',
      type: 'boolean',
      default: defaultConfig.showPageButtons,
      control: DemoControl.SWITCH,
    },
    showAllPages: {
      description: 'Whether to display all pages in the paginator.',
      type: 'boolean',
      default: defaultConfig.showAllPages,
      control: DemoControl.SWITCH,
    },
    maxDisplayedItemCount: {
      description: 'The maximum number of items to display in the paginator.',
      type: 'number',
      default: defaultConfig.maxDisplayedItemCount,
      control: DemoControl.NUMBER,
      step: 2,
      min: 5,
    },
    size: {
      description: 'The size of the paginator component',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'The variant/style of the paginator',
      type: 'IdsIconButtonVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsPaginatorVariant),
    },
    pageButtonAppearance: {
      description: 'The appearance of the paginator buttons',
      type: 'IdsIconButtonAppearanceType',
      default: defaultConfig.pageButtonAppearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsPaginatorPageButtonAppearance),
    },
    debounceTime: {
      description: 'The number of items per page.',
      type: 'number',
      default: defaultConfig.debounceTime,
      control: DemoControl.NUMBER,
      step: 1,
      min: 0,
    },
    disabled: {
      description: 'Whether the paginator is disabled.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    compactLayout: {
      description: 'Whether to use a compact layout for the paginator.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public defaults = getDefaultFromDemoConfig<PaginatorInputControls>(this.inputControlConfig);

  public model: PaginatorInputControls = { ...this.defaults  };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  constructor() {
    this.updatePageSize();
  }

  public onPageChange(event: IdsPaginatorPageChangeEvent): void {
    console.info(event);
  }

  public updatePageSize(): void {
    const pageSizeOptions = this.model.pageSizeOptions.map((opt) => opt.toString());
    this.inputControlConfig = {
      ...this.inputControlConfig,
      pageSize: {
        ...this.inputControlConfig.pageSize,
        list: pageSizeOptions,
      },
    };
  }
}

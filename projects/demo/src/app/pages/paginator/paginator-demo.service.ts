import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY,
  IdsPaginatorPageButtonAppearance,
  IdsPaginatorPageButtonAppearanceType,
  IdsPaginatorPageChangeEvent,
  IdsPaginatorVariant,
  IdsPaginatorVariantType,
} from '@i-cell/ids-angular/paginator';
import { TranslateService } from '@ngx-translate/core';

const PAGINATOR_DOCS_PATH = 'paginator/paginator.component.docs.json';
const defaultConfig = IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY();

type PaginatorInputControls = {
  length: number;
  pageSize: number;
  pageSizeOptions: number[];
  showFirstLastButton: boolean;
  showPrevNextLabel: boolean;
  showPageInfo: boolean;
  showPageButtons: boolean;
  showAllPages: boolean;
  maxDisplayedItemCount: number;
  size: IdsSizeType;
  variant: IdsPaginatorVariantType;
  pageButtonAppearance: IdsPaginatorPageButtonAppearanceType;
  disabled: boolean;
  compactLayout: boolean;
  pageIndex: number;
};

@Injectable()
export class PaginatorDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public inputControlConfig: DemoControlConfig<PaginatorInputControls> = {
    length: {
      description: this._widgetDocs.getDescription(PAGINATOR_DOCS_PATH, 'length', 'The total number of items to paginate.'),
      type: 'number',
      default: 120,
      control: DemoControl.NUMBER,
      step: 1,
      min: 0,
    },
    pageSize: {
      description: this._widgetDocs.getDescription(PAGINATOR_DOCS_PATH, 'pageSize', 'The number of items per page.'),
      type: 'number',
      default: defaultConfig.pageSize,
      control: DemoControl.SELECT,
      list: [],
    },
    pageSizeOptions: {
      description: this._widgetDocs.getDescription(PAGINATOR_DOCS_PATH, 'pageSizeOptions', 'Array of available page size options.'),
      type: 'number[]',
      default: defaultConfig.pageSizeOptions,
      control: DemoControl.NUMBERARRAY,
    },
    showFirstLastButton: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'showFirstLastButton',
        'Whether to show "First" and "Last" buttons in the paginator.',
      ),
      type: 'boolean',
      default: defaultConfig.showFirstLastButton,
      control: DemoControl.SWITCH,
    },
    showPrevNextLabel: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'showPrevNextLabel',
        'Whether to display labels for "Previous" and "Next" buttons. Works only when compactLayout is true.',
      ),
      type: 'boolean',
      default: defaultConfig.showPrevNextLabel,
      control: DemoControl.SWITCH,
    },
    showPageInfo: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'showPageInfo',
        'Whether to display page information (e.g., "Page 1 of 10").',
      ),
      type: 'boolean',
      default: defaultConfig.showPageInfo,
      control: DemoControl.SWITCH,
    },
    showPageButtons: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'showPageButtons',
        'Whether to display individual page buttons.',
      ),
      type: 'boolean',
      default: defaultConfig.showPageButtons,
      control: DemoControl.SWITCH,
    },
    showAllPages: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'showAllPages',
        'Whether to display all pages in the paginator.',
      ),
      type: 'boolean',
      default: defaultConfig.showAllPages,
      control: DemoControl.SWITCH,
    },
    maxDisplayedItemCount: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'maxDisplayedItemCount',
        'The maximum number of items to display in the paginator.',
      ),
      type: 'number',
      default: defaultConfig.maxDisplayedItemCount,
      control: DemoControl.NUMBER,
      step: 2,
      min: 5,
    },
    size: {
      description: this._widgetDocs.getDescription(PAGINATOR_DOCS_PATH, 'size', 'The size of the paginator component'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(PAGINATOR_DOCS_PATH, 'variant', 'The variant/style of the paginator'),
      type: 'IdsIconButtonVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsPaginatorVariant),
    },
    pageButtonAppearance: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'pageButtonAppearance',
        'The appearance of the paginator buttons',
      ),
      type: 'IdsIconButtonAppearanceType',
      default: defaultConfig.pageButtonAppearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsPaginatorPageButtonAppearance),
    },
    disabled: {
      description: this._widgetDocs.getDescription(PAGINATOR_DOCS_PATH, 'disabled', 'Whether the paginator is disabled.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    compactLayout: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'compactLayout',
        'Whether to use a compact layout for the paginator.',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    pageIndex: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'pageIndex',
        'The current (0-based) page index. Two-way bindable.',
      ),
      type: 'number',
      default: 0,
      control: DemoControl.NUMBER,
      step: 1,
      min: 0,
    },
  };

  public readonly methodControlConfig: DemoMethodConfig = [
    {
      name: 'stepNextPage()',
      description: 'Navigates to the next page.',
      returnType: 'void',
    },
    {
      name: 'stepPreviousPage()',
      description: 'Navigates to the previous page.',
      returnType: 'void',
    },
    {
      name: 'stepFirstPage()',
      description: 'Navigates to the first page.',
      returnType: 'void',
    },
    {
      name: 'stepLastPage()',
      description: 'Navigates to the last page.',
      returnType: 'void',
    },
    {
      name: 'stepPage(pageIndex: number)',
      description: 'Navigates to the specified page index.',
      parameters: ['pageIndex'],
      parameterTypes: ['number'],
      parameterDescriptions: ['The index of the page to navigate to.'],
      returnType: 'void',
    },
  ];

  public defaults = getDefaultFromDemoConfig<PaginatorInputControls>(this.inputControlConfig);

  public model: PaginatorInputControls = { ...this.defaults };

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

  public readonly propControlConfig: DemoControlConfig<unknown> = {
    pageChanged: {
      description: this._widgetDocs.getDescription(
        PAGINATOR_DOCS_PATH,
        'pageChanged',
        'Emitted whenever the current page changes, with details about the new page.',
      ),
      type: 'EventEmitter<IdsPaginatorPageChangeEvent>',
      default: '-',
    },
  };

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodControlConfig];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.PAGINATOR', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputControlConfig, ...this.propControlConfig },
      },
    ];
  }
}

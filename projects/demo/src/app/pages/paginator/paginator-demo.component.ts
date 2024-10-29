import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY, IdsPaginatorComponent, IdsPaginatorPageButtonAppearance, IdsPaginatorPageButtonAppearanceType, IdsPaginatorVariant, IdsPaginatorVariantType } from '@i-cell/ids-angular/paginator';
import { TranslateModule } from '@ngx-translate/core';

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

@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsPaginatorComponent,
    UpperCasePipe,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './paginator-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './paginator-demo.component.scss',
  ],
})
export class PaginatorDemoComponent {
  protected _inputControlConfig: DemoControlConfig<PaginatorInputControls> ={
    length: {
      description: 'The total number of items to paginate.',
      type: 'number',
      default: 120,
      control: 'text',
    },
    pageSize: {
      description: 'The number of items per page.',
      type: 'number',
      default: defaultConfig.pageSize,
      control: 'text',
    },
    pageSizeOptions: {
      description: 'Array of available page size options.',
      type: 'number[]',
      default: defaultConfig.pageSizeOptions,
      control: 'text',
    },
    showFirstLastButton: {
      description: 'Whether to show "First" and "Last" buttons in the paginator.',
      type: 'boolean',
      default: defaultConfig.showFirstLastButton,
      control: 'checkbox',
    },
    showPrevNextLabel: {
      description: 'Whether to display labels for "Previous" and "Next" buttons.',
      type: 'boolean',
      default: defaultConfig.showPrevNextLabel,
      control: 'checkbox',
    },
    showPageInfo: {
      description: 'Whether to display page information (e.g., "Page 1 of 10").',
      type: 'boolean',
      default: defaultConfig.showPageInfo,
      control: 'checkbox',
    },
    showPageButtons: {
      description: 'Whether to display individual page buttons.',
      type: 'boolean',
      default: defaultConfig.showPageButtons,
      control: 'checkbox',
    },
    showAllPages: {
      description: 'Whether to display all pages in the paginator.',
      type: 'boolean',
      default: defaultConfig.showAllPages,
      control: 'checkbox',
    },
    maxDisplayedItemCount: {
      description: 'The maximum number of items to display in the paginator.',
      type: 'number',
      default: defaultConfig.maxDisplayedItemCount,
      control: 'text',
    },
    size: {
      description: 'The size of the paginator component',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'The variant/style of the paginator',
      type: 'IdsIconButtonVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsPaginatorVariant),
    },
    pageButtonAppearance: {
      description: 'The appearance of the paginator buttons',
      type: 'IdsIconButtonAppearanceType',
      default: defaultConfig.pageButtonAppearance,
      control: 'select',
      list: convertEnumToStringArray(IdsPaginatorPageButtonAppearance),
    },
    debounceTime: {
      description: 'The number of items per page.',
      type: 'number',
      default: defaultConfig.debounceTime,
      control: 'text',
    },
    disabled: {
      description: 'Whether the paginator is disabled.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    compactLayout: {
      description: 'Whether to use a compact layout for the paginator.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  public defaults = getDefaultFromDemoConfig<PaginatorInputControls>(this._inputControlConfig);

  public model: PaginatorInputControls = { ...this.defaults  };
  
  public reset(): void {
    this.model = { ...this.defaults };
  }
}
